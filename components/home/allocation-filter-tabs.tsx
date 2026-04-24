import type { AllocationFilter } from '@/components/home/allocation-types';
import { allocationStyles as styles } from '@/stylesheets/allocation-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, ScrollView, Text, View } from 'react-native';

type AllocationFilterTabsProps = {
  filters: AllocationFilter[];
  activeFilter: AllocationFilter;
  onChangeFilter: (next: AllocationFilter) => void;
};

export function AllocationFilterTabs({ filters, activeFilter, onChangeFilter }: AllocationFilterTabsProps) {
  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContent}
      style={styles.filtersContainer}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <Pressable key={filter} style={[styles.filterButton, isActive && styles.filterButtonActive]} onPress={() => onChangeFilter(filter)}>
            <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter}</Text>
          </Pressable>
        );
      })}
      <View style={styles.moreFade}>
        <MaterialIcons name="chevron-right" size={16} color="#737784" />
      </View>
    </ScrollView>
  );
}
