import { Post, Tag } from "@prisma/client";

export const BASE_API_URL = "http://localhost:3000";
export const GET_POSTS_LIMIT = 12;

export type PostWithTags = Post & { tags: Tag[] };

export async function getPosts({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) {
  const searchParams = new URLSearchParams();
  searchParams.append("limit", GET_POSTS_LIMIT.toString());
  searchParams.append("skip", ((page ?? 0) * GET_POSTS_LIMIT).toString());

  if (search) {
    searchParams.append("search", search);
  }

  const url = `${BASE_API_URL}/api/posts?${searchParams.toString()}`;

  const res = await fetch(url);
  const data = (await res.json()) as {
    posts: PostWithTags[];
    total: number;
  };

  return data;
}

export function getPost(id: number) {
  const url = `${BASE_API_URL}/api/posts/${id}`;
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch post with id ${id}: ${res.statusText}`);
    }
    return res.json();
  }) as Promise<Post & { tags: Tag[] }>;
}

export function artificialDelay<T>(
  promise: Promise<T>,
  exactDuration?: number
) {
  const ms = exactDuration ?? Math.floor(Math.random() * 500);

  return new Promise<T>((resolve) => {
    setTimeout(() => {
      promise.then(resolve);
    }, ms);
  });
}
