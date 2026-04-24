import { HomeTopHeader } from '@/components/home/home-top-header';
import { RecentLedgerList } from '@/components/overview/recent-ledger-list';
import { overviewStyles as overviewStyles } from '@/stylesheets/overview-stylesheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

export default function RecentLedgersScreen() {
  return (
    <SafeAreaView style={overviewStyles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title="Recent Ledgers" />
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}>
          <RecentLedgerList scrollEnabled />
        </View>
      </View>
    </SafeAreaView>
  );
}
