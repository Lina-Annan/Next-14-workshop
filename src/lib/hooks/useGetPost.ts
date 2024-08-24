import { useQuery } from "@tanstack/react-query";
import { getPost } from "../api/post";

type Props = {
  id: number;
};

export default function useGetPost({ id }: Props) {
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPost(id),
  });

  return {
    post: data,
    isPending,
  };
}
