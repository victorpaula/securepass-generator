
import React from 'react';
import { CharType } from '../types';

interface LengthSliderProps {
  label: string;
  value: number;
  type: CharType;
  onChange: (type: CharType, val: number) => void;
  max?: number;
}

const LengthSlider: React.FC<LengthSliderProps> = ({ label, value, type, onChange, max = 24 }) => {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 transition-colors">
      <div className="flex flex-col items-center">
        <span className="mono text-2xl font-bold text-indigo-600 mb-1">{value}</span>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">{label}</span>
      </div>
      
      <div className="w-full flex items-center justify-center">
        <div className="h-32 flex items-center py-2">
          <input
            type="range"
            min="0"
            max={max}
            value={value}
            onChange={(e) => onChange(type, parseInt(e.target.value))}
            style={{ 
              transform: 'rotate(-90deg)', 
              width: '100px',
              backgroundSize: `${(value / max) * 100}% 100%`
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default LengthSlider;
