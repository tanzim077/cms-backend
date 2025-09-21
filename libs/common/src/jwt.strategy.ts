import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { UserPayload } from '@app/common/dtos';
import { DatabaseService } from '@app/database';

const projectRoot = process.cwd();
const envPath = path.resolve(projectRoot, '.env');
dotenv.config({ path: envPath });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static readonly logger = new Logger(JwtStrategy.name);

  constructor(private readonly databaseService: DatabaseService) {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      const errorMessage = 'CRITICAL ERROR: JWT_SECRET is not defined.';
      JwtStrategy.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<UserPayload & { permissions: string[] }> {
    const userId = parseInt(payload.sub, 10);
    const user = await this.databaseService.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: {
              include: {
                RolePermission: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
        userPermissions: {
          // ✅ include direct user overrides too
          include: {
            permission: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException(); // Throw exception instead of returning null
    }

    const rolePermissions = user.userRoles.flatMap((userRole) =>
      userRole.role.RolePermission.filter((rp) => rp.allowed) // ✅ only allowed=true
        .map((rp) => rp.permission.code),
    );

    // Apply user-level overrides
    const userAllowed = user.userPermissions
      .filter((up) => up.allowed)
      .map((up) => up.permission.code);

    const userRestricted = user.userPermissions
      .filter((up) => !up.allowed)
      .map((up) => up.permission.code);

    // Final merge
    let permissions = [...rolePermissions, ...userAllowed];

    // Remove restricted ones
    permissions = permissions.filter((perm) => !userRestricted.includes(perm));

    // Deduplicate
    const uniquePermissions = [...new Set(permissions)];
    console.log('🚀 ~ validate ~ uniquePermissions: ', uniquePermissions);

    return {
      id: user.id,
      email: user.email,
      permissions: uniquePermissions,
    };
  }
}
