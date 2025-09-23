import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CourseModule } from './course.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Application context শুধু ConfigService resolve করার জন্য
  const appContext = await NestFactory.createApplicationContext(CourseModule);
  const configService = appContext.get(ConfigService);

  const rmqUrl = configService.get<string>('RMQ_URL');
  const queueName = configService.get<string>('COURSE_QUEUE');

  if (!rmqUrl || !queueName) {
    throw new Error('RMQ_URL or COURSE_QUEUE is not defined in configuration');
  }

  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(CourseModule, {
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
    `✅ Course microservice is listening on queue "${queueName}" via RabbitMQ`,
  );
}
bootstrap();
