import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import helmet from "helmet";
import hbs = require('hbs');



async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //registerPartials('views/common');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/common'));
  
  // app.use(helmet());

  await app.listen(process.env.SERVER_PORT ?? 3000, '0.0.0.0');
}
bootstrap();

