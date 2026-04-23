import { CategoryPickerCard } from '@/components/budget/category-picker-card';
import { CategorySummarySection } from '@/components/budget/category-summary-section';
import { MonthlyBurnCard } from '@/components/budget/monthly-burn-card';
import { SpendingVelocityCard } from '@/components/budget/spending-velocity-card';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <MonthlyBurnCard />
        <SpendingVelocityCard />
        <CategoryPickerCard
          onSelectCategory={(categoryId) => {
            Alert.alert('Category selected', `Active category: ${categoryId}`);
          }}
          onPressAddCategory={() => {
            Alert.alert('Add category', 'Category creation flow can be connected here.');
          }}
        />
        <CategorySummarySection
          onPressViewAll={() => {
            Alert.alert('Categories', 'Opening full category list...');
          }}
          onPressCategory={(categoryId) => {
            Alert.alert('Category details', `Open details for: ${categoryId}`);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
