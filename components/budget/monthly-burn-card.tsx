import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

export function MonthlyBurnCard() {
  return (
    <View style={styles.monthlyBurnCard}>
      <View style={styles.monthlyBurnTopRow}>
        <View style={styles.monthlyBurnTitleBlock}>
          <Text style={styles.monthlyBurnLabel}>Monthly Burn</Text>
          <Text style={styles.monthlyBurnAmount}>$4,280.00</Text>
        </View>
        <View style={styles.monthlyBurnStatusPill}>
          <Text style={styles.monthlyBurnStatusText}>On Track</Text>
        </View>
      </View>

      <View style={styles.monthlyBurnProgressTrack}>
        <LinearGradient
          colors={['#1F65CD', '#8DB9F7']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.monthlyBurnProgressFill}
        />
      </View>

      <View style={styles.monthlyBurnBottomRow}>
        <Text style={styles.monthlyBurnMeta}>62% of $6,850.00 limit</Text>
        <Text style={styles.monthlyBurnMeta}>$2,570.00 left</Text>
      </View>
    </View>
  );
}
