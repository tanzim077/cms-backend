import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '@app/database';
import { LoginDto } from '@app/common/dtos/auth/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from '@app/common/dtos';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registration(registrationData: RegistrationDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registrationData.password, salt);

    try {
      const user = await this.databaseService.user.create({
        data: {
          ...registrationData,
          password: hashedPassword,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Throw an RpcException with a defined structure
        throw new RpcException({
          status: 409,
          message: 'Email already exists',
        });
      }
      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessTokenExpiresIn = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
    ) as string;
    const refreshTokenExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
    ) as string;

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiresIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiresIn,
    });

    const now = new Date();
    const expiresAt = new Date(
      now.getTime() + this.parseExpirationTime(accessTokenExpiresIn),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    await this.databaseService.auth.create({
      data: {
        user_id: user.id,
        access_token: accessToken,
        refresh_token: refreshToken,
        expiresAt: expiresAt,
      },
    });
    const existingTokens = await this.databaseService.auth.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        createdAt: 'desc', // or 'asc' for ascending order
      },
      skip: 5,
    });

    if (existingTokens.length > 0) {
      const idsToDelete = existingTokens.map((token) => token.id);
      await this.databaseService.auth.deleteMany({
        where: {
          id: { in: idsToDelete },
        },
      });
    }

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: userWithoutPassword,
    };
  }

  private parseExpirationTime(expiresIn: string): number {
    const value = parseInt(expiresIn.slice(0, -1));
    const unit = expiresIn.slice(-1);

    switch (unit) {
      case 's':
        return value * 1000; // seconds to milliseconds
      case 'm':
        return value * 60 * 1000; // minutes to milliseconds
      case 'h':
        return value * 60 * 60 * 1000; // hours to milliseconds
      case 'd':
        return value * 24 * 60 * 60 * 1000; // days to milliseconds
      default:
        return 0; // Should not happen with valid expiresIn values
    }
  }
}
