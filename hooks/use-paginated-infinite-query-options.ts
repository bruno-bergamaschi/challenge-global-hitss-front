import { useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface PaginatedResponse<T> {
  results: T[];
  totalCount: number;
}

export interface UsePaginatedInfiniteQueryOptions<T, Params> {
  queryKey: any[];
  fetchFn: (
    args: Params & { pageParam: number },
  ) => Promise<PaginatedResponse<T>>;
  params?: Params;
  perPage?: number;
  enabled?: boolean;
  staleTime?: number;
}

export function usePaginatedInfiniteQuery<
  T,
  Params extends Record<string, any>,
>({
  queryKey,
  fetchFn,
  params = {} as Params,
  perPage = 10,
  staleTime = 1000 * 60 * 2,
  enabled = true,
}: UsePaginatedInfiniteQueryOptions<T, Params>) {
  const query = useInfiniteQuery({
    queryKey: [...queryKey, perPage, params],
    enabled,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchFn({
        ...(params as Params),
        pageParam,
        perPage,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.reduce((sum, p) => sum + p.results.length, 0);

      if (fetched < lastPage.totalCount) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });

  const items = useMemo(() => {
    return query.data?.pages.flatMap((p) => p.results) ?? ([] as T[]);
  }, [query.data]);

  return {
    ...query,
    items,
  };
}
