import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { Pressable, Text, View } from 'react-native';
import { RecentLedgerList } from './recent-ledger-list';
import type { RecentLedgerEntry } from './recent-ledger-row';

type RecentLedgerSectionProps = {
  onPressViewAll?: () => void;
  entries?: RecentLedgerEntry[];
};

export function RecentLedgerSection({ onPressViewAll, entries }: RecentLedgerSectionProps) {
  return (
    <View style={styles.recentLedgerSection}>
      <View style={styles.recentLedgerHeaderRow}>
        <Text style={styles.recentLedgerTitle}>Recent Ledger</Text>
        <Pressable onPress={onPressViewAll} style={styles.recentLedgerViewAllHit} hitSlop={8}>
          <Text style={styles.recentLedgerViewAll}>VIEW ALL</Text>
        </Pressable>
      </View>
      <RecentLedgerList entries={entries} />
    </View>
  );
}
