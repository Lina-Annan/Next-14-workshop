import { PrismaClient } from "@prisma/client";

import { seedPosts } from "./seeds/posts";
import { seedTags } from "./seeds/tags";

const prisma = new PrismaClient();

// https://www.prisma.io/docs/orm/prisma-client/queries/crud#deleting-all-data-with-raw-sql--truncate
async function clearDatabase() {
  const models = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = models
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"public"."${name}"`)
    .join(", ");

  await prisma.$executeRawUnsafe(
    `TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`
  );
}

async function main() {
  const args = process.argv.slice(2);
  const shouldReset = args.includes("--clear");

  if (shouldReset) {
    await clearDatabase();
  }

  const userIds = Array.from({ length: 20 }, (_, index) => index + 1);

  await seedTags(prisma);

  const tagIds = (await prisma.tag.findMany({ select: { id: true } })).map(
    (tag) => tag.id
  );

  await seedPosts(prisma, {
    length: 200,
    authorIds: userIds,
    tagIds: tagIds.map((tagId) => tagId),
  });
}

main()
  .then(async () => {
    console.log("Seeding complete!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
