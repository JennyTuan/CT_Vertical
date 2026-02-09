import type { Step, ScanMode } from '@/types/scan';

export const STEPS: Step[] = [
  { id: 'position', label: '浣嶇疆淇℃伅', icon: 'mdi-view-dashboard' },
  { id: 'scanning', label: '鎵弿鎴愬儚', icon: 'mdi-play' },
  { id: 'view', label: '鎴愬儚瑙嗗浘', icon: 'mdi-image' },
  { id: 'transfer', label: '浼犺緭', icon: 'mdi-share-variant' },
];

export const SCAN_MODES: Record<string, ScanMode> = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};
