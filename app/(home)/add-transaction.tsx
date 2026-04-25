import { AddTransactionCaptureMode } from '@/components/home/add-transaction-capture-mode';
import { AddTransactionManualMode } from '@/components/home/add-transaction-manual-mode';
import { AddTransactionUploadMode } from '@/components/home/add-transaction-upload-mode';
import { HomeTopHeader } from '@/components/home/home-top-header';
import { TransactionModeToggle, type TransactionMode } from '@/components/home/transaction-mode-toggle';
import { useCategories } from '@/hooks/use-categories';
import { useSecuritySettings } from '@/hooks/use-security-settings';
import { useTransactionDraft } from '@/hooks/use-transaction-draft';
import { useTransactions } from '@/hooks/use-transactions';
import type { TransactionType } from '@/lib/types/domain';
import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const MODES: { id: TransactionMode; label: string }[] = [
  { id: 'manual', label: 'Manual' },
  { id: 'capture', label: 'Capture' },
  { id: 'upload', label: 'Upload Data' },
];

export default function AddTransactionScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string; type?: string }>();
  const { categories } = useCategories();
  const { settings } = useSecuritySettings();
  const { create } = useTransactions();
  const {
    transactionName,
    transactionDate,
    allocation,
    amount,
    notes,
    mode,
    setTransactionName,
    setTransactionDate,
    setAllocation,
    setNotes,
    setMode,
    transactionType,
    setTransactionType,
    appendAmount,
    backspaceAmount,
    resetDraft,
  } = useTransactionDraft();

  const [showAllocationList, setShowAllocationList] = useState(false);
  const [toggleWidth, setToggleWidth] = useState(0);
  const indicatorX = useRef(new Animated.Value(0)).current;

  const modeIndex = useMemo(() => Math.max(0, MODES.findIndex((entry) => entry.id === mode)), [mode]);
  const tabWidth = toggleWidth > 0 ? (toggleWidth - 8) / MODES.length : 0;

  useEffect(() => {
    const targetMode = params.tab;
    if (targetMode === 'manual' || targetMode === 'capture' || targetMode === 'upload') {
      setMode(targetMode);
    }
  }, [params.tab, setMode]);

  useEffect(() => {
    const targetType = params.type;
    if (targetType === 'deposit' || targetType === 'withdraw') {
      setTransactionType(targetType as TransactionType);
    }
  }, [params.type, setTransactionType]);

  useEffect(() => {
    if (!tabWidth) return;
    Animated.spring(indicatorX, {
      toValue: modeIndex * tabWidth,
      useNativeDriver: true,
      damping: 20,
      stiffness: 220,
      mass: 0.7,
    }).start();
  }, [indicatorX, modeIndex, tabWidth]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}
      >
        <HomeTopHeader title="Add Transaction" />

        <TransactionModeToggle
          modes={MODES}
          activeMode={mode}
          tabWidth={tabWidth}
          indicatorX={indicatorX}
          onSelectMode={setMode}
          onLayout={setToggleWidth}
        />

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.main}
          bounces
          nestedScrollEnabled
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {mode === 'manual' ? (
            <AddTransactionManualMode
              showAllocationList={showAllocationList}
              categories={categories}
              transactionName={transactionName}
              transactionDate={transactionDate}
              allocation={allocation}
              amount={amount}
              notes={notes}
              onSelectAllocation={(value) => {
                setAllocation(value);
                setShowAllocationList(false);
              }}
              onToggleAllocationList={() => setShowAllocationList((prev) => !prev)}
              onChangeTransactionName={setTransactionName}
              onChangeTransactionDate={setTransactionDate}
              onChangeNotes={setNotes}
              onPressAmountKey={(key) => {
                if (key === '⌫') {
                  backspaceAmount();
                  return;
                }
                appendAmount(key);
              }}
            />
          ) : null}
          {mode === 'capture' ? <AddTransactionCaptureMode /> : null}
          {mode === 'upload' ? <AddTransactionUploadMode /> : null}
        </ScrollView>

        <View style={[styles.fabBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <View style={{ paddingBottom: 8, alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Manrope-SemiBold', color: '#00327D' }}>
              {transactionType === 'deposit' ? 'Deposit' : 'Withdraw'}
            </Text>
          </View>
          <Pressable
            style={styles.primaryAction}
            onPress={async () => {
              if (mode === 'capture' || mode === 'upload') {
                router.push({
                  pathname: '/(home)/captured-data',
                  params: { source: mode },
                });
                return;
              }
              if (!amount) {
                Alert.alert('Missing amount', 'Please enter a valid amount.');
                return;
              }
              if (transactionType === 'withdraw' && Number(amount) >= 1000 && !settings?.identityVerifiedAt) {
                Alert.alert('Verification required', 'Please complete identity verification before large withdrawals.');
                router.push('/(auth)/identity-verification');
                return;
              }
              const category = categories.find((item) => item.name === allocation) ?? categories[0];
              await create({
                id: `tx-${Date.now()}`,
                type: transactionType,
                mode,
                title: transactionName || 'Transaction',
                amount: Number(amount),
                categoryId: category?.id ?? 'other',
                notes,
                occurredAt: transactionDate ? new Date(transactionDate).toISOString() : new Date().toISOString(),
                createdAt: new Date().toISOString(),
              });
              resetDraft();
              router.push('/(home)/recent-ledgers');
            }}
          >
            <Text style={styles.primaryActionText}>Save Up!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
