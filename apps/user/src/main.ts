import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService);
  const host = configService.get('USERS_HOST') as string; // Changed from USER_HOST to USERS_HOST
  const port = +configService.get('USERS_PORT'); // Changed from USER_PORT to USERS_PORT
  await app.close();
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    });
  await microservice.listen();
  console.log(
    `User microservice is listening on host ${host} and port ${port}`,
  );
}
bootstrap();
