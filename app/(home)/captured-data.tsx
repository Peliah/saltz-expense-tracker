import { HomeTopHeader } from '@/components/home/home-top-header';
import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SourceMode = 'capture' | 'upload';

function titleForSource(source: SourceMode) {
  return source === 'capture' ? 'Captured Data' : 'Uploaded Data';
}

export default function CapturedDataScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ source?: string }>();
  const source: SourceMode = params.source === 'upload' ? 'upload' : 'capture';

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.container}>
        <HomeTopHeader title={titleForSource(source)} />
        <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.label}>Processing Result</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: '#D5E0F8', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons
                  name={source === 'capture' ? 'document-scanner' : 'upload-file'}
                  size={22}
                  color="#00327D"
                />
              </View>
              <Text style={{ fontFamily: 'Manrope-Bold', fontSize: 18, color: '#00327D' }}>
                {source === 'capture' ? 'Receipt Scan Completed' : 'Import Completed'}
              </Text>
            </View>
            <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 14, color: '#586377' }}>
              We parsed the data and prepared a transaction draft.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Extracted Details</Text>
            <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 16, color: '#1F2937' }}>Merchant: Apple Store</Text>
            <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 16, color: '#1F2937' }}>Amount: $1,299.00</Text>
            <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 16, color: '#1F2937' }}>Date: 10/12/2023</Text>
            <Text style={{ fontFamily: 'Manrope-Regular', fontSize: 16, color: '#1F2937' }}>Category: Technology</Text>
          </View>
        </ScrollView>

        <View style={styles.fabBar}>
          <Pressable style={styles.primaryAction} onPress={() => router.push('/(home)/add-transaction?tab=manual')}>
            <Text style={styles.primaryActionText}>Use This Data</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
