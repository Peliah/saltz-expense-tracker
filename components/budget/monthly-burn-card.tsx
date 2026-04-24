import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

type MonthlyBurnCardProps = {
  spent?: number;
  limit?: number;
};

export function MonthlyBurnCard({ spent = 4280, limit = 6850 }: MonthlyBurnCardProps) {
  const usage = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0;
  const left = limit - spent;
  return (
    <View style={styles.monthlyBurnCard}>
      <View style={styles.monthlyBurnTopRow}>
        <View style={styles.monthlyBurnTitleBlock}>
          <Text style={styles.monthlyBurnLabel}>Monthly Burn</Text>
          <Text style={styles.monthlyBurnAmount}>${spent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
        </View>
        <View style={styles.monthlyBurnStatusPill}>
          <Text style={styles.monthlyBurnStatusText}>{usage >= 90 ? 'Near Limit' : 'On Track'}</Text>
        </View>
      </View>

      <View style={styles.monthlyBurnProgressTrack}>
        <LinearGradient
          colors={['#00327D', '#0047AB']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.monthlyBurnProgressFill, { width: `${usage}%` }]}
        />
      </View>

      <View style={styles.monthlyBurnBottomRow}>
        <Text style={styles.monthlyBurnMeta}>
          {usage}% of ${limit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} limit
        </Text>
        <Text style={styles.monthlyBurnMeta}>
          {left >= 0 ? '$' : '-$'}
          {Math.abs(left).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} left
        </Text>
      </View>
    </View>
  );
}
