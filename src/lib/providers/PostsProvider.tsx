"use client";

import { Post, Tag } from "@prisma/client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useInfiniteScrollQuery from "../hooks/useInfiniteScrollQuery";
import useMemoizedDebounce from "../hooks/useMemoizedDebounce";
import useEnhancedSearchParams from "../hooks/useEnhancedSearchParams";
import { GET_POSTS_LIMIT, getPosts } from "../utils/api";

export type PostsContextType = {
  posts: (Post & { tags: Tag[] })[];
  isFetching: boolean;
  search: string;
  handleSetSearch: (text: string) => void;
};

const PostsContext = createContext<PostsContextType | undefined>(undefined);

type Props = {
  initialData?: { posts: (Post & { tags: Tag[] })[]; total: number };
};

export default function PostsProvider({
  initialData,
  children,
}: PropsWithChildren<Props>) {
  const [{ search = "" }, setEnhancedSearchParams] = useEnhancedSearchParams<{
    search?: string;
  }>();

  const debouncedSearch = useMemoizedDebounce(search || "", 500);

  const { data, isFetching } = useInfiniteScrollQuery({
    queryKey: ["posts", debouncedSearch],
    queryFn: async ({ pageParam }) =>
      getPosts({ search: debouncedSearch, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const newSkip = allPages.length * GET_POSTS_LIMIT;
      if (newSkip < lastPage.total) {
        return newSkip;
      }
    },
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [Math.ceil(initialData.total / GET_POSTS_LIMIT)],
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
