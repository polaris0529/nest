import { Module } from '@nestjs/common';
import { SpaController } from './spa.controller';
import { SpaGuard } from './spa.guard';

@Module({
  controllers: [SpaController],
  providers: [SpaGuard],
})
export class SpaModule {}
