import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path';
// import { TitleModule } from './title/title.module';
// import TitlesService from './title/title.service';
// import { Titles } from 'output/entities/Titles';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from './config/config';
import 'dotenv/config'

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
