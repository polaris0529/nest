import { NestFactory } from '@nestjs/core';
import { AppModule  } from './app.module';
import { Logger } from '@nestjs/common';
import { initApp } from './initApp';
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { Request, Response } from 'express'

import 'dotenv/config'

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await initApp(app);

  
}
bootstrap();
