import { useAuthSetup } from '@/context/auth-setup';
import { getCafEnvironment, getCafMobileToken, getCafPersonId } from '@/lib/caf-env';
import { identityVerificationStyles as styles } from '@/stylesheets/identity-verification-stylesheet';
import {
  CafModuleType,
  useCafFaceLivenessUI,
  useCafSdk,
} from '@caf.io/react-native-sdk';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function IdentityVerificationScreen() {
  const { setComplete } = useAuthSetup();
  const router = useRouter();
  const { initialize, startSDK, response } = useCafSdk();
  const { applyCafFaceLivenessUI } = useCafFaceLivenessUI();
  const [busy, setBusy] = useState(false);
  const handledTerminalRef = useRef(false);

  const resetFlowState = useCallback(() => {
    handledTerminalRef.current = false;
  }, []);

  useEffect(() => {
    if (handledTerminalRef.current) return;

    if (response.success && response.success.length > 0) {
      handledTerminalRef.current = true;
      setBusy(false);
      void (async () => {
        await setComplete(true);
        router.push('/(auth)/new-password');
      })();
      return;
    }

    if (response.cancelled) {
      handledTerminalRef.current = true;
      setBusy(false);
      return;
    }

    if (response.error) {
      handledTerminalRef.current = true;
      setBusy(false);
      const desc = response.error.description ?? 'Something went wrong. Please try again.';
      Alert.alert('Verification error', desc);
      return;
    }

    if (response.failure) {
      handledTerminalRef.current = true;
      setBusy(false);
      const desc = response.failure.description ?? 'Liveness check did not pass. Please try again.';
      Alert.alert('Verification failed', desc);
    }
  }, [response, router, setComplete]);

  const onStartVerification = async () => {
    if (busy) return;

    const mobileToken = getCafMobileToken();
    const personId = getCafPersonId();
    if (!mobileToken || !personId) {
      Alert.alert(
        'Configuration required',
        'Set EXPO_PUBLIC_CAF_MOBILE_TOKEN and EXPO_PUBLIC_CAF_PERSON_ID (or expo.extra.caf in app.json) for a dev build.',
      );
      return;
    }

    resetFlowState();
    setBusy(true);

    try {
      await initialize(
        {
          mobileToken,
          personId,
          environment: getCafEnvironment(),
          configuration: {
            presentationOrder: [CafModuleType.FACE_LIVENESS_UI],
          },
        },
        async () => {
          await applyCafFaceLivenessUI({
            instructionScreenConfiguration: {
              title: 'Identity verification',
              description: 'We will run a quick liveness check to secure your account.',
              buttonText: 'Continue',
            },
          });
          return true;
        },
      );
      startSDK();
    } catch {
      setBusy(false);
      Alert.alert('Could not start verification', 'Check your network and CAF credentials, then try again.');
    }
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
              <Text style={styles.instructionText}>Tap start — you will complete liveness in the secure CAF flow</Text>
            </View>

            <View style={styles.viewportOuter}>
              <View style={styles.viewportInner}>
                <View style={styles.cameraPlaceholder}>
                  <MaterialIcons name="verified-user" size={54} color="#74777F" style={styles.cameraPlaceholderIcon} />
                </View>
              </View>
            </View>

            <View style={styles.securityBadge}>
              <MaterialIcons name="shield" size={13} color="#002046" />
              <Text style={styles.securityBadgeText}>End-to-end encrypted</Text>
            </View>
          </View>

          <View style={styles.actionSection}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Start Verification"
              onPress={onStartVerification}
              disabled={busy}
              style={[styles.primaryButton, !busy && styles.primaryButtonReady]}
            >
              <Text style={styles.primaryButtonText}>{busy ? 'Opening…' : 'Start Verification'}</Text>
              <MaterialIcons name="arrow-forward" size={12} color="#FFFFFF" />
            </Pressable>

            <Pressable accessibilityRole="button" accessibilityLabel="Cancel" onPress={() => router.back()} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
