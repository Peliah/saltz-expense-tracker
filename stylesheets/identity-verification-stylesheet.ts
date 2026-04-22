import { StyleSheet } from 'react-native';

export const identityVerificationStyles = StyleSheet.create({
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
  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#f8fafc',
  },
  cardTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#0f172a',
    marginBottom: 6,
  },
  cardBody: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  bullet: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
});
