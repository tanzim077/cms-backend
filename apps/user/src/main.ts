import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const configService = app.get(ConfigService);
  const rmqUrl = configService.get<string>('RMQ_URL');
  const queueName = configService.get<string>('USERS_QUEUE');

  if (!rmqUrl || !queueName) {
    throw new Error('RMQ_URL or USERS_QUEUE is not defined in configuration');
  }

  await app.close();
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
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
  console.log(`User microservice is listening on queue ${queueName}`);
}
bootstrap();
