import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { Pressable, Text, View } from 'react-native';
import { RecentLedgerList } from './recent-ledger-list';

type RecentLedgerSectionProps = {
  onPressViewAll?: () => void;
};

export function RecentLedgerSection({ onPressViewAll }: RecentLedgerSectionProps) {
  return (
    <View style={styles.recentLedgerSection}>
      <View style={styles.recentLedgerHeaderRow}>
        <Text style={styles.recentLedgerTitle}>Recent Ledger</Text>
        <Pressable onPress={onPressViewAll} style={styles.recentLedgerViewAllHit} hitSlop={8}>
          <Text style={styles.recentLedgerViewAll}>VIEW ALL</Text>
        </Pressable>
      </View>
      <RecentLedgerList />
    </View>
  );
}
