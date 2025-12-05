import { TaskStatus, TaskStatusType } from '@/constants/task-status';
import { View } from 'react-native';
import { DsText } from '../../../../ui/ds-text';
import { styles } from './styles';

const labels = {
  [TaskStatus.PENDING]: 'pendente',
  [TaskStatus.IN_PROGRESS]: 'em progresso',
  [TaskStatus.CONCLUDED]: 'concluída',
} as const;

export function Chip({ status }: { status: TaskStatusType }) {
  const chipStyle = [
    styles.chip,
    status === TaskStatus.PENDING && styles.pending,
    status === TaskStatus.IN_PROGRESS && styles.inProgress,
    status === TaskStatus.CONCLUDED && styles.concluded,
  ].filter(Boolean);

  return (
    <View style={chipStyle}>
      <DsText style={styles.text}>{labels[status]}</DsText>
    </View>
  );
}
