import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#29292E',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 5,
    marginBottom: 5,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardContentTeam: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 3,
    gap: 12,
  },
  cardContentTitle: {
    fontSize: 18,
    paddingRight: 50,
  },
  iconTeam: {
    width: 31,
    height: 31,
  },
});
