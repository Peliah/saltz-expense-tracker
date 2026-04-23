import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { SpendingVelocityGraph } from '@/components/budget/spending-velocity-graph';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const;
const TARGET = [52, 68, 82, 60, 74, 74, 74];
const ACTUAL = [35, 59, 42, 26, 67, 67, 67];

export function SpendingVelocityCard() {
  return (
    <View style={styles.velocityCard}>
      <View style={styles.velocityHeader}>
        <View style={styles.velocityHeadingWrap}>
          <Text style={styles.velocityTitle}>Spending Velocity</Text>
          <Text style={styles.velocitySubtitle}>Trend relative to baseline</Text>
        </View>
        <View style={styles.velocityPill}>
          <MaterialIcons name="trending-down" size={20} color="#06563A" />
          <Text style={styles.velocityPillValue}>12.4%</Text>
        </View>
      </View>

      <SpendingVelocityGraph days={DAYS} target={TARGET} actual={ACTUAL} />

      <View style={styles.velocityRemainingRow}>
        <View style={styles.velocityRemainingLeft}>
          <MaterialIcons name="pie-chart-outline" size={36} color="#06563A" />
          <Text style={styles.velocityRemainingLabel}>Budget Remaining</Text>
        </View>
        <Text style={styles.velocityRemainingValue}>$1,240.00</Text>
      </View>
    </View>
  );
}
