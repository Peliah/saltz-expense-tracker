import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';
const memoryFallback = new Map<string, string>();
let warnedMissingNativeStorage = false;

function warnMissingNativeStorage(error: unknown) {
  if (warnedMissingNativeStorage) return;
  warnedMissingNativeStorage = true;
  console.warn('AsyncStorage native module unavailable. Using in-memory fallback (non-persistent).', error);
}

async function getRaw(key: string): Promise<string | null> {
  if (isWeb) {
    return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
  }
  try {
    const value = await AsyncStorage.getItem(key);
    return value ?? memoryFallback.get(key) ?? null;
  } catch (error) {
    warnMissingNativeStorage(error);
    return memoryFallback.get(key) ?? null;
  }
}

async function setRaw(key: string, value: string): Promise<void> {
  if (isWeb) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value);
    }
    return;
  }
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    warnMissingNativeStorage(error);
    memoryFallback.set(key, value);
  }
}

async function removeRaw(key: string): Promise<void> {
  if (isWeb) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
    return;
  }
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    warnMissingNativeStorage(error);
  }
  memoryFallback.delete(key);
}

export async function getJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await getRaw(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setJson<T>(key: string, value: T): Promise<void> {
  await setRaw(key, JSON.stringify(value));
}

export async function removeKey(key: string): Promise<void> {
  await removeRaw(key);
}
