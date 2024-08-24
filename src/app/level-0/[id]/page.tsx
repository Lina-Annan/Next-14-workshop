import SinglePost from "$/lib/components/posts/SinglePost";
import useGetPost from "$/lib/hooks/useGetPost";
import { useParams, useSearchParams } from "next/navigation";

export default function PostPage0() {
  const { id } = useParams();

  if (Array.isArray(id)) return;
  const postId = parseInt(id);
  const { post } = useGetPost({ id: postId });

  if (!post) {
    return <div>No Data</div>;
  }

  return <SinglePost post={post} />;
}
