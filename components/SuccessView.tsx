
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onSurrender: () => void;
}

const SuccessView: React.FC<Props> = ({ onSurrender }) => {
  return (
    <div className="flex flex-col items-center text-center p-12 bg-white/40 backdrop-blur-xl rounded-[3.5rem] border border-white/60 shadow-2xl overflow-hidden relative">
      {/* Background Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + '%', scale: 0 }}
            animate={{
              y: 800,
              rotate: 360,
              scale: [0, 1, 1, 0.5],
              x: `${Math.random() * 80 + 10}%`
            }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2, type: 'tween' }}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: ['#f43f5e', '#ec4899', '#fb7185'][i % 3] }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.05 }}
        transition={{ type: 'spring', damping: 12, stiffness: 100 }}
        className="relative z-10"
      >
        <div className="text-9xl mb-6 cursor-default">🔒⚰️</div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-5xl md:text-7xl font-dancing text-rose-600 mb-6"
      >
        You're Trapped!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4 mb-10"
      >
        <p className="text-rose-500 font-black text-xl italic uppercase tracking-tighter">
          SOUL BINDING: [SUCCESSFUL] ⛓️
        </p>
        <div className="space-y-2 text-rose-400 font-medium max-w-sm mx-auto text-sm">
          <p>Congratulations! You just traded your freedom for a lifetime of:</p>
          <ul className="text-xs list-disc list-inside space-y-1 opacity-80">
            <li>Infinite "What do you want for dinner?" debates</li>
            <li>Mandatory participation in every TikTok trend</li>
            <li>A 100% tax on all fries, snacks, and hoodies</li>
            <li>Shared funeral arrangements (standard procedure)</li>
          </ul>
        </div>
        <p className="text-rose-600 font-black text-2xl mt-8 leading-tight">
          Rest in Peace (of mind)... <br />
          <span className="text-lg opacity-60">You're mine forever now.</span>
        </p>
      </motion.div>

      <div className="w-full max-w-xs z-10">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }}
          whileTap={{ scale: 0.95 }}
          onClick={onSurrender}
          className="w-full px-8 py-5 bg-rose-500 text-white font-black text-xl rounded-full shadow-xl transition-colors uppercase italic"
        >
          Sign & Surrender
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-8 text-[10px] text-rose-300 font-bold uppercase tracking-widest"
      >
        No refunds. No exchanges. No witness protection program.
      </motion.p>
    </div>
  );
};

export default SuccessView;
