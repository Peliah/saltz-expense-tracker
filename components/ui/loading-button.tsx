import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, type TextStyle, type ViewStyle } from 'react-native';

type LoadingButtonProps = {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export function LoadingButton({
  onPress,
  loading = false,
  disabled = false,
  text,
  buttonStyle,
  textStyle,
}: LoadingButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, (loading || disabled) && styles.disabled]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    backgroundColor: '#0d9488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.55,
  },
  text: {
    color: '#fff',
    fontSize: 17,
    fontFamily: 'Manrope-SemiBold',
  },
});
