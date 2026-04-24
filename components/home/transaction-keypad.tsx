import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { Pressable, Text, View } from 'react-native';

const DEFAULT_KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', '⌫'],
];

type TransactionKeypadProps = {
  keys?: string[][];
  onPressKey: (key: string) => void;
};

export function TransactionKeypad({ keys = DEFAULT_KEYS, onPressKey }: TransactionKeypadProps) {
  return (
    <View style={styles.keypad}>
      {keys.map((row) => (
        <View key={row.join('-')} style={styles.keypadRow}>
          {row.map((key) => (
            <Pressable key={key} style={styles.key} onPress={() => onPressKey(key)}>
              <Text style={styles.keyText}>{key}</Text>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}
