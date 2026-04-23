import { overviewStyles as styles } from '@/stylesheets/overview-stylesheet';
import { useMemo, useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';

const CHART_HEIGHT = 128;
const STROKE = 3;
const BLUE = '#0047AB';

type Point = { x: number; y: number };

function catmullRomPoints(control: Point[], stepsPerSegment: number): Point[] {
  if (control.length < 2) return [...control];
  const pts: Point[] = [control[0]];
  const c = [control[0], ...control, control[control.length - 1]];
  for (let i = 1; i < c.length - 2; i++) {
    const p0 = c[i - 1];
    const p1 = c[i];
    const p2 = c[i + 1];
    const p3 = c[i + 2];
    for (let s = 1; s <= stepsPerSegment; s++) {
      const t = s / stepsPerSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      pts.push({
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  return pts;
}

function pointsToLinePath(points: Point[]): string {
  if (points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`;
  }
  return d;
}

function yOnPolyline(x: number, points: Point[]): number {
  if (points.length === 0) return CHART_HEIGHT * 0.5;
  if (x <= points[0].x) return points[0].y;
  if (x >= points[points.length - 1].x) return points[points.length - 1].y;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (x >= a.x && x <= b.x) {
      const t = (x - a.x) / (b.x - a.x || 1);
      return a.y + t * (b.y - a.y);
    }
  }
  return points[points.length - 1].y;
}

function buildCurve(w: number): { linePath: string; markers: Point[] } {
  const controls: Point[] = [
    { x: 0, y: 92 },
    { x: w * 0.15, y: 96 },
    { x: w * 0.38, y: 34 },
    { x: w * 0.55, y: 58 },
    { x: w * 0.76, y: 22 },
    { x: w, y: 68 },
  ];
  const dense = catmullRomPoints(controls, 10);
  const linePath = pointsToLinePath(dense);
  const markerXs = [w * 0.125, w * 0.375, w * 0.625, w * 0.875];
  const markers = markerXs.map((cx) => ({ x: cx, y: yOnPolyline(cx, dense) }));
  return { linePath, markers };
}

type SpendingTrendCardProps = {
  title?: string;
  dateRange?: string;
  activeDotIndex?: number;
};

export function SpendingTrendCard({
  title = 'Spending Trend',
  dateRange = 'Oct 1 - Oct 15, 2023',
  activeDotIndex = 0,
}: SpendingTrendCardProps) {
  const [chartWidth, setChartWidth] = useState(294);

  const { linePath, markers } = useMemo(() => buildCurve(chartWidth), [chartWidth]);

  const onChartLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && Math.abs(w - chartWidth) > 0.5) {
      setChartWidth(w);
    }
  };

  return (
    <View style={styles.spendingTrendCard}>
      <View style={styles.spendingTrendHeaderRow}>
        <Text style={styles.spendingTrendTitle}>{title}</Text>
        <View style={styles.spendingTrendDots}>
          <View style={[styles.spendingTrendDot, activeDotIndex === 0 && styles.spendingTrendDotActive]} />
          <View style={[styles.spendingTrendDot, activeDotIndex === 1 && styles.spendingTrendDotActive]} />
        </View>
      </View>
      <Text style={styles.spendingTrendSubtitle}>{dateRange}</Text>
      <View style={styles.spendingTrendChartWrap} onLayout={onChartLayout}>
        <Svg
          width={chartWidth}
          height={CHART_HEIGHT}
          viewBox={`0 0 ${chartWidth} ${CHART_HEIGHT}`}
          pointerEvents="none"
        >
          <Path
            d={linePath}
            fill="none"
            stroke={BLUE}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {markers.map((m, i) => (
            <Ellipse key={i} cx={m.x} cy={m.y} rx={4} ry={4} fill={BLUE} />
          ))}
        </Svg>
      </View>
      <View style={styles.spendingTrendAxis}>
        {['W1', 'W2', 'W3', 'W4'].map((label) => (
          <Text key={label} style={styles.spendingTrendAxisLabel}>
            {label}
          </Text>
        ))}
      </View>
    </View>
  );
}
