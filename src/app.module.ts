import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterModule } from '@nestjs/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ApiController } from './api/api.controller';
import { PortainerModule } from './portainer/portainer.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DashboardModule,
    // RouterModule.register([
    //   {
    //     path: "views",
    //     module: DashboardModule,
    //   }
    // ]),
    ConfigModule.forRoot({
      //ignoreEnvFile: true,
      //load: []
      isGlobal: true,
     
    }),
    ApiModule,
    PrismaModule,
    PortainerModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
