import { AllocationGraphSection } from '@/components/insights/allocation-graph-section';
import { SpendingVelocityCard } from '@/components/budget/spending-velocity-card';
import { FinancialInsightsSection, type InsightsTimeTab } from '@/components/insights/financial-insights-section';
import { MonthlyOverviewSection } from '@/components/insights/monthly-overview-section';
import { SmartAllocationGoalCard } from '@/components/insights/smart-allocation-goal-card';
import { SmartSuggestionsSection } from '@/components/insights/smart-suggestions-section';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { useBudgetMetrics } from '@/hooks/use-budget-metrics';
import { useTransactions } from '@/hooks/use-transactions';
import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { useMemo, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsScreen() {
  const [activeTab, setActiveTab] = useState<InsightsTimeTab>('Monthly');
  const { transactions } = useTransactions();
  const timeframe = activeTab === 'Daily' ? 'Daily' : activeTab === 'Weekly' ? 'Weekly' : 'Monthly';
  const { allocationUtilization, netSeries } = useBudgetMetrics(timeframe, 'all');
  const spent = useMemo(
    () => transactions.reduce((sum, tx) => sum + (tx.type === 'withdraw' ? tx.amount : 0), 0),
    [transactions],
  );
  const budget = Math.max(spent * 1.5, 1);

  const velocityData = useMemo(() => {
    if (activeTab === 'Daily') {
      return {
        trendValue: '8.2%',
        remainingValue: '$1,120.00',
        target: netSeries.map((n) => Math.max(Math.abs(n), 25) + 10),
        actual: netSeries.map((n) => Math.abs(n)),
      };
    }

    if (activeTab === 'Weekly') {
      return {
        trendValue: '10.1%',
        remainingValue: '$1,180.00',
        target: netSeries.map((n) => Math.max(Math.abs(n), 30) + 12),
        actual: netSeries.map((n) => Math.abs(n)),
      };
    }

    return {
      trendValue: '12.4%',
      remainingValue: '$1,240.00',
      target: netSeries.map((n) => Math.max(Math.abs(n), 40) + 14),
      actual: netSeries.map((n) => Math.abs(n)),
    };
  }, [activeTab, netSeries]);

  const allocationItems = useMemo(() => {
    const totalBudget = allocationUtilization.reduce((sum, item) => sum + item.budget, 0) || 1;
    return allocationUtilization.slice(0, 4).map((item, index) => ({
      id: item.allocationId,
      label: item.categoryName,
      percent: Math.max(1, Math.round((item.budget / totalBudget) * 100)),
      color: ['#00327D', '#0047AB', '#4EDEA3', '#545F73'][index % 4],
    }));
  }, [allocationUtilization]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <FinancialInsightsSection activeTab={activeTab} onChangeTab={setActiveTab} />
        <SpendingVelocityCard
          trendValue={velocityData.trendValue}
          remainingValue={velocityData.remainingValue}
          target={velocityData.target}
          actual={velocityData.actual}
        />
        <MonthlyOverviewSection spent={spent} budget={budget} />
        <AllocationGraphSection
          items={allocationItems}
          totalLabel={`$${spent.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          onPressViewAll={() => {
            Alert.alert('Allocation', 'Opening full allocation breakdown...');
          }}
        />
        <SmartSuggestionsSection
          onPressViewAll={() => {
            Alert.alert('Suggestions', 'Opening all smart suggestions...');
          }}
          onPressAction={(id) => {
            Alert.alert('Suggestion action', `Triggered action for: ${id}`);
          }}
        />
        <SmartAllocationGoalCard
          onPressAllocate={() => {
            Alert.alert('Allocate funds', 'Re-allocation flow started for Vacation Fund.');
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
