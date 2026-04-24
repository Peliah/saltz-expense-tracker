import { allocationStyles as styles } from '@/stylesheets/allocation-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type NewAllocationCardProps = {
  onPressQuickAdd: () => void;
};

export function NewAllocationCard({ onPressQuickAdd }: NewAllocationCardProps) {
  return (
    <View style={styles.newCard}>
      <View style={styles.newCardIconWrap}>
        <MaterialIcons name="playlist-add" size={24} color="#00327D" />
      </View>
      <View style={styles.newCardBody}>
        <Text style={styles.newCardTitle}>New Allocation</Text>
        <Text style={styles.newCardSubtitle}>Record a new Allocation</Text>
      </View>
      <Pressable style={styles.quickAddButton} onPress={onPressQuickAdd}>
        <Text style={styles.quickAddText}>Quick Add</Text>
      </Pressable>
    </View>
  );
}
