import { useAuthSetup } from '@/context/auth-setup';
import { settingsStyles as styles } from '@/stylesheets/settings-stylesheet';
import { useRouter } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const { setComplete } = useAuthSetup();

  const resetSignupFlow = () => {
    Alert.alert('Reset sign-up flow?', 'You will go back through create account and verification.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Reset',
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
        <Text style={styles.heading}>Settings</Text>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Profile</Text>
          <Text style={styles.rowHint}>Name, email, and security</Text>
        </View>

        <Text style={styles.sectionTitle}>Developer</Text>
        <Pressable style={[styles.row, styles.danger]} onPress={resetSignupFlow}>
          <Text style={styles.dangerLabel}>Reset sign-up flow</Text>
          <Text style={styles.rowHint}>Clears the local “auth complete” flag for testing.</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
