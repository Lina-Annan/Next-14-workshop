import { faker } from "@faker-js/faker/locale/fr";
import type { Prisma, PrismaClient } from "@prisma/client";

function generatePostSeed(authorId: number, tagIds: number[] = []) {
  return {
    title: faker.lorem.sentence({ min: 3, max: 7 }),
    content: faker.lorem.paragraphs({ min: 7, max: 15 }),
    published: faker.datatype.boolean(),
    imageSrc: faker.image.url(),
    dislikes: faker.number.int({ min: 0, max: 100 }),
    likes: faker.number.int({ min: 0, max: 100 }),
    views: faker.number.int({ min: 0, max: 1000 }),
    tags: {
      connect: tagIds.map((tagId) => ({ id: tagId })),
    },
    authorId,
  } satisfies Prisma.PostCreateInput;
}

type SeedPostsOptions = {
  authorIds: number[];
  tagIds?: number[];
  length?: number;
};

export async function seedPosts(
  prisma: PrismaClient,
  options: SeedPostsOptions
) {
  const { authorIds, tagIds, length = 25 } = options;

  const seededPosts = Array.from({ length }, () => {
    const authorId = faker.helpers.arrayElement(authorIds);
    const selectedTagIds = faker.helpers.shuffle(tagIds || []).slice(0, 3);
    return generatePostSeed(authorId, selectedTagIds);
  });

  await prisma.$transaction(
    seededPosts.map((post) => prisma.post.create({ data: post }))
  );
}
