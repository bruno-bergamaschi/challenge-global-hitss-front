import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  chip: {
    borderCurve: 'circular',
    borderRadius: 50,
    padding: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    fontWeight: 700,
    fontSize: 10,
  },
  pending: {
    backgroundColor: '#980000',
  },
  inProgress: {
    backgroundColor: '#986E00',
  },
  concluded: {
    backgroundColor: '#689800',
  },
});
