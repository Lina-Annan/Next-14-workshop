import { faker } from "@faker-js/faker/locale/fr";
import type { Prisma, PrismaClient } from "@prisma/client";

function generatePostSeed(authorId: number) {
  return {
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    content: faker.lorem.paragraphs({ min: 7, max: 15 }),
    published: faker.datatype.boolean(),
    imageSrc: faker.image.url(),
    dislikes: faker.number.int({ min: 0, max: 100 }),
    likes: faker.number.int({ min: 0, max: 100 }),
    views: faker.number.int({ min: 0, max: 1000 }),
    authorId,
  } satisfies Prisma.PostCreateManyInput;
}

type SeedPostsOptions = {
  authorIds: number[];
  length?: number;
};

export async function seedPosts(
  prisma: PrismaClient,
  options: SeedPostsOptions
) {
  const { authorIds, length = 25 } = options;

  const seededPosts = Array.from({ length }, () => {
    const authorId = faker.helpers.arrayElement(authorIds);
    return generatePostSeed(authorId);
  });

  await prisma.post.createMany({
    data: seededPosts,
  });
}
