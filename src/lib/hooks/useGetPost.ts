import { useQuery } from "@tanstack/react-query";
import { Post, Tag } from "@prisma/client";

type Props = {
  id: number;
};

export default function useGetPost({ id }: Props) {
  const { data, isPending } = useQuery({
    queryKey: ["posts", id],
    queryFn: () =>
      fetch(`/api/posts/${id}`).then((res) => res.json()) as Promise<
        Post & { tags: Tag[] }
      >,
  });

  return {
    post: data,
    isPending,
  };
}
