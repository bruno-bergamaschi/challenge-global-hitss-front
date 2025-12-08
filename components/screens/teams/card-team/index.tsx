import { AppContext } from '@/app/(tabs)/_layout';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { TeamEntitySchema } from '@/schemas/team.schema';
import { Card } from '@ui-kitten/components';
import { router } from 'expo-router';
import { useContext } from 'react';
import { View } from 'react-native';
import { DsText } from '../../../ui/ds-text';
import { styles } from './styles';

export function CardTeam({ team }: { team: TeamEntitySchema }) {
  const { setTeamId } = useContext(AppContext);

  const navigateToTasks = () => {
    setTeamId(team.id);

    router.push('/(tabs)/tasks');
  };

  return (
    <Card appearance="filled" style={styles.card} onPress={navigateToTasks}>
      <View style={styles.cardContent}>
        <View style={styles.cardContentTeam}>
          <IconSymbol size={33} name="person.2.fill" color={team.color} />
          <DsText
            style={styles.cardContentTitle}
            numberOfLines={2}
            ellipsizeMode="middle"
          >
            {team.name}
          </DsText>
        </View>
        <IconSymbol size={18} name="chevron.forward" color="#FFFFFF" />
      </View>
    </Card>
  );
}
