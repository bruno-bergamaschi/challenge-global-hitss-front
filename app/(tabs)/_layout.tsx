import { Tabs } from 'expo-router';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from 'react';

import { IconSymbol } from '@/components/ui/icon-symbol';

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
  const [teamId, setTeamId] = useState<TeamId>(null);

  const value = useMemo<AppContextType>(
    () => ({ teamId, setTeamId }),
    [teamId, setTeamId],
  );

  return (
    <AppContext.Provider value={value}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#00875F',
          headerShown: false,
          sceneStyle: {
            backgroundColor: '#202024',
            paddingHorizontal: 20,
            flex: 1,
          },
          tabBarStyle: {
            backgroundColor: '#121214',
            borderTopColor: '#121214',
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
