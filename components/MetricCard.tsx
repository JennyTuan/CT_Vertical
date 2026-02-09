
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, icon: Icon }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow h-full">
    <div className="flex justify-between items-start">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</span>
      <Icon className="w-6 h-6 text-slate-200" />
    </div>
    <div className="text-6xl font-bold text-slate-800 tracking-tighter tabular-nums my-2">
      {value}
    </div>
    <div className="w-full h-1 bg-blue-100 rounded-full overflow-hidden">
      <div className="h-full bg-blue-500 w-1/3 transition-all duration-500"></div>
    </div>
  </div>
);

export default MetricCard;
