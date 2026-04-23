import { AllocationGraphSection } from '@/components/insights/allocation-graph-section';
import { SpendingVelocityCard } from '@/components/budget/spending-velocity-card';
import { FinancialInsightsSection } from '@/components/insights/financial-insights-section';
import { MonthlyOverviewSection } from '@/components/insights/monthly-overview-section';
import { SmartAllocationGoalCard } from '@/components/insights/smart-allocation-goal-card';
import { SmartSuggestionsSection } from '@/components/insights/smart-suggestions-section';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <FinancialInsightsSection />
        <SpendingVelocityCard />
        <MonthlyOverviewSection />
        <AllocationGraphSection />
        <SmartSuggestionsSection />
        <SmartAllocationGoalCard />
      </ScrollView>
    </SafeAreaView>
  );
}
