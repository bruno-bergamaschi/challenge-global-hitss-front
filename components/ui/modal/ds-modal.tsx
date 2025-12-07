import { ReactNode } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

interface IDsModal {
  children: ReactNode;
  isVisible: boolean;
  onclose: () => void;
  isFilled?: boolean;
  height?: number;
  width?: number;
  animation?: 'fade' | 'slide';
}

export function DsModal({
  isVisible,
  onclose,
  children,
  isFilled = true,
  height = 200,
  width,
  animation = 'slide',
}: IDsModal) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animation}
      onRequestClose={onclose}
    >
      <SafeAreaView
        style={[isFilled ? styles.containerFilled : styles.container]}
      >
        <Pressable style={styles.backdrop} onPress={onclose} />
        <View
          style={[
            isFilled ? styles.contentFilled : styles.content,
            !isFilled && {
              height,
              width: width || '100%',
            },
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
