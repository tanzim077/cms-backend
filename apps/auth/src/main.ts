import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  await app.listen(process.env.port ?? 3000);
  console.log('app is listening on port ', process.env.port);
}
bootstrap();
