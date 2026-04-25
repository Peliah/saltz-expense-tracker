import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';

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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const parsedDate = useMemo(() => {
    if (!transactionDate) return new Date();
    const date = new Date(transactionDate);
    return Number.isNaN(date.getTime()) ? new Date() : date;
  }, [transactionDate]);

  const dateLabel = useMemo(() => {
    if (!transactionDate) return '';
    const date = new Date(transactionDate);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  }, [transactionDate]);

  const onPickDate = (_event: unknown, selectedDate: Date) => {
    onChangeTransactionDate(selectedDate.toISOString());
    // Android date picker is a modal; hide it after selection.
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
  };

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
      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 16, color: dateLabel ? '#1F2937' : '#C4C6CF' }}>
          {dateLabel || '11/24/2023'}
        </Text>
      </Pressable>
      {showDatePicker ? (
        <DateTimePicker
          value={parsedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onValueChange={onPickDate}
          onDismiss={() => setShowDatePicker(false)}
        />
      ) : null}
      <Text style={styles.label}>Add Allocation</Text>
      <Pressable style={styles.input} onPress={onToggleAllocation}>
        <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 16, color: '#74777F' }}>{allocation}</Text>
      </Pressable>
    </View>
  );
}
