import { allocationStyles as styles } from '@/stylesheets/allocation-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type NewAllocationCardProps = {
  onPressQuickAdd: () => void;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  iconName?: React.ComponentProps<typeof MaterialIcons>['name'];
};

export function NewAllocationCard({
  onPressQuickAdd,
  title = 'New Allocation',
  subtitle = 'Record a new Allocation',
  buttonLabel = 'Quick Add',
  iconName = 'playlist-add',
}: NewAllocationCardProps) {
  return (
    <View style={styles.newCard}>
      <View style={styles.newCardIconWrap}>
        <MaterialIcons name={iconName} size={24} color="#00327D" />
      </View>
      <View style={styles.newCardBody}>
        <Text style={styles.newCardTitle}>{title}</Text>
        <Text style={styles.newCardSubtitle}>{subtitle}</Text>
      </View>
      <Pressable style={styles.quickAddButton} onPress={onPressQuickAdd}>
        <Text style={styles.quickAddText}>{buttonLabel}</Text>
      </Pressable>
    </View>
  );
}
