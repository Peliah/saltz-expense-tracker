import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

export type CategorySummaryItem = {
  id: string;
  name: string;
  budget: string;
  left: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  progress: number;
  tone: 'danger' | 'primary';
};

const CATEGORY_SUMMARY_ITEMS: CategorySummaryItem[] = [
  { id: 'utilities', name: 'Utilities', budget: '$150', left: '$100 LEFT', icon: 'bolt', progress: 0.8, tone: 'danger' },
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    budget: '$120',
    left: '$30 LEFT',
    icon: 'favorite',
    progress: 0.45,
    tone: 'primary',
  },
  { id: 'clothing', name: 'Clothing', budget: '$180', left: '$60 LEFT', icon: 'checkroom', progress: 0.45, tone: 'primary' },
];

type CategorySummarySectionProps = {
  items?: CategorySummaryItem[];
  onPressViewAll?: () => void;
  onPressCategory?: (categoryId: string) => void;
};

export function CategorySummarySection({ items = CATEGORY_SUMMARY_ITEMS, onPressViewAll, onPressCategory }: CategorySummarySectionProps) {
  return (
    <View style={styles.categorySummarySection}>
      <View style={styles.categorySummaryHeader}>
        <Text style={styles.categorySummaryTitle}>Categories</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="View all categories"
          onPress={onPressViewAll}
          style={styles.categorySummaryViewAllButton}
        >
          <Text style={styles.categorySummaryViewAllText}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.categorySummaryList}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            accessibilityRole="button"
            accessibilityLabel={item.name}
            onPress={() => onPressCategory?.(item.id)}
            style={styles.categorySummaryCard}
          >
            <View style={styles.categorySummaryIconWrap}>
              <MaterialIcons name={item.icon} size={16} color="#00327D" />
            </View>

            <View style={styles.categorySummaryBody}>
              <Text style={styles.categorySummaryName}>{item.name}</Text>
              <View style={styles.categorySummaryTrack}>
                <View
                  style={[
                    styles.categorySummaryFill,
                    { width: `${Math.max(0, Math.min(100, item.progress * 100))}%` },
                    item.tone === 'danger' ? styles.categorySummaryFillDanger : styles.categorySummaryFillPrimary,
                  ]}
                />
              </View>
              <View style={styles.categorySummaryBottomRow}>
                <Text style={styles.categorySummaryBudget}>{item.budget}</Text>
                <Text style={[styles.categorySummaryLeft, item.tone === 'danger' ? styles.categorySummaryLeftDanger : styles.categorySummaryLeftNeutral]}>
                  {item.left}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
