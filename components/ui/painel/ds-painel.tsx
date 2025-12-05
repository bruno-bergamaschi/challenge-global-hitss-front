import { DsText } from '@/components/ui/ds-text';
import { Button, Input } from '@ui-kitten/components';
import { router } from 'expo-router';
import React, { Dispatch, ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '../icon-symbol';
import { styles } from './styles';

interface IDsPainel {
  showIconBack?: boolean;
  title?: string;
  subtitle?: string;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  setInputValue?: Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
  handleSubmitSearch?: () => void;
  buttonText?: string;
  buttonAction?: () => void;
}

export default function DsPainel({
  showIconBack = false,
  title,
  subtitle,
  showInput = true,
  inputPlaceholder,
  inputValue,
  setInputValue,
  handleSubmitSearch,
  children,
  buttonText,
  buttonAction,
}: IDsPainel) {
  return (
    <SafeAreaView style={styles.container}>
      {showIconBack && (
        <TouchableWithoutFeedback
          onPress={() => router.back()}
          accessible={false}
        >
          <IconSymbol size={28} name="arrow.backward" color="#00875F" />
        </TouchableWithoutFeedback>
      )}

      <View style={styles.titleContainer}>
        <DsText style={styles.title}>{title}</DsText>
        <DsText style={styles.subtitle}>{subtitle}</DsText>
      </View>

      {showInput && (
        <Input
          style={styles.input}
          textStyle={styles.inputText}
          placeholder={inputPlaceholder}
          value={inputValue}
          size="large"
          accessoryRight={
            <IconSymbol size={28} name="magnifyingglass" color="#00875F" />
          }
          returnKeyType="search"
          onChangeText={setInputValue}
          onSubmitEditing={handleSubmitSearch}
        />
      )}

      <View style={styles.childrenContainer}>{children}</View>

      <Button
        style={styles.button}
        size="giant"
        appearance="filled"
        status="success"
        onPress={buttonAction}
      >
        <DsText>{buttonText}</DsText>
      </Button>
    </SafeAreaView>
  );
}
