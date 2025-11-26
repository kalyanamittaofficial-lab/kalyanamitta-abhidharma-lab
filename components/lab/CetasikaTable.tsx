import React, { useState } from 'react';
import { Language, Theme } from '../../types';
import { Layers } from 'lucide-react';
import { getCetasikaGroups } from '../../constants';

interface CetasikaTableProps {
    language: Language;
    theme: Theme;
}

const CetasikaTable: React.FC<CetasikaTableProps> = ({ language, theme }) => {
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
                                            className={`px-3 py-2 rounded-lg text-sm transition-all border ${selectedCetasika === item.id
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

export default CetasikaTable;
