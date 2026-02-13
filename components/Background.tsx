
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingHeart = ({ delay, x, size, duration, color }: { delay: number; x: string; size: number; duration: number; color: string }) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0 }}
    animate={{ 
      y: '-10vh', 
      opacity: [0, 1, 1, 0],
      x: [`${x}`, `calc(${x} + 40px)`, `calc(${x} - 40px)`, `${x}`]
    }}
    transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    style={{ left: x, width: size, height: size, color }}
    className="absolute pointer-events-none"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </motion.div>
);

const Background: React.FC<{ mood: 'pink' | 'midnight' | 'sunset' }> = ({ mood }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 5 + 10
    }));
  }, []);

  const themeConfig = {
    pink: { color: 'rgba(244, 63, 94, 0.2)', blob1: 'bg-rose-200/50', blob2: 'bg-pink-200/40' },
    midnight: { color: 'rgba(99, 102, 241, 0.2)', blob1: 'bg-indigo-900/40', blob2: 'bg-purple-900/30' },
    sunset: { color: 'rgba(251, 146, 60, 0.2)', blob1: 'bg-orange-200/50', blob2: 'bg-yellow-200/40' }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none transition-all duration-1000">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px] ${themeConfig[mood].blob1}`}
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -15, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className={`absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-[120px] ${themeConfig[mood].blob2}`}
      />
      
      {hearts.map(heart => (
        <FloatingHeart key={heart.id} {...heart} color={themeConfig[mood].color} />
      ))}
    </div>
  );
};

export default Background;
