import { LedgerTierBento } from '@/components/settings/ledger-tier-bento';
import { ProfileCard } from '@/components/settings/profile-card';
import { SettingsGroupsSection } from '@/components/settings/settings-groups-section';
import { useAuthSetup } from '@/context/auth-setup';
import { LedgerHeader } from '@/components/overview/ledger-header';
import { settingsStyles as styles } from '@/stylesheets/settings-stylesheet';
import { useRouter } from 'expo-router';
import { Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { setComplete } = useAuthSetup();

  const handleSignOut = () => {
    Alert.alert('Sign out?', 'You will be returned to the auth flow.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: async () => {
          await setComplete(false);
          router.replace('/(auth)/create-account');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <LedgerHeader />
        <ProfileCard
          onPress={() => {
            Alert.alert('Profile', 'Open profile details and membership settings.');
          }}
        />
        <LedgerTierBento
          onPressDefaultLedger={() => {
            Alert.alert('Default ledger', 'Main Savings selected as your default ledger.');
          }}
          onPressUpgrade={() => {
            Alert.alert('Upgrade', 'Open Sovereign Executive plan details.');
          }}
        />
        <SettingsGroupsSection
          onPressSecurityPin={() => Alert.alert('Security PIN', 'Open PIN update flow.')}
          onPressUserPassword={() => Alert.alert('User Password', 'Open password update flow.')}
          onPressTwoFactor={() => Alert.alert('Two-Factor', 'Two-factor setting updated.')}
          onPressCurrency={() => Alert.alert('Currency', 'Open currency selector.')}
          onPressLanguage={() => Alert.alert('Language', 'Open language selector.')}
          onPressHelpCenter={() => Alert.alert('Help Center', 'Opening FAQs and support.')}
          onPressSignOut={handleSignOut}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
