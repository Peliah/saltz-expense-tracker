import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BudgetScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Budget</Text>
        <Text style={styles.subheading}>Planned versus actual by category.</Text>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Groceries</Text>
          <Text style={styles.rowValue}>$120 / $200</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Dining</Text>
          <Text style={styles.rowValue}>$45 / $150</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Transport</Text>
          <Text style={styles.rowValue}>$60 / $80</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
