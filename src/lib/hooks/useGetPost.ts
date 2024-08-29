import { useQuery } from "@tanstack/react-query";
import { Post, Tag } from "@prisma/client";
import { getPost } from "../utils/api";

type Props = {
  id: number;
};

export default function useGetPost({ id }: Props) {
  const { data, isPending } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  });

  return {
    post: data,
    isPending,
  };
}
