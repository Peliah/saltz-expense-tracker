import { selectAllocationUtilization, selectCategoryTotals, selectNetCashflowSeries } from '@/lib/selectors/finance-selectors';
import type { Timeframe } from '@/lib/types/domain';
import { useAllocations } from '@/hooks/use-allocations';
import { useCategories } from '@/hooks/use-categories';
import { useMemo } from 'react';
import { useTransactions } from './use-transactions';

export function useBudgetMetrics(timeframe: Timeframe = 'Monthly', categoryId: string | 'all' = 'all') {
  const { transactions } = useTransactions();
  const { categories } = useCategories();
  const { allocations } = useAllocations();

  const allocationUtilization = useMemo(
    () => selectAllocationUtilization(allocations, categories, transactions),
    [allocations, categories, transactions],
  );
  const categoryTotals = useMemo(() => selectCategoryTotals(transactions, timeframe), [timeframe, transactions]);
  const netSeries = useMemo(() => selectNetCashflowSeries(transactions, timeframe, categoryId), [transactions, timeframe, categoryId]);

  return {
    allocationUtilization,
    categoryTotals,
    netSeries,
  };
}
