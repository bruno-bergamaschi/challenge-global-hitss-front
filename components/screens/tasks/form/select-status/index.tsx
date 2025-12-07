import { DsText } from '@/components/ui/ds-text';
import { Pressable, View } from 'react-native';
import { styles } from './styles';

type Option = {
  label: string;
  value: string;
};

interface ISelectStatus {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

export function SelectStatus({ options, selected, onChange }: ISelectStatus) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <Pressable key={option.value} onPress={() => onChange(option.value)}>
          <View
            style={[
              styles.options,
              selected !== option.value && styles.unselected,
              selected === option.value && styles.selected,
            ]}
          >
            <DsText>{option.label}</DsText>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
