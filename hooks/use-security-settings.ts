import { updateSecuritySettings } from '@/actions/security-actions';
import { getSecuritySettings } from '@/lib/repositories/security-repository';
import type { SecuritySettings } from '@/lib/types/domain';
import { subscribeEntityStore } from '@/store/entity-store';
import { useCallback, useEffect, useState } from 'react';

export function useSecuritySettings() {
  const [settings, setSettings] = useState<SecuritySettings | null>(null);

  const refresh = useCallback(async () => {
    const next = await getSecuritySettings();
    setSettings(next);
  }, []);

  useEffect(() => {
    void refresh();
    return subscribeEntityStore(() => {
      void refresh();
    });
  }, [refresh]);

  const patch = useCallback(async (input: Partial<SecuritySettings>) => {
    await updateSecuritySettings(input);
  }, []);

  return {
    settings,
    refresh,
    patch,
  };
}
