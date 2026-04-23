import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import { Text, View } from 'react-native';

export type RecentLedgerEntry = {
  id: string;
  merchant: string;
  amount: string;
  meta: string;
  dateLabel: string;
  icon: ComponentProps<typeof MaterialIcons>['name'];
  iconColor: '#00327D' | '#4EDEA3';
  amountTone: 'debit' | 'credit';
};

type RecentLedgerRowProps = {
  entry: RecentLedgerEntry;
};

export function RecentLedgerRow({ entry }: RecentLedgerRowProps) {
  const amountStyle =
    entry.amountTone === 'credit' ? styles.recentLedgerAmountCredit : styles.recentLedgerAmountDebit;

  return (
    <View style={styles.recentLedgerRow}>
      <View style={styles.recentLedgerRowMain}>
        <View style={styles.recentLedgerIconWrap}>
          <MaterialIcons name={entry.icon} size={22} color={entry.iconColor} />
        </View>
        <View style={styles.recentLedgerTextBlock}>
          <Text style={styles.recentLedgerMerchant} numberOfLines={1}>
            {entry.merchant}
          </Text>
          <Text style={styles.recentLedgerMeta} numberOfLines={1}>
            {entry.meta}
          </Text>
        </View>
      </View>
      <View style={styles.recentLedgerRight}>
        <Text style={[styles.recentLedgerAmount, amountStyle]}>{entry.amount}</Text>
        <Text style={styles.recentLedgerDate}>{entry.dateLabel}</Text>
      </View>
    </View>
  );
}
