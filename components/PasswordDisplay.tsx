
import React, { useState } from 'react';

interface PasswordDisplayProps {
  password: string;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const strength = password.length === 0 ? 0 : Math.min(100, (password.length / 32) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8 transition-all hover:shadow-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Senha Gerada</span>
          <button
            onClick={handleCopy}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              copied 
                ? 'bg-green-100 text-green-700' 
                : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
        
        <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 min-h-[80px] flex items-center justify-center">
          <span className="mono text-2xl md:text-3xl font-bold text-slate-800 break-all text-center">
            {password || 'Clique em Gerar'}
          </span>
        </div>

        {password && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-400 uppercase">
              <span>Força</span>
              <span>{Math.round(strength)}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${
                  strength < 30 ? 'bg-red-400' : strength < 60 ? 'bg-yellow-400' : 'bg-emerald-400'
                }`}
                style={{ width: `${strength}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordDisplay;
