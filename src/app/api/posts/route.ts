import prisma from "$/lib/clients/prisma";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());

  let limit = parseInt(searchParams.limit);
  let skip = parseInt(searchParams.skip);

  if (Number.isNaN(limit)) limit = 10;
  if (Number.isNaN(skip)) skip = 0;

  const findManyArgs = {
    skip,
    where: {},
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
  } satisfies Prisma.PostFindManyArgs;

  if (searchParams.search) {
    findManyArgs.where = {
      OR: [
        { title: { contains: searchParams.search } },
        { content: { contains: searchParams.search } },
      ],
    };
  }

  const posts = await prisma.post.findMany(findManyArgs);
  const total = await prisma.post.count({ where: findManyArgs.where });

  return NextResponse.json({ posts, total });
}
