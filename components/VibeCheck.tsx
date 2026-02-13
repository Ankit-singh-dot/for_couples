
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SCENARIOS = [
  { text: "Steals your hoodie and keeps it forever", type: 'green' },
  { text: "Replies with 'K' to a long paragraph", type: 'red' },
  { text: "Remembers your coffee order perfectly", type: 'green' },
  { text: "Likes their own photos on Instagram", type: 'red' },
  { text: "Sends you funny memes at 3 AM", type: 'green' },
  { text: "Claps when the plane lands", type: 'red' },
  { text: "Tells you 'I saw this and thought of you'", type: 'green' },
];

interface Props {
  onBack: () => void;
}

const VibeCheck: React.FC<Props> = ({ onBack }) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleChoice = (isGreen: boolean) => {
    const correct = (isGreen && SCENARIOS[index].type === 'green') || (!isGreen && SCENARIOS[index].type === 'red');
    if (correct) setScore(prev => prev + 1);
    
    if (index < SCENARIOS.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="w-full bg-white/80 backdrop-blur-3xl p-8 rounded-[3rem] border-4 border-rose-100 shadow-2xl text-center">
      <h2 className="text-3xl font-black text-rose-600 mb-2 italic">VIBE CHECK ✅</h2>
      <p className="text-rose-400 text-sm mb-8 font-bold uppercase tracking-widest">Red Flag or Green Flag?</p>

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={index}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="space-y-8"
          >
            <div className="min-h-[120px] flex items-center justify-center p-6 bg-rose-50 rounded-3xl border border-rose-100">
              <p className="text-xl font-bold text-rose-700 italic">"{SCENARIOS[index].text}"</p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => handleChoice(false)}
                className="flex-1 py-6 bg-red-500 text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                🚩 RED
              </button>
              <button 
                onClick={() => handleChoice(true)}
                className="flex-1 py-6 bg-emerald-500 text-white rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
              >
                ✅ GREEN
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-black text-rose-600">VIBE SCORE: {Math.round((score/SCENARIOS.length)*100)}%</h3>
            <p className="text-rose-500 font-medium">
              {score > 5 ? "You're a Certified Green Flag! 🌿" : "A little bit of chaos, we love it! 🔥"}
            </p>
            <button 
              onClick={onBack}
              className="w-full py-4 bg-rose-500 text-white rounded-xl font-bold mt-4"
            >
              Back to Celebration
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-8 text-[10px] text-rose-300 font-bold">PRO TIP: DON'T OVERTHINK IT</div>
    </div>
  );
};

export default VibeCheck;
