import { Task } from '@/src/services/api/tasks';
import { Card } from '@ui-kitten/components';
import { router } from 'expo-router';
import { View } from 'react-native';
import { DsText } from '../../../ui/ds-text';
import { Chip } from './chip';
import { styles } from './styles';

export function CardTask({ task }: { task: Task }) {
  return (
    <Card
      appearance="filled"
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/tasks/[id]',
          params: { id: task.id },
        })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.cardContentTitle}>
          <View style={styles.titleRow}>
            <DsText
              style={styles.title}
              numberOfLines={2}
              ellipsizeMode="middle"
            >
              {task.title}
            </DsText>
            {task.teams.map((team) => (
              <DsText
                style={[styles.subtitle, { color: team.color }]}
                key={team.id}
              >
                {team.name}
              </DsText>
            ))}
          </View>
          <Chip status={task.status} />
        </View>
        <View>
          <DsText>{task.description}</DsText>
        </View>
      </View>
    </Card>
  );
}
