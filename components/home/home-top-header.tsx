import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type HomeTopHeaderProps = {
  title: string;
};

export function HomeTopHeader({ title }: HomeTopHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back-ios-new" size={14} color="#00327D" />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
