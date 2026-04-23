import { budgetStyles as styles } from '@/stylesheets/budget-stylesheet';
import { useMemo, useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import Svg, { G, Line, Rect } from 'react-native-svg';

type SpendingVelocityGraphProps = {
  days: readonly string[];
  target: readonly number[];
  actual: readonly number[];
  chartHeight?: number;
};

export function SpendingVelocityGraph({
  days,
  target,
  actual,
  chartHeight = 220,
}: SpendingVelocityGraphProps) {
  const [chartWidth, setChartWidth] = useState(310);

  const { barWidth, step, topInset, usableHeight, baselineY } = useMemo(() => {
    const leftInset = 8;
    const rightInset = 8;
    const top = 8;
    const bottom = 8;
    const usableW = Math.max(220, chartWidth - leftInset - rightInset);
    const usableH = chartHeight - top - bottom;
    const eachStep = usableW / days.length;
    const width = Math.min(38, eachStep - 8);
    const baseline = top + usableH;
    return { barWidth: width, step: eachStep, topInset: top, usableHeight: usableH, baselineY: baseline };
  }, [chartHeight, chartWidth, days.length]);

  const maxValue = Math.max(...target, ...actual, 1);

  const onChartLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    if (width > 0 && Math.abs(width - chartWidth) > 0.5) {
      setChartWidth(width);
    }
  };

  return (
    <View style={styles.velocityChartWrap} onLayout={onChartLayout}>
      <Svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} pointerEvents="none">
        {[0.25, 0.5, 0.75].map((tick) => {
          const y = topInset + usableHeight * (1 - tick);
          return (
            <Line
              key={tick}
              x1={0}
              y1={y}
              x2={chartWidth}
              y2={y}
              stroke="#D1D5DB"
              strokeWidth={1}
              strokeDasharray="4 6"
            />
          );
        })}

        {days.map((_, index) => {
          const centerX = step * index + step / 2;
          const x = centerX - barWidth / 2;
          const targetHeight = (target[index] / maxValue) * usableHeight;
          const actualHeight = (actual[index] / maxValue) * usableHeight;

          return (
            <G key={index}>
              <Rect
                x={x}
                y={baselineY - targetHeight}
                width={barWidth}
                height={targetHeight}
                rx={12}
                fill="#CBD0D5"
              />
              <Rect
                x={x}
                y={baselineY - actualHeight}
                width={barWidth}
                height={actualHeight}
                rx={12}
                fill="#7F9EC6"
              />
            </G>
          );
        })}
      </Svg>
      <View style={styles.velocityAxisRow}>
        {days.map((day) => (
          <Text key={day} style={styles.velocityBarLabel}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
}
