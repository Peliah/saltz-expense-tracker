import { insightsStyles as styles } from '@/stylesheets/insights-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type SuggestionItem = {
  id: string;
  title: string;
  tag: string;
  body: string;
  action: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  tone: 'highImpact' | 'strategy';
};

const SUGGESTIONS: SuggestionItem[] = [
  {
    id: 'subscriptions',
    title: 'Optimize Subscriptions',
    tag: 'High Impact',
    body: 'You have 3 overlapping streaming services. Consolidating could save you $34.99/mo.',
    action: 'Take Action',
    icon: 'savings',
    tone: 'highImpact',
  },
  {
    id: 'rebalance',
    title: 'Investment Rebalance',
    tag: 'Strategy',
    body: "Your 'Lifestyle' allocation is exceeding targets. Shift $200 to your index fund.",
    action: 'Review Portfolio',
    icon: 'account-balance',
    tone: 'strategy',
  },
];

type SmartSuggestionsSectionProps = {
  onPressViewAll?: () => void;
  onPressAction?: (id: string) => void;
};

export function SmartSuggestionsSection({ onPressViewAll, onPressAction }: SmartSuggestionsSectionProps) {
  return (
    <View style={styles.smartSuggestionsOuter}>
      <View style={styles.smartSuggestionsSection}>
        <View style={styles.smartSuggestionsHeader}>
          <Text style={styles.smartSuggestionsTitle}>Smart Suggestions</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="View all suggestions" onPress={onPressViewAll}>
            <Text style={styles.smartSuggestionsViewAll}>View All</Text>
          </Pressable>
        </View>

        <View style={styles.smartSuggestionsList}>
          {SUGGESTIONS.map((item) => {
            const isHighImpact = item.tone === 'highImpact';
            return (
              <View key={item.id} style={styles.smartSuggestionCard}>
                <View style={[styles.smartSuggestionIconWrap, isHighImpact ? styles.smartSuggestionIconWrapHigh : styles.smartSuggestionIconWrapStrategy]}>
                  <MaterialIcons name={item.icon} size={22} color={isHighImpact ? '#003F29' : '#00327D'} />
                </View>

                <View style={styles.smartSuggestionContent}>
                  <View style={styles.smartSuggestionTopRow}>
                    <Text style={styles.smartSuggestionHeading}>{item.title}</Text>
                    <View style={[styles.smartSuggestionTag, isHighImpact ? styles.smartSuggestionTagHigh : styles.smartSuggestionTagStrategy]}>
                      <Text style={[styles.smartSuggestionTagText, isHighImpact ? styles.smartSuggestionTagTextHigh : styles.smartSuggestionTagTextStrategy]}>
                        {item.tag}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.smartSuggestionBody}>{item.body}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={item.action}
                    onPress={() => onPressAction?.(item.id)}
                    style={styles.smartSuggestionActionRow}
                  >
                    <Text style={styles.smartSuggestionActionText}>{item.action}</Text>
                    <MaterialIcons name="chevron-right" size={16} color="#00327D" />
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}
