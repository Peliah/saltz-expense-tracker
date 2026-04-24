import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { FlatList, ListRenderItem, View } from 'react-native';

import { RECENT_LEDGER_ENTRIES } from './recent-ledger-data';
import { RecentLedgerRow, type RecentLedgerEntry } from './recent-ledger-row';

type RecentLedgerListProps = {
  entries?: RecentLedgerEntry[];
  scrollEnabled?: boolean;
};

function Separator() {
  return <View style={styles.recentLedgerSeparator} />;
}

export function RecentLedgerList({ entries = RECENT_LEDGER_ENTRIES, scrollEnabled = false }: RecentLedgerListProps) {
  const renderItem: ListRenderItem<RecentLedgerEntry> = ({ item }) => <RecentLedgerRow entry={item} />;

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      scrollEnabled={scrollEnabled}
      nestedScrollEnabled
      removeClippedSubviews={false}
      showsVerticalScrollIndicator={false}
    />
  );
}
