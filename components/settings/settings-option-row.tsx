import { settingsStyles as styles } from '@/stylesheets/settings-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type SettingsOptionRowProps = {
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  title: string;
  subtitle: string;
  trailing?: 'chevron' | 'toggle';
  toggled?: boolean;
  onPress?: () => void;
};

export function SettingsOptionRow({ icon, title, subtitle, trailing = 'chevron', toggled = false, onPress }: SettingsOptionRowProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={styles.settingsOptionRow}>
      <View style={styles.settingsOptionLeft}>
        <View style={styles.settingsOptionIconBox}>
          <MaterialIcons name={icon} size={20} color="#00327D" />
        </View>
        <View style={styles.settingsOptionMeta}>
          <Text style={styles.settingsOptionTitle}>{title}</Text>
          <Text style={styles.settingsOptionSubtitle}>{subtitle}</Text>
        </View>
      </View>

      {trailing === 'toggle' ? (
        <View style={[styles.settingsToggleTrack, toggled && styles.settingsToggleOnTrack]}>
          <View style={styles.settingsToggleThumb} />
        </View>
      ) : (
        <MaterialIcons name="chevron-right" size={20} color="#737784" />
      )}
    </Pressable>
  );
}
