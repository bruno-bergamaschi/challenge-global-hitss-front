import Constants from 'expo-constants';

interface IEnv {
  API_URL: string;
}

const extra = Constants.expoConfig?.extra ?? {};

export const env: IEnv = {
  API_URL: extra.apiUrl ?? '',
};
