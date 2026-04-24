import { HomeTopHeader } from '@/components/home/home-top-header';
import { RECENT_LEDGER_ENTRIES } from '@/components/overview/recent-ledger-data';
import { RecentLedgerList } from '@/components/overview/recent-ledger-list';
import { overviewStyles } from '@/stylesheets/overview-stylesheet';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ALLOCATION_TO_MERCHANTS: Record<string, string[]> = {
  housing: ['Electricity Bill'],
  'dining-out': ['The Gilded Fork'],
  groceries: ['Amazon Purchase'],
  tickets: ['Spotify Premium'],
};

export default function AllocationLedgerScreen() {
  const params = useLocalSearchParams<{ allocationId?: string; allocationName?: string }>();
  const allocationId = params.allocationId ?? '';
  const allocationName = params.allocationName ?? 'Allocation';

  const entries = useMemo(() => {
    const merchants = ALLOCATION_TO_MERCHANTS[allocationId];
    if (!merchants) return RECENT_LEDGER_ENTRIES;
    const filtered = RECENT_LEDGER_ENTRIES.filter((entry) => merchants.includes(entry.merchant));
    return filtered.length > 0 ? filtered : RECENT_LEDGER_ENTRIES;
  }, [allocationId]);

  return (
    <SafeAreaView style={overviewStyles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title={`${allocationName} Ledgers`} />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
          {entries.length > 0 ? (
            <RecentLedgerList entries={entries} scrollEnabled />
          ) : (
            <Text style={{ color: '#586377', fontFamily: 'Manrope-Regular', fontSize: 14 }}>No ledgers found for this allocation.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
