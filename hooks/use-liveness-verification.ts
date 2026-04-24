import {
  DEFAULT_LIVENESS_SEQUENCE,
  evaluateChallenge,
  getChallengeInstruction,
  hasAcceptableFaceCount,
  type LivenessChallenge,
} from '@/lib/liveness';
import { type RNMLKitFace, useFaceDetection } from '@infinitered/react-native-mlkit-face-detection';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useMemo, useRef, useState } from 'react';

const SNAPSHOT_INTERVAL_MS = 900;
const CHALLENGE_TIMEOUT_MS = 14000;
const CAPTURE_QUALITY = 0.8;
const LIVENESS_LOG_PREFIX = '[liveness]';

type UseLivenessVerificationArgs = {
  onVerified: () => Promise<void>;
};

export function useLivenessVerification({ onVerified }: UseLivenessVerificationArgs) {
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
  const [sequence, setSequence] = useState<LivenessChallenge[]>(DEFAULT_LIVENESS_SEQUENCE);

  const permissionGranted = permission?.granted === true;
  const canStartVerification = permissionGranted && !starting && !isSessionActive;
  const activeChallenge = sequence[challengeIndex];
  const challengeLabel = activeChallenge ? getChallengeInstruction(activeChallenge) : 'Keep still';
  const progressLabel = useMemo(() => `${Math.min(challengeIndex + 1, sequence.length)}/${sequence.length}`, [challengeIndex, sequence.length]);
  const buttonLabel = starting ? 'Preparing...' : isSessionActive ? 'Verifying...' : 'Start Verification';

  const logEvent = (event: string, details?: Record<string, unknown>) => {
    const stamp = new Date().toISOString();
    if (details) {
      console.log(`${LIVENESS_LOG_PREFIX} ${stamp} ${event}`, details);
      return;
    }
    console.log(`${LIVENESS_LOG_PREFIX} ${stamp} ${event}`);
  };

  const stopSessionLoop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      logEvent('session_loop_stopped');
    }
    processingRef.current = false;
  };

  const cleanup = () => {
    stopSessionLoop();
    sessionActiveRef.current = false;
  };

  const failSession = (reason: string) => {
    stopSessionLoop();
    setIsSessionActive(false);
    sessionActiveRef.current = false;
    setFailureReason(reason);
    setStatusText('Verification failed');
    previousFaceRef.current = null;
    logEvent('session_failed', { reason });
  };

  const completeSession = async () => {
    stopSessionLoop();
    setIsSessionActive(false);
    sessionActiveRef.current = false;
    setIsComplete(true);
    setStatusText('Verification complete');
    logEvent('session_complete');
    await onVerified();
  };

  const processFrame = async () => {
    const currentSequence = sequenceRef.current;
    const currentChallengeIndex = challengeIndexRef.current;
    const currentChallenge = currentSequence[currentChallengeIndex];

    if (!sessionActiveRef.current || processingRef.current || !cameraRef.current || !currentChallenge) {
      return;
    }

    processingRef.current = true;

    try {
      logEvent('frame_capture_begin', {
        challenge: currentChallenge,
        challengeIndex: currentChallengeIndex,
      });

      const photo = await cameraRef.current.takePictureAsync({
        quality: CAPTURE_QUALITY,
        skipProcessing: false,
      });

      if (!photo?.uri) {
        logEvent('frame_capture_no_uri');
        return;
      }

      const detection = await faceDetector.detectFaces(photo.uri);
      const detectionError = detection?.error ?? null;
      const faceCount = detection?.faces?.length ?? 0;
      const hasFaceData = Array.isArray(detection?.faces);
      const detectionSucceeded = detectionError == null && hasFaceData;

      logEvent('raw_detection', {
        challenge: currentChallenge,
        successFlag: detection?.success ?? null,
        interpretedSuccess: detectionSucceeded,
        error: detectionError,
        faceCount,
      });

      if (!detectionSucceeded) {
        logEvent('detection_unsuccessful', {
          challenge: currentChallenge,
          error: detectionError,
          hasFaceData,
        });
        setStatusText('Hold still while we scan your face');
        return;
      }

      if (!hasAcceptableFaceCount(detection.faces)) {
        logEvent('face_count_rejected', { challenge: currentChallenge, faceCount: detection.faces.length });
        setStatusText('Make sure only one face is in frame');
        return;
      }

      const now = Date.now();
      if (now - challengeStartedAtRef.current > CHALLENGE_TIMEOUT_MS) {
        logEvent('challenge_timeout', {
          challenge: currentChallenge,
          elapsedMs: now - challengeStartedAtRef.current,
          timeoutMs: CHALLENGE_TIMEOUT_MS,
        });
        failSession('Timed out. Please restart verification.');
        return;
      }

      const face = detection.faces[0] ?? null;
      if (!face) {
        logEvent('no_single_face_after_filter');
        return;
      }

      const evaluation = evaluateChallenge(currentChallenge, face, previousFaceRef.current);
      if (!evaluation.passed) {
        logEvent('challenge_not_passed', {
          challenge: currentChallenge,
          reason: evaluation.reason ?? null,
          metrics: {
            yaw: face.headEulerAngleY ?? null,
            smile: face.smilingProbability ?? null,
            leftEyeOpen: face.leftEyeOpenProbability ?? null,
            rightEyeOpen: face.rightEyeOpenProbability ?? null,
          },
        });
        setStatusText(evaluation.reason ?? getChallengeInstruction(currentChallenge));
        previousFaceRef.current = face;
        return;
      }

      previousFaceRef.current = face;
      const nextIndex = currentChallengeIndex + 1;
      logEvent('challenge_passed', {
        challenge: currentChallenge,
        completedStep: currentChallengeIndex + 1,
        totalSteps: currentSequence.length,
      });

      if (nextIndex >= currentSequence.length) {
        await completeSession();
        return;
      }

      setChallengeIndex(nextIndex);
      challengeIndexRef.current = nextIndex;
      challengeStartedAtRef.current = now;
      setStatusText(getChallengeInstruction(currentSequence[nextIndex]));
      logEvent('challenge_advanced', {
        nextChallenge: currentSequence[nextIndex],
        nextIndex,
      });
    } catch (error) {
      logEvent('process_frame_failed', { error: toLogError(error) });
      failSession('Could not process camera frame. Please retry.');
    } finally {
      processingRef.current = false;
    }
  };

  const startSessionLoop = () => {
    stopSessionLoop();
    logEvent('session_loop_started', { intervalMs: SNAPSHOT_INTERVAL_MS });
    intervalRef.current = setInterval(() => {
      void processFrame();
    }, SNAPSHOT_INTERVAL_MS);
  };

  const startVerification = async () => {
    if (!permissionGranted || starting || isSessionActive) return;

    logEvent('start_requested', { permissionGranted, starting, isSessionActive });
    setStarting(true);
    setFailureReason(null);
    setIsComplete(false);
    setStatusText('Initializing liveness checks...');
    previousFaceRef.current = null;

    try {
      logEvent('detector_initialize_begin');
      await faceDetector.initialize();
      logEvent('detector_initialize_success');

      const challengeOrder = shuffleChallenges(DEFAULT_LIVENESS_SEQUENCE);
      logEvent('challenge_order_generated', { sequence: challengeOrder });

      setSequence(challengeOrder);
      setChallengeIndex(0);
      const startTs = Date.now();
      challengeStartedAtRef.current = startTs;
      challengeIndexRef.current = 0;
      sequenceRef.current = challengeOrder;
      setIsSessionActive(true);
      sessionActiveRef.current = true;
      setStatusText(getChallengeInstruction(challengeOrder[0]));
      logEvent('session_started', { firstChallenge: challengeOrder[0] });
      startSessionLoop();
    } catch (error) {
      logEvent('detector_initialize_failed', { error: toLogError(error) });
      setFailureReason('Unable to initialize face detection. Please try again.');
      setStatusText('Initialization failed');
    } finally {
      setStarting(false);
    }
  };

  return {
    cameraRef,
    permissionGranted,
    requestPermission,
    startVerification,
    cleanup,
    isSessionActive,
    isComplete,
    statusText,
    failureReason,
    challengeLabel,
    progressLabel,
    buttonLabel,
    canStartVerification,
    showProgress: isSessionActive,
    showRetry: Boolean(failureReason),
  };
}

function shuffleChallenges(challenges: readonly LivenessChallenge[]): LivenessChallenge[] {
  const clone = [...challenges];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function toLogError(error: unknown): string {
  if (error instanceof Error) return `${error.name}: ${error.message}`;
  return String(error);
}
