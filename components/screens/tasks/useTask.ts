import { AppContext } from '@/app/(tabs)/_layout';
import { getAllTasks } from '@/src/services/api/tasks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useContext, useState } from 'react';

export function useTask() {
  const [perPage, setPerPage] = useState(10);
  const { teamId } = useContext(AppContext);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['tasks', perPage, teamId],
    queryFn: ({ pageParam }) => {
      return getAllTasks({ pageParam, perPage, teamId });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.reduce((sum, p) => sum + p.results.length, 0);

      if (fetched < lastPage.totalCount) {
        return allPages.length + 1;
      }
      return undefined;
    },
    refetchInterval: false,
  });

  const navigateToCreateTask = () => {
    router.push('/teams/create');
  };

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    data,
    error,
    perPage,
    setPerPage,
    navigateToCreateTask,
  };
}
