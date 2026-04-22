import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

type ImageSource = number | { uri: string };

type LedgerHeaderProps = {
  title?: string;
  avatarSource?: ImageSource | null;
  onPressBell?: () => void;
};

export function LedgerHeader({
  title = 'Sovereign Ledger',
  avatarSource,
  onPressBell,
}: LedgerHeaderProps) {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].icon;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {avatarSource != null ? (
          <Image source={avatarSource} style={styles.headerAvatarImage} contentFit="cover" transition={200} />
        ) : (
          <View style={styles.headerAvatarFallback}>
            <Text style={styles.headerAvatarInitials}>SL</Text>
          </View>
        )}
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <Pressable
        style={styles.headerBellHit}
        onPress={onPressBell}
        hitSlop={12}
        accessibilityRole="button"
        accessibilityLabel="Notifications"
      >
        <IconSymbol name="bell.fill" size={24} color={iconColor} />
      </Pressable>
    </View>
  );
}
