import { STORAGE_KEYS, storage } from '@/lib/storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type AuthSetupContextValue = {
  isHydrated: boolean;
  isComplete: boolean;
  setComplete: (value: boolean) => Promise<void>;
};

const AuthSetupContext = createContext<AuthSetupContextValue | null>(null);

export function AuthSetupProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setHydrated] = useState(false);
  const [isComplete, setIsCompleteState] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await storage.getItem(STORAGE_KEYS.AUTH_SETUP_COMPLETE);
        if (!cancelled) {
          setIsCompleteState(raw === 'true');
        }
      } finally {
        if (!cancelled) {
          setHydrated(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setComplete = useCallback(async (value: boolean) => {
    if (value) {
      await storage.setItem(STORAGE_KEYS.AUTH_SETUP_COMPLETE, 'true');
    } else {
      await storage.removeItem(STORAGE_KEYS.AUTH_SETUP_COMPLETE);
    }
    setIsCompleteState(value);
  }, []);

  const value = useMemo(
    () => ({ isHydrated, isComplete, setComplete }),
    [isHydrated, isComplete, setComplete],
  );

  return <AuthSetupContext.Provider value={value}>{children}</AuthSetupContext.Provider>;
}

export function useAuthSetup() {
  const ctx = useContext(AuthSetupContext);
  if (!ctx) {
    throw new Error('useAuthSetup must be used within AuthSetupProvider');
  }
  return ctx;
}
