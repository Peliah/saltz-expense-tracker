import { StyleSheet } from 'react-native';

export const insightsStyles = StyleSheet.create({
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
    marginBottom: 20,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: '#ccfbf1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  chipText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 12,
    color: '#0f766e',
  },
  stat: {
    fontFamily: 'Manrope-Bold',
    fontSize: 36,
    color: '#0f172a',
    marginBottom: 4,
  },
  statCaption: {
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    color: '#64748b',
  },
});
