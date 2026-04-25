import { verificationSuccessStyles as styles } from '@/stylesheets/verification-success-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerificationSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.main}>
            <View style={styles.card}>
              <View style={styles.topAccent}>
                <View style={styles.topAccentFill} />
              </View>

              <View style={styles.iconWrap}>
                <View style={styles.iconInner}>
                  <MaterialIcons name="check" size={24} color="#FFFFFF" />
                </View>
              </View>

              <View style={styles.messageBlock}>
                <Text style={styles.title}>Verification{'\n'}Successful</Text>
                <Text style={styles.subtitle}>Connecting to your account{'\n'}securely...</Text>
              </View>

              <View style={styles.progressTrack}>
                <View style={styles.progressFill} />
              </View>

              <Pressable style={styles.primaryButton} onPress={() => router.replace('/(tabs)')}>
                <Text style={styles.primaryButtonText}>Go to Dashboard</Text>
                <MaterialIcons name="arrow-forward" size={14} color="#FFFFFF" />
              </Pressable>
            </View>

            <View style={styles.footerRow}>
              <MaterialIcons name="lock" size={12} color="#44474E" />
              <Text style={styles.footerText}>Secured by Enterprise Grade Encryption</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
