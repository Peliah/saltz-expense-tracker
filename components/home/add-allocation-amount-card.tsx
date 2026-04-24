import { TransactionKeypad } from '@/components/home/transaction-keypad';
import { addAllocationStyles as styles } from '@/stylesheets/add-allocation-stylesheet';
import { Pressable, Text, TextInput, View } from 'react-native';

type AddAllocationAmountCardProps = {
  amount: string;
  showKeypad: boolean;
  onChangeAmount: (value: string) => void;
  onPressKey: (key: string) => void;
  onContinue: () => void;
  onFocusAmount: () => void;
};

export function AddAllocationAmountCard({ amount, showKeypad, onChangeAmount, onPressKey, onContinue, onFocusAmount }: AddAllocationAmountCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Amount</Text>
      <View>
        <View style={styles.amountTag}>
          <Text style={styles.amountTagText}>USD</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountSymbol}>$</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={onChangeAmount}
            keyboardType="decimal-pad"
            showSoftInputOnFocus={false}
            onFocus={onFocusAmount}
            placeholder="0.00"
            placeholderTextColor="#00327D"
          />
        </View>
      </View>
      {showKeypad ? <TransactionKeypad onPressKey={onPressKey} /> : null}
      <Pressable style={styles.continueButton} onPress={onContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </Pressable>
    </View>
  );
}
