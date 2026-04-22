import { StyleSheet } from 'react-native';

export const verifyEmailStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    paddingTop: 8,
  },
  title: {
    fontFamily: 'Manrope-Bold',
    fontSize: 26,
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 24,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  codeCell: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlign: 'center',
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: '#0f172a',
    paddingVertical: 12,
  },
  codeInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    textAlign: 'center',
    fontFamily: 'Manrope-SemiBold',
    fontSize: 22,
    letterSpacing: 4,
    color: '#0f172a',
    paddingVertical: 16,
    marginBottom: 20,
  },
  resend: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    color: '#0d9488',
    textAlign: 'center',
    marginTop: 8,
  },
});
