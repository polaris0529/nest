import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { isDummyDatabaseUrl } from './prisma.constants';

/** DB 연결을 쓰지 않을 때: SKIP_DB_CONNECT=true 또는 DATABASE_URL이 더미일 때 */
const shouldSkipDbConnect = () =>
  process.env.SKIP_DB_CONNECT === 'true' || isDummyDatabaseUrl();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    if (shouldSkipDbConnect()) {
      return;
    }
    await this.$connect();
  }

  $connect(): Promise<void> {
    if (shouldSkipDbConnect()) {
      return Promise.resolve();
    }
    return super.$connect();
  }
}
