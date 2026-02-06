import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path, { join } from 'path';
import hbs = require('hbs');
import  cookieParser from 'cookie-parser';
import { GuestCookieInterceptor } from './guest-cookie/guest-cookie.interceptor';
import { DUMMY_DATABASE_URL } from './prisma/prisma.constants';

async function bootstrap() {
  // Prisma는 생성 시 env("DATABASE_URL")을 필수로 검사함. 없으면 PrismaClientInitializationError 발생.
  // DATABASE_URL이 비어 있으면 더미를 넣어 초기화만 통과시키고, PrismaService에서 실제 연결은 하지 않음.
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === '') {
    process.env.DATABASE_URL = DUMMY_DATABASE_URL;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //registerPartials('views/common');

  
  app.useStaticAssets(path.join(process.cwd(),"public"));
  app.setBaseViewsDir(path.join(process.cwd(), "views"));

  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views'));


  app.use(cookieParser());
  app.useGlobalInterceptors(app.get(GuestCookieInterceptor));//이거 잘모르겠음 ;;;;

  
  // app.use(helmet());

  await app.listen(process.env.SERVER_PORT ?? 3000, '0.0.0.0');
}
bootstrap();



