import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

export function AddTransactionUploadMode() {
  return (
    <View style={styles.captureCard}>
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 16,
          backgroundColor: '#D5E0F8',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="upload-file" size={26} color="#00327D" />
      </View>
      <Text style={styles.captureTitle}>Result of captured{'\n'}Data{'\n'}Figure this one out too !!!</Text>
    </View>
  );
}
