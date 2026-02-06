import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { isDummyDatabaseUrl } from '../prisma/prisma.constants';

@Injectable()
export class ApiService {

  constructor(private prismaService: PrismaService) { }
  
  async findAll(filters: { alias, domain }) {
    if (process.env.SKIP_DB_CONNECT === 'true' || isDummyDatabaseUrl()) {
      return [];
    }
    return this.prismaService.api_keys.findMany({
      where: {
        ...(filters.alias && { alias: filters.alias }),
        ...(filters.domain && { domain: filters.domain }),
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }


}
