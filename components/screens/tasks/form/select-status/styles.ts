import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  options: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#121214',
    padding: 8,
    borderRadius: 3,
  },
  selected: {
    borderColor: '#00875F',
    borderWidth: 2,
  },
  unselected: {
    borderColor: '#121214',
    borderWidth: 2,
  },
});
