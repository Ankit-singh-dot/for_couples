
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  noCount: number;
  onYes: () => void;
  onNoHover: () => void;
  auraColor: string;
}

const NO_MESSAGES = [
  "No 💔",
  "areee yawwrrr maan bhi jaooo 🥺",
  "soorryy madam ji 🙏",
  "aacha usne aapko aisha bola, uske baad kya hua? ☕",
  "kuch toh sharam karo! 😂",
  "itna bhav kyu kha rahi ho? 💅",
  "ek plate momos khilaunga pakka! 🥟",
  "thik hai main rone ja raha hu... 😭",
  "aap toh bohot ziddi nikle 😤",
  "dil todne ke liye itni mehnat? 💔",
  "maan jao na, itna kyu sata rahe ho? 👉👈",
  "pyaar mohabbat sab dhoka hai, click 'Yes' kar lo mauka hai! 😉"
];

// Random sound effects for "No" button from click_audio folder
const CLICK_AUDIOS = [
  "/click_audio/acha-ji-aisa-hai-kya.mp3",
  "/click_audio/aisa-mat-karo.mp3",
  "/click_audio/alakh-sir-motivation.mp3",
  "/click_audio/aree-bas-kar-bhai.mp3",
  "/click_audio/chalti-firti-cocaine.mp3",
  "/click_audio/channa_mereya_slow.mp3",
  "/click_audio/faaa.mp3",
  "/click_audio/family-dekhte-hain-nahi-to.mp3",
  "/click_audio/ladle-meoww-ghop-ghop-ghop.mp3",
  "/click_audio/le-beta.mp3",
  "/click_audio/modi-ji-bhojyam.mp3",
  "/click_audio/oh-my-god-bro-oh-hell-nah-man.mp3",
  "/click_audio/ramayan-gayab (1).mp3",
  "/click_audio/spiderman-meme-song.mp3",
  "/click_audio/studio-audience-awwww-sound-fx.mp3",
  "/click_audio/tmpgj3wv0ae.mp3",
  "/click_audio/yooooooooooooooooooooooooo_4_objp8XX.mp3",
];

const YES_AUDIO = "/aji-mangal.mp3";

const ValentineQuestion: React.FC<Props> = ({ noCount, onYes, onNoHover, auraColor }) => {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [bloomCount, setBloomCount] = useState(0);
  const isBloomed = bloomCount >= 5;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playRandomSound = useCallback(() => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const randomIndex = Math.floor(Math.random() * CLICK_AUDIOS.length);
    audioRef.current = new Audio(CLICK_AUDIOS[randomIndex]);
    audioRef.current.play().catch(e => console.log("Audio play blocked by browser policy"));
  }, []);

  const moveNoButton = useCallback(() => {
    playRandomSound();
    const padding = 120;
    const maxX = window.innerWidth / 2 - padding;
    const maxY = window.innerHeight / 2 - padding;
    const newX = (Math.random() - 0.5) * maxX * 1.5;
    const newY = (Math.random() - 0.5) * maxY * 1.5;
    setNoPosition({ x: newX, y: newY });
    onNoHover();
  }, [onNoHover, playRandomSound]);

  const yesScale = 1 + (noCount * 0.25);
  // No button stays full size for first 5 clicks, then starts shrinking
  const noScale = noCount <= 5 ? 1 : Math.max(0.1, 1 - ((noCount - 5) * 0.15));

  return (
    <div className="flex flex-col items-center gap-8 text-center px-4 relative">
      <AnimatePresence mode="wait">
        {!isBloomed ? (
          <motion.div
            key="pre-bloom"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="text-9xl cursor-pointer select-none filter drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]"
              onClick={() => setBloomCount(prev => prev + 1)}
            >
              ❤️
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-rose-600 uppercase tracking-widest italic">Pump To Enter The Trap</h2>
              <p className="text-rose-400 font-medium">Click 5 times to reveal your fate</p>
              <div className="w-48 h-3 bg-rose-100 rounded-full mx-auto mt-4 overflow-hidden shadow-inner border border-white">
                <motion.div
                  className="h-full bg-rose-500"
                  animate={{ width: `${(bloomCount / 5) * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="bloomed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center gap-8"
          >
            {/* Panic Meter */}
            <div className="fixed top-0 left-0 w-full p-4 z-50 pointer-events-none">
              <div className="max-w-xs mx-auto bg-white/30 backdrop-blur-md rounded-full border border-white/50 p-1 flex items-center gap-3 shadow-lg">
                <div className="ml-3 text-[10px] font-black text-rose-500 uppercase">Panic</div>
                <div className="flex-1 h-3 bg-rose-50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: auraColor }}
                    animate={{
                      width: `${Math.min(noCount * 10, 100)}%`,
                      filter: noCount > 5 ? 'hue-rotate(90deg)' : 'none'
                    }}
                  />
                </div>
                <div className="mr-3 text-lg">{noCount > 5 ? '🤬' : '😇'}</div>
              </div>
            </div>

            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={`https://picsum.photos/seed/${noCount > 3 ? 'creepy-cat' : 'valentine'}/400/300`}
                alt="Cute Valentine"
                className="rounded-[3rem] shadow-2xl border-8 border-white mb-6 w-full max-w-sm mx-auto transform -rotate-1"
              />
              <h1 className="text-4xl md:text-6xl font-black text-rose-600 drop-shadow-sm mb-2 uppercase italic tracking-tighter">
                Will You Be My Valentine?
              </h1>
              <p className="text-rose-400 font-bold italic text-lg opacity-70">
                Warning: This action is irreversible and legally binding.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center items-center gap-6 mt-4 relative min-h-[120px] w-full">
              <motion.button
                onClick={onYes}
                style={{ scale: yesScale, backgroundColor: auraColor }}
                className="px-14 py-6 text-white font-black text-2xl rounded-[2rem] shadow-2xl transition-colors z-20 flex items-center gap-3 uppercase italic"
                whileHover={{ scale: yesScale + 0.1, rotate: -2 }}
                whileTap={{ scale: yesScale - 0.1 }}
              >
                YES! ❤️
              </motion.button>

              {noScale > 0.1 && (
                <motion.button
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  animate={{ x: noPosition.x, y: noPosition.y, scale: noScale }}
                  transition={{ type: 'spring', damping: 12, stiffness: 150 }}
                  className="px-8 py-4 bg-white border-2 border-rose-200 text-rose-300 font-black rounded-full shadow-sm cursor-none"
                >
                  {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
                </motion.button>
              )}
            </div>

            {noCount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-rose-600 font-black bg-white/90 px-6 py-2 rounded-2xl border-2 border-rose-100 shadow-xl"
              >
                Failed Attempts at Freedom: {noCount}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ValentineQuestion;
