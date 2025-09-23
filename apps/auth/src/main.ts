import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AuthModule);
  const configService = appContext.get(ConfigService);

  const rmqUrl = configService.get<string>('RMQ_URL');
  const queueName = configService.get<string>('AUTH_QUEUE');

  if (!rmqUrl || !queueName) {
    throw new Error('RMQ_URL or AUTH_QUEUE is not defined in configuration');
  }

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue: queueName,
        queueOptions: {
          durable: false,
        },
      },
    });

  await microservice.listen();
  console.log(
    `✅ Auth microservice is listening on queue "${queueName}" via RabbitMQ`,
  );
}
bootstrap();
