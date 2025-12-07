import { Button, Divider, Spinner } from '@ui-kitten/components';
import { View } from 'react-native';
import { DsText } from '../ds-text';
import { IconSymbol } from '../icon-symbol';
import { DsModal } from '../modal/ds-modal';
import { styles } from './styles';

interface IDsDeleteModal {
  isVisible: boolean;
  setIsVisible: () => void;
  entityToDelete?: string;
  isFemaleEntity?: boolean;
  deleteAction?: () => void;
  isLoading: boolean;
}

export function DsDeleteModal({
  isVisible,
  setIsVisible,
  deleteAction,
  entityToDelete,
  isFemaleEntity,
  isLoading = false,
}: IDsDeleteModal) {
  return (
    <DsModal
      isVisible={isVisible}
      onclose={setIsVisible}
      isFilled={false}
      animation="fade"
    >
      <View style={styles.rowDelete}>
        <View style={styles.rowDeleteTitle}>
          <IconSymbol size={28} name="trash" color="#FF3D71" />
          <DsText style={styles.deleteTitle}>Excluir</DsText>
        </View>

        <Divider />

        <View style={styles.rowDeleteContent}>
          <DsText style={styles.deleteText}>
            Tem certeza que deseja excluir {isFemaleEntity ? 'a' : 'o'}{' '}
            {entityToDelete}?
          </DsText>
        </View>

        <Divider />

        <View style={styles.deleteActions}>
          <Button appearance="ghost" status="basic" onPress={setIsVisible}>
            <DsText>Cancelar</DsText>
          </Button>
          <Button
            status="danger"
            style={styles.deleteButtonConfirm}
            onPress={deleteAction}
          >
            {isLoading ? (
              <View style={styles.indicator}>
                <Spinner size="small" status="basic" />
              </View>
            ) : (
              <DsText>Deletar</DsText>
            )}
          </Button>
        </View>
      </View>
    </DsModal>
  );
}
