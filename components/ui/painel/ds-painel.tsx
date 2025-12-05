import { DsText } from '@/components/ui/ds-text';
import { Button, Icon, Input } from '@ui-kitten/components';
import { router } from 'expo-router';
import React, { Dispatch, ReactNode } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          <Icon
            name="arrow-ios-back-outline"
            style={styles.iconBack}
            fill="#00875F"
          />
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
            <Icon
              name="search-outline"
              style={styles.inputIcon}
              fill="#00875F"
            />
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
