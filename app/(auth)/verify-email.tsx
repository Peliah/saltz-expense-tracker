import { LoadingButton } from '@/components/shared/ui/loading-button';
import { verifyEmailStyles as styles } from '@/stylesheets/verify-email-stylesheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);

  const onContinue = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    router.push('/(auth)/identity-verification');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Verify your email</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code we sent to your inbox. This is a placeholder flow until email is wired up.
          </Text>

          <TextInput
            style={styles.codeInput}
            placeholder="000000"
            placeholderTextColor="#94a3b8"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />

          <LoadingButton
            text="Verify and continue"
            onPress={onContinue}
            loading={busy}
            disabled={code.trim().length < 6}
          />

          <Text style={styles.resend}>Resend code</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
