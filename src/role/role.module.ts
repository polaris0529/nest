import { Module } from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { RoleService } from './role.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleController } from './RoleController';
import { FileReadUtils } from 'src/utils/FileReadUtils';

@Module({
    imports: [],
    providers: [RoleGuard, RoleService, PrismaService,FileReadUtils],
    exports: [RoleGuard, RoleService],
    controllers: [RoleController]
})
export class RoleModule {}




