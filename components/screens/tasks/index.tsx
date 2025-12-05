import { DsText } from '@/components/ui/ds-text';
import DsPainel from '@/components/ui/painel/ds-painel';
import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { CardTask } from './card-task';
import { useTask } from './useTask';

export function TasksScreen() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    data,
    navigateToCreateTask,
  } = useTask();

  const teams = useMemo(
    () => (data ? data.pages.flatMap((p) => p.results) : []),
    [data],
  );

  return (
    <DsPainel
      title="Tarefas"
      subtitle="Adicione a galera e separe os times"
      showInput={false}
      inputPlaceholder="Busque um time"
      buttonAction={navigateToCreateTask}
      buttonText="Criar tarefa"
    >
      {status === 'pending' && <ActivityIndicator />}

      <FlatList
        data={teams}
        renderItem={({ item }) => <CardTask task={item} key={item.id} />}
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
