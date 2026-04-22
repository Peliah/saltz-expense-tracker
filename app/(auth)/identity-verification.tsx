import { LoadingButton } from '@/components/ui/loading-button';
import { identityVerificationStyles as styles } from '@/stylesheets/identity-verification-stylesheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IdentityVerificationScreen() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const onContinue = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    router.push('/(auth)/new-password');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Identity verification</Text>
        <Text style={styles.subtitle}>
          We will ask for a government ID in production. For now, confirm you understand the requirements.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What you will need</Text>
          <Text style={styles.cardBody}>A clear photo of a valid ID and a quick selfie check to reduce fraud.</Text>
        </View>

        <Text style={styles.bullet}>• Good lighting and a steady camera</Text>
        <Text style={styles.bullet}>• Legal name matches your account</Text>
        <Text style={styles.bullet}>• You are at least 18 years old</Text>

        <View style={{ marginTop: 28 }}>
          <LoadingButton text="Continue" onPress={onContinue} loading={busy} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
