import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/database';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/common';
import { RoleController } from './role.controller';
import { PermissionController } from './permission.controller';
import { RoleService } from './role.service';
import { PermissionService } from './permission.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/user/.env', './.env'],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
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
  controllers: [UserController, RoleController, PermissionController],
  providers: [UserService, JwtStrategy, RoleService, PermissionService],
})
export class UserModule {}
