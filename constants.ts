
import { Layout, Play, Image as ImageIcon, Share2 } from 'lucide-react';
import { Step, ScanMode } from './types';

export const STEPS: Step[] = [
  { id: 'position', label: '位置信息', icon: Layout },
  { id: 'scanning', label: '扫描成像', icon: Play },
  { id: 'view', label: '成像视图', icon: ImageIcon },
  { id: 'transfer', label: '传输', icon: Share2 },
];

export const SCAN_MODES: Record<string, ScanMode> = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};
