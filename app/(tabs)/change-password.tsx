import { HomeTopHeader } from '@/components/home/home-top-header';
import { changePasswordStyles as styles } from '@/stylesheets/change-password-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function evaluatePasswordStrength(password: string) {
  const checks = [
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /[^A-Za-z]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  return { checks, score };
}

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('Pr3cisi0n!2024');
  const [confirmPassword, setConfirmPassword] = useState('Pr3cisi0n!2024');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { checks, score } = useMemo(() => evaluatePasswordStrength(newPassword), [newPassword]);
  const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
  const canSubmit = currentPassword.trim().length > 0 && checks.every(Boolean) && passwordsMatch;

  const handleUpdatePassword = () => {
    setSubmitted(true);
    if (!canSubmit) return;
    Alert.alert('Password updated', 'Your password has been changed successfully.', [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <HomeTopHeader title="Change Password" />

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.headerCard}>
            <View style={styles.iconCircle}>
              <MaterialIcons name="lock-reset" size={26} color="#002046" />
            </View>
            <Text style={styles.pageTitle}>Change Password</Text>
            <Text style={styles.pageSubtitle}>
              Update your credentials to maintain strict account security and data protection.
            </Text>
          </View>

          <View style={styles.formCard}>
            <LinearGradient colors={['#316BF3', '#0051D5', '#003767']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.formCardTopGradient} />

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Current Password</Text>
              <View style={[styles.inputWrap, submitted && currentPassword.trim().length === 0 ? styles.inputWrapError : null]}>
                <TextInput
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showCurrent}
                />
                <Pressable onPress={() => setShowCurrent((v) => !v)}>
                  <MaterialIcons name={showCurrent ? 'visibility-off' : 'visibility'} size={22} color="#74777F" />
                </Pressable>
              </View>
              {submitted && currentPassword.trim().length === 0 ? <Text style={styles.errorText}>Current password is required.</Text> : null}
            </View>

            <View style={styles.separator} />

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>New Password</Text>
              <View style={[styles.inputWrap, submitted && newPassword.length > 0 && !checks.every(Boolean) ? styles.inputWrapError : null]}>
                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showNew}
                />
                <Pressable onPress={() => setShowNew((v) => !v)}>
                  <MaterialIcons name={showNew ? 'visibility-off' : 'visibility'} size={22} color="#74777F" />
                </Pressable>
              </View>
              {submitted && newPassword.length > 0 && !checks.every(Boolean) ? (
                <Text style={styles.errorText}>New password does not meet security requirements.</Text>
              ) : null}

              <View style={styles.strengthWrap}>
                <View style={styles.strengthBars}>
                  {[0, 1, 2, 3].map((index) => (
                    <View key={index} style={[styles.strengthBar, index < score ? styles.strengthBarActive : null]} />
                  ))}
                </View>
                <Text style={styles.strengthText}>
                  Strength: <Text style={styles.strengthStrong}>{score >= 3 ? 'Strong' : score === 2 ? 'Medium' : 'Weak'}</Text>
                </Text>
              </View>
            </View>

            <View style={styles.requirementsCard}>
              <Text style={styles.requirementsTitle}>Security Requirements</Text>
              <View style={styles.requirementRow}>
                <MaterialIcons name={checks[0] ? 'check-circle-outline' : 'radio-button-unchecked'} size={15} color="#0051D5" />
                <Text style={styles.requirementText}>At least 12 characters long</Text>
              </View>
              <View style={styles.requirementRow}>
                <MaterialIcons name={checks[1] ? 'check-circle-outline' : 'radio-button-unchecked'} size={15} color="#0051D5" />
                <Text style={styles.requirementText}>Contains uppercase & lowercase letters</Text>
              </View>
              <View style={styles.requirementRow}>
                <MaterialIcons name={checks[2] ? 'check-circle-outline' : 'radio-button-unchecked'} size={15} color="#0051D5" />
                <Text style={styles.requirementText}>Contains numbers or symbols</Text>
              </View>
            </View>

            <View style={styles.fieldBlock}>
              <Text style={styles.fieldLabel}>Confirm New Password</Text>
              <View style={[styles.inputWrap, submitted && !passwordsMatch ? styles.inputWrapError : null]}>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  placeholderTextColor="#6B7280"
                  secureTextEntry={!showConfirm}
                />
                <Pressable onPress={() => setShowConfirm((v) => !v)}>
                  <MaterialIcons name={showConfirm ? 'visibility-off' : 'visibility'} size={22} color="#74777F" />
                </Pressable>
              </View>
              {submitted && !passwordsMatch ? <Text style={styles.errorText}>Passwords do not match.</Text> : null}
            </View>

            <View style={styles.actionWrap}>
              <Pressable style={[styles.primaryBtn, !canSubmit ? styles.primaryBtnDisabled : null]} onPress={handleUpdatePassword}>
                <MaterialIcons name="update" size={14} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>Update Password</Text>
              </Pressable>

              <Pressable style={styles.secondaryBtn} onPress={() => router.back()}>
                <Text style={styles.secondaryBtnText}>Cancel</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <MaterialIcons name="verified-user" size={13} color="#44474E" />
            <Text style={styles.footerText}>Your connection is securely encrypted.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
