import { StyleSheet } from 'react-native';

export const createAccountStyles = StyleSheet.create({
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
    fontSize: 28,
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: '#64748b',
    marginBottom: 28,
  },
  label: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    color: '#0f172a',
    marginBottom: 8,
  },
  input: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    color: '#0f172a',
    marginBottom: 16,
  },
  footerNote: {
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 8,
  },
});
