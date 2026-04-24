import { removeKey } from '@/lib/storage/app-storage';
import { APP_STORAGE_KEYS } from '@/lib/storage/keys';
import { bumpEntityVersion } from '@/store/entity-store';

export async function clearSessionLinkedCache(): Promise<void> {
  await Promise.all([
    removeKey(APP_STORAGE_KEYS.transactions),
    removeKey(APP_STORAGE_KEYS.allocations),
    removeKey(APP_STORAGE_KEYS.categories),
  ]);
  bumpEntityVersion('transactions');
  bumpEntityVersion('allocations');
  bumpEntityVersion('categories');
}
