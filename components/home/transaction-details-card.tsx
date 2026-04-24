import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { Pressable, Text, TextInput, View } from 'react-native';

type TransactionDetailsCardProps = {
  transactionName: string;
  transactionDate: string;
  allocation: string;
  onChangeTransactionName: (value: string) => void;
  onChangeTransactionDate: (value: string) => void;
  onToggleAllocation: () => void;
};

export function TransactionDetailsCard({
  transactionName,
  transactionDate,
  allocation,
  onChangeTransactionName,
  onChangeTransactionDate,
  onToggleAllocation,
}: TransactionDetailsCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Add Transaction</Text>
      <TextInput
        style={styles.input}
        value={transactionName}
        onChangeText={onChangeTransactionName}
        placeholder="John Doe"
        placeholderTextColor="#C4C6CF"
      />
      <Text style={styles.label}>Add Transaction Date</Text>
      <TextInput
        style={styles.input}
        value={transactionDate}
        onChangeText={onChangeTransactionDate}
        placeholder="11/24/2023"
        placeholderTextColor="#C4C6CF"
      />
      <Text style={styles.label}>Add Allocation</Text>
      <Pressable style={styles.input} onPress={onToggleAllocation}>
        <Text style={{ fontFamily: 'Inter-Regular', fontSize: 16, color: '#74777F' }}>{allocation}</Text>
      </Pressable>
    </View>
  );
}
