
import React, { useState, useEffect, useRef } from 'react';
import { LabModule, EntityType, QuizItem, CetasikaGroup, KammaSituation, Language, Theme } from '../types';
import { PlayCircle, Brain, Layers, Circle, CheckCircle, XCircle, RefreshCw, ArrowRight, Zap, Microscope, Trophy, Info, Play, Pause, RotateCcw, Droplets, Wind, Flame, Mountain, Heart, Hand, Scale, ThumbsUp, ThumbsDown, Sparkles, Fingerprint, Activity, Box, Eye, Skull, Leaf, Sun, CloudRain } from 'lucide-react';
import { analyzeScenario } from '../services/geminiService';
import { getIntroQuizData, getVithiStages, getCittaChallenges, getCetasikaGroups, getKammaSituations, KAMMA_SCENARIOS, UI_TEXT } from '../constants';

interface LabInterfaceProps {
  module: LabModule;
  language: Language;
  theme: Theme;
}

// --- SUB-COMPONENT: Concept vs Reality Game (Intro) ---
const ConceptGame = ({ language, theme }: { language: Language, theme: Theme }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{correct: boolean, text: string} | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const quizData = getIntroQuizData(language);
  const currentItem = quizData[currentCardIndex];
  const ui = UI_TEXT[language];

  // Reset if language changes mid-game to avoid index errors if lengths differ (unlikely but safe)
  useEffect(() => {
    setCurrentCardIndex(0);
    setScore(0);
    setIsFinished(false);
    setFeedback(null);
  }, [language]);

  const handleGuess = (type: 'concept' | 'reality') => {
    const isCorrect = currentItem.type === type;
    if (isCorrect) setScore(s => s + 1);
    
    setFeedback({
      correct: isCorrect,
      text: `${isCorrect ? ui.correct : ui.incorrect} ${currentItem.explanation}`
    });
  };

  const nextCard = () => {
    if (currentCardIndex < quizData.length - 1) {
      setCurrentCardIndex(c => c + 1);
      setFeedback(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentCardIndex(0);
    setScore(0);
    setIsFinished(false);
    setFeedback(null);
  };

  if (isFinished) {
    return (
      <div className={`p-6 md:p-10 rounded-2xl border animate-fade-in max-w-2xl mx-auto mt-4 md:mt-10 shadow-xl text-center ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50'}`}>
           <Trophy className="w-8 h-8 md:w-10 md:h-10 text-[#7B1113]" />
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-[#7B1113] mb-4">{ui.success}</h3>
        <p className={`mb-8 text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{ui.score}: {score} / {quizData.length}</p>
        
        <div className="flex justify-center gap-4">
            <button onClick={resetGame} className="px-6 py-3 md:px-8 md:py-3 bg-[#7B1113] hover:bg-[#901416] rounded-xl text-white font-medium transition flex items-center gap-2 active:scale-95 touch-manipulation shadow-lg shadow-red-900/20">
            <RefreshCw size={20} /> {ui.reset}
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 md:mt-8">
      <div className="flex justify-between items-center mb-4 px-1">
         <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
           {ui.question} {currentCardIndex + 1} / {quizData.length}
         </span>
         <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
           {ui.score}: {score}
         </span>
      </div>

      <div className={`border rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-300 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        <div className={`absolute top-0 left-0 h-1.5 w-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}>
          <div 
            className="h-full bg-[#7B1113] transition-all duration-500 ease-out"
            style={{ width: `${((currentCardIndex) / quizData.length) * 100}%` }}
          />
        </div>

        <div className="text-center mb-8 mt-2">
          <h4 className={`text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3 inline-block px-3 py-1 rounded-full ${theme === 'dark' ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
            Identify
          </h4>
          <h2 className={`text-3xl md:text-5xl font-serif font-bold mt-2 min-h-[3rem] ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{currentItem.term}</h2>
        </div>

        {!feedback ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => handleGuess('concept')}
              className={`p-6 md:p-8 rounded-2xl border transition-all group flex flex-col items-center active:scale-[0.98] touch-manipulation shadow-sm hover:shadow-md ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 border-slate-600' : 'bg-gray-50 hover:bg-indigo-50 border-gray-200 hover:border-indigo-200 active:bg-gray-100'}`}
            >
              <div className={`p-4 rounded-full mb-4 group-hover:scale-110 transition duration-300 shadow-sm border ${theme === 'dark' ? 'bg-slate-600 border-slate-500' : 'bg-white border-gray-100'}`}>
                <Layers className="w-8 h-8 text-indigo-500" />
              </div>
              <span className={`block font-bold text-xl mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{language === 'si' ? 'සම්මුති' : 'Concept'}</span>
              <span className="text-xs text-indigo-500 font-mono uppercase tracking-widest">Pannatti</span>
            </button>
            <button 
              onClick={() => handleGuess('reality')}
              className={`p-6 md:p-8 rounded-2xl border transition-all group flex flex-col items-center active:scale-[0.98] touch-manipulation shadow-sm hover:shadow-md ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 border-slate-600' : 'bg-gray-50 hover:bg-amber-50 border-gray-200 hover:border-amber-200 active:bg-gray-100'}`}
            >
              <div className={`p-4 rounded-full mb-4 group-hover:scale-110 transition duration-300 shadow-sm border ${theme === 'dark' ? 'bg-slate-600 border-slate-500' : 'bg-white border-gray-100'}`}>
                <Circle className="w-8 h-8 text-amber-500" />
              </div>
              <span className={`block font-bold text-xl mb-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{language === 'si' ? 'පරමාර්ථ' : 'Reality'}</span>
              <span className="text-xs text-amber-500 font-mono uppercase tracking-widest">Paramattha</span>
            </button>
          </div>
        ) : (
          <div className={`p-4 md:p-6 rounded-2xl border animate-fade-in ${feedback.correct ? (theme === 'dark' ? 'bg-emerald-900/20 border-emerald-800' : 'bg-emerald-50 border-emerald-200') : (theme === 'dark' ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200')}`}>
            <div className="flex items-center gap-3 mb-3">
              {feedback.correct ? <CheckCircle className="text-emerald-500 w-6 h-6" /> : <XCircle className="text-red-500 w-6 h-6" />}
              <span className={`font-bold text-lg ${feedback.correct ? (theme === 'dark' ? 'text-emerald-300' : 'text-emerald-800') : (theme === 'dark' ? 'text-red-300' : 'text-red-800')}`}>
                {feedback.correct ? ui.correct : ui.incorrect}
              </span>
            </div>
            <p className={`mb-6 text-base md:text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{feedback.text}</p>
            <button onClick={nextCard} className="w-full py-4 bg-[#7B1113] hover:bg-[#901416] rounded-xl text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-red-900/10 active:scale-[0.98] touch-manipulation">
              {ui.next} <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Citta Builder (Intermediate) ---
const CittaBuilder = ({ language, theme }: { language: Language, theme: Theme }) => {
  const [mode, setMode] = useState<'build' | 'challenge'>('build');
  const [root, setRoot] = useState<'greed' | 'hatred' | 'delusion' | 'beautiful'>('greed');
  const [feeling, setFeeling] = useState<'joy' | 'neutral' | 'misery'>('neutral');
  const [view, setView] = useState<'wrong' | 'none' | 'right'>('none');
  
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [challengeStatus, setChallengeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const challenges = getCittaChallenges(language);
  const currentChallenge = challenges[challengeIdx];
  const ui = UI_TEXT[language];

  // Logic remains English-key based, we translate display only
  const warnings: string[] = [];
  
  if (root === 'hatred' && feeling === 'joy') warnings.push(language === 'si' ? "ද්වේෂය (Hatred) සමඟ සොම්නස (Joy) පැවතිය නොහැක." : "Hatred cannot coexist with Joy.");
  if (root === 'hatred' && feeling === 'neutral') warnings.push(language === 'si' ? "ද්වේෂය ඉතා රළු බැවින් උපේක්ෂා විය නොහැක. එය දොම්නස් විය යුතුයි." : "Hatred is too harsh for Neutral feeling. It must be Misery.");
  if (root === 'greed' && feeling === 'misery') warnings.push(language === 'si' ? "ලෝභය (Greed) කිසිවිටෙකත් දොම්නස සමඟ නූපදී." : "Greed never arises with Misery.");
  if (root === 'delusion' && feeling === 'joy') warnings.push(language === 'si' ? "මෝහ මූලික සිත් උපේක්ෂා සහගත පමණි." : "Delusion-rooted consciousness is always Neutral.");
  if (root === 'beautiful' && view === 'wrong') warnings.push(language === 'si' ? "කුසල් සිත් වල මිත්‍යා දෘෂ්ටිය (Wrong View) තිබිය නොහැක." : "Wholesome thoughts cannot have Wrong View.");
  if (root !== 'beautiful' && view === 'right') warnings.push(language === 'si' ? "ප්‍රඥාව (Right View) ඇත්තේ ශෝභන සිත් වල පමණි." : "Right View (Wisdom) only exists in Beautiful Consciousness.");

  const isValid = warnings.length === 0;

  const getResultName = () => {
    if (!isValid) return ui.wrongConfig;
    
    // Construct simplified name for display
    let name = "";
    if (feeling === 'joy') name += language === 'si' ? "සොම්නස් සහගත " : "Joyful ";
    if (feeling === 'neutral') name += language === 'si' ? "උපේක්ෂා සහගත " : "Neutral ";
    if (feeling === 'misery') name += language === 'si' ? "දොම්නස් සහගත " : "Miserable ";

    if (root === 'greed') {
        name += view === 'wrong' ? (language === 'si' ? "දිට්ඨිගත සම්පයුක්ත" : "with Wrong View") : (language === 'si' ? "දිට්ඨිගත විප්පයුක්ත" : "dissociated from Wrong View");
        return name + (language === 'si' ? " (ලෝභ සිත)" : " (Greed Citta)");
    }
    if (root === 'hatred') {
        name += language === 'si' ? "පටිඝ සම්පයුක්ත" : "associated with Aversion";
        return name + (language === 'si' ? " (ද්වේෂ සිත)" : " (Hatred Citta)");
    }
    if (root === 'delusion') {
        name += language === 'si' ? "විචිකිච්ඡා සම්පයුක්ත" : "associated with Doubt"; 
        return name + (language === 'si' ? " (මෝහ සිත)" : " (Delusion Citta)");
    }
    if (root === 'beautiful') {
        name += view === 'right' ? (language === 'si' ? "ඥාන සම්පයුක්ත" : "with Wisdom") : (language === 'si' ? "ඥාන විප්පයුක්ත" : "without Wisdom");
        return name + (language === 'si' ? " (මහා කුසල් සිත)" : " (Wholesome Citta)");
    }
    return "Unknown Citta";
  };

  const getOrbColor = () => {
    if (!isValid) return 'bg-gray-400 border-gray-300';
    switch(root) {
        case 'greed': return 'bg-red-600 shadow-xl shadow-red-200 dark:shadow-red-900/50';
        case 'hatred': return 'bg-emerald-800 shadow-xl shadow-emerald-200 dark:shadow-emerald-900/50';
        case 'delusion': return 'bg-pink-700 shadow-xl shadow-pink-200 dark:shadow-pink-900/50';
        case 'beautiful': return 'bg-amber-400 shadow-xl shadow-amber-200 dark:shadow-amber-900/50';
        default: return 'bg-gray-400';
    }
  };

  const checkChallenge = () => {
    if (!isValid) {
      setChallengeStatus('error');
      return;
    }

    const matches = 
      root === currentChallenge.criteria.root &&
      feeling === currentChallenge.criteria.feeling &&
      view === currentChallenge.criteria.view;

    setChallengeStatus(matches ? 'success' : 'error');
  };

  const nextChallenge = () => {
    setChallengeIdx((prev) => (prev + 1) % challenges.length);
    setChallengeStatus('idle');
    setRoot('greed');
    setFeeling('neutral');
    setView('none');
  };

  const translateKey = (key: string) => {
    if (language === 'en') return key;
    switch(key) {
      case 'greed': return 'ලෝභ';
      case 'hatred': return 'ද්වේෂ';
      case 'delusion': return 'මෝහ';
      case 'beautiful': return 'ශෝභන';
      case 'joy': return 'සොම්නස්';
      case 'neutral': return 'උපේක්ෂා';
      case 'misery': return 'දොම්නස්';
      case 'wrong': return 'මිත්‍යා දෘෂ්ටි';
      case 'none': return 'දෘෂ්ටි රහිත';
      case 'right': return 'ඥාන සම්පයුක්ත';
      default: return key;
    }
  };

  return (
    <div className="mt-4 md:mt-8 pb-20">
      <div className="flex gap-4 mb-6">
        <button 
          onClick={() => { setMode('build'); setChallengeStatus('idle'); }}
          className={`flex-1 py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 active:scale-95 touch-manipulation ${mode === 'build' ? 'bg-[#7B1113] border-[#7B1113] text-white shadow-md' : (theme === 'dark' ? 'bg-slate-800 border-slate-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50')}`}
        >
          <Layers size={18} /> <span className="text-sm">{ui.buildMode}</span>
        </button>
        <button 
          onClick={() => { setMode('challenge'); setChallengeStatus('idle'); }}
          className={`flex-1 py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-2 active:scale-95 touch-manipulation ${mode === 'challenge' ? 'bg-amber-100 border-amber-300 text-[#7B1113] dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700' : (theme === 'dark' ? 'bg-slate-800 border-slate-700 text-gray-400' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50')}`}
        >
          <Trophy size={18} /> <span className="text-sm">{ui.challengeMode}</span>
        </button>
      </div>

      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {mode === 'challenge' && (
            <div className={`border p-6 rounded-2xl relative overflow-hidden shadow-sm ${theme === 'dark' ? 'bg-amber-900/10 border-amber-800' : 'bg-amber-50 border-amber-200'}`}>
               <div className="absolute top-0 right-0 p-1 bg-[#7B1113] text-white text-xs font-bold px-3 rounded-bl-lg">{ui.challengeMode} {challengeIdx + 1}</div>
               <h3 className={`font-serif text-xl font-bold mb-2 ${theme === 'dark' ? 'text-amber-400' : 'text-[#7B1113]'}`}>{currentChallenge.name}</h3>
               <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{currentChallenge.description}</p>
               
               {challengeStatus === 'error' && (
                  <div className={`border p-3 rounded-lg text-sm flex gap-2 items-start animate-fade-in ${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'}`}>
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{ui.incorrect} {ui.help}: {currentChallenge.hint}</span>
                  </div>
               )}
               
               {challengeStatus === 'success' && (
                 <div className={`border p-3 rounded-lg text-sm flex flex-col gap-3 animate-fade-in ${theme === 'dark' ? 'bg-emerald-900/30 border-emerald-800 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                   <div className="flex items-center gap-2">
                     <CheckCircle className="w-4 h-4" />
                     <span className="font-bold">{ui.success}</span>
                   </div>
                   <button onClick={nextChallenge} className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-xs font-bold transition w-full md:w-auto shadow-sm">
                     {ui.next}
                   </button>
                 </div>
               )}
            </div>
          )}

          <div className={`p-4 md:p-6 rounded-2xl border shadow-lg space-y-6 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">1. Root (Hetu)</h3>
              <div className="grid grid-cols-2 gap-2">
                {['greed', 'hatred', 'delusion', 'beautiful'].map(r => (
                  <button 
                    key={r}
                    onClick={() => setRoot(r as any)}
                    className={`p-3 rounded-lg border text-sm font-medium capitalize transition active:scale-95 touch-manipulation ${root === r ? 'bg-[#7B1113] border-[#7B1113] text-white shadow-md' : (theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')}`}
                  >
                    {translateKey(r)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">2. Feeling (Vedana)</h3>
              <div className="flex gap-2">
                {['joy', 'neutral', 'misery'].map(f => (
                  <button 
                    key={f}
                    onClick={() => setFeeling(f as any)}
                    className={`flex-1 p-3 rounded-lg border text-sm font-medium capitalize transition active:scale-95 touch-manipulation ${feeling === f ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : (theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')}`}
                  >
                    {translateKey(f)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">3. View / Wisdom</h3>
              <div className="flex gap-2">
                {['wrong', 'none', 'right'].map(v => (
                  <button 
                    key={v}
                    onClick={() => setView(v as any)}
                    className={`flex-1 p-3 rounded-lg border text-sm font-medium capitalize transition active:scale-95 touch-manipulation ${view === v ? 'bg-teal-600 border-teal-600 text-white shadow-md' : (theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')}`}
                  >
                     {translateKey(v)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {mode === 'challenge' && challengeStatus !== 'success' && (
             <button 
               onClick={checkChallenge}
               className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all active:scale-95 touch-manipulation ${theme === 'dark' ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-gray-900 hover:bg-black text-white'}`}
             >
               {ui.check}
             </button>
          )}
        </div>

        <div className={`rounded-3xl p-8 border flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[400px] shadow-inner ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
          {warnings.length > 0 && (
            <div className={`absolute inset-4 backdrop-blur-sm border flex flex-col items-center justify-center p-4 text-center rounded-2xl z-20 animate-in fade-in zoom-in duration-200 shadow-xl ${theme === 'dark' ? 'bg-slate-900/95 border-red-800' : 'bg-white/95 border-red-200'}`}>
                <XCircle className="w-10 h-10 text-red-600 mb-3" />
                <h3 className={`text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{ui.wrongConfig}</h3>
                {warnings.map((w, i) => (
                  <p key={i} className="text-red-500 text-xs md:text-sm mb-1">{w}</p>
                ))}
            </div>
          )}

          <div className="relative">
             <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full transition-all duration-1000 ${getOrbColor()} flex items-center justify-center`}>
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/30 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/20"></div>
                </div>
             </div>
          </div>
          
          <div className="text-center mt-8 relative z-10">
            <h2 className={`text-xl md:text-2xl font-serif font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{getResultName()}</h2>
            <div className="flex gap-2 justify-center mt-2 flex-wrap">
                <span className={`text-[10px] md:text-xs border px-2 py-1 rounded uppercase tracking-wider ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>{translateKey(root)}</span>
                <span className={`text-[10px] md:text-xs border px-2 py-1 rounded uppercase tracking-wider ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>{translateKey(feeling)}</span>
                {view !== 'none' && <span className={`text-[10px] md:text-xs border px-2 py-1 rounded uppercase tracking-wider ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>{translateKey(view)}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Cetasika Table ---
const CetasikaTable = ({ language, theme }: { language: Language, theme: Theme }) => {
  const [selectedCetasika, setSelectedCetasika] = useState<string | null>(null);
  
  const groups = getCetasikaGroups(language);
  const activeCetasika = groups.flatMap(g => g.items).find(i => i.id === selectedCetasika);

  return (
    <div className="mt-8 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="space-y-6">
            {groups.map(group => (
              <div key={group.id}>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                   <div className={`w-2 h-2 rounded-full ${group.color.split(' ')[0]}`}></div>
                   {group.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCetasika(item.id)}
                      className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                        selectedCetasika === item.id 
                          ? 'bg-[#7B1113] text-white border-[#7B1113] shadow-md transform scale-105' 
                          : `${group.color} bg-opacity-20 hover:bg-opacity-30 border-opacity-30`
                      }`}
                    >
                      {item.paliName}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-20">
          <div className={`border rounded-2xl p-6 md:p-8 shadow-xl min-h-[300px] flex flex-col justify-center relative overflow-hidden ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
             {activeCetasika ? (
               <div className="animate-fade-in relative z-10">
                 <div className="text-xs font-bold uppercase tracking-widest text-[#7B1113] mb-2">{language === 'si' ? 'තෝරාගත් චෛතසිකය' : 'Selected Factor'}</div>
                 <h2 className={`text-4xl font-serif font-bold mb-2 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{activeCetasika.paliName}</h2>
                 <h3 className="text-xl text-amber-600 mb-6 font-medium">{activeCetasika.englishName}</h3>
                 <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{activeCetasika.description}</p>
                 <div className={`mt-8 pt-6 border-t flex gap-4 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-100'}`}>
                    <div className={`px-4 py-2 rounded-lg border text-sm ${theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                      ID: {activeCetasika.id}
                    </div>
                 </div>
               </div>
             ) : (
               <div className="text-center text-gray-400">
                 <Layers size={48} className="mx-auto mb-4 opacity-30" />
                 <p className="text-lg">{language === 'si' ? 'වම් පසින් චෛතසිකයක් තෝරන්න.' : 'Select a Mental Factor from the left.'}</p>
               </div>
             )}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#7B1113]/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Element Mixer (Rupa) ---
const ElementMixer = ({ language, theme }: { language: Language, theme: Theme }) => {
  const [elements, setElements] = useState({ earth: 25, water: 25, fire: 25, air: 25 });
  const [activeTab, setActiveTab] = useState<'visual' | 'analysis'>('visual');
  const [touchFeedback, setTouchFeedback] = useState<{msg: string, type: 'tangible' | 'intangible'} | null>(null);

  const ui = UI_TEXT[language];

  const setPreset = (type: 'earth' | 'water' | 'fire' | 'air' | 'balance') => {
    setTouchFeedback(null);
    switch(type) {
      case 'earth': setElements({ earth: 90, water: 20, fire: 20, air: 10 }); break;
      case 'water': setElements({ earth: 20, water: 90, fire: 10, air: 40 }); break;
      case 'fire': setElements({ earth: 10, water: 10, fire: 95, air: 50 }); break;
      case 'air': setElements({ earth: 5, water: 30, fire: 30, air: 95 }); break;
      case 'balance': setElements({ earth: 50, water: 50, fire: 50, air: 50 }); break;
    }
  };

  const handleChange = (el: keyof typeof elements, val: number) => {
    setElements(prev => ({ ...prev, [el]: val }));
    setTouchFeedback(null);
  };

  // Determine Dominant Element and Description
  let dominant = 'balance';
  let maxVal = 0;
  Object.entries(elements).forEach(([k, v]) => { if (v > maxVal) { maxVal = v; dominant = k; } });
  if (maxVal < 60) dominant = 'balance';

  const getDescription = () => {
    const isSi = language === 'si';
    if (dominant === 'earth') return { 
        title: isSi ? 'පඨවි අධික (Solid)' : 'Earth Dominant (Solid)', 
        subtitle: isSi ? 'කර්කෂ ස්වභාවය (Roughness)' : 'Hardness/Roughness',
        desc: isSi ? 'මෙම රූපය ඉතා තද ගතියෙන් යුක්තය. ස්පර්ශ කළ විට තද බව දැනේ.' : 'This matter is characterized by hardness. It feels solid to the touch.',
        color: 'text-emerald-900 dark:text-emerald-300',
        accent: 'bg-emerald-600',
        bg: theme === 'dark' ? 'bg-emerald-950' : 'bg-emerald-50'
    };
    if (dominant === 'water') return { 
        title: isSi ? 'ආපෝ අධික (Fluid)' : 'Water Dominant (Fluid)', 
        subtitle: isSi ? 'වැගිරෙන ස්වභාවය (Cohesion)' : 'Cohesion/Flowing',
        desc: isSi ? 'වැදගත්: ආපෝ ධාතුව කයෙහි ස්පර්ශයට හසු නොවේ. එය මනසින් පමණක් දැනගත හැක.' : 'Important: The Water element cannot be felt by touch. It is known only by the mind.',
        color: 'text-cyan-900 dark:text-cyan-300',
        accent: 'bg-cyan-600',
        bg: theme === 'dark' ? 'bg-cyan-950' : 'bg-cyan-50'
    };
    if (dominant === 'fire') return { 
        title: isSi ? 'තේජෝ අධික (Thermal)' : 'Fire Dominant (Thermal)', 
        subtitle: isSi ? 'උෂ්ණ ස්වභාවය (Temperature)' : 'Heat/Temperature',
        desc: isSi ? 'මෙය උණුසුම හෝ සීතලයි. රූප පරිපාකයට (මෝරන්නට) උදව් කරයි.' : 'This represents heat or cold. It matures the matter.',
        color: 'text-orange-900 dark:text-orange-300',
        accent: 'bg-orange-600',
        bg: theme === 'dark' ? 'bg-orange-950' : 'bg-orange-50'
    };
    if (dominant === 'air') return { 
        title: isSi ? 'වායෝ අධික (Kinetic)' : 'Air Dominant (Kinetic)', 
        subtitle: isSi ? 'සෙලවෙන ස්වභාවය (Motion)' : 'Motion/Pressure',
        desc: isSi ? 'පිම්බෙන, ඇදෙන, හෝ තල්ලු කරන ස්වභාවයයි. මෙය ස්පර්ශ කළ හැකි පරමාර්ථයකි.' : 'Characterized by distension or motion. It creates pressure.',
        color: 'text-slate-900 dark:text-slate-300',
        accent: 'bg-slate-600',
        bg: theme === 'dark' ? 'bg-slate-900' : 'bg-slate-50'
    };
    return { 
        title: isSi ? 'සමතුලිත රූපය (Balanced)' : 'Balanced Matter', 
        subtitle: 'Harmony',
        desc: isSi ? 'ධාතු සතර සමව පවතී. අවිනිබ්භෝග රූප (Inseparable Matter) න්‍යායට අනුව එකක් ප්‍රධාන වුවද අනෙක් 3 ම පවතී.' : 'The 4 elements are balanced. According to Inseparable Matter theory, all 4 are always present.',
        color: 'text-gray-900 dark:text-gray-100',
        accent: 'bg-[#7B1113]',
        bg: theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'
    };
  };

  const handleTouch = () => {
      const isSi = language === 'si';
      if (dominant === 'water') {
          setTouchFeedback({
              type: 'intangible',
              msg: isSi ? "ස්පර්ශ කළ නොහැක! ආපෝ ධාතුව කයට නොදැනේ." : "Cannot Touch! Water element is not tangible."
          });
      } else {
          setTouchFeedback({ type: 'tangible', msg: isSi ? "ස්පර්ශ කළ හැක. තද/උෂ්ණ/පීඩන ගතියක් දැනේ." : "Tangible. You feel hardness, heat, or pressure." });
      }
  };

  const info = getDescription();
  
  // Animation Constants
  const earthSize = 30 + (elements.earth * 0.8); 
  const rockPath = 'polygon(20% 5%, 50% 0%, 80% 5%, 100% 30%, 95% 60%, 75% 100%, 25% 95%, 0% 60%, 5% 25%)'; 
  const earthTexture = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`;
  const waterSize = 40 + (elements.water * 0.7);
  const fireScale = 0.5 + (elements.fire / 40);
  const fireOpacity = 0.3 + (elements.fire / 120);
  const airSpeed = Math.max(0.5, 6 - (elements.air / 15)) + 's';
  const airScale = 0.5 + (elements.air / 60);

  return (
    <div className="mt-8 pb-20 max-w-5xl mx-auto">
      <div className="flex gap-4 mb-4 justify-center">
         <button onClick={() => setActiveTab('visual')} className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${activeTab === 'visual' ? (theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white') : (theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-gray-100 text-gray-500')}`}><Eye size={16}/> {ui.visual}</button>
         <button onClick={() => setActiveTab('analysis')} className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-2 ${activeTab === 'analysis' ? (theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white') : (theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-gray-100 text-gray-500')}`}><Microscope size={16}/> {ui.analysis}</button>
      </div>

      <div className={`border rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>
        
        {/* TOP SECTION: VISUALIZER */}
        <div className={`p-6 md:p-10 flex flex-col items-center justify-center relative min-h-[500px] transition-colors duration-700 ${info.bg} overflow-hidden`}>
           
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 via-transparent to-transparent"></div>
           </div>

           {/* VISUALS (Same as before, simplified for brevity but fully functional) */}
           <div className="relative w-80 h-80 flex items-center justify-center perspective-1000">
              {/* AIR */}
              <div className="absolute inset-0 pointer-events-none transition-transform duration-500" style={{ transform: `scale(${airScale})` }}>
                 {elements.air > 20 && (
                     <>
                        <div className="absolute inset-0 rounded-full border-[1px] border-slate-400/40" style={{ animation: `spin3d ${airSpeed} linear infinite`, transform: 'rotateX(60deg)' }}></div>
                        <div className="absolute inset-4 rounded-full border-[1px] border-slate-400/30" style={{ animation: `spin3dReverse ${airSpeed} linear infinite`, transform: 'rotateY(60deg)' }}></div>
                        <div className="absolute inset-[-20px] rounded-full border border-slate-300/20 border-dashed" style={{ animation: `spin ${airSpeed} linear infinite` }}></div>
                     </>
                 )}
              </div>
              {/* FIRE */}
              <div 
                 className="absolute rounded-full transition-all duration-300 mix-blend-screen pointer-events-none"
                 style={{
                    width: `${fireScale * 120}%`,
                    height: `${fireScale * 120}%`,
                    background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,200,0,0.6) 30%, rgba(255,50,0,0.3) 60%, transparent 80%)`,
                    opacity: fireOpacity,
                    filter: 'blur(8px)',
                    animation: 'pulse 1s ease-in-out infinite alternate'
                 }}
              ></div>
              {/* WATER */}
              <div 
                className="absolute transition-all duration-1000 ease-in-out backdrop-blur-sm overflow-hidden z-10"
                style={{
                  width: `${waterSize}%`,
                  height: `${waterSize}%`,
                  borderRadius: elements.water > 50 ? '45% 55% 40% 60% / 55% 45% 60% 40%' : '50%',
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, rgba(56,189,248,0.4) 20%, rgba(2,132,199,0.6) 100%)`,
                  boxShadow: `inset -10px -10px 20px rgba(0,0,0,0.2), 0 10px 20px rgba(2,132,199,0.3)`,
                  animation: elements.water > 60 ? 'wobble 6s ease-in-out infinite' : 'none',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}
              >
                 <div className="absolute bottom-0 left-0 w-full bg-blue-500/30 transition-all duration-700" style={{ height: `${elements.water}%`, transform: 'scale(1.2)' }}></div>
                 <div className="absolute top-[20%] left-[20%] w-[15%] h-[10%] bg-white rounded-full blur-[2px]"></div>
              </div>
              {/* EARTH */}
              <div 
                className="absolute transition-all duration-700 shadow-2xl z-20 flex items-center justify-center text-white font-bold"
                style={{
                  width: `${earthSize}%`,
                  height: `${earthSize}%`,
                  clipPath: elements.earth > 40 ? rockPath : 'circle(50%)',
                  backgroundImage: earthTexture,
                  backgroundColor: elements.fire > 80 ? '#7f1d1d' : '#4b5563',
                  boxShadow: 'inset 20px 20px 40px rgba(0,0,0,0.6), 5px 5px 15px rgba(0,0,0,0.5)',
                  animation: elements.earth > 80 ? 'rumble 0.2s linear infinite' : 'none',
                  transform: elements.air > 70 ? 'translateY(-10px)' : 'none'
                }}
              >
                 <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
              </div>
           </div>

           {/* INFO OVERLAY */}
           <div className="mt-8 text-center relative z-10 max-w-2xl animate-fade-in">
              <h2 className={`text-4xl font-serif font-bold mb-1 ${info.color}`}>{info.title}</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                 <span className={`h-1 w-8 rounded-full ${info.accent}`}></span>
                 <p className={`text-sm font-bold uppercase tracking-widest opacity-80 ${info.color}`}>{info.subtitle}</p>
                 <span className={`h-1 w-8 rounded-full ${info.accent}`}></span>
              </div>
              
              {activeTab === 'analysis' ? (
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-xl grid grid-cols-2 gap-4 text-left">
                     <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                        <div className="text-xs font-bold text-emerald-800 uppercase">Earth</div>
                        <div className="text-2xl font-bold text-emerald-900">{elements.earth}%</div>
                     </div>
                     <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                        <div className="text-xs font-bold text-cyan-800 uppercase">Water</div>
                        <div className="text-2xl font-bold text-cyan-900">{elements.water}%</div>
                     </div>
                     <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                        <div className="text-xs font-bold text-orange-800 uppercase">Fire</div>
                        <div className="text-2xl font-bold text-orange-900">{elements.fire}%</div>
                     </div>
                     <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-xs font-bold text-slate-800 uppercase">Air</div>
                        <div className="text-2xl font-bold text-slate-900">{elements.air}%</div>
                     </div>
                  </div>
              ) : (
                  <div className={`backdrop-blur-sm rounded-xl p-4 border shadow-sm relative ${theme === 'dark' ? 'bg-slate-900/60 border-slate-700' : 'bg-white/60 border-white/50'}`}>
                     <p className={`text-lg leading-relaxed whitespace-pre-line font-medium ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{info.desc}</p>
                     
                     <button 
                        onClick={handleTouch}
                        className={`mt-4 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 mx-auto shadow-lg active:scale-95 transition ${theme === 'dark' ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-gray-900 hover:bg-black text-white'}`}
                     >
                        <Fingerprint size={16}/> {ui.touch}
                     </button>
                     
                     {touchFeedback && (
                        <div className={`mt-3 p-3 rounded-lg text-sm font-bold animate-fade-in ${touchFeedback.type === 'intangible' ? 'bg-indigo-100 text-indigo-900 border border-indigo-200' : (theme === 'dark' ? 'bg-slate-800 text-gray-200' : 'bg-gray-200 text-gray-800')}`}>
                           {touchFeedback.msg}
                        </div>
                     )}
                  </div>
              )}
           </div>
        </div>

        {/* BOTTOM SECTION: SLIDERS */}
        <div className={`border-t p-8 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`}><Mountain size={14}/> Earth</label>
                       <span className="text-xs font-mono bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">{elements.earth}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={elements.earth} onChange={(e) => handleChange('earth', parseInt(e.target.value))} className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"/>
                 </div>
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-900'}`}><Droplets size={14}/> Water</label>
                       <span className="text-xs font-mono bg-cyan-100 px-2 py-0.5 rounded text-cyan-800">{elements.water}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={elements.water} onChange={(e) => handleChange('water', parseInt(e.target.value))} className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"/>
                 </div>
              </div>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-900'}`}><Flame size={14}/> Fire</label>
                       <span className="text-xs font-mono bg-orange-100 px-2 py-0.5 rounded text-orange-800">{elements.fire}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={elements.fire} onChange={(e) => handleChange('fire', parseInt(e.target.value))} className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"/>
                 </div>
                 <div>
                    <div className="flex justify-between mb-2">
                       <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-800'}`}><Wind size={14}/> Air</label>
                       <span className="text-xs font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-700">{elements.air}%</span>
                    </div>
                    <input type="range" min="10" max="100" value={elements.air} onChange={(e) => handleChange('air', parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"/>
                 </div>
              </div>
           </div>
        </div>
      </div>
       <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.05); opacity: 0.4; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin3d {
            from { transform: rotateX(60deg) rotateZ(0deg); }
            to { transform: rotateX(60deg) rotateZ(360deg); }
        }
        @keyframes spin3dReverse {
            from { transform: rotateY(60deg) rotateZ(360deg); }
            to { transform: rotateY(60deg) rotateZ(0deg); }
        }
        @keyframes wobble {
          0%, 100% { border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%; }
          33% { border-radius: 55% 45% 60% 40% / 45% 55% 40% 60%; }
          66% { border-radius: 40% 60% 55% 45% / 60% 40% 45% 55%; }
        }
        @keyframes rumble {
           0% { transform: translate(1px, 1px) rotate(0deg); }
           25% { transform: translate(-1px, -1px) rotate(-1deg); }
           50% { transform: translate(-1px, 1px) rotate(1deg); }
           75% { transform: translate(1px, -1px) rotate(0deg); }
           100% { transform: translate(1px, 1px) rotate(0deg); }
        }
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

// --- SUB-COMPONENT: Kamma Mechanism Lab ---
const KammaMechanismLab = ({ language, theme }: { language: Language, theme: Theme }) => {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [mode, setMode] = useState<'akusala' | 'kusala'>('akusala');
  const [roots, setRoots] = useState({ lobha: 50, dosa: 0, moha: 50, alobha: 0, adosa: 0, amoha: 0 });
  const [isActing, setIsActing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const scenarios = getKammaSituations(language);
  const scenario = scenarios[scenarioIdx];
  const ui = UI_TEXT[language];
  const isSi = language === 'si';

  const handleSliderChange = (rootName: string, val: number) => {
    setRoots(prev => ({ ...prev, [rootName]: val }));
    setResult(null);
  };

  useEffect(() => {
    setMode('akusala');
    setRoots({ lobha: 50, dosa: 0, moha: 50, alobha: 0, adosa: 0, amoha: 0 });
    setResult(null);
  }, [scenarioIdx]);

  const toggleMode = (newMode: 'akusala' | 'kusala') => {
    setMode(newMode);
    if (newMode === 'akusala') {
      setRoots({ lobha: 50, dosa: 0, moha: 50, alobha: 0, adosa: 0, amoha: 0 });
    } else {
      setRoots({ lobha: 0, dosa: 0, moha: 0, alobha: 50, adosa: 50, amoha: 0 });
    }
    setResult(null);
  };

  const calculateKamma = () => {
    setIsActing(true);
    setTimeout(() => {
      let outcome = "";
      if (mode === 'akusala') {
        const totalBad = roots.lobha + roots.dosa + roots.moha;
        if (roots.dosa > 70) outcome = isSi ? "නිරය (Hell) හෝ අමනුෂ්‍ය උපතකට හේතු විය හැකි ප්‍රබල අකුසලයකි." : "Strong Unwholesome Kamma leading to woeful states (Hell/Ghost).";
        else if (roots.lobha > 70) outcome = isSi ? "ප්‍රේත ලෝකයේ උපතකට හේතු විය හැක." : "May lead to Ghost realm (Peta) due to attachment.";
        else outcome = isSi ? "සතර අපායට හේතු වන අකුසල කර්මයකි." : "General Unwholesome Kamma leading to suffering.";
      } else {
         if (roots.amoha > 60) outcome = isSi ? "ත්‍රිහේතුක උත්කෘෂ්ට කුසලයකි! බ්‍රහ්ම/මනුෂ්‍ය උපතකි." : "Three-Rooted Superior Good Kamma! Leads to Brahma/High Human birth.";
         else outcome = isSi ? "ද්විහේතුක කුසලයකි (ප්‍රඥාව රහිත). සුගති උපතකි." : "Two-Rooted Good Kamma (No Wisdom). Leads to happy states.";
      }
      setResult(outcome);
      setIsActing(false);
    }, 2000); 
  };

  const nextScenario = () => {
    setScenarioIdx((prev) => (prev + 1) % scenarios.length);
  };

  const getPrediction = () => {
    if (mode === 'akusala') {
      if (roots.dosa > 50) return isSi ? "කේන්තියෙන් ප්‍රතිචාර දැක්වීම" : "Reacting with Anger";
      if (roots.lobha > 50) return isSi ? "ආශාවෙන් අල්ලා ගැනීම" : "Grabbing with Greed";
      return isSi ? "නොසලකා හැරීම" : "Acting with Delusion";
    } else {
      if (roots.amoha > 50 && roots.adosa > 50) return isSi ? "ප්‍රඥාවෙන් සහ මෛත්‍රියෙන් යුතුව" : "With Wisdom & Kindness";
      if (roots.adosa > 50) return isSi ? "කරුණාවෙන් උදව් කිරීම" : "Helping with Kindness";
      return isSi ? "සාමාන්‍ය පරිදි යහපත් ප්‍රතිචාරයක්" : "Normal Good Response";
    }
  };

  return (
    <div className="mt-8 pb-24 max-w-4xl mx-auto">
      <div className="flex items-start justify-between mb-8">
         <div>
           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{ui.scenario} {scenarioIdx + 1}</span>
           <h2 className={`text-3xl font-serif font-bold mt-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{scenario.title}</h2>
           <p className={`mt-2 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{scenario.description}</p>
         </div>
         <button onClick={nextScenario} className={`p-3 rounded-full transition active:scale-95 ${theme === 'dark' ? 'bg-slate-800 text-gray-400 hover:bg-slate-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
            <RefreshCw size={20} />
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`border p-6 md:p-8 rounded-3xl shadow-xl ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
           <div className={`flex gap-2 mb-6 p-1 rounded-xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-100'}`}>
              <button onClick={() => toggleMode('akusala')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${mode === 'akusala' ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}>
                 <Skull size={18}/> Akusala
              </button>
              <button onClick={() => toggleMode('kusala')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${mode === 'kusala' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}>
                 <Leaf size={18}/> Kusala
              </button>
           </div>
           
           <div className="space-y-6">
              {mode === 'akusala' ? (
                <>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2 text-red-900 dark:text-red-300">
                       <span>Lobha (Greed)</span> <span>{roots.lobha}%</span>
                    </div>
                    <input type="range" className="w-full accent-red-600" value={roots.lobha} onChange={(e) => handleSliderChange('lobha', parseInt(e.target.value))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2 text-red-900 dark:text-red-300">
                       <span>Dosa (Hatred)</span> <span>{roots.dosa}%</span>
                    </div>
                    <input type="range" className="w-full accent-red-900" value={roots.dosa} onChange={(e) => handleSliderChange('dosa', parseInt(e.target.value))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2 text-gray-700 dark:text-gray-400">
                       <span>Moha (Delusion)</span> <span>{roots.moha}%</span>
                    </div>
                    <input type="range" className="w-full accent-gray-500" value={roots.moha} onChange={(e) => handleSliderChange('moha', parseInt(e.target.value))} />
                  </div>
                </>
              ) : (
                <>
                   {/* Simplified Kusala Sliders for brevity */}
                   <div><div className="text-sm font-bold text-emerald-600 mb-2">Alobha</div><input type="range" className="w-full accent-emerald-600" value={roots.alobha} onChange={(e) => handleSliderChange('alobha', parseInt(e.target.value))} /></div>
                   <div><div className="text-sm font-bold text-emerald-500 mb-2">Adosa</div><input type="range" className="w-full accent-emerald-500" value={roots.adosa} onChange={(e) => handleSliderChange('adosa', parseInt(e.target.value))} /></div>
                   <div><div className="text-sm font-bold text-amber-500 mb-2">Amoha</div><input type="range" className="w-full accent-amber-500" value={roots.amoha} onChange={(e) => handleSliderChange('amoha', parseInt(e.target.value))} /></div>
                </>
              )}
           </div>

           <div className={`mt-8 p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{ui.prediction}</span>
              <p className={`text-lg font-serif font-medium mt-1 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>{getPrediction()}</p>
           </div>

           <button 
             onClick={calculateKamma}
             disabled={isActing}
             className={`w-full mt-6 py-4 rounded-xl font-bold text-white text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 ${mode === 'akusala' ? 'bg-[#7B1113] hover:bg-red-900' : 'bg-emerald-700 hover:bg-emerald-800'}`}
           >
              {isActing ? ui.generating : ui.act}
           </button>
        </div>

        {/* VISUALIZER */}
        <div className="bg-gray-900 rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
           
           <div className="relative z-10 w-full mb-8">
              <div className="text-center mb-4">
                 <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">{ui.mindMoments}</span>
              </div>
              <div className="flex justify-center gap-2">
                 {[1,2,3,4,5,6,7].map((i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${isActing ? 'animate-pulse' : 'opacity-30'}`}
                      style={{ 
                        backgroundColor: isActing ? (mode === 'akusala' ? '#ef4444' : '#10b981') : 'transparent',
                        borderColor: isActing ? (mode === 'akusala' ? '#7f1d1d' : '#059669') : '#4b5563',
                        animationDelay: `${i * 100}ms`
                      }}
                    ></div>
                 ))}
              </div>
           </div>

           <div className="relative z-10 flex flex-col items-center">
              {!isActing && result && (
                 <div className="animate-fade-in flex flex-col items-center">
                    <div className={`w-24 h-24 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-6 flex items-center justify-center relative ${mode === 'akusala' ? 'bg-gradient-to-br from-red-900 to-black border-red-500' : 'bg-gradient-to-br from-white to-amber-200 border-amber-400'} border-4`}>
                        {mode === 'akusala' ? <Skull size={40} className="text-red-500" /> : <Sun size={40} className="text-amber-600" />}
                    </div>
                    <div className="text-center max-w-sm">
                       <p className="text-gray-300 text-sm leading-relaxed">{result}</p>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: Cognitive Process Viewer ---
const ProcessViewer = ({ language, theme }: { language: Language, theme: Theme }) => {
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const stages = getVithiStages(language);
  const ui = UI_TEXT[language];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStageId(prev => {
          if (!prev) return stages[0].id;
          const currIdx = stages.findIndex(s => s.id === prev);
          if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = currIdx * 100;
          if (currIdx >= stages.length - 1) { setIsPlaying(false); return prev; }
          return stages[currIdx + 1].id;
        });
      }, 1000); 
    }
    return () => clearInterval(interval);
  }, [isPlaying, stages]);

  const togglePlay = () => {
    if (!activeStageId) setActiveStageId(stages[0].id);
    setIsPlaying(!isPlaying);
  };

  const resetSim = () => {
    setIsPlaying(false);
    setActiveStageId(null);
    if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
  };

  return (
    <div className="mt-4 md:mt-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
           <h3 className="text-xl font-serif text-[#7B1113]">{ui.mindMoments}</h3>
           <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'si' ? 'සිතක ක්‍රියාකාරීත්වය දෘශ්‍යමාන කිරීම.' : 'Visualization of mental process.'}</p>
        </div>
        <div className="flex gap-2">
           <button onClick={togglePlay} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-[#7B1113] hover:bg-[#901416] text-white rounded-lg transition-colors border border-[#7B1113] active:scale-95 touch-manipulation shadow-lg shadow-red-900/10">
             {isPlaying ? <Pause size={16}/> : <Play size={16} />}
             {isPlaying ? ui.pause : ui.play}
           </button>
           <button onClick={resetSim} className={`p-3 rounded-lg border active:scale-95 touch-manipulation shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700' : 'bg-white hover:bg-gray-50 text-gray-500 border-gray-200'}`}>
             <RotateCcw size={16} />
           </button>
        </div>
      </div>
      
      <div ref={scrollContainerRef} className="relative border-b pb-16 overflow-x-auto scrollbar-hide snap-x border-gray-200 dark:border-gray-800">
         <div className={`absolute top-8 left-0 min-w-full w-[1000px] h-1 z-0 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`}></div>
         <div className="flex gap-6 min-w-max px-4 pt-2 relative z-10">
           {stages.map((stage, index) => {
             const isActive = activeStageId === stage.id;
             return (
               <div 
                 key={stage.id}
                 onClick={() => { setIsPlaying(false); setActiveStageId(stage.id); }}
                 className={`relative cursor-pointer group flex-shrink-0 flex flex-col items-center gap-3 transition-all duration-300 snap-center ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
                 style={{ width: '80px' }}
               >
                  <div className="text-xs font-mono text-gray-400 mb-1">No. {index + 1}</div>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 shadow-lg transition-all duration-300 ${isActive ? 'border-amber-500 bg-[#7B1113] text-amber-100 shadow-xl' : (theme === 'dark' ? 'border-slate-700 bg-slate-800 text-gray-500' : 'border-gray-200 bg-white text-gray-400')}`}>
                      {isActive ? <Zap size={20} className="animate-pulse" /> : <Circle size={12} />}
                  </div>
                  <div className={`text-[10px] md:text-xs font-bold text-center w-full truncate px-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{stage.paliName}</div>
               </div>
             );
           })}
         </div>
      </div>

      <div className={`mt-8 min-h-[180px] border rounded-2xl p-6 md:p-8 transition-all flex items-center justify-center shadow-lg ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
        {activeStageId ? (
          (() => {
            const stage = stages.find(s => s.id === activeStageId);
            return (
              <div className="animate-fade-in w-full max-w-3xl flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                 <div className={`hidden md:block p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-amber-50 border-amber-100'}`}>
                    <Microscope className="w-8 h-8 text-[#7B1113]" />
                 </div>
                 <div className="w-full">
                    <h4 className={`text-2xl md:text-3xl font-serif mb-1 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{stage?.paliName}</h4>
                    <h5 className="text-lg md:text-xl text-amber-600 mb-4">{stage?.englishName}</h5>
                    <p className={`text-base md:text-lg leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{stage?.function}</p>
                 </div>
              </div>
            );
          })()
        ) : (
          <div className="text-center text-gray-400">
            <PlayCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-base md:text-lg">{language === 'si' ? 'බොත්තම ඔබා චිත්ත වීථිය ක්‍රියාත්මක කරන්න.' : 'Press Play to start the Vithi process.'}</p>
          </div>
        )}
      </div>
    </div>
  );
};


// --- MAIN INTERFACE ---

export const LabInterface: React.FC<LabInterfaceProps> = ({ module, language, theme }) => {
  const [scenarioInput, setScenarioInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const ui = UI_TEXT[language];

  const handleAnalyze = async () => {
    if(!scenarioInput.trim()) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    const result = await analyzeScenario(scenarioInput); // Service might need lang param in future
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setTimeout(() => { resultRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };

  const renderContent = () => {
    switch (module.id) {
      case 'intro': return <ConceptGame language={language} theme={theme} />;
      case 'citta': return <CittaBuilder language={language} theme={theme} />;
      case 'vithi': return <ProcessViewer language={language} theme={theme} />;
      case 'cetasika': return <CetasikaTable language={language} theme={theme} />;
      case 'rupa': return <ElementMixer language={language} theme={theme} />;
      case 'kamma': return <KammaMechanismLab language={language} theme={theme} />;
      default: return <div className="text-center text-gray-500 py-20"><p>Module under construction.</p></div>;
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto custom-scrollbar p-4 md:p-10 safe-pb-20">
      <header className="mb-4 md:mb-6">
        <div className="flex items-center gap-3 text-[#7B1113] mb-2 md:mb-3">
           <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase border border-[#7B1113]/30 px-2 py-0.5 rounded">Module</span>
           <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-500">ID: {module.id}</span>
        </div>
        <h1 className={`text-3xl md:text-5xl font-serif font-bold mb-2 md:mb-4 tracking-tight leading-tight ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{module.title}</h1>
        <p className={`text-base md:text-xl max-w-3xl leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{module.description}</p>
      </header>

      <div className="flex-1 max-w-6xl mx-auto w-full">
        {renderContent()}
        
        {/* Universal Analysis Tool */}
        <div className={`mt-12 mb-20 md:mb-0 border rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-xl ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'}`}>
            <div className="absolute top-0 right-0 p-32 bg-[#7B1113]/5 blur-3xl rounded-full pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <Brain className="text-[#7B1113]" size={24}/>
              <h3 className={`text-xl md:text-2xl font-serif font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{language === 'si' ? 'AI චිත්ත විශ්ලේෂණය' : 'AI Mind Analysis'}</h3>
            </div>
            <p className={`mb-6 relative z-10 max-w-lg text-sm md:text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{language === 'si' ? 'ඔබට දිනපතා ජීවිතයේ දැනෙන සිතිවිලි (උදා: කේන්තිය, ආශාව) ඇතුලත් කරන්න. AI මගින් එය විශ්ලේෂණය කරයි.' : 'Enter your daily thoughts or feelings. AI will analyze them according to Abhidharma.'}</p>
            
            <div className="flex flex-col md:flex-row gap-3 relative z-10 max-w-2xl">
              <input 
                type="text" 
                value={scenarioInput}
                onChange={(e) => setScenarioInput(e.target.value)}
                placeholder={ui.analyzePlaceholder}
                className={`flex-1 border rounded-xl px-4 py-3 md:px-5 md:py-4 focus:outline-none focus:ring-2 focus:ring-[#7B1113]/50 shadow-inner text-base ${theme === 'dark' ? 'bg-slate-950 border-slate-700 text-gray-100 placeholder-slate-600' : 'bg-white border-gray-300 text-gray-900'}`}
              />
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !scenarioInput}
                className="bg-[#7B1113] hover:bg-[#901416] text-white px-6 py-3 md:py-4 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-red-900/10 active:scale-95 touch-manipulation"
              >
                {isAnalyzing ? <span className="animate-spin">⌛</span> : <PlayCircle size={20} />}
                {ui.analyze}
              </button>
            </div>

            {analysisResult && (
              <div ref={resultRef} className={`mt-8 p-4 md:p-6 rounded-xl border leading-7 text-sm md:text-base prose max-w-none relative z-10 shadow-sm animate-fade-in ${theme === 'dark' ? 'bg-slate-950 border-slate-800 text-gray-300' : 'bg-white border-gray-200 text-gray-800'}`}>
                <div className="whitespace-pre-wrap">{analysisResult}</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
