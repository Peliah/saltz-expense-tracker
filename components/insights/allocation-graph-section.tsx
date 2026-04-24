import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

type AllocationItem = {
  id: string;
  label: string;
  percent: number;
  color: string;
};

const ALLOCATION_DATA: AllocationItem[] = [
  { id: 'housing', label: 'Housing & Utilities', percent: 45, color: '#00327D' },
  { id: 'investments', label: 'Investments', percent: 25, color: '#0047AB' },
  { id: 'lifestyle', label: 'Lifestyle', percent: 15, color: '#4EDEA3' },
  { id: 'others', label: 'Others', percent: 15, color: '#545F73' },
];

const SIZE = 128;
const STROKE = 14;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP_FACTOR = 0.985;

type AllocationGraphSectionProps = {
  items?: AllocationItem[];
  totalLabel?: string;
  onPressViewAll?: () => void;
};

export function AllocationGraphSection({ items = ALLOCATION_DATA, totalLabel = '$14.2k', onPressViewAll }: AllocationGraphSectionProps) {
  let offset = 0;

  return (
    <View style={styles.allocationCard}>
      <View style={styles.allocationHeader}>
        <Text style={styles.allocationTitle}>Allocation</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="View all allocations" onPress={onPressViewAll}>
          <Text style={styles.allocationViewAll}>View All</Text>
        </Pressable>
      </View>

      <View style={styles.allocationContentRow}>
        <View style={styles.allocationDonutWrap}>
          <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} pointerEvents="none">
            <G transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}>
              {items.map((item) => {
                const fullArc = (item.percent / 100) * CIRCUMFERENCE;
                const arc = fullArc * GAP_FACTOR;
                const segment = (
                  <Circle
                    key={item.id}
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={RADIUS}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={STROKE}
                    strokeDasharray={`${arc} ${CIRCUMFERENCE}`}
                    strokeDashoffset={-offset}
                    strokeLinecap="butt"
                  />
                );
                offset += fullArc;
                return segment;
              })}
            </G>
          </Svg>

          <View style={styles.allocationDonutCenter}>
            <Text style={styles.allocationTotalLabel}>Total</Text>
            <Text style={styles.allocationTotalValue}>{totalLabel}</Text>
          </View>
        </View>

        <View style={styles.allocationLegend}>
          {items.map((item) => (
            <View key={item.id} style={styles.allocationLegendRow}>
              <View style={styles.allocationLegendLeft}>
                <View style={[styles.allocationLegendDot, { backgroundColor: item.color }]} />
                <Text style={styles.allocationLegendLabel}>{item.label}</Text>
              </View>
              <Text style={styles.allocationLegendValue}>{item.percent}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
