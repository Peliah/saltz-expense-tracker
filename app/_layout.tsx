import { AuthNavigationSync } from '@/components/auth-navigation-sync';
import { AuthSetupProvider, useAuthSetup } from '@/context/auth-setup';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { manropeFonts } from '@/lib/fonts';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

function RootStack() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts(manropeFonts);
  const { isHydrated } = useAuthSetup();

  useEffect(() => {
    if ((fontsLoaded || fontError) && isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded, isHydrated]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthNavigationSync />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthSetupProvider>
        <RootStack />
      </AuthSetupProvider>
    </GestureHandlerRootView>
  );
}
