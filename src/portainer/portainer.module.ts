import { Module } from '@nestjs/common';
import { PortainerService } from './portainer.service';
import { PortainerController } from './portainer.controller';
import { PortainerInterceptor } from './portainer.interceptor';

@Module({
  controllers: [PortainerController],
  providers: [PortainerService, PortainerInterceptor],
})
export class PortainerModule { }
