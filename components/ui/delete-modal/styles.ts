import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  rowDelete: {
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
  },
  rowDeleteTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  deleteTitle: {
    color: '#121214',
    fontSize: 20,
    fontWeight: 700,
  },
  rowDeleteContent: {
    padding: 20,
  },
  deleteText: {
    color: '#121214',
    textAlign: 'center',
  },
  deleteActions: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButtonConfirm: {
    minWidth: 120,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
