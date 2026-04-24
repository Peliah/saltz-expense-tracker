import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export type CategoryItem = {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  active?: boolean;
};

const CATEGORIES: CategoryItem[] = [
  { id: 'food', label: 'Food', icon: 'restaurant' },
  { id: 'travel', label: 'Travel', icon: 'flight' },
  { id: 'salary', label: 'Salary', icon: 'payments' },
  { id: 'shop', label: 'Shop', icon: 'shopping-bag' },
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'new', label: 'New', icon: 'add' },
];

type CategoryPickerCardProps = {
  categories?: CategoryItem[];
  onSelectCategory?: (categoryId: string) => void;
  onPressAddCategory?: () => void;
};

export function CategoryPickerCard({ categories = CATEGORIES, onSelectCategory, onPressAddCategory }: CategoryPickerCardProps) {
  const [activeCategoryId, setActiveCategoryId] = useState('food');

  return (
    <View style={styles.categorySection}>
      <View style={styles.categoryCard}>
        <Text style={styles.categoryLabel}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollerContent}
          style={styles.categoryScroller}
        >
          {categories.map((item) => (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              onPress={() => {
                setActiveCategoryId(item.id);
                onSelectCategory?.(item.id);
              }}
              style={[
                styles.categoryTile,
                activeCategoryId === item.id ? styles.categoryTileActive : styles.categoryTileInactive,
              ]}
            >
              <MaterialIcons
                name={item.icon}
                size={20}
                color={activeCategoryId === item.id ? '#00327D' : '#434653'}
                style={styles.categoryTileIcon}
              />
              <Text
                style={[
                  styles.categoryTileText,
                  activeCategoryId === item.id ? styles.categoryTileTextActive : styles.categoryTileTextInactive,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add New Category"
        onPress={onPressAddCategory}
        style={styles.addCategoryButtonOuter}
      >
        <LinearGradient
          colors={['#00327D', '#0047AB']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.addCategoryButton}
        >
          <MaterialIcons name="add" size={14} color="#FFFFFF" />
          <Text style={styles.addCategoryText}>Add New Category</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
}
