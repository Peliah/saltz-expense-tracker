import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

type MonthlyOverviewSectionProps = {
  title?: string;
  spent?: number;
  budget?: number;
};

export function MonthlyOverviewSection({ title = 'Monthly Budgets', spent = 4280, budget = 6700 }: MonthlyOverviewSectionProps) {
  const used = budget > 0 ? Math.min(100, Math.round((spent / budget) * 100)) : 0;
  return (
    <View style={styles.monthlyOverviewSection}>
      <View style={styles.monthlyOverviewContent}>
        <Text style={styles.monthlyOverviewEyebrow}>Monthly Overview</Text>
        <Text style={styles.monthlyOverviewTitle}>{title}</Text>
        <Text style={styles.monthlyOverviewBody}>
          You&apos;ve utilized {used}% of your total monthly allowance. Your trajectory suggests you&apos;ll remain within
          limits by month-end.
        </Text>
      </View>

      <View style={styles.monthlyOverviewSpentCard}>
        <View style={styles.monthlyOverviewSpentHeader}>
          <Text style={styles.monthlyOverviewSpentLabel}>Total Spent</Text>
          <Text style={styles.monthlyOverviewSpentAmount}>${spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.monthlyOverviewTrack}>
          <LinearGradient
            colors={['#00327D', '#0047AB']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.monthlyOverviewFill, { width: `${used}%` }]}
          />
        </View>
        <Text style={styles.monthlyOverviewMeta}>
          of ${budget.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total budget
        </Text>
      </View>
    </View>
  );
}
