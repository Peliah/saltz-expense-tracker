import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import type { ComponentProps } from 'react';
import { useCallback, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';

const FAB_SIZE = 56;
const GAP = 12;
const SLIDE_UNIT = FAB_SIZE + GAP;

type IconName = ComponentProps<typeof MaterialIcons>['name'];

export type QuickActionOption = {
  id: string;
  label: string;
  icon: IconName;
  onPress?: () => void;
};

const DEFAULT_OPTIONS: QuickActionOption[] = [
  { id: 'deposit', label: 'Deposit', icon: 'south-west' },
  { id: 'withdraw', label: 'Withdraw', icon: 'north-east' },
  { id: 'upload', label: 'Upload Data', icon: 'upload-file' },
];

function useFabSatelliteStyle(index: number, progress: SharedValue<number>) {
  return useAnimatedStyle(() => {
    const shift = SLIDE_UNIT * (index + 1);
    return {
      opacity: interpolate(progress.value, [0, 0.12, 1], [0, 1, 1]),
      transform: [
        { translateX: interpolate(progress.value, [0, 1], [shift * 0.35, 0]) },
        { scale: interpolate(progress.value, [0, 1], [0.88, 1]) },
      ],
    };
  });
}

type QuickActionFabProps = {
  options?: QuickActionOption[];
};

export function QuickActionFab({ options = DEFAULT_OPTIONS }: QuickActionFabProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(0);
  const [backdrop, setBackdrop] = useState(false);

  const rightOffset = 16;
  const bottomOffset = insets.bottom + 16;

  const close = useCallback(() => {
    progress.value = withTiming(0, { duration: 260 }, (finished) => {
      if (finished) {
        scheduleOnRN(setBackdrop, false);
      }
    });
  }, [progress]);

  const open = useCallback(() => {
    setBackdrop(true);
    progress.value = withTiming(1, { duration: 280 });
  }, [progress]);

  const toggleMain = useCallback(() => {
    if (progress.value < 0.5) {
      open();
    } else {
      close();
    }
  }, [close, open, progress]);

  const mainIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 45])}deg` }],
  }));

  const sat0 = useFabSatelliteStyle(0, progress);
  const sat1 = useFabSatelliteStyle(1, progress);
  const sat2 = useFabSatelliteStyle(2, progress);
  const satelliteStyles = [sat0, sat1, sat2];

  const actions = options.slice(0, 3);

  return (
    <View style={styles.quickFabRoot} pointerEvents="box-none">
      {backdrop ? (
        <Pressable style={styles.quickFabBackdrop} onPress={close} accessibilityLabel="Close quick actions" />
      ) : null}
      <View style={[styles.quickFabCluster, { right: rightOffset, bottom: bottomOffset }]}>
        <Pressable
          onPress={toggleMain}
          style={styles.quickFabMainOuter}
          accessibilityRole="button"
          accessibilityLabel="Quick actions"
          accessibilityState={{ expanded: backdrop }}
        >
          <View style={styles.quickFabMain}>
            <Animated.View style={mainIconStyle}>
              <MaterialIcons name="add" size={28} color="#FFFFFF" />
            </Animated.View>
          </View>
        </Pressable>
        {actions.map((opt, index) => (
          <Animated.View key={opt.id} style={[styles.quickFabSatWrap, satelliteStyles[index]]}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={opt.label}
              onPress={() => {
                if (opt.onPress) {
                  opt.onPress();
                } else if (opt.id === 'deposit') {
                  router.push('/(home)/add-transaction?tab=manual&type=deposit');
                } else if (opt.id === 'withdraw') {
                  router.push('/(home)/add-transaction?tab=manual&type=withdraw');
                } else if (opt.id === 'upload') {
                  router.push('/(home)/add-transaction?tab=upload');
                }
                close();
              }}
              style={styles.quickFabSatellite}
            >
              <MaterialIcons name={opt.icon} size={22} color="#0047AB" />
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
