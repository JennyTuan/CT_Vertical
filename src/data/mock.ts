import type { MetricData } from '@/types/scan';

export const POSITION_METRICS: MetricData[] = [
  { label: '扫描环横移 (MM)', value: '+133', icon: 'mdi-chevron-right' },
  { label: '机架高度 (MM)', value: '-189', icon: 'mdi-arrow-up' },
  { label: '机架倾斜 (DEG)', value: '-60°', icon: 'mdi-rotate-left' },
  { label: '床位旋转 (DEG)', value: '-12°', icon: 'mdi-pulse' },
];
