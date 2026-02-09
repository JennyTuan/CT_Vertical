import type { Step, ScanMode } from '@/types/scan';

export const STEPS: Step[] = [
  { id: 'position', label: '位置信息', icon: 'mdi-view-dashboard' },
  { id: 'scanning', label: '扫描成像', icon: 'mdi-play' },
  { id: 'view', label: '成像视图', icon: 'mdi-image' },
  { id: 'transfer', label: '传输', icon: 'mdi-share-variant' },
];

export const SCAN_MODES: Record<string, ScanMode> = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};
