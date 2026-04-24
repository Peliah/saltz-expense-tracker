import { AllocationCard } from '@/components/home/allocation-card';
import { AllocationFilterTabs } from '@/components/home/allocation-filter-tabs';
import { ALLOCATIONS, ALLOCATION_FILTERS, type AllocationFilter } from '@/components/home/allocation-types';
import { HomeTopHeader } from '@/components/home/home-top-header';
import { NewAllocationCard } from '@/components/home/new-allocation-card';
import { allocationStyles as styles } from '@/stylesheets/allocation-stylesheet';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllocationsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<AllocationFilter>('All');

  const filteredAllocations = useMemo(() => {
    if (activeFilter === 'All') return ALLOCATIONS;
    return ALLOCATIONS.filter((item) => item.filters.includes(activeFilter));
  }, [activeFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <HomeTopHeader title="Allocation" />
        <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
          <AllocationFilterTabs filters={ALLOCATION_FILTERS} activeFilter={activeFilter} onChangeFilter={setActiveFilter} />

          {filteredAllocations.map((item) => (
            <AllocationCard
              key={item.id}
              item={item}
              onPress={() => {
                Alert.alert(item.title, `Budget: $${item.budget.toLocaleString('en-US')}`);
              }}
            />
          ))}

          <NewAllocationCard
            onPressQuickAdd={() => {
              router.push('/(home)/add-allocation');
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
