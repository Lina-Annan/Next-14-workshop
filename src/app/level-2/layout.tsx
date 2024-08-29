import PostCardSkeleton from "$/lib/components/posts/PostCardSkeleton";
import { PropsWithChildren, Suspense } from "react";

export default function Level2Layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<Level2LayoutLoading />}>{children}</Suspense>;
}

function Level2LayoutLoading() {
  return (
    <div>
      <header className="sticky top-0 left-0 right-0 flex bg-background py-4 px-20 mt-6 mb-2 justify-between duration-150 rounded-b-lg z-10 bg-slate-300 animate-pulse h-16 mx-20"></header>
      <div className="grid grid-cols-4 gap-3 p-8">
        {Array.from({
          length: 12,
        }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
