import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FsModule } from './fs/fs.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import 'dotenv/config';



@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'qwer1234',
    database: 'dumy',
    // entities: [User],
    synchronize: true, // 운영환경에서는 false로
  })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
