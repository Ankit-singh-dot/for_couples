
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const PlayfulTools: React.FC<Props> = ({ onBack }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<{ type: 'calculator' | 'shipper', value: string | number, sub: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateLove = () => {
    if (!name1 || !name2) return;
    setLoading(true);
    setResult(null);
    
    setTimeout(() => {
      const outcomes = [
        { val: 99, sub: "Dangerously obsessive. Call for help? 🚨" },
        { val: 0, sub: "Run while you still have legs! 🏃‍♂️" },
        { val: 66.6, sub: "Slightly demonic but cute. 🔥" },
        { val: 101, sub: "Math-breaking levels of clingy. 🦠" },
        { val: 95, sub: "Perfect. You'll share a grave one day. ⚰️" }
      ];
      const random = outcomes[Math.floor(Math.random() * outcomes.length)];
      setResult({ type: 'calculator', value: random.val, sub: random.sub });
      setLoading(false);
    }, 1500);
  };

  const generateShipName = () => {
    if (!name1 || !name2) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const part1 = name1.substring(0, Math.ceil(name1.length / 2));
      const part2 = name2.substring(Math.floor(name2.length / 2));
      setResult({ type: 'shipper', value: part1 + part2, sub: "This name will be engraved on our shared credit card debt. 💳" });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="w-full bg-white/60 backdrop-blur-2xl p-8 rounded-[3rem] border-4 border-white shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <button onClick={onBack} className="text-rose-400 font-black text-sm uppercase tracking-tighter">
          ← Escape? (No)
        </button>
        <h3 className="text-3xl font-black italic text-rose-600 tracking-tighter">DOOM CHECK</h3>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-2">Victim #1</label>
            <input 
              type="text" 
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Your Name"
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-rose-50 focus:border-rose-200 outline-none text-rose-600 font-bold placeholder:text-rose-200"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest ml-2">Victim #2</label>
            <input 
              type="text" 
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Partner in Crime"
              className="w-full px-6 py-4 rounded-2xl bg-white border-2 border-rose-50 focus:border-rose-200 outline-none text-rose-600 font-bold placeholder:text-rose-200"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calculateLove}
            disabled={loading}
            className="flex-1 py-5 bg-rose-600 text-white rounded-2xl font-black uppercase italic shadow-lg disabled:opacity-50"
          >
            Match %
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generateShipName}
            disabled={loading}
            className="flex-1 py-5 bg-white text-rose-600 rounded-2xl font-black uppercase italic border-2 border-rose-100 shadow-sm disabled:opacity-50"
          >
            Ship Us
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2 py-8">
              <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-rose-400 font-black italic animate-pulse uppercase text-xs">Sealing our fate...</p>
            </motion.div>
          )}

          {result && !loading && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mt-8 p-10 bg-rose-50 rounded-[2.5rem] border-2 border-rose-100 text-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
              {result.type === 'calculator' ? (
                <>
                  <div className="text-[10px] font-black text-rose-300 uppercase mb-4 tracking-widest">Statistical Probability of Survival</div>
                  <div className="text-7xl font-black text-rose-600 mb-4">{result.value}%</div>
                  <p className="text-rose-500 font-bold italic">"{result.sub}"</p>
                </>
              ) : (
                <>
                  <div className="text-[10px] font-black text-rose-300 uppercase mb-4 tracking-widest">Branding for our cult</div>
                  <div className="text-6xl font-dancing font-black text-rose-600 mb-4">{result.value}</div>
                  <p className="text-rose-500 font-bold italic">"{result.sub}"</p>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PlayfulTools;
