
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailItem {
  id: number;
  x: number;
  y: number;
}

const CursorTrail: React.FC<{ color?: string }> = ({ color = '#f43f5e' }) => {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const newItem = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setTrail(prev => [...prev.slice(-15), newItem]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Main Heart Cursor */}
      <motion.div
        className="drop-shadow-lg"
        style={{ color }}
        animate={{ x: mousePos.x - 12, y: mousePos.y - 12 }}
        transition={{ type: 'spring', damping: 20, stiffness: 400, mass: 0.1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>

      {/* Trailing Items */}
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0.6, scale: 0.8 }}
            animate={{ opacity: 0, scale: 0.2, y: item.y + (Math.random() * 40 - 20) }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute"
            style={{ left: item.x - 6, top: item.y - 6, color }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
