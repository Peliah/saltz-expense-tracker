import { CafEnvironment } from '@caf.io/react-native-sdk';
import Constants from 'expo-constants';

type CafExtra = {
  mobileToken?: string;
  personId?: string;
  environment?: string;
};

function cafExtra(): CafExtra | undefined {
  const extra = Constants.expoConfig?.extra as { caf?: CafExtra } | undefined;
  return extra?.caf;
}

export function getCafEnvironment(): CafEnvironment {
  const fromEnv = process.env.EXPO_PUBLIC_CAF_ENV?.toLowerCase();
  const fromExtra = cafExtra()?.environment?.toLowerCase();
  const v = fromEnv ?? fromExtra ?? 'dev';
  if (v === 'prod' || v === 'production') return CafEnvironment.PROD;
  if (v === 'beta') return CafEnvironment.BETA;
  return CafEnvironment.DEV;
}

export function getCafMobileToken(): string {
  return (
    process.env.EXPO_PUBLIC_CAF_MOBILE_TOKEN?.trim() ||
    cafExtra()?.mobileToken?.trim() ||
    ''
  );
}

export function getCafPersonId(): string {
  return (
    process.env.EXPO_PUBLIC_CAF_PERSON_ID?.trim() ||
    cafExtra()?.personId?.trim() ||
    ''
  );
}
