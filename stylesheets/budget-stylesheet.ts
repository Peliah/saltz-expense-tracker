import { StyleSheet } from 'react-native';

export const budgetStyles = StyleSheet.create({
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 15,
    color: '#0f172a',
  },
  rowValue: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    color: '#0d9488',
  },
});
