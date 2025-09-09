import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Get the absolute path to the project root directory
const projectRoot = process.cwd();
// Get the absolute path to the .env file
const envPath = path.resolve(projectRoot, '.env');

// Manually load the .env file from the absolute path
const result = dotenv.config({ path: envPath });

// If dotenv failed to load the file, throw a clear error
if (result.error) {
  console.error('!!! CRITICAL ERROR: Could not load .env file from path:', envPath);
  throw result.error;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    // Log the value BEFORE passing it to super()
    const secret = process.env.JWT_SECRET;
    JwtStrategy.logger.log(`JwtStrategy is being initialized. JWT_SECRET from process.env is: ${secret ? 'FOUND' : 'NOT FOUND'}`)

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });

    if (!secret) {
      JwtStrategy.logger.error('!!! CRITICAL ERROR: JWT_SECRET is still undefined even after manually loading .env file. Check the .env file content. !!!');
    }
  }

  async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}
