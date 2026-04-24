import { CategoryPickerCard } from '@/components/budget/category-picker-card';
import { CategorySummarySection } from '@/components/budget/category-summary-section';
import { MonthlyBurnCard } from '@/components/budget/monthly-burn-card';
import { SpendingVelocityCard } from '@/components/budget/spending-velocity-card';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { useBudgetMetrics } from '@/hooks/use-budget-metrics';
import { useCategories } from '@/hooks/use-categories';
import { useTransactions } from '@/hooks/use-transactions';
import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  const router = useRouter();
  const { categories } = useCategories();
  const { transactions } = useTransactions();
  const { categoryTotals, netSeries } = useBudgetMetrics('Monthly', 'all');

  const spent = transactions.reduce((sum, tx) => sum + (tx.type === 'withdraw' ? tx.amount : 0), 0);
  const limit = Math.max(1, spent * 1.5);
  const remaining = Math.max(0, limit - spent);
  const categoryTiles = [...categories.slice(0, 5), { id: 'new', name: 'New', icon: 'add', color: '#00327D' }].map((item) => ({
    id: item.id,
    label: item.name,
    icon: item.icon as React.ComponentProps<typeof MaterialIcons>['name'],
  }));
  const summaryItems = categories.slice(0, 3).map((category) => {
    const total = Math.max(0, categoryTotals[category.id] ?? 0);
    const budget = Math.max(1, total * 1.6);
    const left = budget - total;
    const progress = Math.min(1, total / budget);
    return {
      id: category.id,
      name: category.name,
      budget: `$${budget.toFixed(0)}`,
      left: `${left < 0 ? '-$' : '$'}${Math.abs(left).toFixed(0)} LEFT`,
      icon: category.icon as React.ComponentProps<typeof MaterialIcons>['name'],
      progress,
      tone: left < 0 ? 'danger' : 'primary',
    } as const;
  });
  const chartDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const actualSeries = netSeries.map((n) => Math.abs(n));
  const targetSeries = actualSeries.map((n) => Math.max(n, 40) + 12);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <MonthlyBurnCard spent={spent} limit={limit} />
        <SpendingVelocityCard
          remainingValue={`$${remaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          days={chartDays}
          actual={actualSeries}
          target={targetSeries}
        />
        <CategoryPickerCard
          categories={categoryTiles}
          onSelectCategory={(categoryId) => {
            if (categoryId === 'new') {
              router.push('/(budgets)/new-category');
              return;
            }
          }}
          onPressAddCategory={() => {
            router.push('/(budgets)/new-category');
          }}
        />
        <CategorySummarySection
          items={summaryItems}
          onPressViewAll={() => {
            router.push('/(budgets)/categories');
          }}
          onPressCategory={(categoryId) => {
            router.push('/(budgets)/categories');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
