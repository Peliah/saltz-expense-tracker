import { useAuthSetup } from '@/context/auth-setup';
import { useLivenessVerification } from '@/hooks/use-liveness-verification';
import { identityVerificationStyles as styles } from '@/stylesheets/identity-verification-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IdentityVerificationScreen() {
  const { setComplete } = useAuthSetup();
  const router = useRouter();
  const {
    cameraRef,
    permissionGranted,
    requestPermission,
    startVerification,
    cleanup,
    isComplete,
    statusText,
    failureReason,
    challengeLabel,
    progressLabel,
    buttonLabel,
    canStartVerification,
    showProgress,
    showRetry,
  } = useLivenessVerification({
    onVerified: async () => {
      await setComplete(true);
      router.push('/(auth)/new-password');
    },
  });

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

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
              <MaterialIcons name={isComplete ? 'check-circle' : 'info-outline'} size={14} color="#0051D5" />
              <Text style={styles.instructionText}>{statusText}</Text>
            </View>
            {showProgress ? (
              <Text style={styles.progressText}>
                Step {progressLabel}: {challengeLabel}
              </Text>
            ) : null}
            {failureReason ? <Text style={styles.failureText}>{failureReason}</Text> : null}

            <View style={styles.viewportOuter}>
              <View style={styles.viewportInner}>
                {permissionGranted ? (
                  <CameraView ref={cameraRef} style={styles.cameraView} facing="front" />
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
                onPress={startVerification}
                disabled={!canStartVerification}
                style={[styles.primaryButton, canStartVerification && styles.primaryButtonReady]}
              >
                <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
                <MaterialIcons name="arrow-forward" size={12} color="#FFFFFF" />
              </Pressable>
            )}
            {showRetry ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Retry verification" onPress={startVerification} style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Retry Liveness Check</Text>
              </Pressable>
            ) : null}

            <Pressable accessibilityRole="button" accessibilityLabel="Cancel" onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
