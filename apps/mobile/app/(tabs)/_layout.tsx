import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="milestones"
        options={{
          title: 'المهارات',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🪜</Text>,
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: 'التقارير',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📄</Text>,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'المساعد الذكي',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🤖</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'الملف',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
