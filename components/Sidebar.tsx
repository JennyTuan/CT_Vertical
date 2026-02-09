
import React from 'react';
import { Layout, Activity } from 'lucide-react';
import { ScanMode } from '../types';
import { SCAN_MODES } from '../constants';

interface SidebarProps {
  targetMode: ScanMode;
  setTargetMode: (mode: ScanMode) => void;
  isSyncing: boolean;
  isMatched: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ targetMode, setTargetMode, isSyncing, isMatched }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-5 space-y-3">
      <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 mb-1">模式设置</h2>
      
      <button 
        onClick={() => setTargetMode(SCAN_MODES.HORIZONTAL)}
        className={`w-full p-4 rounded border-2 transition-all flex items-center space-x-3 ${targetMode === SCAN_MODES.HORIZONTAL ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-100 opacity-60'}`}
      >
        <div className={`w-10 h-10 rounded flex items-center justify-center ${targetMode === SCAN_MODES.HORIZONTAL ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
          <Layout size={24} />
        </div>
        <span className="font-bold text-slate-700 text-sm">水平扫描模式</span>
      </button>

      <button 
        onClick={() => setTargetMode(SCAN_MODES.VERTICAL)}
        className={`w-full p-4 rounded border-2 transition-all flex items-center space-x-3 ${targetMode === SCAN_MODES.VERTICAL ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-gray-100 opacity-60'}`}
      >
        <div className={`w-10 h-10 rounded flex items-center justify-center ${targetMode === SCAN_MODES.VERTICAL ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
          <Activity size={24} />
        </div>
        <span className="font-bold text-slate-700 text-sm">垂直扫描模式</span>
      </button>

      {/* Sync Status Overlay / Indicator */}
      <div className="mt-auto p-3 rounded bg-slate-50 border border-slate-200">
         <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-blue-500 animate-ping' : isMatched ? 'bg-green-500' : 'bg-orange-500'}`}></div>
            <span className="text-[10px] font-bold text-slate-600 leading-tight">
              {isSyncing ? '同步中...' : isMatched ? '硬件已锁定就绪' : '模式不一致'}
            </span>
         </div>
      </div>
    </aside>
  );
};

export default Sidebar;
