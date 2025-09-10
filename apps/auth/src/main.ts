import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Create a single, hybrid NestJS application
  const app = await NestFactory.create(AuthModule);

  // Get the ConfigService from the unified application context
  const configService = app.get(ConfigService);

  const host = configService.get<string>('AUTH_HOST');
  const port = configService.get<number>('AUTH_PORT');

  // Connect the microservice transport layer to the main application
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  });

  // Start all microservices and log that the service is running
  await app.startAllMicroservices();
  console.log(
    `Auth microservice is listening on host ${host} and port ${port}`,
  );
}
bootstrap();
