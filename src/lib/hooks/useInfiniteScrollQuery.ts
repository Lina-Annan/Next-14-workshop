import {
  type DefaultError,
  type InfiniteData,
  type QueryKey,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import { useEffect } from "react";

type UseInfiniteScrollQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
> = UseInfiniteQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryFnData,
  TQueryKey,
  TPageParam
> & {
  threshold?: number;
  disableScroll?: boolean;
};

export default function <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown
>(
  options: UseInfiniteScrollQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TPageParam
  >
) {
  const infiniteQueryResult = useInfiniteQuery(options);

  useEffect(() => {
    let isFetching = false;

    const onScrollHelper = async () => {
      if (
        options.disableScroll ||
        isFetching ||
        !infiniteQueryResult.hasNextPage
      )
        return;

      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      const threshold = options.threshold ?? window.innerHeight * 2;

      if (scrollHeight - scrollTop - clientHeight < threshold) {
        isFetching = true;
        await infiniteQueryResult.fetchNextPage();
        isFetching = false;
      }
    };

    const onScroll = () => {
      onScrollHelper();
    };

    document.addEventListener("scroll", onScroll);
    document.addEventListener("touchmove", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
      document.removeEventListener("touchmove", onScroll);
    };
  }, [
    options.disableScroll,
    options.threshold,
    infiniteQueryResult.hasNextPage,
    infiniteQueryResult.fetchNextPage,
  ]);

  return infiniteQueryResult;
}
