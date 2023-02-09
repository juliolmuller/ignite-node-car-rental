import { PrismaClient } from '@prisma/client';
import childProcess from 'node:child_process';
import path from 'node:path';
import { URL } from 'node:url';
import { v4 as uuid } from 'uuid';

function getDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('"DATABASE_URL" not provided in environment variables');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.append('schema', schema);
  return url.toString();
}

const schemaId = `test-${uuid()}`;
const prismaBinary = path.join(__dirname, '..', '..', '..', 'node_modules', '.bin', 'prisma');
const url = getDatabaseURL(schemaId);

process.env.DATABASE_URL = url;

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url,
    },
  },
});

beforeEach(() => {
  childProcess.execSync(`"${prismaBinary}" db push`, {
    env: {
      ...process.env,
      DATABASE_URL: getDatabaseURL(schemaId),
    },
  });
});

afterEach(async () => {
  // await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE;`);
  await prisma.$disconnect();
});
