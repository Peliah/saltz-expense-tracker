import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import { Pressable, Text, View } from 'react-native';

const TIME_TABS = ['Daily', 'Weekly', 'Monthly'] as const;

export function FinancialInsightsSection() {
  return (
    <View style={styles.financialInsightsSection}>
      <View style={styles.financialInsightsHeader}>
        <Text style={styles.financialInsightsEyebrow}>Performance Analytics</Text>
        <Text style={styles.financialInsightsTitle}>Financial Insights</Text>
      </View>

      <View style={styles.financialInsightsTabs}>
        {TIME_TABS.map((tab) => {
          const active = tab === 'Monthly';
          return (
            <Pressable key={tab} accessibilityRole="button" accessibilityLabel={tab} style={[styles.financialInsightsTab, active && styles.financialInsightsTabActive]}>
              <Text style={[styles.financialInsightsTabText, active && styles.financialInsightsTabTextActive]}>{tab}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
