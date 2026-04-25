import { TransactionAmountCard } from '@/components/home/transaction-amount-card';
import { TransactionDetailsCard } from '@/components/home/transaction-details-card';
import { TransactionNotesCard } from '@/components/home/transaction-notes-card';
import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { Pressable, Text, View } from 'react-native';

type Category = {
  id: string;
  name: string;
};

type AddTransactionManualModeProps = {
  showAllocationList: boolean;
  categories: Category[];
  transactionName: string;
  transactionDate: string;
  allocation: string;
  amount: string;
  notes: string;
  onSelectAllocation: (value: string) => void;
  onToggleAllocationList: () => void;
  onChangeTransactionName: (value: string) => void;
  onChangeTransactionDate: (value: string) => void;
  onChangeNotes: (value: string) => void;
  onPressAmountKey: (key: string) => void;
};

export function AddTransactionManualMode({
  showAllocationList,
  categories,
  transactionName,
  transactionDate,
  allocation,
  amount,
  notes,
  onSelectAllocation,
  onToggleAllocationList,
  onChangeTransactionName,
  onChangeTransactionDate,
  onChangeNotes,
  onPressAmountKey,
}: AddTransactionManualModeProps) {
  return (
    <>
      {showAllocationList ? (
        <View style={styles.allocationList}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.allocationItem}
              onPress={() => {
                onSelectAllocation(category.name);
              }}
            >
              <Text style={styles.allocationItemText}>{category.name}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}

      <TransactionDetailsCard
        transactionName={transactionName}
        transactionDate={transactionDate}
        allocation={allocation}
        onChangeTransactionName={onChangeTransactionName}
        onChangeTransactionDate={onChangeTransactionDate}
        onToggleAllocation={onToggleAllocationList}
      />

      <TransactionAmountCard amount={amount} onPressKey={onPressAmountKey} />

      <TransactionNotesCard notes={notes} onChangeNotes={onChangeNotes} />
    </>
  );
}
