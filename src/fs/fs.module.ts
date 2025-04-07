import { Module } from '@nestjs/common';
import { FsService } from './fs.service';
import { FsController } from './fs.controller';

@Module({
  providers: [FsService],
  controllers: [FsController]
})
export class FsModule {}
