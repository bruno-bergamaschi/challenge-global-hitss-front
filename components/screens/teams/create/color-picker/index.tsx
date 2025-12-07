import { DsText } from '@/components/ui/ds-text';
import { Button, Modal } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { styles } from './styles';

interface IColorPickerModal {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  color: string;
  onChangeColor: (value: string) => void;
}

export const ColorPickerModal = ({
  isVisible,
  setIsVisible,
  color,
  onChangeColor,
}: IColorPickerModal) => {
  const [selectedColor, setSelectedColor] = useState('#E7F635');

  function hideModal() {
    setIsVisible(false);
  }

  function selectColor() {
    onChangeColor(selectedColor.toUpperCase());
    hideModal();
  }

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      animationType="fade"
    >
      <View style={styles.container}>
        <ColorPicker
          color={color}
          thumbSize={20}
          sliderSize={30}
          row={false}
          noSnap={false}
          onColorChange={(color) => setSelectedColor(color)}
        />

        <Button
          style={styles.button}
          size="giant"
          appearance="filled"
          status="success"
          onPress={selectColor}
        >
          <DsText>Confirmar</DsText>
        </Button>
      </View>
    </Modal>
  );
};
