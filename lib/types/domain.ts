export type TransactionType = 'deposit' | 'withdraw';

export type TransactionMode = 'manual' | 'capture' | 'upload';

export type Timeframe = 'Daily' | 'Weekly' | 'Monthly';

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  createdAt: string;
};

export type Allocation = {
  id: string;
  categoryId: string;
  budget: number;
  timeframe: Timeframe;
  alertPercent: number;
  recurring: boolean;
  createdAt: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  mode: TransactionMode;
  title: string;
  amount: number;
  categoryId: string;
  allocationId?: string;
  notes?: string;
  occurredAt: string;
  createdAt: string;
};

export type SecuritySettings = {
  biometricsEnabled: boolean;
  passwordUpdatedAt: string | null;
  identityVerifiedAt: string | null;
};
