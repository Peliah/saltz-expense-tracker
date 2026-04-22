import { useAuthSetup } from '@/context/auth-setup';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

/**
 * Client-side route guard (Expo Router has no server middleware on native).
 * Keeps users in the auth stack until setup is marked complete, and keeps
 * completed users out of the auth stack. Waits for root navigation to mount
 * before replacing routes to avoid "navigate before mounting" errors.
 *
 * @see https://docs.expo.dev/router/advanced/authentication/
 */
export function useAuthGuard() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { isHydrated, isComplete } = useAuthSetup();

  useEffect(() => {
    if (!navigationState?.key || !isHydrated) {
      return;
    }

    const group = segments[0];

    if (!isComplete && group === '(tabs)') {
      router.replace('/(auth)/create-account');
      return;
    }

    if (isComplete && group === '(auth)') {
      router.replace('/(tabs)');
    }
  }, [navigationState?.key, isHydrated, isComplete, router, segments]);
}
