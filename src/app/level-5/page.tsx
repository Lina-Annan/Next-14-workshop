import PostsContainer from "$/lib/components/posts/PostsContainer";
import PostsHeader from "$/lib/components/posts/PostsHeader";
import PostsProvider from "$/lib/providers/PostsProvider";
import { getPosts, PostWithTags } from "$/lib/utils/api";
import {
  dehydrate,
  HydrationBoundary,
  InfiniteData,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const fetchCache = "force-cache";
export const revalidate = 300;

export default async function Level5PostsPage({ searchParams }: Props) {
  let search = searchParams?.search;
  if (typeof search !== "string") search = "";

  const queryClient = new QueryClient();
  const queryKey = ["posts", { search }];

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getPosts({ search, page: pageParam }),
    initialPageParam: 0,
  });

  const secondPageData = await getPosts({ search, page: 1 });

  queryClient.setQueryData<
    InfiniteData<
      {
        posts: PostWithTags[];
        total: number;
      },
      number
    >
  >(queryKey, (oldData) => {
    if (!oldData) return oldData;

    return {
      pages: [...oldData.pages, secondPageData],
      pageParams: [...oldData.pageParams, oldData.pageParams.length],
    };
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsProvider>
        <PostsHeader />
        <PostsContainer level={5} />
      </PostsProvider>
    </HydrationBoundary>
  );
}
