import { useAuthSetup } from '@/context/auth-setup';
import { identityVerificationStyles as styles } from '@/stylesheets/identity-verification-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IdentityVerificationScreen() {
  const { setComplete } = useAuthSetup();
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [busy, setBusy] = useState(false);

  const permissionGranted = permission?.granted === true;

  useEffect(() => {
    if (!permission || permission.granted) return;
    if (permission.canAskAgain) {
      void requestPermission();
    }
  }, [permission, requestPermission]);

  const onStartVerification = async () => {
    if (!permissionGranted || busy) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    setBusy(false);
    await setComplete(true);
    router.push('/(auth)/new-password');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <View style={styles.bgBlobTop} pointerEvents="none" />
        <View style={styles.bgBlobBottom} pointerEvents="none" />

        <View style={styles.main}>
          <View style={styles.headerSection}>
            <View style={styles.headerIconWrap}>
              <MaterialIcons name="face" size={20} color="#001B3D" />
            </View>
            <Text style={styles.title}>Identity Verification</Text>
            <Text style={styles.subtitle}>
              We need to perform a quick liveness check{'\n'}to secure your account.
            </Text>
          </View>

          <View style={styles.cameraArea}>
            <View style={styles.instructionToast}>
              <MaterialIcons name="info-outline" size={14} color="#0051D5" />
              <Text style={styles.instructionText}>Center your face in the frame</Text>
            </View>

            <View style={styles.viewportOuter}>
              <View style={styles.viewportInner}>
                {permissionGranted ? (
                  <CameraView style={styles.cameraView} facing="front" />
                ) : (
                  <View style={styles.cameraPlaceholder}>
                    <MaterialIcons name="videocam" size={54} color="#74777F" style={styles.cameraPlaceholderIcon} />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.securityBadge}>
              <MaterialIcons name="shield" size={13} color="#002046" />
              <Text style={styles.securityBadgeText}>End-to-end encrypted</Text>
            </View>
          </View>

          <View style={styles.actionSection}>
            {!permissionGranted ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Enable camera permission"
                style={styles.primaryButtonReady}
                onPress={requestPermission}
              >
                <Text style={styles.primaryButtonText}>Enable Camera</Text>
              </Pressable>
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Start Verification"
                onPress={onStartVerification}
                disabled={busy}
                style={[styles.primaryButton, !busy && styles.primaryButtonReady]}
              >
                <Text style={styles.primaryButtonText}>{busy ? 'Verifying...' : 'Start Verification'}</Text>
                <MaterialIcons name="arrow-forward" size={12} color="#FFFFFF" />
              </Pressable>
            )}

            <Pressable accessibilityRole="button" accessibilityLabel="Cancel" onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
