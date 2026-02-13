
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

interface Props {
  onBack: () => void;
}

const AIOracle: React.FC<Props> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askCupid = async (type: 'poem' | 'date' | 'prediction') => {
    setLoading(true);
    setResponse('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemMsg = "You are a witty, romantic, and slightly mischievous Digital Cupid. Keep responses short (under 50 words), use emojis, and be extremely charming and creative.";
      
      const userPrompt = type === 'poem' 
        ? `Write a short, funny love poem about a couple who just said "Yes" to being Valentines.` 
        : type === 'date' 
        ? `Suggest a wild and creative out-of-the-box date idea for this Valentine's Day.`
        : `Give a playful and happy prediction for this couple's future together.`;

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userPrompt,
        config: { systemInstruction: systemMsg }
      });

      setResponse(result.text || "Cupid is speechless! Try again.");
    } catch (error) {
      setResponse("Even AI can't describe this love! (Check your API Key settings)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-3xl p-8 rounded-[3rem] border border-white shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2z"/></svg>
      </div>

      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-4xl shadow-inner">🔮</div>
        <h2 className="text-3xl font-black text-rose-600 uppercase tracking-tighter">The Love Oracle</h2>
        <p className="text-rose-400 font-medium">Ask the Digital Cupid for a sign from the stars...</p>

        <div className="flex flex-wrap justify-center gap-3">
          <button onClick={() => askCupid('poem')} className="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-full hover:scale-105 transition-transform">Get a Poem 📜</button>
          <button onClick={() => askCupid('date')} className="px-4 py-2 bg-pink-500 text-white text-xs font-bold rounded-full hover:scale-105 transition-transform">Date Idea 🥂</button>
          <button onClick={() => askCupid('prediction')} className="px-4 py-2 bg-rose-400 text-white text-xs font-bold rounded-full hover:scale-105 transition-transform">Future Seek 🌌</button>
        </div>

        <div className="w-full min-h-[150px] bg-rose-50/50 rounded-2xl p-6 border border-rose-100 flex items-center justify-center italic">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-1">
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-200"></span>
              </motion.div>
            ) : response ? (
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-rose-700 leading-relaxed font-serif text-lg">
                "{response}"
              </motion.p>
            ) : (
              <p className="text-rose-300">Choose your destiny above...</p>
            )}
          </AnimatePresence>
        </div>

        <button onClick={onBack} className="text-rose-400 font-bold hover:underline">← Go Back</button>
      </div>
    </div>
  );
};

export default AIOracle;
