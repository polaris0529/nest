import { NestFactory } from '@nestjs/core';
import { AppModule  } from './app.module';
import { Logger } from '@nestjs/common';
import { initApp } from './initApp';

import 'dotenv/config'

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'log']});  

  await initApp(app);


  


  
}
bootstrap();
