"use client";

import { Post, Tag } from "@prisma/client";
import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import useInfiniteScrollQuery from "../hooks/useInfiniteScrollQuery";
import useMemoizedDebounce from "../hooks/useMemoizedDebounce";
import useEnhancedSearchParams from "../hooks/useEnhancedSearchParams";

export type PostsContextType = {
  posts: (Post & { tags: Tag[] })[];
  isFetching: boolean;
  search: string;
  handleSetSearch: (text: string) => void;
};

const GET_POSTS_LIMIT = 10;

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export default function PostsProvider({ children }: PropsWithChildren) {
  const [{ search = "" }, setEnhancedSearchParams] = useEnhancedSearchParams<{
    search?: string;
  }>();

  const debouncedSearch = useMemoizedDebounce(search || "", 500);

  const { data, isFetching } = useInfiniteScrollQuery({
    queryKey: ["posts", debouncedSearch],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams();
      searchParams.append("limit", GET_POSTS_LIMIT.toString());
      searchParams.append("skip", (pageParam ?? 0).toString());

      if (debouncedSearch) {
        searchParams.append("search", debouncedSearch);
      }

      const url = `/api/posts?${searchParams.toString()}`;

      const res = await fetch(url);
      const data = (await res.json()) as {
        posts: (Post & { tags: Tag[] })[];
        total: number;
      };

      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const newSkip = allPages.length * GET_POSTS_LIMIT;
      if (newSkip < lastPage.total) {
        return newSkip;
      }
    },
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
