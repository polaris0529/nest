import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import path from 'path';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.useStaticAssets(path.join(process.cwd(), '..', 'client', 'dist'));

  const port = config.get<number>('port', 3000);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
