import React, { useState } from 'react';
import { Language, Theme } from '../../types';
import { Layers, Trophy, Info, CheckCircle, XCircle } from 'lucide-react';
import { getCittaChallenges, UI_TEXT } from '../../constants';

interface CittaBuilderProps {
    language: Language;
    theme: Theme;
}

const CittaBuilder: React.FC<CittaBuilderProps> = ({ language, theme }) => {
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
        switch (root) {
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
        switch (key) {
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
        <div className="mt-2 md:mt-3 pb-8">
            <style>{`
                @keyframes pulse-glow {
                    0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 20px currentColor; }
                    50% { transform: scale(1.05); opacity: 0.9; box-shadow: 0 0 40px currentColor; }
                }
                .animate-pulse-glow { animation: pulse-glow 3s infinite ease-in-out; }
            `}</style>
            <div className="flex gap-2 mb-3">
                <button
                    onClick={() => { setMode('build'); setChallengeStatus('idle'); }}
                    className={`flex-1 py-2 rounded-lg border font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] touch-manipulation ${mode === 'build' ? 'bg-[#7B1113] border-[#7B1113] text-white shadow-md' : (theme === 'dark' ? 'bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50')} text-xs md:text-sm`}
                >
                    <Layers size={16} /> <span className="text-xs md:text-sm">{ui.buildMode}</span>
                </button>
                <button
                    onClick={() => { setMode('challenge'); setChallengeStatus('idle'); }}
                    className={`flex-1 py-2 rounded-lg border font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02] touch-manipulation ${mode === 'challenge' ? 'bg-amber-100 border-amber-300 text-[#7B1113] dark:bg-amber-900/40 dark:text-amber-200 dark:border-amber-700' : (theme === 'dark' ? 'bg-slate-800 border-slate-700 text-gray-400 hover:bg-slate-700' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50')} text-xs md:text-sm`}
                >
                    <Trophy size={16} /> <span className="text-xs md:text-sm">{ui.challengeMode}</span>
                </button>
            </div>

            <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-3">
                <div className="space-y-3">
                    {mode === 'challenge' && (
                        <div className={`border p-3 rounded-xl relative overflow-hidden shadow-sm transition-all duration-500 animate-in slide-in-from-left-4 ${theme === 'dark' ? 'bg-amber-900/10 border-amber-800' : 'bg-amber-50 border-amber-200'}`}>
                            <div className="absolute top-0 right-0 p-1 bg-[#7B1113] text-white text-[10px] font-bold px-2 rounded-bl-lg shadow-sm">{ui.challengeMode} {challengeIdx + 1}</div>
                            <h3 className={`font-serif text-lg font-bold mb-1 ${theme === 'dark' ? 'text-amber-400' : 'text-[#7B1113]'}`}>{currentChallenge.name}</h3>
                            <p className={`text-xs mb-2 leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{currentChallenge.description}</p>

                            {challengeStatus === 'error' && (
                                <div className={`border p-3 rounded-lg text-sm flex gap-2 items-start animate-in fade-in zoom-in duration-300 ${theme === 'dark' ? 'bg-red-900/30 border-red-800 text-red-200' : 'bg-red-50 border-red-200 text-red-700'}`}>
                                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <span>{ui.incorrect} {ui.help}: {currentChallenge.hint}</span>
                                </div>
                            )}

                            {challengeStatus === 'success' && (
                                <div className={`border p-3 rounded-lg text-sm flex flex-col gap-3 animate-in fade-in zoom-in duration-300 ${theme === 'dark' ? 'bg-emerald-900/30 border-emerald-800 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="font-bold">{ui.success}</span>
                                    </div>
                                    <button onClick={nextChallenge} className="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-xs font-bold transition-all hover:scale-105 w-full md:w-auto shadow-sm">
                                        {ui.next}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className={`p-3 rounded-xl border shadow-lg space-y-3 transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">1. Root (Hetu)</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {['greed', 'hatred', 'delusion', 'beautiful'].map(r => (
                                    <button
                                        key={r}
                                        onClick={() => setRoot(r as any)}
                                        className={`p-2 rounded-lg border text-[10px] md:text-xs font-medium capitalize transition-all duration-200 active:scale-95 hover:scale-[1.02] touch-manipulation ${root === r ? 'bg-[#7B1113] border-[#7B1113] text-white shadow-md' : (theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')}`}
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
                                        className={`flex-1 p-2 rounded-lg border text-[10px] md:text-xs font-medium capitalize transition-all duration-200 active:scale-95 hover:scale-[1.02] touch-manipulation ${feeling === f ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : (theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')}`}
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
                                        className={`flex-1 p-2 rounded-lg border text-[10px] md:text-xs font-medium capitalize transition-all duration-200 active:scale-95 hover:scale-[1.02] touch-manipulation ${view === v ? 'bg-teal-600 border-teal-600 text-white shadow-md' : (theme === 'dark' ? 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600' : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100')}`}
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
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 active:scale-95 hover:scale-[1.02] touch-manipulation ${theme === 'dark' ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-gray-900 hover:bg-black text-white'}`}
                        >
                            {ui.check}
                        </button>
                    )}
                </div>

                <div className={`rounded-xl p-5 border flex flex-col items-center justify-center relative min-h-[250px] shadow-inner transition-colors duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-100 border-gray-200'}`}>
                    {warnings.length > 0 && (
                        <div className={`absolute inset-4 backdrop-blur-sm border flex flex-col items-center justify-center p-4 text-center rounded-2xl z-20 animate-in fade-in zoom-in duration-300 shadow-xl ${theme === 'dark' ? 'bg-slate-900/95 border-red-800' : 'bg-white/95 border-red-200'}`}>
                            <XCircle className="w-10 h-10 text-red-600 mb-3 animate-bounce" />
                            <h3 className={`text-base font-bold mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>{ui.wrongConfig}</h3>
                            {warnings.map((w, i) => (
                                <p key={i} className="text-red-500 text-xs md:text-sm mb-1">{w}</p>
                            ))}
                        </div>
                    )}

                    <div className="relative">
                        <div className={`w-28 h-28 md:w-36 md:h-36 rounded-full transition-all duration-1000 ${getOrbColor()} flex items-center justify-center animate-pulse-glow`}>
                            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-white/30 flex items-center justify-center">
                                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-white/20"></div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-5 relative z-10">
                        <h2 className={`text-lg md:text-xl font-serif font-bold mb-1 transition-all duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{getResultName()}</h2>
                        <div className="flex gap-2 justify-center mt-2 flex-wrap">
                            <span className={`text-[10px] md:text-xs border px-2 py-1 rounded uppercase tracking-wider transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>{translateKey(root)}</span>
                            <span className={`text-[10px] md:text-xs border px-2 py-1 rounded uppercase tracking-wider transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>{translateKey(feeling)}</span>
                            {view !== 'none' && <span className={`text-[10px] md:text-xs border px-2 py-1 rounded uppercase tracking-wider transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-600 text-gray-400' : 'bg-white border-gray-300 text-gray-500'}`}>{translateKey(view)}</span>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CittaBuilder;
