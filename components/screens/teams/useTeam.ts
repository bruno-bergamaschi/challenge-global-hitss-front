import { getAllTeams } from '@/src/services/api/teams';
import { useInfiniteQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

export function useTeam() {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['teams', perPage, search],
    queryFn: ({ pageParam }) => getAllTeams({ pageParam, perPage, search }),
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
    data,
    error,
    perPage,
    setPerPage,
    setSearch,
    navigateToCreateTeam,
  };
}
