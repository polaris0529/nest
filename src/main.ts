import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import path, { join } from 'path';
import hbs = require('hbs');
import  cookieParser from 'cookie-parser';
import { GuestCookieInterceptor } from './guest-cookie/guest-cookie.interceptor';



async function bootstrap() {

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



