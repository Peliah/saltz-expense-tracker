import { StyleSheet } from 'react-native';

export const overviewStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 8,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginRight: 12,
  },
  headerAvatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e2e8f0',
  },
  headerAvatarFallback: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0d9488',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarInitials: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 15,
    color: '#fff',
  },
  headerTitle: {
    flex: 1,
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    color: '#0f172a',
    letterSpacing: -0.2,
  },
  headerBellHit: {
    padding: 8,
    marginRight: -4,
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
