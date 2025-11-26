
import React, { useState, useEffect } from 'react';
import { getLabModules, UI_TEXT } from './constants';
import { LabInterface } from './components/LabInterface';
import { GeminiTutor } from './components/GeminiTutor';
import { LandingPage } from './components/LandingPage';
import { BookOpen, Activity, Disc, Zap, Menu, X, Bot, ArrowLeft, Scale, Sun, Moon, Languages } from 'lucide-react';
import { Language, Theme } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'lab'>('landing');
  const [activeModuleId, setActiveModuleId] = useState<string>('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Settings State
  const [language, setLanguage] = useState<Language>('si');
  const [theme, setTheme] = useState<Theme>('light');

  // Load modules based on language
  const modules = getLabModules(language);
  const activeModule = modules.find(m => m.id === activeModuleId) || modules[0];
  const ui = UI_TEXT[language];

  // Handle Dark Mode
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(true);
        setIsTutorOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTutor = () => setIsTutorOpen(!isTutorOpen);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(prev => prev === 'si' ? 'en' : 'si');

  const getIconForModule = (id: string) => {
    switch (id) {
      case 'intro': return <BookOpen size={18} />;
      case 'citta': return <Activity size={18} />;
      case 'cetasika': return <Zap size={18} />;
      case 'rupa': return <Disc size={18} />;
      case 'kamma': return <Scale size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  if (view === 'landing') {
    return <LandingPage onEnter={() => setView('lab')} theme={theme} />;
  }

  return (
    <div className={`flex h-screen w-full font-sans relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900'}`}>

      {/* Mobile Backdrop */}
      {isMobile && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 animate-fade-in"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:relative inset-y-0 left-0 z-40 w-72 md:w-64 border-r transform transition-all duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none
        ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:-translate-x-full md:opacity-0'}`}
      >
        <div className={`p-5 border-b flex items-center justify-between h-16 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#7B1113] flex items-center justify-center text-white font-serif font-bold shadow-md">
              {language === 'si' ? 'අ' : 'A'}
            </div>
            <span className="font-serif font-bold text-lg text-[#7B1113]">{ui.appTitle}</span>
          </div>
          <button onClick={toggleSidebar} className={`md:hidden p-2 rounded-lg ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-slate-800' : 'text-gray-500 hover:text-black bg-gray-100'}`}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className={`px-3 py-2 text-xs font-bold uppercase tracking-widest mb-1 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>{ui.sidebarTitle}</div>
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => {
                setActiveModuleId(module.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${activeModuleId === module.id
                  ? theme === 'dark'
                    ? 'bg-red-900/30 text-red-200 border border-red-900/50 shadow-sm'
                    : 'bg-amber-50 text-[#7B1113] border border-amber-200 shadow-sm'
                  : theme === 'dark'
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
            >
              <div className={`${activeModuleId === module.id ? 'text-[#7B1113] dark:text-red-400' : 'text-gray-400'}`}>
                {getIconForModule(module.id)}
              </div>
              {module.title}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer with Toggles */}
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-100 bg-gray-50/50'}`}>
          <div className="flex gap-2 mb-4">
            <button
              onClick={toggleTheme}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold border transition-colors ${theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-yellow-400'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={toggleLanguage}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold border transition-colors ${theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-gray-300'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
            >
              <Languages size={14} />
              {language === 'si' ? 'English' : 'සිංහල'}
            </button>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 font-medium">{ui.footerText}</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 relative h-full transition-colors ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}`}>
        {/* Top Bar */}
        <header className={`h-16 border-b flex items-center justify-between px-4 sticky top-0 z-20 shadow-sm backdrop-blur transition-colors ${theme === 'dark' ? 'border-slate-800 bg-slate-900/95' : 'border-gray-200 bg-white/95'
          }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg transition-colors active:scale-95 ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-slate-800' : 'text-gray-500 hover:text-black hover:bg-gray-100'
                }`}
            >
              <Menu size={24} />
            </button>
            <div className={`hidden md:block h-4 w-[1px] ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`}></div>
            <span className={`text-sm hidden md:inline ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{ui.subTitle}</span>
            <span className="md:hidden text-sm font-bold text-[#7B1113] truncate max-w-[150px]">{activeModule.title}</span>
          </div>

          <button
            onClick={toggleTutor}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition-colors active:scale-95 touch-manipulation ${isTutorOpen
                ? 'bg-[#7B1113] text-white border-[#7B1113] shadow-md'
                : theme === 'dark'
                  ? 'bg-slate-800 text-gray-300 border-slate-700 hover:bg-slate-700'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
          >
            <Bot size={20} />
            <span className="hidden sm:inline">{ui.tutor}</span>
          </button>
        </header>

        {/* Workspace */}
        <div className="flex-1 relative overflow-hidden flex">
          <div className="flex-1 h-full relative w-full">
            <LabInterface module={activeModule} language={language} theme={theme} />
          </div>

          {/* Mobile Backdrop for Tutor */}
          {isMobile && isTutorOpen && (
            <div
              onClick={() => setIsTutorOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 animate-fade-in"
            />
          )}

          {/* Tutor Panel */}
          <div
            className={`fixed md:absolute inset-y-0 right-0 z-40 border-l shadow-2xl transition-transform duration-300 ease-in-out flex flex-col
             ${isTutorOpen ? 'translate-x-0' : 'translate-x-full'} 
             ${isMobile ? 'w-full max-w-full' : 'w-96'}
             ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}
          >
            {/* Mobile Header for Tutor */}
            {isMobile && (
              <div className={`h-16 border-b flex items-center justify-between px-4 ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
                <button onClick={toggleTutor} className={`flex items-center gap-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  <ArrowLeft size={20} /> <span className="text-sm font-medium">{ui.back}</span>
                </button>
                <span className="font-serif font-bold text-[#7B1113]">{ui.tutor}</span>
                <div className="w-8"></div>
              </div>
            )}

            <div className="flex-1 overflow-hidden">
              <GeminiTutor language={language} theme={theme} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
