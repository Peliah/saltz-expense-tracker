import { AllocationsSection } from '@/components/overview/allocations-section';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { LiquidWealthSummaryCard } from '@/components/overview/liquid-wealth-summary-card';
import { QuickActionFab } from '@/components/overview/quick-action-fab';
import { RecentLedgerSection } from '@/components/overview/recent-ledger-section';
import { SpendingTrendCard } from '@/components/overview/spending-trend-card';
import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OverviewScreen() {
  const router = useRouter();

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
          <LiquidWealthSummaryCard />
          <AllocationsSection onPressViewAll={() => router.push('/(home)/allocations')} />
          <SpendingTrendCard />
          <RecentLedgerSection onPressViewAll={() => router.push('/(home)/recent-ledgers')} />

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
