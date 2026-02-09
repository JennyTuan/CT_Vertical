export type ScanMode = 'horizontal' | 'vertical';

export interface Step {
  id: string;
  label: string;
  icon: string;
}

export interface MetricData {
  label: string;
  value: string;
  icon: string;
}
