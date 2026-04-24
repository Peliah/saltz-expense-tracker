import type { Allocation, Category, Timeframe, Transaction } from '@/lib/types/domain';

type TotalsByCategory = Record<string, number>;

function toMs(dateIso: string): number {
  return new Date(dateIso).getTime();
}

function isWithinTimeframe(tx: Transaction, timeframe: Timeframe): boolean {
  const now = Date.now();
  const ageMs = now - toMs(tx.occurredAt);
  if (timeframe === 'Daily') return ageMs <= 24 * 60 * 60 * 1000;
  if (timeframe === 'Weekly') return ageMs <= 7 * 24 * 60 * 60 * 1000;
  return ageMs <= 31 * 24 * 60 * 60 * 1000;
}

export function selectCategoryTotals(transactions: Transaction[], timeframe: Timeframe = 'Monthly'): TotalsByCategory {
  return transactions
    .filter((tx) => isWithinTimeframe(tx, timeframe))
    .reduce<TotalsByCategory>((acc, tx) => {
      const sign = tx.type === 'deposit' ? -1 : 1;
      acc[tx.categoryId] = (acc[tx.categoryId] ?? 0) + sign * tx.amount;
      return acc;
    }, {});
}

export function selectAllocationUtilization(
  allocations: Allocation[],
  categories: Category[],
  transactions: Transaction[],
): Array<{
  allocationId: string;
  categoryId: string;
  categoryName: string;
  budget: number;
  spent: number;
  leftAmount: number;
  usedPercent: number;
}> {
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const totals = selectCategoryTotals(transactions);
  return allocations.map((allocation) => {
    const spent = Math.max(0, totals[allocation.categoryId] ?? 0);
    const leftAmount = allocation.budget - spent;
    const usedPercent = allocation.budget > 0 ? Math.min(100, Math.round((spent / allocation.budget) * 100)) : 0;
    return {
      allocationId: allocation.id,
      categoryId: allocation.categoryId,
      categoryName: categoryById.get(allocation.categoryId)?.name ?? 'Category',
      budget: allocation.budget,
      spent,
      leftAmount,
      usedPercent,
    };
  });
}

export function selectNetCashflowSeries(
  transactions: Transaction[],
  timeframe: Timeframe,
  categoryId: string | 'all',
): number[] {
  const filtered = transactions.filter((tx) => isWithinTimeframe(tx, timeframe) && (categoryId === 'all' || tx.categoryId === categoryId));
  const buckets = [0, 0, 0, 0, 0, 0, 0];
  filtered.forEach((tx) => {
    const day = new Date(tx.occurredAt).getDay();
    const index = day === 0 ? 6 : day - 1;
    const sign = tx.type === 'deposit' ? 1 : -1;
    buckets[index] += sign * tx.amount;
  });
  return buckets;
}
