import { DsText } from '@/components/ui/ds-text';
import DsPainel from '@/components/ui/painel/ds-painel';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardTask } from './card-task';
import { styles } from './styles';
import { useTask } from './useTask';

export function TasksScreen() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    tasks,
    navigateToCreateTask,
    refetch,
    isRefetching,
  } = useTask();

  return (
    <SafeAreaView style={styles.container}>
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
          data={tasks}
          renderItem={({ item }) => <CardTask task={item} key={item.id} />}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={() => refetch()}
            />
          }
          onEndReachedThreshold={0.6}
          ListFooterComponent={() =>
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 12 }} />
            ) : null
          }
          ListEmptyComponent={() =>
            status === 'success' && tasks.length === 0 ? (
              <DsText style={styles.emptyValue}>
                Nenhuma tarefa encontrads
              </DsText>
            ) : null
          }
        />
      </DsPainel>
    </SafeAreaView>
  );
}
