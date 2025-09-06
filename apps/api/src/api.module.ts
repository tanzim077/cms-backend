import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./apps/api/.env', './.env'],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET') as string,
        };
      },
    }),
  ],
  controllers: [ApiController],
  providers: [
    ApiService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: LoggingInterceptor,
    // },
    // {
    //   provide: APP_PIPE,
    //   useClass: FreezePipe,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter,
    // },
  ],
})
export class ApiModule {}
