
import { LucideIcon } from 'lucide-react';

export type ScanMode = 'horizontal' | 'vertical';

export interface Step {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface MetricData {
  label: string;
  value: string;
  icon: LucideIcon;
}
