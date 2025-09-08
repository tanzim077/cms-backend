import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@app/database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthCleanupService } from './auth.cleanup.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'yourSecretKey', // replace with your secret key
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/auth/.env', './.env'],
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthCleanupService],
})
export class AuthModule {}
