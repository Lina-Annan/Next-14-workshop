"use server";

import prisma from "$/lib/clients/prisma";
import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";

const addPost = async (formData: FormData) => {
  const tags = await prisma.tag.findMany({ select: { id: true } });

  const shuffledTags = faker.helpers.shuffle(tags);
  await prisma.post.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      authorId: parseInt(formData.get("authorId") as string),
      imageSrc: faker.image.url(),
      tags: {
        connect: shuffledTags.slice(0, 3).map((tag) => ({ id: tag.id })),
      },
    },
  });

  revalidatePath("/level-1");
};

export default addPost;
