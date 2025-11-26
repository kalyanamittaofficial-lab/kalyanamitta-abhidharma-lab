import React, { useState } from 'react';
import { Language, Theme } from '../../types';
import { Eye, Microscope, Fingerprint, Mountain, Droplets, Flame, Wind } from 'lucide-react';
import { UI_TEXT } from '../../constants';

interface ElementMixerProps {
    language: Language;
    theme: Theme;
}

const ElementMixer: React.FC<ElementMixerProps> = ({ language, theme }) => {
    const [elements, setElements] = useState({ earth: 25, water: 25, fire: 25, air: 25 });
    const [activeTab, setActiveTab] = useState<'visual' | 'analysis'>('visual');
    const [touchFeedback, setTouchFeedback] = useState<{ msg: string, type: 'tangible' | 'intangible' } | null>(null);

    const ui = UI_TEXT[language];

    const setPreset = (type: 'earth' | 'water' | 'fire' | 'air' | 'balance') => {
        setTouchFeedback(null);
        switch (type) {
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
        <div className="mt-2 pb-6 max-w-3xl mx-auto">
            <div className="flex gap-2 mb-2 justify-center">
                <button onClick={() => setActiveTab('visual')} className={`px-2 py-1 rounded-full text-[10px] font-bold transition flex items-center gap-1.5 ${activeTab === 'visual' ? (theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white') : (theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-gray-100 text-gray-500')}`}><Eye size={12} /> {ui.visual}</button>
                <button onClick={() => setActiveTab('analysis')} className={`px-2 py-1 rounded-full text-[10px] font-bold transition flex items-center gap-1.5 ${activeTab === 'analysis' ? (theme === 'dark' ? 'bg-gray-100 text-gray-900' : 'bg-gray-900 text-white') : (theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-gray-100 text-gray-500')}`}><Microscope size={12} /> {ui.analysis}</button>
            </div>

            <div className={`border rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-white border-gray-200'}`}>

                {/* TOP SECTION: VISUALIZER */}
                <div className={`p-3 md:p-4 flex flex-col items-center justify-center relative min-h-[250px] transition-colors duration-700 ${info.bg} overflow-hidden`}>

                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-400 via-transparent to-transparent"></div>
                    </div>

                    {/* VISUALS (Same as before, simplified for brevity but fully functional) */}
                    <div className="relative w-48 h-48 flex items-center justify-center perspective-1000">
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
                    <div className="mt-2 text-center relative z-10 max-w-lg animate-fade-in">
                        <h2 className={`text-xl font-serif font-bold mb-0 ${info.color}`}>{info.title}</h2>
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
                                    className={`mt-1.5 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 mx-auto shadow-sm active:scale-95 transition ${theme === 'dark' ? 'bg-slate-100 text-slate-900 hover:bg-white' : 'bg-gray-900 hover:bg-black text-white'}`}
                                >
                                    <Fingerprint size={12} /> {ui.touch}
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
                <div className={`border-t p-3 md:p-4 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-900'}`}><Mountain size={14} /> Earth</label>
                                    <span className="text-xs font-mono bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">{elements.earth}%</span>
                                </div>
                                <input type="range" min="10" max="100" value={elements.earth} onChange={(e) => handleChange('earth', parseInt(e.target.value))} className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-800" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-cyan-400' : 'text-cyan-900'}`}><Droplets size={14} /> Water</label>
                                    <span className="text-xs font-mono bg-cyan-100 px-2 py-0.5 rounded text-cyan-800">{elements.water}%</span>
                                </div>
                                <input type="range" min="10" max="100" value={elements.water} onChange={(e) => handleChange('water', parseInt(e.target.value))} className="w-full h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-900'}`}><Flame size={14} /> Fire</label>
                                    <span className="text-xs font-mono bg-orange-100 px-2 py-0.5 rounded text-orange-800">{elements.fire}%</span>
                                </div>
                                <input type="range" min="10" max="100" value={elements.fire} onChange={(e) => handleChange('fire', parseInt(e.target.value))} className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                            </div>
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-800'}`}><Wind size={14} /> Air</label>
                                    <span className="text-xs font-mono bg-slate-200 px-2 py-0.5 rounded text-slate-700">{elements.air}%</span>
                                </div>
                                <input type="range" min="10" max="100" value={elements.air} onChange={(e) => handleChange('air', parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600" />
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

export default ElementMixer;
