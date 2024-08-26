"use client";

import { PostCard } from "$/lib/components/posts/PostCard";
import PostCardSkeleton from "$/lib/components/posts/PostCardSkeleton";
import { usePosts } from "$/lib/providers/PostsProvider";
import NoPosts from "./NoPosts";

export default function PostsContainer() {
  const { posts, isFetching } = usePosts();

  if (!posts.length && !isFetching) {
    return <NoPosts />;
  }

  return (
    <div className="grid grid-cols-4 gap-3 p-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} level={0} />
      ))}
      {isFetching &&
        Array.from({
          length: posts.length ? (posts.length % 4) + 4 : 12,
        }).map((_, index) => <PostCardSkeleton key={index} />)}
    </div>
  );
}
