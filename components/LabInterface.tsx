import React, { useState, useRef } from 'react';
import { LabModule, Language, Theme } from '../types';
import { PlayCircle, Brain } from 'lucide-react';
import { analyzeScenario } from '../services/geminiService';
import { UI_TEXT } from '../constants';
import ConceptGame from './lab/ConceptGame';
import CittaBuilder from './lab/CittaBuilder';
import ProcessViewer from './lab/ProcessViewer';
import CetasikaTable from './lab/CetasikaTable';
import ElementMixer from './lab/ElementMixer';
import KammaMechanismLab from './lab/KammaMechanismLab';

interface LabInterfaceProps {
  module: LabModule;
  language: Language;
  theme: Theme;
}

export const LabInterface: React.FC<LabInterfaceProps> = ({ module, language, theme }) => {
  const [scenarioInput, setScenarioInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const ui = UI_TEXT[language];

  const handleAnalyze = async () => {
    if (!scenarioInput.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    const result = await analyzeScenario(scenarioInput); // Service might need lang param in future
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setTimeout(() => { resultRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  const renderContent = () => {
    const content = (() => {
      switch (module.id) {
        case 'intro': return <ConceptGame language={language} theme={theme} />;
        case 'citta': return <CittaBuilder language={language} theme={theme} />;
        case 'vithi': return <ProcessViewer language={language} theme={theme} />;
        case 'cetasika': return <CetasikaTable language={language} theme={theme} />;
        case 'rupa': return <ElementMixer language={language} theme={theme} />;
        case 'kamma': return <KammaMechanismLab language={language} theme={theme} />;
        default: return <div className="text-center text-gray-500 py-20"><p>Module under construction.</p></div>;
      }
    })();

    return (
      <div key={module.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-forwards">
        {content}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-2 md:p-4 safe-pb-20">
      <header className="mb-2 md:mb-3">
        <div className="flex items-center gap-2 text-[#7B1113] mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase border border-[#7B1113]/30 px-1.5 py-0.5 rounded">Module</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500">ID: {module.id}</span>
        </div>
        <h1 className={`text-2xl md:text-3xl font-serif font-bold mb-1 tracking-tight leading-tight ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{module.title}</h1>
        <p className={`text-sm max-w-3xl leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{module.description}</p>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full">
        {renderContent()}

        {/* Universal Analysis Tool */}
        <div className={`mt-3 mb-10 md:mb-0 border rounded-xl p-3 relative overflow-hidden shadow-md ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
          <div className="absolute top-0 right-0 p-20 bg-[#7B1113]/5 blur-xl rounded-full pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-1.5 relative z-10">
            <Brain className="text-[#7B1113]" size={18} />
            <h3 className={`text-base md:text-lg font-serif font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{language === 'si' ? 'AI චිත්ත විශ්ලේෂණය' : 'AI Mind Analysis'}</h3>
          </div>
          <p className={`mb-3 relative z-10 max-w-lg text-xs md:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'si' ? 'ඔබට දිනපතා ජීවිතයේ දැනෙන සිතිවිලි (උදා: කේන්තිය, ආශාව) ඇතුලත් කරන්න. AI මගින් එය විශ්ලේෂණය කරයි.' : 'Enter your daily thoughts or feelings. AI will analyze them according to Abhidharma.'}</p>

          <div className="flex flex-col md:flex-row gap-2 relative z-10 max-w-xl">
            <input
              type="text"
              value={scenarioInput}
              onChange={(e) => setScenarioInput(e.target.value)}
              placeholder={ui.analyzePlaceholder}
              className={`flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7B1113]/50 shadow-inner text-sm ${theme === 'dark' ? 'bg-slate-950 border-slate-700 text-gray-100 placeholder-slate-600' : 'bg-white border-gray-300 text-gray-900'}`}
            />
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !scenarioInput}
              className="bg-[#7B1113] hover:bg-[#901416] text-white px-4 py-2 rounded-lg font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm shadow-red-900/10 active:scale-95 touch-manipulation text-sm"
            >
              {isAnalyzing ? <span className="animate-spin">⌛</span> : <PlayCircle size={16} />}
              {ui.analyze}
            </button>
          </div>

          {analysisResult && (
            <div ref={resultRef} className={`mt-3 p-3 rounded-lg border leading-relaxed text-xs md:text-sm prose max-w-none relative z-10 shadow-sm animate-fade-in ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-gray-300' : 'bg-white border-gray-200 text-gray-800'}`}>
              <div className="whitespace-pre-wrap">{analysisResult}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
