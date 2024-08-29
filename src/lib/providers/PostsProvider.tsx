"use client";

import {
  createContext,
  PropsWithChildren,
  Suspense,
  useContext,
  useMemo,
} from "react";
import useEnhancedSearchParams from "../hooks/useEnhancedSearchParams";
import useInfiniteScrollQuery from "../hooks/useInfiniteScrollQuery";
import useMemoizedDebounce from "../hooks/useMemoizedDebounce";
import { getPosts, PostWithTags } from "../utils/api";

export type PostsContextType = {
  posts: PostWithTags[];
  isFetching: boolean;
  search: string;
  handleSetSearch: (text: string) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

type Props = {
  initialData?: { posts: PostWithTags[]; total: number };
};

export default function PostsProvider({
  initialData,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Suspense>
      <PostsProviderInner initialData={initialData}>
        {children}
      </PostsProviderInner>
    </Suspense>
  );
}

function PostsProviderInner({
  initialData,
  children,
}: PropsWithChildren<Props>) {
  const [{ search = "" }, setEnhancedSearchParams] = useEnhancedSearchParams<{
    search?: string;
  }>();

  const debouncedSearch = useMemoizedDebounce(search || "", 500);

  const { data, isFetching } = useInfiniteScrollQuery({
    queryKey: ["posts", { search: debouncedSearch }],
    queryFn: async ({ pageParam }) =>
      getPosts({ search: debouncedSearch, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalPostsCount = lastPage.total;
      const currentPostsCount = allPages.reduce(
        (acc, page) => acc + page.posts.length,
        0
      );
      const newPage = allPages.length;

      if (totalPostsCount > currentPostsCount) {
        return newPage;
      }
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [0],
        }
      : undefined,
  });

  const posts = useMemo(
    () => data?.pages.flatMap((page) => page.posts) ?? [],
    [data?.pages]
  );

  return (
    <PostsContext.Provider
      value={{
        posts,
        isFetching,
        search: search,
        handleSetSearch: (text) => setEnhancedSearchParams("search", text),
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostsProvider");
  }
  return context;
}
