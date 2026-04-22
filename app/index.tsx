import { useAuthSetup } from '@/context/auth-setup';
import { Redirect, useRootNavigationState } from 'expo-router';

export default function Index() {
  const { isHydrated, isComplete } = useAuthSetup();
  const nav = useRootNavigationState();

  if (!nav?.key || !isHydrated) {
    return null;
  }

  if (isComplete) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/create-account" />;
}
