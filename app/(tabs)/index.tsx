import { AllocationsSection } from '@/components/overview/allocations-section';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { LiquidWealthSummaryCard } from '@/components/overview/liquid-wealth-summary-card';
import { QuickActionFab } from '@/components/overview/quick-action-fab';
import { RecentLedgerSection } from '@/components/overview/recent-ledger-section';
import { SpendingTrendCard } from '@/components/overview/spending-trend-card';
import { useAllocations } from '@/hooks/use-allocations';
import { useCategories } from '@/hooks/use-categories';
import { useTransactions } from '@/hooks/use-transactions';
import { selectAllocationUtilization } from '@/lib/selectors/finance-selectors';
import { selectRecentLedgerEntries } from '@/lib/selectors/ledger-selectors';
import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OverviewScreen() {
  const router = useRouter();
  const { allocations } = useAllocations();
  const { categories } = useCategories();
  const { transactions } = useTransactions();

  const allocationItems = useMemo(() => {
    return selectAllocationUtilization(allocations, categories, transactions).map((item) => ({
      id: item.allocationId,
      title: item.categoryName,
      spent: `$${item.spent.toLocaleString('en-US')}`,
      remaining: `${item.leftAmount >= 0 ? '+' : '-'}$${Math.abs(item.leftAmount).toLocaleString('en-US')} LEFT`,
      progress: item.usedPercent / 100,
      fillColor: (item.usedPercent >= 80 ? '#BA1A1A' : '#00327D') as '#BA1A1A' | '#00327D',
      remainingColor: (item.leftAmount < 0 ? '#BA1A1A' : '#434653') as '#BA1A1A' | '#434653',
      icon: 'account-balance-wallet' as const,
    }));
  }, [allocations, categories, transactions]);

  const net = useMemo(() => {
    return transactions.reduce((acc, tx) => acc + (tx.type === 'deposit' ? tx.amount : -tx.amount), 0);
  }, [transactions]);
  const recentEntries = useMemo(() => selectRecentLedgerEntries(transactions, categories, { limit: 8 }), [transactions, categories]);

  const positiveNet = net >= 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.overviewInner}>
        <ScrollView
          contentContainerStyle={styles.container}
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator
        >
          <LedgerHeader />
          <LiquidWealthSummaryCard
            balance={`${positiveNet ? '+' : '-'}$${Math.abs(net).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            onDeposit={() => router.push('/(home)/add-transaction?tab=manual&type=deposit')}
            onWithdraw={() => router.push('/(home)/add-transaction?tab=manual&type=withdraw')}
          />
          <AllocationsSection onPressViewAll={() => router.push('/(home)/allocations')} items={allocationItems} />
          <SpendingTrendCard />
          <RecentLedgerSection onPressViewAll={() => router.push('/(home)/recent-ledgers')} entries={recentEntries} />

          {/* <View style={styles.card}>
            <Text style={styles.cardTitle}>This week</Text>
            <Text style={styles.cardBody}>
              Connect your bank or add expenses manually to populate this screen. The layout and typography follow your
              Manrope system styles.
            </Text>
          </View> */}
        </ScrollView>
        <QuickActionFab />
      </View>
    </SafeAreaView>
  );
}
