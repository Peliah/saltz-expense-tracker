import { settingsStyles as styles } from '@/stylesheets/settings-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type LedgerTierBentoProps = {
  onPressDefaultLedger?: () => void;
  onPressUpgrade?: () => void;
};

export function LedgerTierBento({ onPressDefaultLedger, onPressUpgrade }: LedgerTierBentoProps) {
  return (
    <View style={styles.ledgerBentoRow}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Default Ledger Main Savings"
        onPress={onPressDefaultLedger}
        style={[styles.ledgerBentoCard, styles.ledgerBentoCardLight]}
      >
        <View style={styles.ledgerBentoIconWrap}>
          <MaterialIcons name="account-balance-wallet" size={22} color="#00327D" />
        </View>
        <View style={styles.ledgerBentoTextWrap}>
          <Text style={styles.ledgerBentoLabelLight}>Default Ledger</Text>
          <Text style={styles.ledgerBentoValueLight}>Main Savings</Text>
        </View>
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Upgrade to Sovereign Executive"
        onPress={onPressUpgrade}
        style={[styles.ledgerBentoCard, styles.ledgerBentoCardDark]}
      >
        <View style={styles.ledgerBentoIconWrap}>
          <MaterialIcons name="workspace-premium" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.ledgerBentoTextWrap}>
          <Text style={styles.ledgerBentoLabelDark}>Upgrade to Sovereign</Text>
          <Text style={styles.ledgerBentoValueDark}>Executive</Text>
        </View>
      </Pressable>
    </View>
  );
}
