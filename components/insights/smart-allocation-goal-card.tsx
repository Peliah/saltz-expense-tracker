import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const RING_SIZE = 160;
const TRACK_STROKE = 8;
const PROGRESS_STROKE = 12;
const RADIUS = (RING_SIZE - PROGRESS_STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const PROGRESS = 0.75;

type SmartAllocationGoalCardProps = {
  onPressAllocate?: () => void;
};

export function SmartAllocationGoalCard({ onPressAllocate }: SmartAllocationGoalCardProps) {
  return (
    <LinearGradient colors={['#00327D', '#0047AB']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.smartGoalCard}>
      <View style={styles.smartGoalRingWrap}>
        <Svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`} pointerEvents="none">
          <G transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}>
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth={TRACK_STROKE}
            />
            <Circle
              cx={RING_SIZE / 2}
              cy={RING_SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="#4EDEA3"
              strokeWidth={PROGRESS_STROKE}
              strokeDasharray={`${CIRCUMFERENCE * PROGRESS} ${CIRCUMFERENCE}`}
              strokeLinecap="round"
            />
          </G>
        </Svg>
        <View style={styles.smartGoalRingCenter}>
          <Text style={styles.smartGoalPercent}>75%</Text>
          <Text style={styles.smartGoalLabel}>Goal</Text>
        </View>
      </View>

      <View style={styles.smartGoalContent}>
        <Text style={styles.smartGoalTitle}>Smart Allocation{'\n'}Detected</Text>
        <Text style={styles.smartGoalBody}>
          We noticed you&apos;ve spent 40% less on Transport this month. Would you like to re-allocate $150 towards
          your &quot;Vacation Fund&quot;?
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Allocate Now"
          onPress={onPressAllocate}
          style={styles.smartGoalActionButton}
        >
          <Text style={styles.smartGoalActionText}>Allocate Now</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
