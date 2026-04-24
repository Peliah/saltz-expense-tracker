import { AddAllocationAmountCard } from '@/components/home/add-allocation-amount-card';
import { AddAllocationCategoryCard } from '@/components/home/add-allocation-category-card';
import { AddAllocationConfigCard } from '@/components/home/add-allocation-config-card';
import { AddAllocationNotesCard } from '@/components/home/add-allocation-notes-card';
import { HomeTopHeader } from '@/components/home/home-top-header';
import { addAllocationStyles as styles } from '@/stylesheets/add-allocation-stylesheet';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: 'food', label: 'Food', icon: 'restaurant' as const },
  { id: 'travel', label: 'Travel', icon: 'flight' as const },
  { id: 'salary', label: 'Salary', icon: 'payments' as const },
  { id: 'shop', label: 'Shop', icon: 'shopping-bag' as const },
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'other', label: 'Other', icon: 'apps' as const },
];

function normalizeAmount(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length <= 1) return cleaned;
  return `${parts[0]}.${parts.slice(1).join('')}`;
}

export default function AddAllocationScreen() {
  const [amount, setAmount] = useState('');
  const [amountFocused, setAmountFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [timeframe, setTimeframe] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly');
  const [date, setDate] = useState('11/24/2023');
  const [recurring, setRecurring] = useState(false);
  const [thresholdEnabled, setThresholdEnabled] = useState(true);
  const [notes, setNotes] = useState('');

  const showKeypad = amountFocused || amount.length > 0;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}>
        <HomeTopHeader title="Allocation" />
        <ScrollView contentContainerStyle={styles.main} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <AddAllocationAmountCard
            amount={amount}
            showKeypad={showKeypad}
            onChangeAmount={(value) => setAmount(normalizeAmount(value))}
            onPressKey={(key) => {
              if (key === '⌫') {
                setAmount((prev) => prev.slice(0, -1));
                return;
              }
              setAmount((prev) => normalizeAmount(`${prev}${key}`));
            }}
            onContinue={() => {
              Alert.alert('Continue', 'Amount captured. Continue filling details below.');
            }}
            onFocusAmount={() => setAmountFocused(true)}
          />

          <AddAllocationCategoryCard categories={CATEGORIES} selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

          <AddAllocationConfigCard
            timeframe={timeframe}
            date={date}
            recurring={recurring}
            thresholdEnabled={thresholdEnabled}
            onChangeTimeframe={setTimeframe}
            onChangeDate={setDate}
            onChangeRecurring={setRecurring}
            onChangeThresholdEnabled={setThresholdEnabled}
          />

          <AddAllocationNotesCard notes={notes} onChangeNotes={setNotes} />
        </ScrollView>

        <View style={styles.actionBar}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              Alert.alert('Saved', 'Allocation saved successfully.');
            }}
          >
            <Text style={styles.primaryButtonText}>Save Up!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
