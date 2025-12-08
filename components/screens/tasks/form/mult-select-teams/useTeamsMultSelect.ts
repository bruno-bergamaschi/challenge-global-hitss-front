import { usePaginatedInfiniteQuery } from '@/hooks/use-paginated-infinite-query-options';
import { TeamEntitySchema } from '@/schemas/team.schema';
import { getAllTeams } from '@/src/services/api/teams';
import { useCallback, useEffect, useState } from 'react';

export type TeamsMultiSelectProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selected: TeamEntitySchema[]) => void;
  initialSelected?: TeamEntitySchema[];
  perPage?: number;
};

export function useTeamsMultSelect({
  visible,
  onClose,
  onConfirm,
  initialSelected = [],
  perPage = 10,
}: TeamsMultiSelectProps) {
  const [inputValue, setInputValue] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<TeamEntitySchema[]>(initialSelected);

  useEffect(() => {
    if (!visible) {
      return;
    }

    setSearch('');
    setSelected(initialSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSubmitSearch = useCallback(() => {
    setSearch(inputValue.trim());
  }, [inputValue, setSearch]);

  const {
    items: teams,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = usePaginatedInfiniteQuery<TeamEntitySchema, { search?: string }>({
    queryKey: ['teams'],
    fetchFn: getAllTeams,
    params: { search },
    perPage,
  });

  function toggleSelect(item: TeamEntitySchema) {
    setSelected((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) return prev.filter((p) => p.id !== item.id);
      return [...prev, item];
    });
  }

  function handleEndReached() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  function confirm() {
    onConfirm(selected);
    onClose();
  }

  return {
    inputValue,
    setInputValue,
    handleSubmitSearch,
    selected,
    toggleSelect,
    search,
    setSearch,
    confirm,
    teams,
    handleEndReached,
    isFetchingNextPage,
    status,
    onClose,
    visible,
  };
}
