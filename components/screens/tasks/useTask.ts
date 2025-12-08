import { AppContext } from '@/app/(tabs)/_layout';
import { usePaginatedInfiniteQuery } from '@/hooks/use-paginated-infinite-query-options';
import { TaskEntitySchema } from '@/schemas/task.schema';
import { getAllTasks } from '@/src/services/api/tasks';
import { router } from 'expo-router';
import { useContext, useState } from 'react';

export function useTask() {
  const [perPage, setPerPage] = useState(10);
  const { teamId } = useContext(AppContext);

  const {
    items: tasks,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = usePaginatedInfiniteQuery<TaskEntitySchema, { teamId?: number | null }>({
    queryKey: ['tasks'],
    fetchFn: getAllTasks,
    params: { teamId },
    perPage,
  });

  const navigateToCreateTask = () => {
    router.push('/tasks/create');
  };

  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    tasks,
    perPage,
    setPerPage,
    navigateToCreateTask,
    refetch,
    isRefetching,
  };
}
