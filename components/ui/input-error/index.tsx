import { DsText } from '../ds-text';
import { styles } from './styles';

interface IDsInputError {
  text?: string;
}

export function DsInputError({ text }: IDsInputError) {
  return <DsText style={styles.text}>{text}</DsText>;
}
