import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingBottom: 20,
  },
  titleContainer: {
    marginTop: 40,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 700,
  },
  subtitle: {
    color: '#7C7C8A',
    textAlign: 'center',
  },
  input: {
    marginTop: 32,
    backgroundColor: '#121214',
    borderColor: '#121214',
    marginBottom: 15,
  },
  inputText: {
    color: '#E1E1E6',
  },
  icon: {
    width: 19.52,
    height: 19.52,
  },
  button: {
    marginTop: 15,
    backgroundColor: '#00875F',
    borderColor: '#00875F',
  },
});
