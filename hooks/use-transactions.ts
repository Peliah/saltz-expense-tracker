import { createTransaction } from '@/actions/transaction-actions';
import { listTransactions } from '@/lib/repositories/transactions-repository';
import type { Transaction } from '@/lib/types/domain';
import { subscribeEntityStore } from '@/store/entity-store';
import { useCallback, useEffect, useState } from 'react';

export function useTransactions() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const rows = await listTransactions();
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
    transactions: items,
    loading,
    refresh,
    create: createTransaction,
  };
}
