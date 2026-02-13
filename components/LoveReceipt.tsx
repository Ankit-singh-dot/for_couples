
import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
}

const LoveReceipt: React.FC<Props> = ({ onBack }) => {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const orderNum = Math.floor(Math.random() * 1000000);

  return (
    <div className="bg-white p-6 shadow-2xl rounded-sm font-mono text-sm text-slate-800 border-t-8 border-rose-500 w-full">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold uppercase tracking-widest mb-1">CUPID CENTRAL</h2>
        <p className="text-[10px] text-slate-400">123 ROMANCE BLVD, LOVE CITY, 90210</p>
        <p className="text-[10px] text-slate-400">TEL: 1-800-HEARTS</p>
      </div>

      <div className="border-y border-dashed border-slate-300 py-2 mb-4">
        <div className="flex justify-between">
          <span>DATE:</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between">
          <span>ORDER:</span>
          <span>#{orderNum}</span>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span>1x VALENTINE "YES"</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>999x FOREHEAD KISSES</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between">
          <span>1x INFINITE DEVOTION</span>
          <span>$0.00</span>
        </div>
        <div className="flex justify-between italic text-slate-400 ml-4">
          <span>- LIFETIME WARRANTY</span>
        </div>
        <div className="flex justify-between">
          <span>∞x SHARED LAUGHTER</span>
          <span>$0.00</span>
        </div>
      </div>

      <div className="border-t-2 border-slate-800 pt-2 mb-8">
        <div className="flex justify-between text-lg font-bold">
          <span>TOTAL:</span>
          <span>ONE BIG ❤️</span>
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-xs uppercase">Thank you for your love!</p>
        <div className="flex justify-center opacity-30">
          <svg width="100" height="40" viewBox="0 0 100 40">
            <rect width="2" height="40" x="0" />
            <rect width="4" height="40" x="5" />
            <rect width="2" height="40" x="12" />
            <rect width="1" height="40" x="18" />
            <rect width="3" height="40" x="22" />
            <rect width="2" height="40" x="28" />
            <rect width="5" height="40" x="35" />
            <rect width="1" height="40" x="42" />
            <rect width="4" height="40" x="46" />
            <rect width="2" height="40" x="54" />
            <rect width="3" height="40" x="60" />
            <rect width="1" height="40" x="66" />
            <rect width="6" height="40" x="72" />
            <rect width="2" height="40" x="82" />
            <rect width="4" height="40" x="88" />
            <rect width="1" height="40" x="96" />
          </svg>
        </div>
        
        <button 
          onClick={onBack}
          className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors"
        >
          BACK TO CELEBRATION
        </button>
      </div>
    </div>
  );
};

export default LoveReceipt;
