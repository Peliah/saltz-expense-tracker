import { TransactionKeypad } from '@/components/home/transaction-keypad';
import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { Text, View } from 'react-native';

type TransactionAmountCardProps = {
  amount: string;
  onPressKey: (key: string) => void;
};

export function TransactionAmountCard({ amount, onPressKey }: TransactionAmountCardProps) {
  return (
    <View style={styles.amountCard}>
      <Text style={styles.label}>Amount</Text>
      <View style={styles.amountRow}>
        <Text style={styles.amountCurrency}>$</Text>
        <Text style={styles.amountValue}>{amount || '0.00'}</Text>
        <View style={styles.amountTag}>
          <Text style={styles.amountTagText}>USD</Text>
        </View>
      </View>
      <TransactionKeypad onPressKey={onPressKey} />
    </View>
  );
}
