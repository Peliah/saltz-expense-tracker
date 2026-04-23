import { AllocationGraphSection } from '@/components/insights/allocation-graph-section';
import { SpendingVelocityCard } from '@/components/budget/spending-velocity-card';
import { FinancialInsightsSection, type InsightsTimeTab } from '@/components/insights/financial-insights-section';
import { MonthlyOverviewSection } from '@/components/insights/monthly-overview-section';
import { SmartAllocationGoalCard } from '@/components/insights/smart-allocation-goal-card';
import { SmartSuggestionsSection } from '@/components/insights/smart-suggestions-section';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { useMemo, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsScreen() {
  const [activeTab, setActiveTab] = useState<InsightsTimeTab>('Monthly');

  const velocityData = useMemo(() => {
    if (activeTab === 'Daily') {
      return {
        trendValue: '8.2%',
        remainingValue: '$1,120.00',
        target: [54, 62, 70, 58, 66, 69, 72],
        actual: [46, 58, 60, 50, 63, 65, 68],
      };
    }

    if (activeTab === 'Weekly') {
      return {
        trendValue: '10.1%',
        remainingValue: '$1,180.00',
        target: [52, 67, 77, 60, 70, 72, 74],
        actual: [40, 61, 54, 36, 64, 66, 67],
      };
    }

    return {
      trendValue: '12.4%',
      remainingValue: '$1,240.00',
      target: [52, 68, 82, 60, 74, 74, 74],
      actual: [35, 59, 42, 26, 67, 67, 67],
    };
  }, [activeTab]);

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
        <MonthlyOverviewSection />
        <AllocationGraphSection
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
