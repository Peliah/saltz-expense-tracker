import { addCategory } from '@/lib/repositories/categories-repository';
import type { Category } from '@/lib/types/domain';
import { bumpEntityVersion } from '@/store/entity-store';

export async function createCategory(input: Category): Promise<void> {
  await addCategory(input);
  bumpEntityVersion('categories');
}
