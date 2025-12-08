import { DsDeleteModal } from '@/components/ui/delete-modal';
import { DsText } from '@/components/ui/ds-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DsInputError } from '@/components/ui/input-error';
import DsPainel from '@/components/ui/painel/ds-painel';
import { Input } from '@ui-kitten/components';
import { Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultiSelectTeams from './mult-select-teams';
import { SelectStatus } from './select-status';
import { styles } from './styles';
import { useFormTask } from './useFormTask';

export function FormTaskScreen({ isEdit = false }: { isEdit?: boolean }) {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    mutation,
    mutationDelete,
    isVisibleTeamMultiSelectModal,
    setIsVisibleTeamMultiSelectModal,
    selectStatusItems,
    isVisibleDeleteModal,
    setIsVisibleDeleteModal,
    onDelete,
  } = useFormTask({ isEdit });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <DsPainel
          title={isEdit ? 'Editar tarefa' : 'Nova tarefa'}
          subtitle={
            isEdit
              ? 'Edite o status de uma tarefa'
              : 'Crie novas tarefas para um ou mais times'
          }
          showIconBack
          showIconDelete={isEdit}
          isFilled={false}
          position="flex-end"
          showInput={false}
          iconName="checkmark.square"
          buttonText={isEdit ? 'Salvar' : 'Criar'}
          buttonAction={handleSubmit(onSubmit)}
          isLoading={mutation.isPending}
          setIsVisibleDeleteModal={() => setIsVisibleDeleteModal(true)}
        >
          <View style={styles.inputs}>
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                  maxLength: 150,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Título"
                    placeholderTextColor="#7C7C8A"
                    textStyle={[
                      styles.inputText,
                      isEdit && styles.textDisabled,
                    ]}
                    value={value}
                    style={styles.input}
                    size="large"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    maxLength={150}
                    disabled={isEdit}
                  />
                )}
                name="title"
              />
              {errors.title && <DsInputError text={errors.title.message} />}
            </View>

            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                  minLength: 1,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      styles.inputDescription,
                      isEdit && styles.textDisabled,
                    ]}
                    placeholderTextColor="#7C7C8A"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                    placeholder="Descrição"
                    multiline
                    numberOfLines={5}
                    editable={!isEdit}
                  />
                )}
                name="description"
              />
              {errors.description && (
                <DsInputError text={errors.description.message} />
              )}
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <Pressable
                      disabled={isEdit}
                      onPress={() => setIsVisibleTeamMultiSelectModal(true)}
                    >
                      <View style={styles.rowSelectTeams}>
                        <View style={styles.rowSelectTeamsNames}>
                          {!value.length ? (
                            <DsText style={styles.textDisabled}>
                              Selecione um time
                            </DsText>
                          ) : (
                            <DsText
                              lineBreakMode="tail"
                              numberOfLines={1}
                              style={styles.textDisabled}
                            >
                              {value.map((t) => t.name).join(', ')}
                            </DsText>
                          )}
                        </View>
                        {!isEdit && (
                          <IconSymbol
                            size={20}
                            name="chevron.down"
                            color="#00875F"
                          />
                        )}
                      </View>
                    </Pressable>

                    <MultiSelectTeams
                      visible={isVisibleTeamMultiSelectModal}
                      onClose={() => setIsVisibleTeamMultiSelectModal(false)}
                      onConfirm={(sel) => {
                        onChange(sel);
                      }}
                      initialSelected={value}
                      perPage={10}
                    />
                  </View>
                )}
                name="teams"
              />
              {errors.teams && <DsInputError text={errors.teams.message} />}
            </View>

            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <SelectStatus
                    options={selectStatusItems}
                    onChange={onChange}
                    selected={value}
                  />
                )}
                name="status"
              />
              {errors.status && <DsInputError text={errors.status.message} />}
            </View>
          </View>

          <DsDeleteModal
            isVisible={isVisibleDeleteModal}
            setIsVisible={() => setIsVisibleDeleteModal(false)}
            entityToDelete="tarefa"
            isFemaleEntity
            deleteAction={() => onDelete()}
            isLoading={mutationDelete.isPending}
          />
        </DsPainel>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
