import { CategoryPickerCard } from '@/components/budget/category-picker-card';
import { CategorySummarySection } from '@/components/budget/category-summary-section';
import { MonthlyBurnCard } from '@/components/budget/monthly-burn-card';
import { SpendingVelocityCard } from '@/components/budget/spending-velocity-card';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <MonthlyBurnCard />
        <SpendingVelocityCard />
        <CategoryPickerCard
          onSelectCategory={(categoryId) => {
            if (categoryId === 'new') {
              router.push('/(budgets)/new-category');
              return;
            }
            Alert.alert('Category selected', `Active category: ${categoryId}`);
          }}
          onPressAddCategory={() => {
            router.push('/(budgets)/new-category');
          }}
        />
        <CategorySummarySection
          onPressViewAll={() => {
            router.push('/(budgets)/categories');
          }}
          onPressCategory={(categoryId) => {
            Alert.alert('Category details', `Open details for: ${categoryId}`);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
