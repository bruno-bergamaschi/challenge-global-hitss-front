import { DsText } from '@/components/ui/ds-text';
import { Button, Input, Spinner } from '@ui-kitten/components';
import { router } from 'expo-router';
import React, { Dispatch, ReactNode } from 'react';
import { ImageProps, Pressable, View } from 'react-native';
import { IconSymbol, IconSymbolName } from '../icon-symbol';
import { styles } from './styles';

interface IDsPainel {
  showIconBack?: boolean;
  showIconDelete?: boolean;
  iconName?: IconSymbolName;
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
  isFilled?: boolean;
  isLoading?: boolean;
  position?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  setIsVisibleDeleteModal?: () => void;
}

const LoadingIndicator = (props?: ImageProps): React.ReactElement => (
  <View style={[props?.style, styles.indicator]}>
    <Spinner size="small" status="basic" />
  </View>
);

export default function DsPainel({
  showIconBack = false,
  showIconDelete = false,
  iconName,
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
  isFilled = true,
  isLoading = false,
  position = 'space-between',
  setIsVisibleDeleteModal = () => {},
}: IDsPainel) {
  return (
    <View style={styles.container}>
      <View style={styles.rowIconActions}>
        {showIconBack && (
          <Pressable onPress={() => router.back()}>
            <IconSymbol size={28} name="arrow.backward" color="#00875F" />
          </Pressable>
        )}

        {showIconDelete && (
          <Pressable onPress={setIsVisibleDeleteModal}>
            <IconSymbol size={28} name="trash" color="#00875F" />
          </Pressable>
        )}
      </View>

      <View style={[styles.content, { justifyContent: position }]}>
        {iconName && (
          <View style={styles.iconRow}>
            <IconSymbol size={70} name={iconName} color="#00875F" />
          </View>
        )}

        <View
          style={
            iconName ? styles.titleContainerWithIcon : styles.titleContainer
          }
        >
          <DsText style={styles.title}>{title}</DsText>
          <DsText style={styles.subtitle}>{subtitle}</DsText>
        </View>

        {showInput && (
          <Input
            style={styles.input}
            placeholderTextColor="#7C7C8A"
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

        <View style={isFilled && styles.childrenContainer}>{children}</View>

        <Button
          style={styles.button}
          size="giant"
          appearance="filled"
          status="success"
          disabled={isLoading}
          onPress={buttonAction}
        >
          {isLoading ? LoadingIndicator : <DsText>{buttonText}</DsText>}
        </Button>
      </View>
    </View>
  );
}
