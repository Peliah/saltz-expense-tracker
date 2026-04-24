import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { Text, TextInput, View } from 'react-native';

type TransactionNotesCardProps = {
  notes: string;
  onChangeNotes: (value: string) => void;
};

export function TransactionNotesCard({ notes, onChangeNotes }: TransactionNotesCardProps) {
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
