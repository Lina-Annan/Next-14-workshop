import PostsContainer from "$/lib/components/posts/PostsContainer";
import PostsHeader from "$/lib/components/posts/PostsHeader";
import PostsProvider from "$/lib/providers/PostsProvider";
import { getPosts } from "$/lib/utils/api";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function Level1PostsPage({ searchParams }: Props) {
  let search = searchParams?.search;
  if (typeof search !== "string") search = "";

  const posts = await getPosts({ search, page: 0 });

  return (
    <PostsProvider>
      <PostsHeader />
      <PostsContainer />
    </PostsProvider>
  );
}
