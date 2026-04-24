import { getJson, setJson } from '@/lib/storage/app-storage';
import { APP_STORAGE_KEYS } from '@/lib/storage/keys';
import { DEFAULT_TRANSACTIONS } from '@/lib/storage/seeds';
import type { Transaction } from '@/lib/types/domain';

export async function listTransactions(): Promise<Transaction[]> {
  return getJson<Transaction[]>(APP_STORAGE_KEYS.transactions, DEFAULT_TRANSACTIONS);
}

export async function saveTransactions(items: Transaction[]): Promise<void> {
  await setJson(APP_STORAGE_KEYS.transactions, items);
}

export async function addTransaction(item: Transaction): Promise<void> {
  const items = await listTransactions();
  await saveTransactions([item, ...items]);
}
