/** Prisma 초기화용 더미 URL. 실제 PostgreSQL 서버 없이 앱만 기동할 때 사용 */
export const DUMMY_DATABASE_URL = 'postgresql://localhost:5432/dummy';

export const isDummyDatabaseUrl = () =>
  process.env.DATABASE_URL === DUMMY_DATABASE_URL;
