import { Tabs } from 'expo-router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type TeamId = number | null;

export type AppContextType = {
  teamId: TeamId;
  setTeamId: Dispatch<SetStateAction<TeamId>>;
};

export const AppContext = createContext<AppContextType>({
  teamId: null,
  setTeamId: () => {},
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [teamId, setTeamId] = useState<TeamId>(null);

  const value = useMemo<AppContextType>(
    () => ({ teamId, setTeamId }),
    [teamId, setTeamId],
  );

  return (
    <AppContext.Provider value={value}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          sceneStyle: {
            padding: 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Times',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.2.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="tasks"
          listeners={() => ({
            tabPress: () => {
              setTeamId(null);
            },
          })}
          options={{
            title: 'Tarefas',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="list.bullet" color={color} />
            ),
          }}
        />
      </Tabs>
    </AppContext.Provider>
  );
}
