import prisma from "$/lib/clients/prisma";
import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

type Params = {
  id: string;
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Params }
) {
  console.log("dowandiaw");

  const id = params.id;
  const parsedId = parseInt(id);

  if (Number.isNaN(parsedId)) {
    return NextResponse.error();
  }

  const post = await prisma.post.findUnique({
    where: {
      id: parsedId,
    },
    include: {
      tags: true,
    },
  });

  return NextResponse.json(post);
}
