import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path';
import { TitleModule } from './title/title.module';
import TitlesService from './title/title.service';
import { Titles } from 'output/entities/Titles';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from './config/config';
import 'dotenv/config'

@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
    }),    
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DATABASES'),
        synchronize: true,
        entities: [join(process.cwd(), "output", "entities", "*.{ts,js}")],
      }),
    }),
    TitleModule, TypeOrmModule.forFeature([Titles])],
  controllers: [AppController],
  providers: [AppService,TitlesService],
})

export class AppModule { }
