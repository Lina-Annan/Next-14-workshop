import { Post, Tag } from "@prisma/client";

export const BASE_API_URL = "http://localhost:3000";
export const GET_POSTS_LIMIT = 10;

export async function getPosts({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", GET_POSTS_LIMIT.toString());
  searchParams.append("skip", (page ?? 0).toString());

  if (search) {
    searchParams.append("search", search);
  }

  const url = `${BASE_API_URL}/api/posts?${searchParams.toString()}`;

  const res = await fetch(url);
  const data = (await res.json()) as {
    posts: (Post & { tags: Tag[] })[];
    total: number;
  };

  return data;
}

export function getPost(id: number) {
  return fetch(`/api/posts/${id}`).then((res) => res.json()) as Promise<
    Post & { tags: Tag[] }
  >;
}
