import { JwtStrategy } from '@app/common'; // Updated import path
import { AppService } from '@app/common/enums';
import { AllExceptionsFilter } from '@app/common/filters/all-exceptions.filter';
import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/api/.env', './.env'],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ClientsModule.registerAsync(
      [
        { name: AppService.AUTH_SERVICE, queue: 'AUTH_QUEUE' },
        { name: AppService.USERS_SERVICE, queue: 'USERS_QUEUE' },
      ].map((service) => ({
        name: service.name,
        useFactory: (configService: ConfigService) => {
          const rmqUrl = configService.get<string>('RMQ_URL');
          const queue = configService.get<string>(service.queue);
          return {
            transport: Transport.RMQ,
            options: {
              urls: rmqUrl ? [rmqUrl] : [],
              queue: queue ?? '',
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      })),
    ),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET') as string,
        };
      },
    }),
    DatabaseModule,
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class ApiModule {}
