import { NestFactory } from '@nestjs/core';
import { AppModule  } from './app.module';
import { initApp } from './initApp';
import { NestExpressApplication } from '@nestjs/platform-express'
import 'dotenv/config'


async function bootstrap() {

  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await initApp(app);

  
}
bootstrap();
