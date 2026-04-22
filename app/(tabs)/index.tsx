import { AllocationsSection } from '@/components/overview/allocations-section';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { LiquidWealthSummaryCard } from '@/components/overview/liquid-wealth-summary-card';
import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OverviewScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <LiquidWealthSummaryCard />
        <AllocationsSection />
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This week</Text>
          <Text style={styles.cardBody}>
            Connect your bank or add expenses manually to populate this screen. The layout and typography follow your
            Manrope system styles.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
