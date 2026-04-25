import { addAllocationStyles as styles } from '@/stylesheets/add-allocation-stylesheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMemo, useState } from 'react';
import { Platform, Pressable, Switch, Text, View } from 'react-native';
import type { DateTimePickerEvent } from '@react-native-community/datetimepicker';

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
  const [showDatePicker, setShowDatePicker] = useState(false);

  const parsedDate = useMemo(() => {
    if (!date) return new Date();
    const parsed = new Date(date);
    return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [date]);

  const dateLabel = useMemo(() => {
    if (!date) return '';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return '';
    return parsed.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  }, [date]);

  const onPickDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Android date picker is a modal; hide it after any interaction.
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type !== 'set' || !selectedDate) return;
    onChangeDate(selectedDate.toISOString());
  };

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
        <Pressable onPress={() => setShowDatePicker(true)}>
          <Text style={[styles.textInput, { color: dateLabel ? '#191C1E' : '#6B7280' }]}>{dateLabel || '11/24/2023'}</Text>
        </Pressable>
      </View>
      {showDatePicker ? (
        <DateTimePicker
          value={parsedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onPickDate}
        />
      ) : null}

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
