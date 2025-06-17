import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './prisma/prisma.module';
import { PortainerModule } from './portainer/portainer.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { LoggerMiddleware } from './logger/logger.middleware'
import { FileController } from './file/file.controller';
import { UtilsModule } from './utils/utils.module';
import { FileReadUtils } from './utils/FileReadUtils';
import { RoleModule } from './role/role.module';
import { GuestCookieModule } from './guest-cookie/guest-cookie.module';



@Module({
  imports: [
    DashboardModule,
    ConfigModule.forRoot({isGlobal: true}),
    ApiModule,
    PrismaModule,
    PortainerModule,
    UserModule,
    AuthModule,
    FileModule,
    UtilsModule,
    RoleModule,
    GuestCookieModule,
  ],
  controllers: [AppController],
  providers: [AppService,FileReadUtils],
})




export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(FileController)
  }
}





