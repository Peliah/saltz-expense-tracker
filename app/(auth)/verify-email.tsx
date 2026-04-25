import { verifyEmailStyles as styles } from '@/stylesheets/verify-email-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyEmailScreen() {
  const router = useRouter();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [busy, setBusy] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const code = useMemo(() => digits.join(''), [digits]);

  const onContinue = async () => {
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    setBusy(false);
    router.push('/(auth)/verification-success');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.main}>
            
            <View style={styles.card}>
              <View style={styles.headerSection}>
                <View style={styles.badge}>
                  <MaterialIcons name="mark-email-unread" size={28} color="#0051D5" />
                </View>
                <Text style={styles.title}>Verify your identity</Text>
                <Text style={styles.subtitle}>We&apos;ve sent a 6-digit security code to{'\n'}professional@example.com</Text>
              </View>

              <View style={styles.formSection}>
                <View style={styles.codeRow}>
                  {digits.map((digit, index) => (
                    <TextInput
                      key={`otp-${index}`}
                      ref={(node) => {
                        inputRefs.current[index] = node;
                      }}
                      style={styles.codeCell}
                      value={digit}
                      onChangeText={(value) => {
                        const nextChar = value.replace(/[^0-9]/g, '').slice(-1);
                        setDigits((prev) => {
                          const next = [...prev];
                          next[index] = nextChar;
                          return next;
                        });
                        if (nextChar && index < 5) {
                          inputRefs.current[index + 1]?.focus();
                        }
                      }}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
                          inputRefs.current[index - 1]?.focus();
                        }
                      }}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectionColor="#0051D5"
                    />
                  ))}
                </View>

                <Pressable
                  onPress={() => {
                    void onContinue();
                  }}
                  disabled={busy || code.length < 6}
                  style={[styles.primaryButton, (busy || code.length < 6) && styles.primaryButtonDisabled]}
                >
                  {busy ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text style={styles.primaryButtonText}>Verify Code</Text>
                      <MaterialIcons name="arrow-forward" size={14} color="#FFFFFF" />
                    </>
                  )}
                </Pressable>
              </View>

              <View style={styles.secondaryRow}>
                <Text style={styles.secondaryText}>Didn&apos;t receive the code? </Text>
                <Pressable>
                  <Text style={styles.secondaryLink}>Resend code</Text>
                </Pressable>
              </View>
            </View>

            <Pressable style={styles.backRow} onPress={() => router.back()}>
              <MaterialIcons name="arrow-back" size={14} color="#44474E" />
              <Text style={styles.backText}>Return to login</Text>
            </Pressable>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
