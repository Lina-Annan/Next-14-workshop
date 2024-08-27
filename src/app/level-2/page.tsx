import PostsContainer from "$/lib/components/posts/PostsContainer";
import PostsHeader from "$/lib/components/posts/PostsHeader";
import PostsProvider from "$/lib/providers/PostsProvider";
import { getPosts } from "$/lib/utils/api";
import { Suspense } from "react";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function Level1PostsPage({ searchParams }: Props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Level1PostsPageInner searchParams={searchParams} />
    </Suspense>
  );
}

async function Level1PostsPageInner({ searchParams }: Props) {
  let search = searchParams?.search;
  if (typeof search !== "string") search = "";

  const postsData = await getPosts({ search, page: 0 });

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <PostsProvider initialData={postsData}>
      <PostsHeader />
      <PostsContainer level={2} />
    </PostsProvider>
  );
}
