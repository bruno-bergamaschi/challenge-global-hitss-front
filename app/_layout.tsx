import { DismissKeyboardView } from '@/components/ui/ds-dismiss-keyboard-view';
import * as eva from '@eva-design/eva';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ApplicationProvider } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

const stackSreens = ['teams/create', 'tasks/create', 'tasks/[id]'];

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ApplicationProvider {...eva} theme={eva.light}>
        <QueryClientProvider client={queryClient}>
          <DismissKeyboardView>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              {stackSreens.map((screen) => (
                <Stack.Screen
                  name={screen}
                  key={screen}
                  options={{
                    headerShown: false,
                    contentStyle: {
                      backgroundColor: '#202024',
                      padding: 20,
                    },
                  }}
                />
              ))}
            </Stack>
          </DismissKeyboardView>
        </QueryClientProvider>
      </ApplicationProvider>
      <Toast position="top" topOffset={50} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
