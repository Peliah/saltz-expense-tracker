import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';

type LiquidWealthSummaryCardProps = {
  portfolioLabel?: string;
  changePercent?: string;
  balance?: string;
  valuationCaption?: string;
  onDeposit?: () => void;
  onWithdraw?: () => void;
};

export function LiquidWealthSummaryCard({
  portfolioLabel = 'LIQUID WEALTH PORTFOLIO',
  changePercent = '+12.5%',
  balance = '$42,950.40',
  valuationCaption = 'Market valuation as of today',
  onDeposit,
  onWithdraw,
}: LiquidWealthSummaryCardProps) {
  const onDepositPress = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDeposit?.();
  };

  const onWithdrawPress = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onWithdraw?.();
  };

  return (
    <LinearGradient
      colors={['#00327D', '#0047AB']}
      start={{ x: 0.08, y: 0 }}
      end={{ x: 0.92, y: 1 }}
      style={styles.summaryCard}
    >
      <View style={styles.summaryGlow} pointerEvents="none" />
      <View style={styles.summaryTopRow}>
        <Text style={styles.summaryPortfolioLabel} numberOfLines={2}>
          {portfolioLabel}
        </Text>
        <View style={styles.summaryChangePill}>
          <Text style={styles.summaryChangeText}>{changePercent}</Text>
        </View>
      </View>
      <View style={styles.summaryAmountBlock}>
        <Text style={styles.summaryBalance}>{balance}</Text>
        <Text style={styles.summaryValuationCaption}>{valuationCaption}</Text>
      </View>
      <View style={styles.summaryActions}>
        <Pressable
          onPress={onDepositPress}
          style={({ pressed }) => [styles.summaryActionButton, pressed && styles.summaryActionButtonPressed]}
        >
          <Text style={styles.summaryActionLabel}>DEPOSIT</Text>
        </Pressable>
        <Pressable
          onPress={onWithdrawPress}
          style={({ pressed }) => [styles.summaryActionButton, pressed && styles.summaryActionButtonPressed]}
        >
          <Text style={styles.summaryActionLabel}>WITHDRAW</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
