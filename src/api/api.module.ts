import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, PrismaService],
})
  
export class ApiModule {}
