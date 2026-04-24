import type { ComponentProps } from 'react';
import type MaterialIcons from '@expo/vector-icons/MaterialIcons';

type IconName = ComponentProps<typeof MaterialIcons>['name'];

export type AllocationStatus = 'at_limit' | 'healthy' | 'on_track';
export type AllocationFilter = 'All' | 'Food' | 'Travel' | 'Shop' | 'Home';

export type AllocationItem = {
  id: string;
  title: string;
  spent: number;
  budget: number;
  usedPercent: number;
  leftAmount: number;
  icon: IconName;
  iconColor: string;
  iconBgColor: string;
  status: AllocationStatus;
  fillType: 'solid' | 'gradient';
  fillColor?: string;
  fillGradient?: [string, string];
  filters: AllocationFilter[];
};

export const ALLOCATION_FILTERS: AllocationFilter[] = ['All', 'Food', 'Travel', 'Shop', 'Home'];

export const ALLOCATIONS: AllocationItem[] = [
  {
    id: 'housing',
    title: 'Housing',
    spent: 2450,
    budget: 2500,
    usedPercent: 98,
    leftAmount: -50,
    icon: 'home',
    iconColor: '#00327D',
    iconBgColor: 'rgba(0, 50, 125, 0.05)',
    status: 'at_limit',
    fillType: 'solid',
    fillColor: '#BA1A1A',
    filters: ['All', 'Home'],
  },
  {
    id: 'dining-out',
    title: 'Dining Out',
    spent: 420,
    budget: 850,
    usedPercent: 49,
    leftAmount: 430,
    icon: 'restaurant',
    iconColor: '#4EDEA3',
    iconBgColor: 'rgba(0, 63, 41, 0.05)',
    status: 'healthy',
    fillType: 'gradient',
    fillGradient: ['#003F29', '#4EDEA3'],
    filters: ['All', 'Food'],
  },
  {
    id: 'groceries',
    title: 'Groceries',
    spent: 680,
    budget: 1200,
    usedPercent: 56,
    leftAmount: 520,
    icon: 'shopping-basket',
    iconColor: '#545F73',
    iconBgColor: 'rgba(84, 95, 115, 0.05)',
    status: 'on_track',
    fillType: 'solid',
    fillColor: '#0047AB',
    filters: ['All', 'Shop', 'Food'],
  },
  {
    id: 'tickets',
    title: 'Tickets',
    spent: 215,
    budget: 400,
    usedPercent: 53,
    leftAmount: 185,
    icon: 'directions-car',
    iconColor: '#00327D',
    iconBgColor: 'rgba(0, 50, 125, 0.05)',
    status: 'on_track',
    fillType: 'solid',
    fillColor: '#0047AB',
    filters: ['All', 'Travel'],
  },
];
