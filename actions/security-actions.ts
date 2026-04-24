import { patchSecuritySettings } from '@/lib/repositories/security-repository';
import type { SecuritySettings } from '@/lib/types/domain';
import { bumpEntityVersion } from '@/store/entity-store';

export async function updateSecuritySettings(patch: Partial<SecuritySettings>): Promise<void> {
  await patchSecuritySettings(patch);
  bumpEntityVersion('security');
}

export async function markIdentityVerified(): Promise<void> {
  await updateSecuritySettings({ identityVerifiedAt: new Date().toISOString() });
}
