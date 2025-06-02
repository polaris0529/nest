import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as fs from 'fs/promises';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule, ConfigService, getConfigToken } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './prisma/prisma.module';
import { PortainerModule } from './portainer/portainer.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { LoggerMiddleware } from './logger/logger.middleware'
import { FileController } from './file/file.controller';
import { MulterModule, } from '@nestjs/platform-express';
import multer from 'multer';
import { join } from 'path';



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
  ],
  controllers: [AppController],
  providers: [AppService],
})




export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(FileController)
  }
}





