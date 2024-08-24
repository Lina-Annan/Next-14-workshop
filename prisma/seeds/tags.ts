import type { PrismaClient } from "@prisma/client";

const TAGS = ["love", "art", "music", "food", "travel", "tech", "sports"];

export async function seedTags(prisma: PrismaClient) {
  await prisma.tag.createMany({
    data: TAGS.map((name) => ({
      name,
    })),
  });
}
