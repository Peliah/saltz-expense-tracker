import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { HapticTab } from '@/components/shared/haptic-tab';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0047AB',
        tabBarInactiveTintColor: '#8FA0B8',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontFamily: 'Manrope-SemiBold',
          fontSize: 12,
          lineHeight: 14,
          letterSpacing: 0.8,
          marginTop: 4,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarItemStyle: {
          borderRadius: 16,
          marginHorizontal: 2,
          marginVertical: 10,
          paddingVertical: 6,
        },
        tabBarActiveBackgroundColor: '#D6DFEC',
        tabBarStyle: {
          position: 'relative',
          height: 92,
          paddingHorizontal: 8,
          paddingTop: 6,
          paddingBottom: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          borderRadius: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'OVERVIEW',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="grid-view" color={color} />,
        }}
      />
      <Tabs.Screen
        name="budget"
        options={{
          title: 'BUDGETS',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="account-balance-wallet" color={color} />,
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'INSIGHTS',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="insights" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'SETTINGS',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="settings" color={color} />,
        }}
      />
      <Tabs.Screen
        name="change-password"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
