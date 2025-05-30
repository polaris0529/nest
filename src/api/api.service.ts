import { Injectable } from '@nestjs/common';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { PrismaService } from 'src/prisma/prisma.service';

/*주석 */
@Injectable()
export class ApiService {

  constructor(private prismaService: PrismaService) { }
  
  async findAll(filters: { alias, domain }) {
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
