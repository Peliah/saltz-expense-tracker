import { addTransaction } from '@/lib/repositories/transactions-repository';
import type { Transaction } from '@/lib/types/domain';
import { bumpEntityVersion } from '@/store/entity-store';

export async function createTransaction(input: Transaction): Promise<void> {
  await addTransaction(input);
  bumpEntityVersion('transactions');
}
