import { useCallback, useState } from "react";
import { getPosts } from "../api/posts";
import useInfiniteScrollQuery from "./useInfiniteScrollQuery";
import useMemoizedDebounce from "./useMemoizedDebounce";

export const GET_POSTS_LIMIT = 10;

export default function useInfinitePostsScrollQuery() {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useMemoizedDebounce(searchText, 500);

  const handleSetSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const { data, isFetching, isPending } = useInfiniteScrollQuery({
    queryKey: ["posts", debouncedSearchText],
    queryFn: ({ pageParam }) =>
      getPosts({
        skip: pageParam,
        limit: GET_POSTS_LIMIT,
        searchText: debouncedSearchText,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const newSkip = allPages.length * GET_POSTS_LIMIT;
      if (newSkip < lastPage.total) {
        return newSkip;
      }
    },
  });

  return {
    data,
    posts: data?.pages.flatMap((page) => page.posts) ?? [],
    isFetching,
    searchText,
    isPending,
    handleSetSearchText,
  };
}
