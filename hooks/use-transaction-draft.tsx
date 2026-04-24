import React, { createContext, useContext, useMemo, useState } from 'react';

type TransactionMode = 'manual' | 'capture' | 'upload';
type TransactionType = 'deposit' | 'withdraw';

type TransactionDraftState = {
  transactionName: string;
  transactionDate: string;
  allocation: string;
  amount: string;
  notes: string;
  mode: TransactionMode;
  transactionType: TransactionType;
};

type TransactionDraftContextValue = TransactionDraftState & {
  setTransactionName: (value: string) => void;
  setTransactionDate: (value: string) => void;
  setAllocation: (value: string) => void;
  setAmount: (value: string) => void;
  setNotes: (value: string) => void;
  setMode: (value: TransactionMode) => void;
  setTransactionType: (value: TransactionType) => void;
  appendAmount: (value: string) => void;
  backspaceAmount: () => void;
  resetDraft: () => void;
};

const TransactionDraftContext = createContext<TransactionDraftContextValue | null>(null);

const INITIAL_STATE: TransactionDraftState = {
  transactionName: '',
  transactionDate: '',
  allocation: 'Dinner Out',
  amount: '',
  notes: '',
  mode: 'manual',
  transactionType: 'withdraw',
};

export function TransactionDraftProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TransactionDraftState>(INITIAL_STATE);

  const value = useMemo<TransactionDraftContextValue>(
    () => ({
      ...state,
      setTransactionName: (transactionName) => setState((prev) => ({ ...prev, transactionName })),
      setTransactionDate: (transactionDate) => setState((prev) => ({ ...prev, transactionDate })),
      setAllocation: (allocation) => setState((prev) => ({ ...prev, allocation })),
      setAmount: (amount) => setState((prev) => ({ ...prev, amount })),
      setNotes: (notes) => setState((prev) => ({ ...prev, notes })),
      setMode: (mode) => setState((prev) => ({ ...prev, mode })),
      setTransactionType: (transactionType) => setState((prev) => ({ ...prev, transactionType })),
      appendAmount: (digit) =>
        setState((prev) => {
          const next = `${prev.amount}${digit}`;
          return { ...prev, amount: normalizeAmount(next) };
        }),
      backspaceAmount: () =>
        setState((prev) => {
          const trimmed = prev.amount.slice(0, -1);
          return { ...prev, amount: normalizeAmount(trimmed) };
        }),
      resetDraft: () => setState(INITIAL_STATE),
    }),
    [state],
  );

  return <TransactionDraftContext.Provider value={value}>{children}</TransactionDraftContext.Provider>;
}

export function useTransactionDraft() {
  const ctx = useContext(TransactionDraftContext);
  if (!ctx) {
    throw new Error('useTransactionDraft must be used within TransactionDraftProvider');
  }
  return ctx;
}

function normalizeAmount(value: string) {
  const clean = value.replace(/[^0-9.]/g, '');
  const parts = clean.split('.');
  if (parts.length <= 1) return clean;
  return `${parts[0]}.${parts.slice(1).join('').replace(/\./g, '')}`;
}
