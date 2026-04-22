import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Insights</Text>
        <Text style={styles.subheading}>Patterns that help you spend smarter.</Text>

        <View style={styles.chip}>
          <Text style={styles.chipText}>Demo insight</Text>
        </View>
        <Text style={styles.stat}>12%</Text>
        <Text style={styles.statCaption}>Less dining spend than your 4-week average.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
