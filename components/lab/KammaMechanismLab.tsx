import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../../types';
import { RefreshCw, Skull, Leaf, Sun } from 'lucide-react';
import { getKammaSituations, UI_TEXT } from '../../constants';

interface KammaMechanismLabProps {
    language: Language;
    theme: Theme;
}

const KammaMechanismLab: React.FC<KammaMechanismLabProps> = ({ language, theme }) => {
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
                            <Skull size={18} /> Akusala
                        </button>
                        <button onClick={() => toggleMode('kusala')} className={`flex-1 py-3 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 ${mode === 'kusala' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-200'}`}>
                            <Leaf size={18} /> Kusala
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
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
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

export default KammaMechanismLab;
