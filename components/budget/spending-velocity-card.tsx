import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { SpendingVelocityGraph } from '@/components/budget/spending-velocity-graph';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

const DEFAULT_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
const DEFAULT_TARGET = [52, 68, 82, 60, 74, 74, 74];
const DEFAULT_ACTUAL = [35, 59, 42, 26, 67, 67, 67];

type SpendingVelocityCardProps = {
  title?: string;
  subtitle?: string;
  trendValue?: string;
  remainingLabel?: string;
  remainingValue?: string;
  days?: readonly string[];
  target?: readonly number[];
  actual?: readonly number[];
};

export function SpendingVelocityCard({
  title = 'Spending Velocity',
  subtitle = 'Trend relative to baseline',
  trendValue = '12.4%',
  remainingLabel = 'Budget Remaining',
  remainingValue = '$1,240.00',
  days = DEFAULT_DAYS,
  target = DEFAULT_TARGET,
  actual = DEFAULT_ACTUAL,
}: SpendingVelocityCardProps) {
  return (
    <View style={styles.velocityCard}>
      <View style={styles.velocityHeader}>
        <View style={styles.velocityHeadingWrap}>
          <Text style={styles.velocityTitle}>{title}</Text>
          <Text style={styles.velocitySubtitle}>{subtitle}</Text>
        </View>
        <View style={styles.velocityPill}>
          <MaterialIcons name="trending-down" size={20} color="#00327D" />
          <Text style={styles.velocityPillValue}>{trendValue}</Text>
        </View>
      </View>

      <SpendingVelocityGraph days={days} target={target} actual={actual} />

      <View style={styles.velocityRemainingRow}>
        <View style={styles.velocityRemainingLeft}>
          <MaterialIcons name="pie-chart-outline" size={36} color="#00327D" />
          <Text style={styles.velocityRemainingLabel}>{remainingLabel}</Text>
        </View>
        <Text style={styles.velocityRemainingValue}>{remainingValue}</Text>
      </View>
    </View>
  );
}
