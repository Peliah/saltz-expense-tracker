import type { AllocationItem } from '@/components/home/allocation-types';
import { allocationStyles as styles } from '@/stylesheets/allocation-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

type AllocationCardProps = {
  item: AllocationItem;
  onPress?: (item: AllocationItem) => void;
};

function getStatusPill(item: AllocationItem) {
  if (item.status === 'at_limit') {
    return { label: 'AT LIMIT', bg: '#FFDAD6', text: '#93000A' };
  }
  if (item.status === 'healthy') {
    return { label: 'HEALTHY', bg: '#00593C', text: '#44D69B' };
  }
  return { label: 'ON TRACK', bg: '#ECEEF0', text: '#434653' };
}

function formatMoney(amount: number) {
  return amount.toLocaleString('en-US');
}

export function AllocationCard({ item, onPress }: AllocationCardProps) {
  const pill = getStatusPill(item);
  const leftPrefix = item.leftAmount >= 0 ? '+' : '-';
  const percentWidth = `${Math.min(100, Math.max(0, item.usedPercent))}%` as const;

  return (
    <Pressable style={styles.card} onPress={() => onPress?.(item)}>
      <View style={styles.cardTopRow}>
        <View style={[styles.iconWrap, { backgroundColor: item.iconBgColor }]}>
          <MaterialIcons name={item.icon} size={18} color={item.iconColor} />
        </View>
        <View style={[styles.pill, { backgroundColor: pill.bg }]}>
          <Text style={[styles.pillText, { color: pill.text }]}>{pill.label}</Text>
        </View>
      </View>

      <Text style={styles.cardTitle}>{item.title}</Text>
      <View style={styles.amountRow}>
        <Text style={styles.amountMain}>${formatMoney(item.spent)}</Text>
        <Text style={styles.amountBudget}>/ ${formatMoney(item.budget)}</Text>
      </View>

      <View style={styles.progressTopRow}>
        <Text style={styles.progressMeta}>USED {item.usedPercent}%</Text>
        <Text style={[styles.progressMeta, item.leftAmount < 0 ? styles.progressMetaDanger : styles.progressMetaPositive]}>
          {leftPrefix}${formatMoney(Math.abs(item.leftAmount))} LEFT
        </Text>
      </View>

      <View style={styles.progressTrack}>
        {item.fillType === 'gradient' && item.fillGradient ? (
          <LinearGradient colors={item.fillGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[styles.progressFill, { width: percentWidth }]} />
        ) : (
          <View style={[styles.progressFill, { width: percentWidth, backgroundColor: item.fillColor ?? '#0047AB' }]} />
        )}
      </View>
    </Pressable>
  );
}
