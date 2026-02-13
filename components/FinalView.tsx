
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ARZ_KIYA_HAI =
  "/Meri_Mehfil_Tere _Jaane_Se_Veeran_Hai_Arz_Kiya_Hai_Anuv_Jain_Hindi.mp3";

const FinalView: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ARZ_KIYA_HAI);
    audioRef.current.loop = true;
    audioRef.current.play().catch(e => console.log("Audio play blocked by browser policy"));
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-10 bg-slate-900/90 backdrop-blur-2xl rounded-[3rem] border border-slate-700 shadow-2xl relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="text-8xl">🎸🎧</div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl md:text-5xl font-black text-white italic uppercase tracking-tighter leading-tight"
      >
        "last me tu bhi Anuv jain ke gaane sunega laadle"
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        className="mt-12 space-y-4"
      >
        <p className="text-rose-400 font-mono text-xs">Playing: Arz kiya hai  (Endless Loop Edition)</p>
        <div className="flex gap-1 justify-center">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [10, 30, 10] }}
              transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
              className="w-1 bg-rose-500 rounded-full"
            />
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-8 text-slate-400 text-sm font-medium italic"
      >
        Ab rona dhona shuru karein? ❤️
      </motion.p>
    </div>
  );
};

export default FinalView;
