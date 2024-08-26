"use client";

import SinglePost from "$/lib/components/posts/SinglePost";
import SinglePostSkeleton from "$/lib/components/posts/SinglePostSkeleton";
import useGetPost from "$/lib/hooks/useGetPost";
import { useParams } from "next/navigation";

export default function PostPage0() {
  const { id } = useParams();

  if (Array.isArray(id)) return <div>Invalid ID</div>;

  const idNumber = parseInt(id);

  if (Number.isNaN(idNumber)) {
    return <div>Invalid ID</div>;
  }

  return <PostPage0Inner id={idNumber} />;
}

function PostPage0Inner({ id }: { id: number }) {
  const { post, isPending } = useGetPost({ id });

  if (isPending) {
    return <SinglePostSkeleton />;
  }

  if (!post) {
    return <div>No Data</div>;
  }

  return <SinglePost post={post} />;
}
