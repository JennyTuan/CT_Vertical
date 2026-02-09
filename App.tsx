
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowUp, RotateCcw, Activity, AlertCircle, Play } from 'lucide-react';
import { ScanMode } from './types';
import { STEPS, SCAN_MODES } from './constants';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MetricCard from './components/MetricCard';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [targetMode, setTargetMode] = useState<ScanMode>(SCAN_MODES.HORIZONTAL);
  const [currentHwMode, setCurrentHwMode] = useState<ScanMode>(SCAN_MODES.HORIZONTAL);
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentStep, setCurrentStep] = useState('position');
  const [time, setTime] = useState(new Date());

  // Simulation of hardware synchronization
  const handleSync = useCallback(() => {
    if (isSyncing) return;
    setIsSyncing(true);
    setTimeout(() => {
      setCurrentHwMode(targetMode);
      setIsSyncing(false);
    }, 1500);
  }, [targetMode, isSyncing]);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const isMatched = useMemo(
    () => targetMode === currentHwMode && !isSyncing,
    [targetMode, currentHwMode, isSyncing]
  );

  return (
    <div className="flex flex-col w-[1024px] h-[768px] bg-[#F2F4F7] font-sans overflow-hidden select-none text-slate-800 mx-auto border border-gray-300 shadow-2xl">
      
      <Header time={time} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar 
          targetMode={targetMode} 
          setTargetMode={setTargetMode} 
          isSyncing={isSyncing} 
          isMatched={isMatched} 
        />

        <main className="flex-1 flex flex-col bg-[#F8FAFC] relative">
          <div className="flex-1 p-6 overflow-hidden">
            {currentStep === 'position' ? (
              <div className="h-full flex flex-col justify-center">
                {/* Mismatch Warning Overlay */}
                {!isMatched && !isSyncing && (
                  <div className="absolute inset-0 z-40 bg-slate-100/40 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white p-8 rounded shadow-2xl border-t-8 border-orange-500 max-w-sm w-full text-center">
                      <AlertCircle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-slate-800 mb-2">模式不匹配</h3>
                      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                        请按操作盒切换至 <span className="text-blue-600 font-bold">【{targetMode === SCAN_MODES.HORIZONTAL ? '水平' : '垂直'}】</span> 模式
                      </p>
                      <button 
                        onClick={handleSync} 
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold shadow-lg transition-all active:scale-95 text-sm"
                      >
                        模拟硬件就位
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 max-w-4xl mx-auto w-full">
                  <MetricCard label="扫描环横移 (MM)" value="+133" icon={ChevronRight} />
                  <MetricCard label="机架高度 (MM)" value="-189" icon={ArrowUp} />
                  <MetricCard label="机架倾斜 (DEG)" value="-60°" icon={RotateCcw} />
                  <MetricCard label="床位旋转 (DEG)" value="-12°" icon={Activity} />
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-40">
                <Play size={48} className="animate-pulse text-blue-600 mb-4" />
                <h2 className="text-2xl font-bold uppercase tracking-widest">Scanning In Progress</h2>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-between px-8">
            <button 
              onClick={() => setCurrentStep('position')} 
              disabled={currentStep === 'position'} 
              className={`flex items-center space-x-2 px-5 py-2 rounded font-bold text-sm ${currentStep === 'position' ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <ChevronLeft size={18} />
              <span>返回</span>
            </button>
            <button 
              onClick={() => isMatched && setCurrentStep('scanning')} 
              disabled={!isMatched} 
              className={`px-10 py-2.5 rounded font-bold text-base shadow-lg transition-all ${isMatched ? 'bg-[#96C496] hover:bg-[#A8D4A8] text-[#1E4D1E] active:scale-95' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              确认位置
            </button>
          </div>
        </main>
      </div>

      <Footer currentStep={currentStep} steps={STEPS} />
    </div>
  );
};

export default App;
