import type { Category, Transaction } from '@/lib/types/domain';
import type { RecentLedgerEntry } from '@/components/overview/recent-ledger-row';

const FALLBACK_ICON: Record<string, { icon: RecentLedgerEntry['icon']; iconColor: string }> = {
  housing: { icon: 'home', iconColor: '#00327D' },
  groceries: { icon: 'shopping-cart', iconColor: '#00327D' },
  food: { icon: 'restaurant', iconColor: '#00327D' },
  travel: { icon: 'directions-car', iconColor: '#00327D' },
  salary: { icon: 'payments', iconColor: '#0047AB' },
};

export function selectRecentLedgerEntries(
  transactions: Transaction[],
  categories: Category[],
  opts?: { categoryId?: string; limit?: number },
): RecentLedgerEntry[] {
  const categoryById = new Map(categories.map((c) => [c.id, c]));
  const filtered = opts?.categoryId ? transactions.filter((tx) => tx.categoryId === opts.categoryId) : transactions;
  const rows = filtered
    .slice()
    .sort((a, b) => new Date(b.occurredAt).getTime() - new Date(a.occurredAt).getTime())
    .slice(0, opts?.limit ?? 100);

  return rows.map((tx, index) => {
    const category = categoryById.get(tx.categoryId);
    const date = new Date(tx.occurredAt);
    const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    const iconFallback = FALLBACK_ICON[tx.categoryId] ?? { icon: 'receipt-long', iconColor: '#00327D' };
    const signedAmount = `${tx.type === 'deposit' ? '+' : '-'}$${tx.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return {
      id: tx.id || `${index}`,
      merchant: tx.title || category?.name || 'Transaction',
      amount: signedAmount,
      meta: `${(category?.name ?? 'GENERAL').toUpperCase()} • ${time}`,
      dateLabel: monthDay,
      icon: iconFallback.icon,
      iconColor: iconFallback.iconColor,
      amountTone: tx.type === 'deposit' ? 'credit' : 'debit',
    };
  });
}
