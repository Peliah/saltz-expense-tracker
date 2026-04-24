import { createCategory } from '@/actions/category-actions';
import { listCategories } from '@/lib/repositories/categories-repository';
import type { Category } from '@/lib/types/domain';
import { subscribeEntityStore } from '@/store/entity-store';
import { useCallback, useEffect, useState } from 'react';

export function useCategories() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const rows = await listCategories();
    setItems(rows);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
    return subscribeEntityStore(() => {
      void refresh();
    });
  }, [refresh]);

  return {
    categories: items,
    loading,
    refresh,
    create: createCategory,
  };
}
