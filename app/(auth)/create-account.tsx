import { LoadingButton } from '@/components/ui/loading-button';
import { createAccountStyles as styles } from '@/stylesheets/create-account-stylesheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccountScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onContinue = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    router.push('/(auth)/verify-email');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>Start tracking expenses with Saltz.</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="At least 8 characters"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={{ marginTop: 12 }}>
            <LoadingButton
              text="Continue"
              onPress={onContinue}
              loading={busy}
              disabled={!email.trim() || password.length < 8}
            />
          </View>

          <Text style={styles.footerNote}>
            Already have an account?{' '}
            <Pressable onPress={() => router.push('/(auth)/verify-email')}>
              <Text style={{ fontFamily: 'Manrope-SemiBold', color: '#0d9488' }}>Continue setup</Text>
            </Pressable>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
