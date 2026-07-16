
import React, { useState, useCallback, useEffect } from 'react';
import { PasswordConfig, CharType, ALL_SPECIAL_CHARS } from './types';
import { generatePassword } from './utils/passwordGenerator';
import PasswordDisplay from './components/PasswordDisplay';
import LengthSlider from './components/LengthSlider';

const App: React.FC = () => {
  const [config, setConfig] = useState<PasswordConfig>({
    lowercase: 4,
    uppercase: 4,
    numbers: 4,
    special: 2,
  });

  const [selectedSpecials, setSelectedSpecials] = useState<Set<string>>(new Set(ALL_SPECIAL_CHARS.slice(0, 10)));
  const [password, setPassword] = useState<string>('');

  const totalLength = config.lowercase + config.uppercase + config.numbers + config.special;

  const handleConfigChange = (type: CharType, val: number) => {
    setConfig(prev => ({ ...prev, [type]: val }));
  };

  const toggleSpecial = (char: string) => {
    const next = new Set(selectedSpecials);
    if (next.has(char)) {
      next.delete(char);
    } else {
      next.add(char);
    }
    setSelectedSpecials(next);
  };

  const handleUncheckAll = () => {
    setSelectedSpecials(new Set());
  };

  const handleCheckAll = () => {
    setSelectedSpecials(new Set(ALL_SPECIAL_CHARS));
  };

  const handleGenerate = useCallback(() => {
    const newPass = generatePassword(config, Array.from(selectedSpecials));
    setPassword(newPass);
  }, [config, selectedSpecials]);

  // Initial generation
  useEffect(() => {
    handleGenerate();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            SecurePass <span className="text-indigo-600">Generator</span>
          </h1>
          <p className="text-slate-500 font-medium">Crie senhas ultra seguras com controle total de caracteres.</p>
        </header>

        {/* Generated Password Card */}
        <PasswordDisplay password={password} />

        {/* Configuration Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Length Control */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Comprimento</h2>
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg mono font-bold text-sm">
                Total: {totalLength}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              <LengthSlider label="abc" type="lowercase" value={config.lowercase} onChange={handleConfigChange} />
              <LengthSlider label="ABC" type="uppercase" value={config.uppercase} onChange={handleConfigChange} />
              <LengthSlider label="123" type="numbers" value={config.numbers} onChange={handleConfigChange} />
              <LengthSlider label="%?!" type="special" value={config.special} onChange={handleConfigChange} />
            </div>

            <div className="flex justify-center items-center gap-2 mono text-sm font-bold text-slate-400 mt-2 bg-slate-50 py-2 rounded-xl">
              <span>{config.lowercase}</span>
              <span className="text-slate-300">+</span>
              <span>{config.uppercase}</span>
              <span className="text-slate-300">+</span>
              <span>{config.numbers}</span>
              <span className="text-slate-300">+</span>
              <span>{config.special}</span>
              <span className="text-slate-300">=</span>
              <span className="text-indigo-600">{totalLength}</span>
            </div>
          </div>

          {/* Special Characters Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Caracteres Especiais</h2>
              <div className="flex gap-2">
                 <button 
                  onClick={handleCheckAll}
                  className="text-xs font-bold text-indigo-500 hover:text-indigo-700 uppercase"
                >
                  Marcar tudo
                </button>
                <span className="text-slate-200">|</span>
                <button 
                  onClick={handleUncheckAll}
                  className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase"
                >
                  Desmarcar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-6 gap-2 mb-6">
              {ALL_SPECIAL_CHARS.map((char) => (
                <button
                  key={char}
                  onClick={() => toggleSpecial(char)}
                  className={`aspect-square flex items-center justify-center mono text-lg font-bold rounded-lg border-2 transition-all ${
                    selectedSpecials.has(char)
                      ? 'bg-yellow-100 border-yellow-400 text-yellow-700 shadow-[0_0_10px_rgba(250,204,21,0.2)]'
                      : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100">
               <div className={`p-2 rounded-lg text-center text-xs font-medium ${selectedSpecials.size === 0 && config.special > 0 ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-400'}`}>
                 {selectedSpecials.size === 0 && config.special > 0 
                   ? '⚠️ Selecione ao menos um caractere especial' 
                   : `${selectedSpecials.size} caracteres disponíveis para uso`}
               </div>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleGenerate}
            disabled={selectedSpecials.size === 0 && config.special > 0}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-200 overflow-hidden"
          >
            <span className="relative flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Gerar Nova Senha
            </span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
          </button>
        </div>

        {/* Footer info */}
        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>© 2024 SecurePass. Segurança gerada localmente no seu navegador.</p>
        </footer>
      </div>
      <style>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 0.75s;
        }
      `}</style>
    </div>
  );
};

export default App;
