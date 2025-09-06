import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Api');
  const app = await NestFactory.create(ApiModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: app.get(ConfigService).get('TCP_PORT') as string,
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
