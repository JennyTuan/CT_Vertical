import type { MetricData } from '@/types/scan';

export const POSITION_METRICS: MetricData[] = [
  { label: '扫描环横移 (MM)', value: '+133', icon: 'move-h' },
  { label: '机架高度 (MM)', value: '-189', icon: 'move-v' },
  { label: '机架倾斜 (DEG)', value: '-60°', icon: 'tilt' },
  { label: '床位旋转 (DEG)', value: '-12°', icon: 'rotate' },
];
