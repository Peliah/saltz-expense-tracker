import { addAllocationStyles as styles } from '@/stylesheets/add-allocation-stylesheet';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';

type Timeframe = 'Daily' | 'Weekly' | 'Monthly';

type AddAllocationConfigCardProps = {
  timeframe: Timeframe;
  date: string;
  recurring: boolean;
  thresholdEnabled: boolean;
  onChangeTimeframe: (value: Timeframe) => void;
  onChangeDate: (value: string) => void;
  onChangeRecurring: (value: boolean) => void;
  onChangeThresholdEnabled: (value: boolean) => void;
};

const TIMEFRAMES: Timeframe[] = ['Daily', 'Weekly', 'Monthly'];

export function AddAllocationConfigCard({
  timeframe,
  date,
  recurring,
  thresholdEnabled,
  onChangeTimeframe,
  onChangeDate,
  onChangeRecurring,
  onChangeThresholdEnabled,
}: AddAllocationConfigCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Timeframe</Text>
      <View style={styles.segmented}>
        {TIMEFRAMES.map((item) => {
          const active = timeframe === item;
          return (
            <Pressable key={item} style={[styles.segmentedBtn, active && styles.segmentedBtnActive]} onPress={() => onChangeTimeframe(item)}>
              <Text style={[styles.segmentedText, active && styles.segmentedTextActive]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.inputRow}>
        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.textInput} value={date} onChangeText={onChangeDate} placeholder="11/24/2023" placeholderTextColor="#6B7280" />
      </View>

      <View style={styles.toggleRow}>
        <Text style={styles.toggleLabel}>Recurring Transaction</Text>
        <Switch value={recurring} onValueChange={onChangeRecurring} />
      </View>

      <Text style={styles.sectionTitle}>Threshold Alert</Text>
      <View style={styles.thresholdBox}>
        <View>
          <Text style={styles.thresholdTitle}>Notify at 80%</Text>
          <Text style={styles.thresholdMeta}>Spending Limit</Text>
        </View>
        <Switch value={thresholdEnabled} onValueChange={onChangeThresholdEnabled} />
      </View>
    </View>
  );
}
