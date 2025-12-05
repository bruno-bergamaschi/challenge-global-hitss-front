import { TeamsScreen } from '@/components/screens/teams';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TeamsPage() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TeamsScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
