import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { FlatList, ListRenderItem, Pressable, Text, View } from 'react-native';

import { RecentLedgerRow, type RecentLedgerEntry } from './recent-ledger-row';

const ENTRIES: RecentLedgerEntry[] = [
  {
    id: '1',
    merchant: 'Apple Store',
    amount: '-$1,299.00',
    meta: 'TECHNOLOGY • 2:45 PM',
    dateLabel: 'OCT 12',
    icon: 'laptop-mac',
    iconColor: '#00327D',
    amountTone: 'debit',
  },
  {
    id: '2',
    merchant: 'Dividend Payout',
    amount: '+$450.25',
    meta: 'INVESTMENT • 11:20 AM',
    dateLabel: 'OCT 11',
    icon: 'trending-up',
    iconColor: '#4EDEA3',
    amountTone: 'credit',
  },
  {
    id: '3',
    merchant: 'The Gilded Fork',
    amount: '-$240.50',
    meta: 'DINING • 8:15 PM',
    dateLabel: 'OCT 10',
    icon: 'restaurant',
    iconColor: '#00327D',
    amountTone: 'debit',
  },
  {
    id: '4',
    merchant: 'Spotify Premium',
    amount: '-$9.99',
    meta: 'SUBSCRIPTION • 9:00 AM',
    dateLabel: 'OCT 9',
    icon: 'music-note',
    iconColor: '#00327D',
    amountTone: 'debit',
  },
  {
    id: '5',
    merchant: 'Electricity Bill',
    amount: '-$75.80',
    meta: 'UTILITIES • 1:30 PM',
    dateLabel: 'OCT 8',
    icon: 'bolt',
    iconColor: '#00327D',
    amountTone: 'debit',
  },
  {
    id: '6',
    merchant: 'Amazon Purchase',
    amount: '-$59.99',
    meta: 'E-COMMERCE • 3:00 PM',
    dateLabel: 'OCT 7',
    icon: 'shopping-cart',
    iconColor: '#00327D',
    amountTone: 'debit',
  },
  {
    id: '7',
    merchant: 'Gym Membership',
    amount: '-$45.00',
    meta: 'HEALTH • 5:30 PM',
    dateLabel: 'OCT 6',
    icon: 'fitness-center',
    iconColor: '#00327D',
    amountTone: 'debit',
  },
  {
    id: '8',
    merchant: 'Book Sale',
    amount: '+$12.99',
    meta: 'ENTERTAINMENT • 12:15 PM',
    dateLabel: 'OCT 5',
    icon: 'menu-book',
    iconColor: '#4EDEA3',
    amountTone: 'credit',
  },
];

function Separator() {
  return <View style={styles.recentLedgerSeparator} />;
}

type RecentLedgerSectionProps = {
  onPressViewAll?: () => void;
};

export function RecentLedgerSection({ onPressViewAll }: RecentLedgerSectionProps) {
  const renderItem: ListRenderItem<RecentLedgerEntry> = ({ item }) => <RecentLedgerRow entry={item} />;

  return (
    <View style={styles.recentLedgerSection}>
      <View style={styles.recentLedgerHeaderRow}>
        <Text style={styles.recentLedgerTitle}>Recent Ledger</Text>
        <Pressable onPress={onPressViewAll} style={styles.recentLedgerViewAllHit} hitSlop={8}>
          <Text style={styles.recentLedgerViewAll}>VIEW ALL</Text>
        </Pressable>
      </View>
      <FlatList
        data={ENTRIES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Separator}
        scrollEnabled={false}
        nestedScrollEnabled
        removeClippedSubviews={false}
      />
    </View>
  );
}
