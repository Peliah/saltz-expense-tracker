import { getJson, setJson } from '@/lib/storage/app-storage';
import { APP_STORAGE_KEYS } from '@/lib/storage/keys';
import { DEFAULT_SECURITY_SETTINGS } from '@/lib/storage/seeds';
import type { SecuritySettings } from '@/lib/types/domain';

export async function getSecuritySettings(): Promise<SecuritySettings> {
  return getJson<SecuritySettings>(APP_STORAGE_KEYS.securitySettings, DEFAULT_SECURITY_SETTINGS);
}

export async function setSecuritySettings(settings: SecuritySettings): Promise<void> {
  await setJson(APP_STORAGE_KEYS.securitySettings, settings);
}

export async function patchSecuritySettings(patch: Partial<SecuritySettings>): Promise<SecuritySettings> {
  const current = await getSecuritySettings();
  const next = { ...current, ...patch };
  await setSecuritySettings(next);
  return next;
}
