
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import CursorTrail from './components/CursorTrail';
import ValentineQuestion from './components/ValentineQuestion';
import SuccessView from './components/SuccessView';
import FinalView from './components/FinalView';
import { AppState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('INITIAL');
  const [noCount, setNoCount] = useState(0);
  const [mood, setMood] = useState<'pink' | 'midnight' | 'sunset'>('pink');
  const [auraColor, setAuraColor] = useState('#f43f5e');
  const yesAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleYes = useCallback(() => {
    // Play aji-mangal.mp3 and keep reference to stop later
    yesAudioRef.current = new Audio('/aji-mangal.mp3');
    yesAudioRef.current.play().catch(e => console.log('Audio play blocked'));
    setState('SUCCESS');
  }, []);
  const handleNoHover = useCallback(() => setNoCount(prev => prev + 1), []);
  const handleSurrender = useCallback(() => {
    // Stop aji-mangal.mp3 before transitioning to final page
    if (yesAudioRef.current) {
      yesAudioRef.current.pause();
      yesAudioRef.current = null;
    }
    setState('FINAL');
  }, []);

  return (
    <div className={`relative min-h-screen w-full transition-colors duration-1000 overflow-hidden flex flex-col items-center justify-center p-4 
      ${mood === 'pink' ? 'bg-rose-50' : mood === 'midnight' ? 'bg-slate-950' : 'bg-orange-50'}`}>

      <Background mood={mood} />
      <CursorTrail color={auraColor} />

      {/* Vibe & Aura Switcher */}
      <div className="fixed top-6 right-6 z-[60] flex flex-col gap-4 items-end">
        <div className="flex gap-2 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 shadow-xl">
          {(['pink', 'midnight', 'sunset'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMood(m);
                setAuraColor(m === 'pink' ? '#f43f5e' : m === 'midnight' ? '#6366f1' : '#f97316');
              }}
              className={`w-8 h-8 rounded-full border-2 transition-all ${mood === m ? 'border-white scale-110' : 'border-transparent scale-90'} 
                ${m === 'pink' ? 'bg-rose-400' : m === 'midnight' ? 'bg-indigo-900' : 'bg-orange-400'}`}
            />
          ))}
        </div>
        <div className="text-[10px] font-bold uppercase tracking-tighter text-rose-400/60 bg-white/30 px-2 py-1 rounded-md">
          Aesthetic Mode
        </div>
      </div>

      <AnimatePresence mode="wait">
        {state === 'INITIAL' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="z-10 w-full max-w-2xl"
          >
            <ValentineQuestion noCount={noCount} onYes={handleYes} onNoHover={handleNoHover} auraColor={auraColor} />
          </motion.div>
        )}

        {state === 'SUCCESS' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            className="z-10 w-full max-w-xl"
          >
            <SuccessView onSurrender={handleSurrender} />
          </motion.div>
        )}

        {state === 'FINAL' && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 w-full max-w-lg"
          >
            <FinalView />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-4 text-rose-300 text-xs font-medium uppercase tracking-widest z-20 pointer-events-none flex flex-col items-center gap-1">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
          Mujhe Jodon Ka Dard Hai
        </span>
        <span className="text-[9px] normal-case tracking-normal opacity-60">Made in frustration by Ankit</span>
      </footer>
    </div>
  );
};

export default App;
