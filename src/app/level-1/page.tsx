"use client";

import Header from "$/lib/components/Header";
import { PostCard } from "$/lib/components/posts/PostCard";
import PostCardSkeleton from "$/lib/components/posts/PostCardSkeleton";
import useInfinitePostsScrollQuery from "$/lib/hooks/useInfinitePostsScrollQuery";
import Link from "next/link";

export default function Level1PostsPage() {
  const { posts, isFetching, handleSetSearchText } =
    useInfinitePostsScrollQuery();

  if (!posts.length && !isFetching) {
    return <div>No data</div>;
  }

  return (
    <>
      <Header handleSetSearchText={handleSetSearchText} />

      <nav>
        <Link href="/new-post">Open modal</Link>
      </nav>

      <div className="grid grid-cols-4 gap-3 p-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} level={1} />
        ))}
        {isFetching &&
          Array.from({
            length: posts.length ? (posts.length % 4) + 4 : 12,
          }).map((_, index) => <PostCardSkeleton key={index} />)}
      </div>
    </>
  );
}
