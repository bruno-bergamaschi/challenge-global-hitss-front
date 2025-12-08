import { DsText } from '@/components/ui/ds-text';
import DsPainel from '@/components/ui/painel/ds-painel';
import React from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardTeam } from './card-team';
import { styles } from './styles';
import { useTeams } from './useTeams';

export function TeamsScreen() {
  const {
    handleSubmitSearch,
    setInputValue,
    inputValue,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    teams,
    navigateToCreateTeam,
    refetch,
    isRefetching,
  } = useTeams();

  return (
    <SafeAreaView style={styles.container}>
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
            status === 'success' && teams.length === 0 ? (
              <DsText style={styles.emptyValue}>Nenhum time encontrado</DsText>
            ) : null
          }
        />
      </DsPainel>
    </SafeAreaView>
  );
}
