import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../../types';
import { Layers, Circle, CheckCircle, XCircle, RefreshCw, ArrowRight, Trophy } from 'lucide-react';
import { getIntroQuizData, UI_TEXT } from '../../constants';

interface ConceptGameProps {
    language: Language;
    theme: Theme;
}

const ConceptGame: React.FC<ConceptGameProps> = ({ language, theme }) => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState<{ correct: boolean, text: string } | null>(null);
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

export default ConceptGame;
