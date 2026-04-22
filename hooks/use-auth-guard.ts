import { useAuthSetup } from '@/context/auth-setup';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';

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
