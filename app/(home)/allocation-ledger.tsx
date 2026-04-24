import { HomeTopHeader } from '@/components/home/home-top-header';
import { RecentLedgerList } from '@/components/overview/recent-ledger-list';
import { useAllocations } from '@/hooks/use-allocations';
import { useCategories } from '@/hooks/use-categories';
import { useTransactions } from '@/hooks/use-transactions';
import { selectRecentLedgerEntries } from '@/lib/selectors/ledger-selectors';
import { overviewStyles } from '@/stylesheets/overview-stylesheet';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllocationLedgerScreen() {
  const params = useLocalSearchParams<{ allocationId?: string; allocationName?: string }>();
  const allocationId = params.allocationId ?? '';
  const allocationName = params.allocationName ?? 'Allocation';
  const { allocations } = useAllocations();
  const { transactions } = useTransactions();
  const { categories } = useCategories();

  const entries = useMemo(() => {
    const allocation = allocations.find((item) => item.id === allocationId);
    if (!allocation) return [];
    return selectRecentLedgerEntries(transactions, categories, { categoryId: allocation.categoryId });
  }, [allocationId, allocations, transactions, categories]);

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
