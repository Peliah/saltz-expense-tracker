import { createAccountStyles as styles } from '@/stylesheets/create-account-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateAccountScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
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
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

          <View style={styles.formSurface}>
            <View style={styles.formCard}>
              <View style={styles.headingBlock}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Secure your financial data today.</Text>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrap}>
                  <MaterialIcons name="person-outline" size={16} color="#74777F" />
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor="#A0A5B1"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrap}>
                  <MaterialIcons name="mail-outline" size={16} color="#74777F" />
                  <TextInput
                    style={styles.input}
                    placeholder="john@company.com"
                    placeholderTextColor="#A0A5B1"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrap}>
                  <MaterialIcons name="lock-outline" size={16} color="#74777F" />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="#A0A5B1"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <Pressable
                onPress={() => {
                  void onContinue();
                }}
                disabled={busy || !fullName.trim() || !email.trim() || password.length < 8}
                style={[styles.primaryButton, (busy || !fullName.trim() || !email.trim() || password.length < 8) && styles.primaryButtonDisabled]}
              >
                {busy ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Text style={styles.primaryButtonText}>Sign Up</Text>
                    <MaterialIcons name="arrow-forward" size={14} color="#FFFFFF" />
                  </>
                )}
              </Pressable>

              <View style={styles.secondaryActionRow}>
                <Text style={styles.secondaryActionText}>Already have an account? </Text>
                <Pressable onPress={() => router.replace('/(auth)/identity-verification')}>
                  <Text style={styles.secondaryActionLink}>Log In</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.footer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
