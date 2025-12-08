import { usePaginatedInfiniteQuery } from '@/hooks/use-paginated-infinite-query-options';
import { getAllTeams, Team } from '@/src/services/api/teams';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

export function useTeams() {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);

  const {
    items: teams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
    isRefetching,
  } = usePaginatedInfiniteQuery<Team, { search?: string }>({
    queryKey: ['teams'],
    fetchFn: getAllTeams,
    params: { search },
    perPage,
  });

  const handleSubmitSearch = useCallback(() => {
    setSearch(inputValue.trim());
  }, [inputValue, setSearch]);

  const navigateToCreateTeam = () => {
    router.push('/teams/create');
  };

  return {
    inputValue,
    setInputValue,
    handleSubmitSearch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    teams,
    perPage,
    setPerPage,
    setSearch,
    navigateToCreateTeam,
    refetch,
    isRefetching,
  };
}
