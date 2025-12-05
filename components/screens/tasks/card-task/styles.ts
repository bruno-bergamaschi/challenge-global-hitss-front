import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#29292E',
    marginTop: 5,
    marginBottom: 5,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  cardContentTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    flexGrow: 2,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 2,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    fontSize: 10,
  },
  iconTeam: {
    width: 31,
    height: 31,
  },
});
