import { useAuthSetup } from '@/context/auth-setup';
import {
  DEFAULT_LIVENESS_SEQUENCE,
  evaluateChallenge,
  getChallengeInstruction,
  hasAcceptableFaceCount,
  type LivenessChallenge,
} from '@/lib/liveness';
import { identityVerificationStyles as styles } from '@/stylesheets/identity-verification-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { type RNMLKitFace, useFaceDetection } from '@infinitered/react-native-mlkit-face-detection';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SNAPSHOT_INTERVAL_MS = 900;
const CHALLENGE_TIMEOUT_MS = 9000;

export default function IdentityVerificationScreen() {
  const { setComplete } = useAuthSetup();
  const router = useRouter();
  const faceDetector = useFaceDetection();
  const cameraRef = useRef<CameraView | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processingRef = useRef(false);
  const previousFaceRef = useRef<RNMLKitFace | null>(null);
  const sessionActiveRef = useRef(false);
  const challengeIndexRef = useRef(0);
  const challengeStartedAtRef = useRef(0);
  const sequenceRef = useRef<LivenessChallenge[]>(DEFAULT_LIVENESS_SEQUENCE);
  const [permission, requestPermission] = useCameraPermissions();
  const [starting, setStarting] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [statusText, setStatusText] = useState('Center your face in the frame');
  const [failureReason, setFailureReason] = useState<string | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeStartedAt, setChallengeStartedAt] = useState(0);
  const [sequence, setSequence] = useState<LivenessChallenge[]>(DEFAULT_LIVENESS_SEQUENCE);

  const permissionGranted = permission?.granted === true;
  const activeChallenge = sequence[challengeIndex];
  const challengeLabel = activeChallenge ? getChallengeInstruction(activeChallenge) : 'Keep still';
  const progressLabel = useMemo(() => `${Math.min(challengeIndex + 1, sequence.length)}/${sequence.length}`, [challengeIndex, sequence.length]);

  useEffect(() => {
    if (!permission || permission.granted) return;
    if (permission.canAskAgain) {
      void requestPermission();
    }
  }, [permission, requestPermission]);

  useEffect(() => {
    return () => {
      stopSessionLoop();
    };
  }, []);

  useEffect(() => {
    sessionActiveRef.current = isSessionActive;
  }, [isSessionActive]);

  useEffect(() => {
    challengeIndexRef.current = challengeIndex;
  }, [challengeIndex]);

  useEffect(() => {
    challengeStartedAtRef.current = challengeStartedAt;
  }, [challengeStartedAt]);

  useEffect(() => {
    sequenceRef.current = sequence;
  }, [sequence]);

  const onStartVerification = async () => {
    if (!permissionGranted || starting || isSessionActive) return;
    setStarting(true);
    setFailureReason(null);
    setIsComplete(false);
    setStatusText('Initializing liveness checks...');
    previousFaceRef.current = null;

    try {
      await faceDetector.initialize();
      const challengeOrder = shuffleChallenges(DEFAULT_LIVENESS_SEQUENCE);
      setSequence(challengeOrder);
      setChallengeIndex(0);
      const startTs = Date.now();
      setChallengeStartedAt(startTs);
      setIsSessionActive(true);
      setStatusText(getChallengeInstruction(challengeOrder[0]));
      challengeIndexRef.current = 0;
      challengeStartedAtRef.current = startTs;
      sequenceRef.current = challengeOrder;
      sessionActiveRef.current = true;
      startSessionLoop();
    } catch {
      setFailureReason('Unable to initialize face detection. Please try again.');
      setStatusText('Initialization failed');
    } finally {
      setStarting(false);
    }
  };

  function startSessionLoop() {
    stopSessionLoop();
    intervalRef.current = setInterval(() => {
      void processFrame();
    }, SNAPSHOT_INTERVAL_MS);
  }

  function stopSessionLoop() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    processingRef.current = false;
  }

  async function processFrame() {
    const currentSequence = sequenceRef.current;
    const currentChallengeIndex = challengeIndexRef.current;
    const currentChallenge = currentSequence[currentChallengeIndex];

    if (!sessionActiveRef.current || processingRef.current || !cameraRef.current || !currentChallenge) {
      return;
    }

    processingRef.current = true;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.45,
        skipProcessing: true,
      });

      if (!photo?.uri) return;

      const detection = await faceDetector.detectFaces(photo.uri);
      if (!detection?.success) {
        setStatusText('Hold still while we scan your face');
        return;
      }

      if (!hasAcceptableFaceCount(detection.faces)) {
        setStatusText('Make sure only one face is in frame');
        return;
      }

      const now = Date.now();
      if (now - challengeStartedAtRef.current > CHALLENGE_TIMEOUT_MS) {
        failSession('Timed out. Please restart verification.');
        return;
      }

      const face = getSingleFace(detection.faces);
      if (!face) return;

      const evaluation = evaluateChallenge(currentChallenge, face, previousFaceRef.current);
      if (!evaluation.passed) {
        setStatusText(evaluation.reason ?? getChallengeInstruction(currentChallenge));
        previousFaceRef.current = face;
        return;
      }

      previousFaceRef.current = face;
      const nextIndex = currentChallengeIndex + 1;

      if (nextIndex >= currentSequence.length) {
        await completeSession();
        return;
      }

      setChallengeIndex(nextIndex);
      setChallengeStartedAt(now);
      challengeIndexRef.current = nextIndex;
      challengeStartedAtRef.current = now;
      setStatusText(getChallengeInstruction(currentSequence[nextIndex]));
    } catch {
      failSession('Could not process camera frame. Please retry.');
    } finally {
      processingRef.current = false;
    }
  }

  async function completeSession() {
    stopSessionLoop();
    setIsSessionActive(false);
    sessionActiveRef.current = false;
    setIsComplete(true);
    setStatusText('Verification complete');
    await setComplete(true);
    router.push('/(auth)/new-password');
  }

  function failSession(reason: string) {
    stopSessionLoop();
    setIsSessionActive(false);
    sessionActiveRef.current = false;
    setFailureReason(reason);
    setStatusText('Verification failed');
    previousFaceRef.current = null;
  }

  const buttonLabel = starting ? 'Preparing...' : isSessionActive ? 'Verifying...' : 'Start Verification';

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
            {isSessionActive ? (
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
                onPress={onStartVerification}
                disabled={starting || isSessionActive}
                style={[styles.primaryButton, !starting && !isSessionActive && styles.primaryButtonReady]}
              >
                <Text style={styles.primaryButtonText}>{buttonLabel}</Text>
                <MaterialIcons name="arrow-forward" size={12} color="#FFFFFF" />
              </Pressable>
            )}
            {failureReason ? (
              <Pressable accessibilityRole="button" accessibilityLabel="Retry verification" onPress={onStartVerification} style={styles.retryButton}>
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

function shuffleChallenges(challenges: readonly LivenessChallenge[]): LivenessChallenge[] {
  const clone = [...challenges];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = clone[i];
    clone[i] = clone[j];
    clone[j] = temp;
  }
  return clone;
}

function getSingleFace(faces: readonly RNMLKitFace[]): RNMLKitFace | null {
  return faces[0] ?? null;
}
