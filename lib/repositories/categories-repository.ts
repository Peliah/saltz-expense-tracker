import { getJson, setJson } from '@/lib/storage/app-storage';
import { APP_STORAGE_KEYS } from '@/lib/storage/keys';
import { DEFAULT_CATEGORIES } from '@/lib/storage/seeds';
import type { Category } from '@/lib/types/domain';

export async function listCategories(): Promise<Category[]> {
  return getJson<Category[]>(APP_STORAGE_KEYS.categories, DEFAULT_CATEGORIES);
}

export async function saveCategories(items: Category[]): Promise<void> {
  await setJson(APP_STORAGE_KEYS.categories, items);
}

export async function addCategory(item: Category): Promise<void> {
  const items = await listCategories();
  await saveCategories([item, ...items]);
}
