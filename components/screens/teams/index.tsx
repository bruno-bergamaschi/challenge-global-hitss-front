import { DsText } from '@/components/ui/ds-text';
import DsPainel from '@/components/ui/painel/ds-painel';
import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { CardTeam } from './card-team';
import { useTeam } from './useTeam';

export function TeamsScreen() {
  const {
    handleSubmitSearch,
    setInputValue,
    inputValue,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    data,
    navigateToCreateTeam,
  } = useTeam();

  const teams = useMemo(
    () => (data ? data.pages.flatMap((p) => p.results) : []),
    [data],
  );

  return (
    <DsPainel
      title="Times"
      subtitle="Acesse um dos times"
      inputPlaceholder="Busque um time"
      setInputValue={setInputValue}
      inputValue={inputValue}
      buttonAction={navigateToCreateTeam}
      buttonText="Criar time"
      handleSubmitSearch={handleSubmitSearch}
    >
      {status === 'pending' && <ActivityIndicator />}

      <FlatList
        data={teams}
        renderItem={({ item }) => <CardTeam team={item} key={item.id} />}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.6}
        ListFooterComponent={() =>
          isFetchingNextPage ? (
            <ActivityIndicator style={{ marginVertical: 12 }} />
          ) : null
        }
        ListEmptyComponent={() =>
          status === 'success' && teams.length === 0 ? (
            <DsText>Nenhum time encontrado</DsText>
          ) : null
        }
      />
    </DsPainel>
  );
}
