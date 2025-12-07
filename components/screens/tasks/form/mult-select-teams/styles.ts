import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202024',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    gap: 8,
  },
  teamDataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#121214',
    paddingVertical: 8,
    backgroundColor: '#121214',
  },
  inputText: {
    color: '#E1E1E6',
  },
  confirmButton: {
    backgroundColor: '#00875F',
    borderColor: '#00875F',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
  activityIndicator: {
    marginTop: 20,
  },
  rowError: {
    padding: 16,
  },
  row: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#121214',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  rowText: {
    fontSize: 16,
    marginLeft: 8,
  },
  check: {
    fontSize: 18,
    width: 24,
    textAlign: 'center',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  flatListActivityIndicator: {
    marginVertical: 12,
  },
  rowEmpty: {
    padding: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#121214',
  },
  cancelBtn: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
