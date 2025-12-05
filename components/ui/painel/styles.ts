import { StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  iconBack: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    marginTop: 30,
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
  },
  inputText: {
    color: '#E1E1E6',
  },
  inputIcon: {
    width: 19.52,
    height: 19.52,
  },
  childrenContainer: {
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00875F',
    borderColor: '#00875F',
  },
});
