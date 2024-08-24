import { Post } from "$/types/Post";

export async function getPost(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await res.json();
  data.image = `https://picsum.photos/seed/${id}/1000/700`;

  return data as Post & { image: string };
}
