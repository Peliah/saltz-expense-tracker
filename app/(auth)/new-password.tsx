import { LoadingButton } from '@/components/ui/loading-button';
import { useAuthSetup } from '@/context/auth-setup';
import { newPasswordStyles as styles } from '@/stylesheets/new-password-stylesheet';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NewPasswordScreen() {
  const router = useRouter();
  const { setComplete } = useAuthSetup();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);

  const onFinish = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    await setComplete(true);
    setBusy(false);
    router.replace('/(tabs)');
  };

  const disabled = password.length < 8 || password !== confirm;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Create a new password</Text>
          <Text style={styles.subtitle}>Use a strong password you have not used elsewhere.</Text>

          <Text style={styles.label}>New password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <Text style={styles.hint}>At least 8 characters.</Text>

          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            style={styles.input}
            placeholder="Re-enter password"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={confirm}
            onChangeText={setConfirm}
          />

          <View style={{ marginTop: 12 }}>
            <LoadingButton text="Finish and go to app" onPress={onFinish} loading={busy} disabled={disabled} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
