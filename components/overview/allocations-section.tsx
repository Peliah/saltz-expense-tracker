import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { ComponentProps } from 'react';
import type { DimensionValue } from 'react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

type AllocationCategory = {
  id: string;
  title: string;
  spent: string;
  remaining: string;
  progress: number;
  fillColor: '#00327D' | '#BA1A1A';
  remainingColor: '#434653' | '#BA1A1A';
  icon: IconName;
};

const CATEGORIES: AllocationCategory[] = [
  {
    id: 'transport',
    title: 'Transport',
    spent: '$320',
    remaining: '$380 LEFT',
    progress: 0.4499,
    fillColor: '#00327D',
    remainingColor: '#434653',
    icon: 'directions-car',
  },
  {
    id: 'dining',
    title: 'Dining Out',
    spent: '$485',
    remaining: '$15 LEFT',
    progress: 0.8,
    fillColor: '#BA1A1A',
    remainingColor: '#BA1A1A',
    icon: 'restaurant',
  },
  {
    id: 'groceries',
    title: 'Groceries',
    spent: '$250',
    remaining: '$50 LEFT',
    progress: 0.4499,
    fillColor: '#00327D',
    remainingColor: '#434653',
    icon: 'shopping-cart',
  },
  {
    id: 'utilities',
    title: 'Utilities',
    spent: '$150',
    remaining: '$100 LEFT',
    progress: 0.8,
    fillColor: '#BA1A1A',
    remainingColor: '#BA1A1A',
    icon: 'build',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    spent: '$200',
    remaining: '$100 LEFT',
    progress: 0.4499,
    fillColor: '#00327D',
    remainingColor: '#434653',
    icon: 'movie',
  },
  {
    id: 'transportation',
    title: 'Transportation',
    spent: '$100',
    remaining: '$200 LEFT',
    progress: 0.8,
    fillColor: '#BA1A1A',
    remainingColor: '#BA1A1A',
    icon: 'directions-bus',
  },
];

type AllocationsSectionProps = {
  onPressViewAll?: () => void;
};

function AllocationCard({ item, isLast }: { item: AllocationCategory; isLast: boolean }) {
  const fillWidth = `${Math.round(item.progress * 100)}%` as DimensionValue;

  return (
    <View style={[styles.allocationCard, !isLast && styles.allocationCardSpacing]}>
      <View style={styles.allocationIconCircle}>
        <MaterialIcons name={item.icon} size={18} color="#00327D" />
      </View>
      <Text style={styles.allocationCategoryName} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.allocationSpent}>{item.spent}</Text>
      <View style={styles.allocationProgressTrack}>
        <View style={[styles.allocationProgressFill, { width: fillWidth, backgroundColor: item.fillColor }]} />
      </View>
      <Text style={[styles.allocationRemaining, { color: item.remainingColor }]}>{item.remaining}</Text>
    </View>
  );
}

export function AllocationsSection({ onPressViewAll }: AllocationsSectionProps) {
  return (
    <View style={styles.allocationsSection}>
      <View style={styles.allocationsHeaderRow}>
        <Text style={styles.allocationsTitle}>Allocations</Text>
        <Pressable onPress={onPressViewAll} hitSlop={8}>
          <Text style={styles.allocationsViewAll}>View All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.allocationsScrollContent}
        decelerationRate="fast"
      >
        {CATEGORIES.map((item, index) => (
          <AllocationCard key={item.id} item={item} isLast={index === CATEGORIES.length - 1} />
        ))}
      </ScrollView>
    </View>
  );
}
