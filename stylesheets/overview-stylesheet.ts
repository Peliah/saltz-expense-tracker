import { StyleSheet } from 'react-native';

export const overviewStyles = StyleSheet.create({
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
    marginBottom: 8,
  },
  subheading: {
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    color: '#64748b',
  },
  card: {
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: '#0f172a',
  },
  cardBody: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    lineHeight: 20,
  },
});
