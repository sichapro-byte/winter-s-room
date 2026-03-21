import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function EntryScreen({ onEnter }: { onEnter: () => void }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute text-pink-300/50"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {p.id % 2 === 0 ? <Heart size={p.size} fill="currentColor" /> : <Sparkles size={p.size} />}
        </motion.div>
      ))}

      {/* Dialog Box */}
      <motion.div
        className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_32px_rgba(255,192,203,0.4)] border border-pink-200/50 max-w-md w-full mx-4 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block mb-4"
        >
          <Sparkles className="w-12 h-12 text-pink-400 mx-auto" />
        </motion.div>
        
        <h1 className="text-2xl font-medium text-slate-700 mb-8 font-serif italic">
          Do you want to enter your magical 3D room?
        </h1>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(244, 114, 182, 0.6)' }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="px-8 py-4 w-full bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full font-bold tracking-wide shadow-lg shadow-pink-200/50 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          ENTER ROOM
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
