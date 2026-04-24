import { addAllocationStyles as styles } from '@/stylesheets/add-allocation-stylesheet';
import { Text, TextInput, View } from 'react-native';

type AddAllocationNotesCardProps = {
  notes: string;
  onChangeNotes: (value: string) => void;
};

export function AddAllocationNotesCard({ notes, onChangeNotes }: AddAllocationNotesCardProps) {
  return (
    <View style={styles.notesCard}>
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={onChangeNotes}
        multiline
        placeholder="What was this for?"
        placeholderTextColor="#6B7280"
      />
    </View>
  );
}
