import { useAuthSetup } from '@/context/auth-setup';
import { Redirect, useRootNavigationState } from 'expo-router';

/**
 * First paint route: send users to auth setup or main tabs once storage has hydrated.
 * Pairs with `useAuthGuard` for in-session redirects (e.g. deep links).
 */
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
