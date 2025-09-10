import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/common'; // Import JwtStrategy from common library

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/user/.env', './.env'],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }), // Add PassportModule
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy], // Add JwtStrategy to providers
})
export class UserModule {}
