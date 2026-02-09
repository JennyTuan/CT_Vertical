
import React from 'react';
import { Step } from '../types';

interface FooterProps {
  currentStep: string;
  steps: Step[];
}

const Footer: React.FC<FooterProps> = ({ currentStep, steps }) => {
  return (
    <footer className="h-16 bg-[#7E98C4] flex items-stretch border-t border-[#6B85B2] shadow-2xl relative z-50">
      {steps.map((step) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        return (
          <div 
            key={step.id} 
            className={`flex-1 flex items-center justify-center space-x-2 transition-all ${isActive ? 'bg-[#1E4D94] border-x border-[#0D2A57] shadow-inner' : 'opacity-40'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'border-white text-white' : 'border-white/40 text-white/40'}`}>
              <Icon size={16} />
            </div>
            <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-white/40'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </footer>
  );
};

export default Footer;
