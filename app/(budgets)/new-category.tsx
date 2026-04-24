import { HomeTopHeader } from '@/components/home/home-top-header';
import { TransactionKeypad } from '@/components/home/transaction-keypad';
import { useCategories } from '@/hooks/use-categories';
import { newCategoryStyles as styles } from '@/stylesheets/new-category-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function normalizeAmount(value: string) {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parts = cleaned.split('.');
  if (parts.length <= 1) return cleaned;
  return `${parts[0]}.${parts.slice(1).join('')}`;
}

export default function NewCategoryScreen() {
  const router = useRouter();
  const { create } = useCategories();
  const [categoryName, setCategoryName] = useState('');
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [showKeypad, setShowKeypad] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 16 : 0}>
        <HomeTopHeader title="New Category" />
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.label}>Category Name</Text>
            <View style={styles.inputWrap}>
              <MaterialIcons name="person-outline" size={14} color="#74777F" />
              <TextInput
                value={categoryName}
                onChangeText={setCategoryName}
                placeholder="John Doe"
                placeholderTextColor="#C4C6CF"
                style={styles.input}
              />
            </View>
            <View style={styles.notesCard}>
              <Text style={styles.label}>Notes</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="What was this for?"
                placeholderTextColor="#6B7280"
                multiline
                style={styles.notesInput}
              />
            </View>
          </View>

          <View style={styles.amountCard}>
            <View style={styles.amountTag}>
              <Text style={styles.amountTagText}>USD</Text>
            </View>
            <Text style={styles.label}>Category Budget</Text>
            <Pressable
              onPress={() => {
                setShowKeypad(true);
              }}
            >
              <View style={styles.amountRow}>
                <Text style={styles.amountCurrency}>$</Text>
                <Text style={styles.amountValue}>{amount || '0.00'}</Text>
              </View>
            </Pressable>
            {showKeypad ? (
              <TransactionKeypad
                onPressKey={(key) => {
                  if (key === '⌫') {
                    setAmount((prev) => prev.slice(0, -1));
                    return;
                  }
                  setAmount((prev) => normalizeAmount(`${prev}${key}`));
                }}
              />
            ) : null}
            <Pressable style={styles.continueButton} onPress={() => setShowKeypad(true)}>
              <Text style={styles.continueText}>Continue</Text>
            </Pressable>
          </View>
        </ScrollView>

        <View style={styles.actionBar}>
          <Pressable
            style={styles.primaryButton}
            onPress={async () => {
              if (!categoryName.trim()) {
                Alert.alert('Missing name', 'Please enter a category name.');
                return;
              }
              await create({
                id: `cat-${Date.now()}`,
                name: categoryName.trim(),
                icon: 'apps',
                color: '#00327D',
                createdAt: new Date().toISOString(),
              });
              Alert.alert('Saved', 'New category saved.', [{ text: 'OK', onPress: () => router.replace('/(budgets)/categories') }]);
            }}
          >
            <Text style={styles.primaryButtonText}>Save Up!</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
