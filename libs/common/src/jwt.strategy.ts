import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Define an interface for the JWT payload
interface JwtPayload {
  sub: string; // Subject (usually user ID)
  email: string;
  // Add other properties as needed
}

// Get the absolute path to the project root directory
const projectRoot = process.cwd();
// Get the absolute path to the .env file
const envPath = path.resolve(projectRoot, '.env');

// Manually load the .env file from the absolute path
const result = dotenv.config({ path: envPath });

// If dotenv failed to load the file, throw a clear error
if (result.error) {
  console.error(
    '!!! CRITICAL ERROR: Could not load .env file from path:',
    envPath,
  );
  throw result.error;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private static readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    const secret = process.env.JWT_SECRET;

    // Ensure JWT_SECRET is defined before proceeding
    if (!secret) {
      const errorMessage =
        '!!! CRITICAL ERROR: JWT_SECRET is not defined. Please ensure it is set in your .env file or environment variables. !!!';
      JwtStrategy.logger.error(errorMessage);
      throw new Error(errorMessage); // Throw an error to prevent the app from starting with invalid config
    }

    JwtStrategy.logger.log(
      `JwtStrategy is being initialized. JWT_SECRET from process.env is: ${secret ? 'FOUND' : 'NOT FOUND'}`,
    );

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Now 'secret' is guaranteed to be a string
    });
  }

  // Change payload type to JwtPayload and remove async as it's not needed
  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
