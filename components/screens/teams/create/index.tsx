import { IconSymbol } from '@/components/ui/icon-symbol';
import { DsInputError } from '@/components/ui/input-error';
import DsPainel from '@/components/ui/painel/ds-painel';
import { Input } from '@ui-kitten/components';
import { Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorPickerModal } from './color-picker';
import { styles } from './styles';
import { useCreateTeam } from './useCreateTeam';

export default function CreateTeamScreen() {
  const {
    control,
    errors,
    handleSubmit,
    onSubmit,
    mutation,
    isVisibileColorPickerModal,
    setIsVisibleColorPickerModal,
  } = useCreateTeam();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <DsPainel
          title="Novo Time"
          subtitle="Crie seu time para gerenciar as tarefas"
          showIconBack
          isFilled={false}
          showInput={false}
          iconName="person.2"
          buttonText="Criar"
          buttonAction={handleSubmit(onSubmit)}
          isLoading={mutation.isPending}
          position="center"
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
                    placeholder="Nome do time"
                    placeholderTextColor="#7C7C8A"
                    textStyle={styles.inputText}
                    value={value}
                    style={styles.input}
                    size="large"
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                )}
                name="name"
              />
              {errors.name && <DsInputError text={errors.name.message} />}
            </View>

            <View>
              <Controller
                control={control}
                rules={{
                  required: true,

                  minLength: 1,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <>
                    <Input
                      placeholder="Cor do time"
                      placeholderTextColor="#7C7C8A"
                      textStyle={styles.inputText}
                      value={value}
                      style={styles.input}
                      size="large"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      accessoryRight={
                        <Pressable
                          onPress={() => setIsVisibleColorPickerModal(true)}
                        >
                          <IconSymbol
                            size={28}
                            name="circle.fill"
                            color={value || '#E7F635'}
                          />
                        </Pressable>
                      }
                    />

                    <ColorPickerModal
                      color={value}
                      onChangeColor={onChange}
                      isVisible={isVisibileColorPickerModal}
                      setIsVisible={setIsVisibleColorPickerModal}
                    />
                  </>
                )}
                name="color"
              />
              {errors.color && <DsInputError text={errors.color.message} />}
            </View>
          </View>
        </DsPainel>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
