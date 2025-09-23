import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import * as compression from 'compression';
import helmet from 'helmet';
import { ApiModule } from './api.module';

async function bootstrap() {
  const logger = new Logger('Api');
  const app = await NestFactory.create(ApiModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RMQ_URL')],
      queue: configService.get<string>('API_QUEUE'),
      queueOptions: {
        durable: false,
      },
    },
  });
  app.enableCors();
  app.use(compression());
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.startAllMicroservices();
  await app.listen(app.get(ConfigService).get('PORT') as string);
  logger.log(
    `Api application is listening on port ${app
      .get(ConfigService)
      .get('PORT')}`,
  );
}
bootstrap();
