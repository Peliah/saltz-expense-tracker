import { fabsStyles as styles } from '@/stylesheets/fabs-stylesheet';
import { Animated, Pressable, Text, View } from 'react-native';

export type TransactionMode = 'manual' | 'capture' | 'upload';

type ModeOption = {
  id: TransactionMode;
  label: string;
};

type TransactionModeToggleProps = {
  modes: ModeOption[];
  activeMode: TransactionMode;
  tabWidth: number;
  indicatorX: Animated.Value;
  onSelectMode: (mode: TransactionMode) => void;
  onLayout: (width: number) => void;
};

export function TransactionModeToggle({
  modes,
  activeMode,
  tabWidth,
  indicatorX,
  onSelectMode,
  onLayout,
}: TransactionModeToggleProps) {
  return (
    <View
      style={styles.modeToggle}
      onLayout={(event) => {
        onLayout(event.nativeEvent.layout.width);
      }}
    >
      {tabWidth ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.modeIndicator,
            {
              width: tabWidth,
              transform: [{ translateX: indicatorX }],
            },
          ]}
        />
      ) : null}
      {modes.map((item) => (
        <Pressable key={item.id} onPress={() => onSelectMode(item.id)} style={styles.modeButton}>
          <Text style={[styles.modeText, activeMode === item.id && styles.modeTextActive]}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
