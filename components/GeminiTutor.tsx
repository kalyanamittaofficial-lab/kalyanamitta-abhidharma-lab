import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { createChatSession, sendMessageToChat } from '../services/geminiService';
import { ChatMessage, Language, Theme } from '../types';
import { Send, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { UI_TEXT, getTutorSystemInstruction } from '../constants';

interface GeminiTutorProps {
  language: Language;
  theme: Theme;
}

export const GeminiTutor: React.FC<GeminiTutorProps> = ({ language, theme }) => {
  const ui = UI_TEXT[language];
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize/Reset Chat on Language Change
  useEffect(() => {
    try {
      // Re-create session with new language instruction
      chatSessionRef.current = createChatSession(language); 
      // Note: In a real app we might need to update the system instruction of an existing chat
      // but creating a new one ensures the context is fresh for the new language mode.
      
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          content: ui.tutorWelcome,
          timestamp: Date.now()
        }
      ]);
    } catch (e) {
      console.error("Failed to init chat", e);
    }
  }, [language, ui.tutorWelcome]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToChat(chatSessionRef.current, userMsg.content);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full shadow-2xl transition-colors ${theme === 'dark' ? 'bg-slate-900 border-l border-slate-800' : 'bg-white border-l border-gray-200'}`}>
      <div className={`p-4 border-b backdrop-blur flex items-center gap-2 ${theme === 'dark' ? 'border-slate-800 bg-slate-900/95' : 'border-gray-200 bg-white/95'}`}>
        <Sparkles className="w-5 h-5 text-[#7B1113]" />
        <h2 className={`font-serif font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{ui.tutor}</h2>
      </div>

      <div className={`flex-1 overflow-y-auto p-4 space-y-4 ${theme === 'dark' ? 'bg-slate-950/50' : 'bg-gray-50/50'}`}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#7B1113] text-white shadow-md'
                  : theme === 'dark'
                    ? 'bg-slate-800 text-gray-200 border border-slate-700 shadow-sm'
                    : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
              }`}
            >
              {msg.role === 'model' ? (
                 <div className={`prose prose-sm max-w-none ${theme === 'dark' ? 'prose-invert text-gray-200' : 'text-gray-800'}`}>
                   <ReactMarkdown>{msg.content}</ReactMarkdown>
                 </div>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className={`rounded-lg p-3 flex items-center gap-2 border shadow-sm ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
              <Loader2 className="w-4 h-4 animate-spin text-[#7B1113]" />
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{ui.thinking}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'}`}>
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={ui.tutorPlaceholder}
            className={`w-full border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B1113]/20 focus:border-[#7B1113] resize-none h-14 transition-colors ${
               theme === 'dark' 
               ? 'bg-slate-800 border-slate-700 text-gray-100 placeholder-gray-500' 
               : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 p-2 bg-[#7B1113] hover:bg-[#901416] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
           <button onClick={() => setInput(ui.quickQ1)} className={`text-xs whitespace-nowrap px-3 py-1 rounded-full border transition ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200'}`}>
             {ui.quickQ1}
           </button>
           <button onClick={() => setInput(ui.quickQ2)} className={`text-xs whitespace-nowrap px-3 py-1 rounded-full border transition ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200'}`}>
             {ui.quickQ2}
           </button>
           <button onClick={() => setInput(ui.quickQ3)} className={`text-xs whitespace-nowrap px-3 py-1 rounded-full border transition ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border-slate-700' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-200'}`}>
             {ui.quickQ3}
           </button>
        </div>
      </div>
    </div>
  );
};