import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const STORAGE_KEYS = {
  AUTH_SETUP_COMPLETE: '@saltz/auth_setup_complete',
} as const;

const SECURE_AUTH_SETUP_KEY = 'saltz_auth_setup_complete';

export const storage = {
  async getItem(key: string): Promise<string | null> {
    try {
      if (key !== STORAGE_KEYS.AUTH_SETUP_COMPLETE) {
        return null;
      }
      if (Platform.OS === 'web') {
        return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
      }
      return await SecureStore.getItemAsync(SECURE_AUTH_SETUP_KEY);
    } catch (error) {
      console.error(`storage.getItem failed: ${key}`, error);
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (key !== STORAGE_KEYS.AUTH_SETUP_COMPLETE) {
        return;
      }
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        }
        return;
      }
      await SecureStore.setItemAsync(SECURE_AUTH_SETUP_KEY, value);
    } catch (error) {
      console.error(`storage.setItem failed: ${key}`, error);
    }
  },
  async removeItem(key: string): Promise<void> {
    try {
      if (key !== STORAGE_KEYS.AUTH_SETUP_COMPLETE) {
        return;
      }
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
        return;
      }
      await SecureStore.deleteItemAsync(SECURE_AUTH_SETUP_KEY);
    } catch (error) {
      console.error(`storage.removeItem failed: ${key}`, error);
    }
  },
};
