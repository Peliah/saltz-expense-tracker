import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  heading: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: '#0f172a',
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 13,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 8,
  },
  row: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 10,
  },
  rowLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    color: '#0f172a',
  },
  rowHint: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  danger: {
    borderColor: '#fecaca',
    backgroundColor: '#fef2f2',
  },
  dangerLabel: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#b91c1c',
  },
});
