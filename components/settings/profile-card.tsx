import { settingsStyles as styles } from '@/stylesheets/settings-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

type ProfileCardProps = {
  onPress?: () => void;
};

export function ProfileCard({ onPress }: ProfileCardProps) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel="Profile card" style={styles.profileCard} onPress={onPress}>
      <View style={styles.profileLeft}>
        <View style={styles.avatarWrap}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>AS</Text>
          </View>
          <View style={styles.avatarBadge}>
            <MaterialIcons name="verified" size={13} color="#002113" />
          </View>
        </View>

        <View style={styles.profileMeta}>
          <Text style={styles.profileName}>Alexander Sterling</Text>
          <View style={styles.memberPill}>
            <Text style={styles.memberPillText}>Pro Member</Text>
          </View>
        </View>
      </View>

      <MaterialIcons name="chevron-right" size={24} color="#737784" />
    </Pressable>
  );
}
