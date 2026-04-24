import { useTransactionDraft } from '@/hooks/use-transaction-draft';
import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Mode = 'manual' | 'capture' | 'upload';

const MODES: { id: Mode; label: string }[] = [
  { id: 'manual', label: 'Manual' },
  { id: 'capture', label: 'Capture' },
  { id: 'upload', label: 'Upload Data' },
];

const ALLOCATIONS = ['Dinner Out', 'Groceries', 'Water Refill', 'Fruits', 'Soups'];
const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '⌫'],
];

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
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios-new" size={14} color="#00327D" />
          </Pressable>
          <Text style={styles.title}>Add Transaction</Text>
        </View>

        <View
          style={styles.modeToggle}
          onLayout={(event) => {
            setToggleWidth(event.nativeEvent.layout.width);
          }}
        >
          {tabWidth ? (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.modeIndicator,
                {
                  width: tabWidth,
                  transform: [{ translateX: indicatorX }],
                },
              ]}
            />
          ) : null}
          {MODES.map((item) => (
            <Pressable key={item.id} onPress={() => setMode(item.id)} style={styles.modeButton}>
              <Text style={[styles.modeText, mode === item.id && styles.modeTextActive]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

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

              <View style={styles.card}>
                <Text style={styles.label}>Add Transaction</Text>
                <TextInput
                  style={styles.input}
                  value={transactionName}
                  onChangeText={setTransactionName}
                  placeholder="John Doe"
                  placeholderTextColor="#C4C6CF"
                />
                <Text style={styles.label}>Add Transaction Date</Text>
                <TextInput
                  style={styles.input}
                  value={transactionDate}
                  onChangeText={setTransactionDate}
                  placeholder="11/24/2023"
                  placeholderTextColor="#C4C6CF"
                />
                <Text style={styles.label}>Add Allocation</Text>
                <Pressable style={styles.input} onPress={() => setShowAllocationList((prev) => !prev)}>
                  <Text style={{ fontFamily: 'Inter-Regular', fontSize: 16, color: '#74777F' }}>{allocation}</Text>
                </Pressable>
              </View>

              <View style={styles.amountCard}>
                <Text style={styles.label}>Amount</Text>
                <View style={styles.amountRow}>
                  <Text style={styles.amountCurrency}>$</Text>
                  <Text style={styles.amountValue}>{amount || '0.00'}</Text>
                  <View style={styles.amountTag}>
                    <Text style={styles.amountTagText}>USD</Text>
                  </View>
                </View>
                <View style={styles.keypad}>
                  {KEYS.map((row) => (
                    <View key={row.join('-')} style={styles.keypadRow}>
                      {row.map((key) => (
                        <Pressable
                          key={key}
                          style={styles.key}
                          onPress={() => {
                            if (key === '⌫') {
                              backspaceAmount();
                              return;
                            }
                            appendAmount(key);
                          }}
                        >
                          <Text style={styles.keyText}>{key}</Text>
                        </Pressable>
                      ))}
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.notesCard}>
                <Text style={styles.label}>Notes</Text>
                <TextInput
                  style={styles.notesInput}
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  placeholder="What was this for?"
                  placeholderTextColor="#6B7280"
                />
              </View>
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
              Alert.alert('Saved', 'Transaction flow action complete.');
            }}
          >
            <Text style={styles.primaryActionText}>Save Up!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
