import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

type UseEnhancedSearchParamsOptions = {
  routingStrategy: "replace" | "push";
};

export default function useEnhancedSearchParams<
  T extends Record<string, unknown> = Record<string, unknown>
>(options?: UseEnhancedSearchParamsOptions) {
  const { routingStrategy = "replace" } = options || {};

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlers = useMemo(() => {
    const set = (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      const url = `${pathname}?${params.toString()}`;
      router[routingStrategy](url);
    };
    const remove = (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      const url = `${pathname}?${params.toString()}`;
      router[routingStrategy](url);
    };

    return [set, remove] as const;
  }, [pathname, searchParams, routingStrategy, router]);

  return [
    Object.fromEntries(searchParams) as T,
    handlers[0],
    handlers[1],
  ] as const;
}
