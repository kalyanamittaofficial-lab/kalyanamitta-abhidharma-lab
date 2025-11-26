import React from 'react';
import { Sparkles, ArrowRight, Activity, Zap, MousePointerClick, Flower } from 'lucide-react';

interface LandingPageProps {
    onEnter: () => void;
    theme: 'light' | 'dark';
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter, theme }) => {
    return (
        <div className={`h-screen w-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-1000 ${theme === 'dark'
                ? 'bg-[#0f172a] text-white'
                : 'bg-gradient-to-br from-[#fffbeb] via-white to-[#fff1f2] text-slate-900'
            }`}>

            {/* Custom Animations */}
            <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Large Gradient Orbs */}
                <div className={`absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse-glow ${theme === 'dark' ? 'bg-indigo-900' : 'bg-amber-200'
                    }`} />
                <div className={`absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-40 mix-blend-multiply animate-pulse-glow delay-1000 ${theme === 'dark' ? 'bg-[#7B1113]/30' : 'bg-red-100'
                    }`} />
                <div className={`absolute top-[40%] left-[20%] w-[30vw] h-[30vw] rounded-full blur-[100px] opacity-30 mix-blend-multiply animate-pulse-glow delay-2000 ${theme === 'dark' ? 'bg-purple-900' : 'bg-orange-100'
                    }`} />

                {/* Floating Particles (CSS generated) */}
                <div className="absolute inset-0 opacity-30">
                    <div className={`absolute top-1/4 left-1/4 w-4 h-4 rounded-full animate-float ${theme === 'dark' ? 'bg-indigo-400' : 'bg-amber-400'}`} />
                    <div className={`absolute top-3/4 left-1/3 w-6 h-6 rounded-full animate-float-delayed ${theme === 'dark' ? 'bg-purple-400' : 'bg-[#7B1113]'}`} />
                    <div className={`absolute top-1/3 right-1/4 w-3 h-3 rounded-full animate-float ${theme === 'dark' ? 'bg-blue-400' : 'bg-orange-400'}`} />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center h-full py-4">

                {/* Dharma Wheel Symbol */}
                <div className="mb-6 relative group">
                    <div className={`absolute inset-0 rounded-full blur-2xl opacity-50 transition-opacity duration-500 group-hover:opacity-80 ${theme === 'dark' ? 'bg-indigo-500' : 'bg-amber-400'
                        }`} />
                    <div className={`relative p-6 rounded-full shadow-2xl backdrop-blur-xl border border-white/10 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 ${theme === 'dark'
                            ? 'bg-slate-900/60 shadow-indigo-500/20'
                            : 'bg-white/70 shadow-amber-500/20'
                        }`}>
                        {/* Custom Dharma Wheel SVG */}
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`animate-spin-slow ${theme === 'dark' ? 'text-indigo-300' : 'text-[#7B1113]'}`}>
                            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" />
                            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="4" />
                            {/* Spokes */}
                            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                                <line
                                    key={angle}
                                    x1="50" y1="50"
                                    x2={50 + 45 * Math.cos(angle * Math.PI / 180)}
                                    y2={50 + 45 * Math.sin(angle * Math.PI / 180)}
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                />
                            ))}
                            {/* Decorative dots on rim */}
                            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => (
                                <circle
                                    key={angle}
                                    cx={50 + 45 * Math.cos(angle * Math.PI / 180)}
                                    cy={50 + 45 * Math.sin(angle * Math.PI / 180)}
                                    r="3"
                                    fill="currentColor"
                                />
                            ))}
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none select-none">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#7B1113] via-amber-600 to-[#7B1113] dark:from-indigo-300 dark:via-purple-300 dark:to-indigo-300 animate-gradient-x bg-[length:200%_auto]">
                        Kalyanamitta
                    </span>
                    <span className={`block text-2xl md:text-4xl mt-2 font-serif italic tracking-wide ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        Abhidharma Lab
                    </span>
                </h1>

                {/* Subtitle */}
                <p className={`text-base md:text-xl max-w-xl mx-auto mb-8 font-light leading-relaxed opacity-90 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                    A digital sanctuary for exploring the <span className="font-medium text-[#7B1113] dark:text-indigo-300">micro-components of consciousness</span>.
                </p>

                {/* Features Grid (Floating) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-10 w-full">
                    {[
                        { icon: <Activity className="w-5 h-5" />, label: "Citta Analysis", desc: "Map states of mind", delay: "0s" },
                        { icon: <Zap className="w-5 h-5" />, label: "Cetasika Factors", desc: "Mental components", delay: "0.2s" },
                        { icon: <Flower className="w-5 h-5" />, label: "Rupa & Nibbana", desc: "Matter & Liberation", delay: "0.4s" },
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className={`group p-4 rounded-xl border backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg animate-float ${theme === 'dark'
                                    ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/60 hover:border-indigo-500/30'
                                    : 'bg-white/60 border-amber-100 hover:bg-white/90 hover:border-amber-200'
                                }`}
                            style={{ animationDelay: feature.delay }}
                        >
                            <div className={`mb-2 inline-flex p-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-indigo-500/10 text-indigo-300 group-hover:bg-indigo-500/20' : 'bg-[#7B1113]/5 text-[#7B1113] group-hover:bg-[#7B1113]/10'
                                }`}>
                                {feature.icon}
                            </div>
                            <h3 className="font-bold text-base mb-1">{feature.label}</h3>
                            <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{feature.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <button
                    onClick={onEnter}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-[#7B1113]/20 dark:hover:shadow-indigo-500/20 overflow-hidden"
                >
                    <div className={`absolute inset-0 opacity-100 transition-all duration-500 ${theme === 'dark'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-purple-500'
                            : 'bg-gradient-to-r from-[#7B1113] to-amber-700 group-hover:from-[#9B1518] group-hover:to-amber-600'
                        }`} />

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />

                    <span className="relative text-white flex items-center gap-2">
                        Enter Laboratory <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>

                <div className={`mt-6 text-xs font-medium opacity-50 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span className="flex items-center justify-center gap-2 animate-pulse">
                        <MousePointerClick size={12} /> Begin your journey
                    </span>
                </div>

            </div>
        </div>
    );
};
