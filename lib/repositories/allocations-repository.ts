import { getJson, setJson } from '@/lib/storage/app-storage';
import { APP_STORAGE_KEYS } from '@/lib/storage/keys';
import { DEFAULT_ALLOCATIONS } from '@/lib/storage/seeds';
import type { Allocation } from '@/lib/types/domain';

export async function listAllocations(): Promise<Allocation[]> {
  return getJson<Allocation[]>(APP_STORAGE_KEYS.allocations, DEFAULT_ALLOCATIONS);
}

export async function saveAllocations(items: Allocation[]): Promise<void> {
  await setJson(APP_STORAGE_KEYS.allocations, items);
}

export async function addAllocation(item: Allocation): Promise<void> {
  const items = await listAllocations();
  await saveAllocations([item, ...items]);
}
