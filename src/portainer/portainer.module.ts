import { Module } from '@nestjs/common';
import { PortainerService } from './portainer.service';
import { PortainerController } from './portainer.controller';
import { PortainerInterceptor } from './portainer.interceptor';
import { PortainerGateway } from './portainer.gateway';
import { UtilsModule } from 'src/utils/utils.module';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [UtilsModule,RoleModule],
  controllers: [PortainerController],
  providers: [PortainerService, PortainerInterceptor, PortainerGateway],
})
export class PortainerModule { }
