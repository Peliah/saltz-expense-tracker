import { addAllocationStyles as styles } from '@/stylesheets/add-allocation-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type CategoryOption = {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
};

type AddAllocationCategoryCardProps = {
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
};

export function AddAllocationCategoryCard({ categories, selectedCategory, onSelectCategory }: AddAllocationCategoryCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.categoryGrid}>
        {categories.map((category) => {
          const active = selectedCategory === category.id;
          return (
            <Pressable
              key={category.id}
              style={[styles.categoryButton, active && styles.categoryButtonActive]}
              onPress={() => onSelectCategory(category.id)}
            >
              <MaterialIcons name={category.icon} size={18} color={active ? '#00327D' : '#434653'} />
              <Text style={[styles.categoryText, active && styles.categoryTextActive]}>{category.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
