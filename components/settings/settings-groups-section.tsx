import { SettingsOptionRow } from '@/components/settings/settings-option-row';
import { settingsStyles as styles } from '@/stylesheets/settings-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type SettingsGroupsSectionProps = {
  biometricsEnabled: boolean;
  passwordSubtitle: string;
  onToggleBiometrics?: () => void;
  onPressUserPassword?: () => void;
  onPressCurrency?: () => void;
  onPressLanguage?: () => void;
  onPressHelpCenter?: () => void;
  onPressSignOut?: () => void;
};

export function SettingsGroupsSection({
  biometricsEnabled,
  passwordSubtitle,
  onToggleBiometrics,
  onPressUserPassword,
  onPressCurrency,
  onPressLanguage,
  onPressHelpCenter,
  onPressSignOut,
}: SettingsGroupsSectionProps) {
  return (
    <View style={styles.settingsGroupsRoot}>
      <View style={styles.settingsGroupBlock}>
        <Text style={styles.settingsGroupHeading}>Security & Access</Text>
        <View style={styles.settingsGroupList}>
          <SettingsOptionRow
            icon="fingerprint"
            title="Biometrics"
            subtitle={biometricsEnabled ? 'FaceID or TouchID Enabled' : 'FaceID or TouchID Disabled'}
            trailing="toggle"
            toggled={biometricsEnabled}
            onPress={onToggleBiometrics}
          />
          <SettingsOptionRow
            icon="vpn-key"
            title="User Password"
            subtitle={passwordSubtitle}
            onPress={onPressUserPassword}
          />
        </View>
      </View>

      <View style={styles.settingsGroupBlock}>
        <Text style={styles.settingsGroupHeading}>Preferences</Text>
        <View style={styles.settingsGroupList}>
          <SettingsOptionRow icon="attach-money" title="Currency" subtitle="USD ($)" onPress={onPressCurrency} />
          <SettingsOptionRow icon="language" title="Language" subtitle="English (US)" onPress={onPressLanguage} />
          <SettingsOptionRow
            icon="support-agent"
            title="Help Center"
            subtitle="FAQs and direct support"
            onPress={onPressHelpCenter}
          />
        </View>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Sign Out" style={styles.signOutButton} onPress={onPressSignOut}>
        <MaterialIcons name="logout" size={18} color="#93000A" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>

      <View style={styles.settingsVersionWrap}>
        <Text style={styles.settingsVersionText}>Sovereign Ledger V2.4.0</Text>
      </View>
    </View>
  );
}
