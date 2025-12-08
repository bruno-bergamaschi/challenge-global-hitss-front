import { DsText } from '@/components/ui/ds-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DsModal } from '@/components/ui/modal/ds-modal';
import { TeamEntitySchema } from '@/schemas/team.schema';
import { Button, Input } from '@ui-kitten/components';
import React from 'react';
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import { styles } from './styles';
import {
  TeamsMultiSelectProps,
  useTeamsMultSelect,
} from './useTeamsMultSelect';

export default function MultiSelectTeams(props: TeamsMultiSelectProps) {
  const {
    inputValue,
    setInputValue,
    handleSubmitSearch,
    selected,
    toggleSelect,
    confirm,
    teams,
    handleEndReached,
    isFetchingNextPage,
    status,
    onClose,
    visible,
  } = useTeamsMultSelect(props);

  function renderRow({ item }: { item: TeamEntitySchema }) {
    const checked = Boolean(selected.find((s) => s.id === item.id));
    return (
      <Pressable style={styles.row} onPress={() => toggleSelect(item)}>
        <View style={styles.teamDataRow}>
          <View style={[styles.colorDot, { backgroundColor: item.color }]} />
          <DsText style={styles.rowText}>{item.name}</DsText>
        </View>
        <DsText style={styles.check}>
          {checked ? (
            <IconSymbol name="checkmark" size={15} color="#ffffff" />
          ) : (
            ''
          )}
        </DsText>
      </Pressable>
    );
  }

  return (
    <DsModal isVisible={visible} onclose={onClose} animation="slide">
      <View style={styles.container}>
        <View style={styles.header}>
          <Input
            style={styles.input}
            placeholderTextColor="#7C7C8A"
            textStyle={styles.inputText}
            placeholder="Busque um time"
            value={inputValue}
            size="medium"
            accessoryRight={
              <IconSymbol size={28} name="magnifyingglass" color="#00875F" />
            }
            returnKeyType="search"
            onChangeText={setInputValue}
            onSubmitEditing={handleSubmitSearch}
          />
        </View>

        {status === 'pending' ? (
          <ActivityIndicator style={styles.activityIndicator} />
        ) : status === 'error' ? (
          <View style={styles.rowError}>
            <DsText>Erro ao buscar times</DsText>
          </View>
        ) : (
          <FlatList
            data={teams}
            renderItem={renderRow}
            keyExtractor={(team) => String(team.id)}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.6}
            ListFooterComponent={() =>
              isFetchingNextPage ? (
                <ActivityIndicator style={styles.flatListActivityIndicator} />
              ) : null
            }
            ListEmptyComponent={() =>
              status === 'success' && teams.length === 0 ? (
                <View style={styles.rowEmpty}>
                  <DsText>Nenhum time encontrado</DsText>
                </View>
              ) : null
            }
          />
        )}

        <View style={styles.actions}>
          <Button appearance="ghost" status="basic" onPress={onClose}>
            <DsText>Cancelar</DsText>
          </Button>

          <Button style={styles.confirmButton} onPress={confirm}>
            <DsText style={styles.confirmText}>
              Confirmar ({selected.length})
            </DsText>
          </Button>
        </View>
      </View>
    </DsModal>
  );
}
