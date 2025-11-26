import React, { useState, useEffect, useRef } from 'react';
import { Language, Theme } from '../../types';
import { PlayCircle, Zap, Circle, Play, Pause, RotateCcw, Microscope } from 'lucide-react';
import { getVithiStages, UI_TEXT } from '../../constants';

interface ProcessViewerProps {
    language: Language;
    theme: Theme;
}

const ProcessViewer: React.FC<ProcessViewerProps> = ({ language, theme }) => {
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
        <div className="mt-2 md:mt-3 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2">
                <div>
                    <h3 className="text-xl font-serif text-[#7B1113]">{ui.mindMoments}</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{language === 'si' ? 'සිතක ක්‍රියාකාරීත්වය දෘශ්‍යමාන කිරීම.' : 'Visualization of mental process.'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={togglePlay} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 bg-[#7B1113] hover:bg-[#901416] text-white rounded-lg transition-colors border border-[#7B1113] active:scale-95 touch-manipulation shadow-lg shadow-red-900/10 text-xs md:text-sm">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                        {isPlaying ? ui.pause : ui.play}
                    </button>
                    <button onClick={resetSim} className={`p-2 rounded-lg border active:scale-95 touch-manipulation shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-gray-300 hover:bg-slate-700' : 'bg-white hover:bg-gray-50 text-gray-500 border-gray-200'}`}>
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            <div ref={scrollContainerRef} className="relative border-b pb-10 overflow-x-auto scrollbar-hide snap-x border-gray-200 dark:border-gray-800">
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
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 shadow-md transition-all duration-300 ${isActive ? 'border-amber-500 bg-[#7B1113] text-amber-100 shadow-lg' : (theme === 'dark' ? 'border-slate-700 bg-slate-800 text-gray-500' : 'border-gray-200 bg-white text-gray-400')}`}>
                                    {isActive ? <Zap size={20} className="animate-pulse" /> : <Circle size={12} />}
                                </div>
                                <div className={`text-[10px] md:text-xs font-bold text-center w-full truncate px-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'}`}>{stage.paliName}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={`mt-3 min-h-[120px] border rounded-xl p-4 transition-all flex items-center justify-center shadow-md ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
                {activeStageId ? (
                    (() => {
                        const stage = stages.find(s => s.id === activeStageId);
                        return (
                            <div className="animate-fade-in w-full max-w-3xl flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                                <div className={`hidden md:block p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-amber-50 border-amber-100'}`}>
                                    <Microscope className="w-8 h-8 text-[#7B1113]" />
                                </div>
                                <div className="w-full">
                                    <h4 className={`text-xl md:text-2xl font-serif mb-0.5 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{stage?.paliName}</h4>
                                    <h5 className="text-sm md:text-base text-amber-600 mb-1">{stage?.englishName}</h5>
                                    <p className={`text-xs md:text-sm leading-relaxed max-w-2xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{stage?.function}</p>
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

export default ProcessViewer;
