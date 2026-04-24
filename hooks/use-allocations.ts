import { addAllocation } from '@/lib/repositories/allocations-repository';
import { listAllocations } from '@/lib/repositories/allocations-repository';
import type { Allocation } from '@/lib/types/domain';
import { bumpEntityVersion, subscribeEntityStore } from '@/store/entity-store';
import { useCallback, useEffect, useState } from 'react';

export function useAllocations() {
  const [items, setItems] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const rows = await listAllocations();
    setItems(rows);
    setLoading(false);
  }, []);

  const create = useCallback(async (allocation: Allocation) => {
    await addAllocation(allocation);
    bumpEntityVersion('allocations');
  }, []);

  useEffect(() => {
    void refresh();
    return subscribeEntityStore(() => {
      void refresh();
    });
  }, [refresh]);

  return {
    allocations: items,
    loading,
    refresh,
    create,
  };
}
