import type { RNMLKitFace, RNMLKitFaceLandmark } from '@infinitered/react-native-mlkit-face-detection';

export type LivenessChallenge = 'blink' | 'turnLeft' | 'turnRight' | 'smile' | 'mouthOpen';

type Point = {
  x: number;
  y: number;
};

type LandmarkMap = Partial<Record<NonNullable<RNMLKitFaceLandmark['type']>, Point>>;

export type LivenessChallengeState = {
  challenge: LivenessChallenge;
  startedAt: number;
  completed: boolean;
};

export const DEFAULT_LIVENESS_SEQUENCE: LivenessChallenge[] = ['blink', 'turnLeft', 'turnRight', 'smile', 'mouthOpen'];

const BLINK_THRESHOLD = 0.35;
const EYE_OPEN_RESET_THRESHOLD = 0.65;
const TURN_THRESHOLD_DEGREES = 14;
const SMILE_THRESHOLD = 0.72;
const MOUTH_OPEN_RATIO = 0.2;

export function getChallengeInstruction(challenge: LivenessChallenge): string {
  switch (challenge) {
    case 'blink':
      return 'Blink once';
    case 'turnLeft':
      return 'Turn your head left';
    case 'turnRight':
      return 'Turn your head right';
    case 'smile':
      return 'Give a quick smile';
    case 'mouthOpen':
      return 'Open your mouth slightly';
    default:
      return 'Center your face in the frame';
  }
}

export function hasAcceptableFaceCount(faces: RNMLKitFace[]): boolean {
  return faces.length === 1;
}

export function hasReliableFaceSize(face: RNMLKitFace): boolean {
  const width = face.frame.size.x;
  const height = face.frame.size.y;
  return width >= 120 && height >= 120;
}

export function evaluateChallenge(
  challenge: LivenessChallenge,
  face: RNMLKitFace,
  previousFace: RNMLKitFace | null,
): { passed: boolean; reason?: string } {
  if (!hasReliableFaceSize(face)) {
    return { passed: false, reason: 'Move closer to the camera' };
  }

  switch (challenge) {
    case 'blink': {
      const currentLeft = face.leftEyeOpenProbability ?? 1;
      const currentRight = face.rightEyeOpenProbability ?? 1;
      if (!previousFace) return { passed: false };
      const prevLeft = previousFace.leftEyeOpenProbability ?? 1;
      const prevRight = previousFace.rightEyeOpenProbability ?? 1;
      const wasOpen = prevLeft > EYE_OPEN_RESET_THRESHOLD && prevRight > EYE_OPEN_RESET_THRESHOLD;
      const nowClosed = currentLeft < BLINK_THRESHOLD && currentRight < BLINK_THRESHOLD;
      return { passed: wasOpen && nowClosed };
    }
    case 'turnLeft': {
      const yaw = face.headEulerAngleY ?? 0;
      return { passed: yaw < -TURN_THRESHOLD_DEGREES };
    }
    case 'turnRight': {
      const yaw = face.headEulerAngleY ?? 0;
      return { passed: yaw > TURN_THRESHOLD_DEGREES };
    }
    case 'smile': {
      return { passed: (face.smilingProbability ?? 0) > SMILE_THRESHOLD };
    }
    case 'mouthOpen': {
      const landmarks = toLandmarkMap(face.landmarks);
      const bottomMouth = landmarks.bottomMouth;
      const leftMouth = landmarks.leftMouth;
      const rightMouth = landmarks.rightMouth;
      const noseBase = landmarks.noseBase;

      if (!bottomMouth || !leftMouth || !rightMouth || !noseBase) {
        return { passed: false, reason: 'Keep your face centered' };
      }

      const mouthWidth = distance(leftMouth, rightMouth);
      if (mouthWidth === 0) {
        return { passed: false };
      }

      const mouthOpenness = Math.abs(bottomMouth.y - noseBase.y) / mouthWidth;
      return { passed: mouthOpenness > MOUTH_OPEN_RATIO };
    }
    default:
      return { passed: false };
  }
}

function toLandmarkMap(landmarks: RNMLKitFaceLandmark[]): LandmarkMap {
  return landmarks.reduce<LandmarkMap>((acc, landmark) => {
    if (!landmark.type || !landmark.position) return acc;
    acc[landmark.type] = landmark.position;
    return acc;
  }, {});
}

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}
