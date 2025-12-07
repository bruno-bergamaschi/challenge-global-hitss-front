import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputs: {
    marginTop: 40,
    marginBottom: 20,
    gap: 20,
  },
  input: {
    backgroundColor: '#121214',
    borderColor: '#121214',
  },
  rowSelectTeams: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121214',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 3,
    maxHeight: 50,
  },
  rowSelectTeamsNames: {
    width: '85%',
  },
  inputPlaceholderText: {
    color: '#22333b',
  },
  inputText: {
    color: '#E1E1E6',
  },
  textDisabled: {
    color: '#7C7C8A',
  },
  inputDescription: {
    height: 120,
    borderWidth: 1,
    padding: 10,
    textAlignVertical: 'top',
    color: '#E1E1E6',
  },
  rowRadioGroup: {
    display: 'flex',
    alignItems: 'flex-start',
  },
});
