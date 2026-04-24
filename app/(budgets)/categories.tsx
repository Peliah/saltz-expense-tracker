import { CategoryPickerCard } from '@/components/budget/category-picker-card';
import { HomeTopHeader } from '@/components/home/home-top-header';
import { NewAllocationCard } from '@/components/home/new-allocation-card';
import { useCategories } from '@/hooks/use-categories';
import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetCategoriesScreen() {
  const router = useRouter();
  const { categories } = useCategories();
  const categoryTiles = categories.map((category) => ({
    id: category.id,
    label: category.name,
    icon: category.icon as React.ComponentProps<typeof MaterialIcons>['name'],
  }));

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={{ flex: 1 }}>
        <HomeTopHeader title="Categories" />
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <CategoryPickerCard
            categories={[...categoryTiles, { id: 'new', label: 'New', icon: 'add' }]}
            onSelectCategory={(categoryId) => {
              if (categoryId === 'new') {
                router.push('/(budgets)/new-category');
                return;
              }
            }}
            onPressAddCategory={() => {
              router.push('/(budgets)/new-category');
            }}
          />

          <NewAllocationCard
            title="New Category"
            subtitle="Record a new Category"
            buttonLabel="Add Category"
            iconName="add"
            onPressQuickAdd={() => {
              router.push('/(budgets)/new-category');
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
