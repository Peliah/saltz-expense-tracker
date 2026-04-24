import { TransactionAmountCard } from '@/components/home/transaction-amount-card';
import { TransactionDetailsCard } from '@/components/home/transaction-details-card';
import { HomeTopHeader } from '@/components/home/home-top-header';
import { TransactionModeToggle, type TransactionMode } from '@/components/home/transaction-mode-toggle';
import { TransactionNotesCard } from '@/components/home/transaction-notes-card';
import { useTransactionDraft } from '@/hooks/use-transaction-draft';
import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MODES: { id: TransactionMode; label: string }[] = [
  { id: 'manual', label: 'Manual' },
  { id: 'capture', label: 'Capture' },
  { id: 'upload', label: 'Upload Data' },
];

const ALLOCATIONS = ['Dinner Out', 'Groceries', 'Water Refill', 'Fruits', 'Soups'];

export default function AddTransactionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
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
    appendAmount,
    backspaceAmount,
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
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
            <>
              {showAllocationList ? (
                <View style={styles.allocationList}>
                  {ALLOCATIONS.map((item) => (
                    <Pressable
                      key={item}
                      style={styles.allocationItem}
                      onPress={() => {
                        setAllocation(item);
                        setShowAllocationList(false);
                      }}
                    >
                      <Text style={styles.allocationItemText}>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              ) : null}

              <TransactionDetailsCard
                transactionName={transactionName}
                transactionDate={transactionDate}
                allocation={allocation}
                onChangeTransactionName={setTransactionName}
                onChangeTransactionDate={setTransactionDate}
                onToggleAllocation={() => setShowAllocationList((prev) => !prev)}
              />

              <TransactionAmountCard
                amount={amount}
                onPressKey={(key) => {
                  if (key === '⌫') {
                    backspaceAmount();
                    return;
                  }
                  appendAmount(key);
                }}
              />

              <TransactionNotesCard notes={notes} onChangeNotes={setNotes} />
            </>
          ) : (
            <View style={styles.captureCard}>
              <View style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: '#D5E0F8', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name={mode === 'capture' ? 'document-scanner' : 'upload-file'} size={26} color="#00327D" />
              </View>
              <Text style={styles.captureTitle}>
                {mode === 'capture' ? 'Capture\nsomething\nFigure this one out!!!' : 'Result of captured\nData\nFigure this one out too !!!'}
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.fabBar}>
          <Pressable
            style={styles.primaryAction}
            onPress={() => {
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
