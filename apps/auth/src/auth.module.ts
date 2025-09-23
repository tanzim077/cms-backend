import { JwtStrategy } from '@app/common'; // Import JwtStrategy from common library
import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthCleanupService } from './auth.cleanup.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthCleanupService, JwtStrategy], // Add JwtStrategy to providers
})
export class AuthModule {}
