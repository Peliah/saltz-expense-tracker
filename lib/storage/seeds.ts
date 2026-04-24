import type { Allocation, Category, SecuritySettings, Transaction } from '@/lib/types/domain';

const now = new Date().toISOString();

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'housing', name: 'Housing', icon: 'home', color: '#00327D', createdAt: now },
  { id: 'food', name: 'Dining Out', icon: 'restaurant', color: '#00327D', createdAt: now },
  { id: 'groceries', name: 'Groceries', icon: 'shopping-basket', color: '#00327D', createdAt: now },
  { id: 'travel', name: 'Tickets', icon: 'directions-car', color: '#00327D', createdAt: now },
  { id: 'salary', name: 'Salary', icon: 'payments', color: '#0047AB', createdAt: now },
  { id: 'other', name: 'Other', icon: 'apps', color: '#586377', createdAt: now },
];

export const DEFAULT_ALLOCATIONS: Allocation[] = [
  { id: 'alloc-housing', categoryId: 'housing', budget: 2500, timeframe: 'Monthly', alertPercent: 80, recurring: true, createdAt: now },
  { id: 'alloc-food', categoryId: 'food', budget: 850, timeframe: 'Monthly', alertPercent: 80, recurring: true, createdAt: now },
  { id: 'alloc-groceries', categoryId: 'groceries', budget: 1200, timeframe: 'Monthly', alertPercent: 80, recurring: true, createdAt: now },
  { id: 'alloc-travel', categoryId: 'travel', budget: 400, timeframe: 'Monthly', alertPercent: 80, recurring: true, createdAt: now },
];

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  { id: 'tx-1', type: 'withdraw', mode: 'manual', title: 'Electricity Bill', amount: 75.8, categoryId: 'housing', allocationId: 'alloc-housing', occurredAt: now, createdAt: now },
  { id: 'tx-2', type: 'withdraw', mode: 'manual', title: 'The Gilded Fork', amount: 240.5, categoryId: 'food', allocationId: 'alloc-food', occurredAt: now, createdAt: now },
  { id: 'tx-3', type: 'withdraw', mode: 'manual', title: 'Amazon Purchase', amount: 59.99, categoryId: 'groceries', allocationId: 'alloc-groceries', occurredAt: now, createdAt: now },
  { id: 'tx-4', type: 'withdraw', mode: 'manual', title: 'Spotify Premium', amount: 9.99, categoryId: 'travel', allocationId: 'alloc-travel', occurredAt: now, createdAt: now },
  { id: 'tx-5', type: 'deposit', mode: 'manual', title: 'Dividend Payout', amount: 450.25, categoryId: 'salary', occurredAt: now, createdAt: now },
];

export const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  biometricsEnabled: true,
  passwordUpdatedAt: null,
  identityVerifiedAt: null,
};
