import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import path, { join } from 'path';
import * as fs from 'fs/promises';
import Handlebars from 'handlebars';
import { registerPartials } from './utils/handlebars-partials';


import 'dotenv/config'
import { ConfigModule } from '@nestjs/config';
import { readdir } from 'fs';


async function bootstrap() {


  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });


  registerPartials('views/common')


  app.setViewEngine({
    engine: {
      handlebars: Handlebars,
    },
    templates: join(__dirname, '..', 'views'),
  });

  
  await app.listen(process.env.SERVER_PORT ?? 3000, '0.0.0.0');  //프록시 패스 지정할 경우 추가 적인 접근에대 한 설정을 할 필요가 있음;;

}
bootstrap();
