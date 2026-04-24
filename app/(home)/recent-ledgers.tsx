import { HomeTopHeader } from '@/components/home/home-top-header';
import { NewAllocationCard } from '@/components/home/new-allocation-card';
import { RecentLedgerList } from '@/components/overview/recent-ledger-list';
import { overviewStyles as overviewStyles } from '@/stylesheets/overview-stylesheet';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RecentLedgersScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={overviewStyles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title="Recent Ledgers" />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }} showsVerticalScrollIndicator={false}>
          <RecentLedgerList />
          <View style={{ marginTop: 24 }}>
            <NewAllocationCard
              onPressQuickAdd={() => {
                router.push('/(home)/add-transaction');
              }}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
