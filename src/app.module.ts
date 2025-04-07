import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { FsModule } from './fs/fs.module';


@Module({
  imports: [ApiModule, FsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
