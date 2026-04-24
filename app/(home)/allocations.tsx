import { AllocationCard } from '@/components/home/allocation-card';
import { AllocationFilterTabs } from '@/components/home/allocation-filter-tabs';
import type { AllocationItem } from '@/components/home/allocation-types';
import { HomeTopHeader } from '@/components/home/home-top-header';
import { NewAllocationCard } from '@/components/home/new-allocation-card';
import { useAllocations } from '@/hooks/use-allocations';
import { useBudgetMetrics } from '@/hooks/use-budget-metrics';
import { useCategories } from '@/hooks/use-categories';
import { allocationStyles as styles } from '@/stylesheets/allocation-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AllocationsScreen() {
  const router = useRouter();
  const { categories } = useCategories();
  const { allocations } = useAllocations();
  const { allocationUtilization } = useBudgetMetrics();
  const filters = useMemo(() => ['All', ...categories.slice(0, 4).map((c) => c.name)] as string[], [categories]);
  const [activeFilter, setActiveFilter] = useState('All');
  const categoryById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

  const filteredAllocations = useMemo(() => {
    const base: AllocationItem[] = allocations.map((allocation) => {
      const category = categoryById.get(allocation.categoryId);
      const utilization = allocationUtilization.find((item) => item.allocationId === allocation.id);
      const usedPercent = utilization?.usedPercent ?? 0;
      const leftAmount = utilization?.leftAmount ?? allocation.budget;
      return {
        id: allocation.id,
        title: category?.name ?? 'Category',
        spent: utilization?.spent ?? 0,
        budget: allocation.budget,
        usedPercent,
        leftAmount,
        icon: (category?.icon as React.ComponentProps<typeof MaterialIcons>['name']) ?? 'account-balance-wallet',
        iconColor: '#00327D',
        iconBgColor: 'rgba(0, 50, 125, 0.05)',
        status: usedPercent >= 90 ? 'at_limit' : usedPercent >= 70 ? 'healthy' : 'on_track',
        fillType: 'solid' as const,
        fillColor: usedPercent >= 90 ? '#BA1A1A' : '#0047AB',
      };
    });
    if (activeFilter === 'All') return base;
    return base.filter((item) => item.title === activeFilter);
  }, [activeFilter, allocations, allocationUtilization, categoryById]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <HomeTopHeader title="Allocation" />
        <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
          <AllocationFilterTabs filters={filters} activeFilter={activeFilter} onChangeFilter={setActiveFilter} />

          {filteredAllocations.map((item) => (
            <AllocationCard
              key={item.id}
              item={item}
              onPress={() => {
                router.push({
                  pathname: '/(home)/allocation-ledger',
                  params: { allocationId: item.id, allocationName: item.title },
                });
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
