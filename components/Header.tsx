
import React from 'react';
import { User, Bell, Database, Network, Sun, Settings, Thermometer, Battery, RotateCcw, ArrowUp, LucideIcon } from 'lucide-react';

interface HardwareParamProps {
  icon: LucideIcon;
  value: string;
  colorClass?: string;
}

const HardwareParam: React.FC<HardwareParamProps> = ({ icon: Icon, value, colorClass = "" }) => (
  <div className="flex items-center space-x-2">
    <div className="w-7 h-7 flex items-center justify-center bg-slate-700 text-white rounded transition-colors">
      <Icon size={16} />
    </div>
    <span className={`text-lg font-bold tabular-nums ${colorClass}`}>{value}</span>
  </div>
);

interface HeaderProps {
  time: Date;
}

const Header: React.FC<HeaderProps> = ({ time }) => {
  return (
    <header className="h-[64px] bg-[#D8DEE9] border-b border-[#C0C8D4] flex items-center px-4 space-x-4 z-50">
      {/* Patient Profile */}
      <div className="flex items-center px-2 py-1 bg-[#DDE4EE] border border-[#B0B8C4] rounded-sm min-w-[160px]">
        <div className="w-9 h-9 bg-white rounded-sm flex items-center justify-center mr-2 border border-[#B0B8C4]">
          <User className="w-5 h-5 text-[#92B0C4]" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="text-xs font-bold text-[#445566]">欧阳祖华</div>
          <div className="w-full h-1.5 bg-[#96C496] rounded-full mt-1 border border-[#7BAF7B]"></div>
        </div>
      </div>

      {/* Time and Date */}
      <div className="flex flex-col items-center border-r border-[#BCC4D0] pr-4">
        <div className="text-2xl font-bold text-[#445566] leading-none tabular-nums">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-[9px] text-[#778899] font-bold mt-0.5 uppercase tracking-wider">3月9日 周日</div>
      </div>

      {/* Patient Status */}
      <div className="flex flex-col justify-center text-[10px] text-[#556677] leading-tight pr-4">
        <div className="font-bold text-blue-700">急诊患者</div>
        <div className="opacity-70">ID:00058 | 170cm</div>
      </div>

      {/* Quick Actions / Indicators */}
      <div className="flex items-center space-x-4">
        <div className="flex flex-col items-center">
          <Bell size={18} className="text-blue-500" />
          <span className="text-[9px] font-bold mt-0.5 text-blue-600">急诊</span>
        </div>
        <div className="h-6 w-px bg-[#BCC4D0]"></div>
        {[Database, Network, Bell, Sun, Settings].map((Icon, idx) => (
          <Icon key={idx} size={18} className="text-[#556677] opacity-60 hover:opacity-100 cursor-pointer" />
        ))}
      </div>

      <div className="flex-1"></div>

      {/* Hardware Monitoring */}
      <div className="flex flex-col justify-center space-y-1 border-l border-[#BCC4D0] px-4">
        <HardwareParam icon={Thermometer} value="0%" colorClass="text-blue-600" />
        <HardwareParam icon={Battery} value="100" />
      </div>

      <div className="flex flex-col justify-center space-y-1 border-l border-[#BCC4D0] pl-4">
        <div className="flex items-center space-x-2 opacity-80"><RotateCcw size={14}/><span className="text-xs font-bold tabular-nums">112</span></div>
        <div className="flex items-center space-x-2 opacity-80"><ArrowUp size={14}/><span className="text-xs font-bold tabular-nums">112</span></div>
      </div>
    </header>
  );
};

export default Header;
