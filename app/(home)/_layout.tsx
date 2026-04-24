import { TransactionDraftProvider } from '@/hooks/use-transaction-draft';
import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <TransactionDraftProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="add-transaction" />
        <Stack.Screen name="add-allocation" />
        <Stack.Screen name="allocation-ledger" />
        <Stack.Screen name="allocations" />
        <Stack.Screen name="recent-ledgers" />
      </Stack>
    </TransactionDraftProvider>
  );
}
