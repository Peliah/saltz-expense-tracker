import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

export function MonthlyOverviewSection() {
  return (
    <View style={styles.monthlyOverviewSection}>
      <View style={styles.monthlyOverviewContent}>
        <Text style={styles.monthlyOverviewEyebrow}>Monthly Overview</Text>
        <Text style={styles.monthlyOverviewTitle}>September Budgets</Text>
        <Text style={styles.monthlyOverviewBody}>
          You&apos;ve utilized 64% of your total monthly allowance. Your trajectory suggests you&apos;ll remain within
          limits by month-end.
        </Text>
      </View>

      <View style={styles.monthlyOverviewSpentCard}>
        <View style={styles.monthlyOverviewSpentHeader}>
          <Text style={styles.monthlyOverviewSpentLabel}>Total Spent</Text>
          <Text style={styles.monthlyOverviewSpentAmount}>$4,280.00</Text>
        </View>
        <View style={styles.monthlyOverviewTrack}>
          <LinearGradient
            colors={['#00327D', '#0047AB']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.monthlyOverviewFill}
          />
        </View>
        <Text style={styles.monthlyOverviewMeta}>of $6,700.00 total budget</Text>
      </View>
    </View>
  );
}
