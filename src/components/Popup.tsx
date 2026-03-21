import { motion } from 'motion/react';
import { X, Sparkles, Heart } from 'lucide-react';

interface PopupProps {
  type: 'frame' | 'plushie';
  id: string;
  onClose: () => void;
}

export default function Popup({ type, id, onClose }: PopupProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_20px_60px_rgba(244,114,182,0.5)] border-4 border-pink-100 overflow-hidden"
        initial={{ scale: 0.8, y: 50, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.8, y: 50, opacity: 0, rotateX: -20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        style={{ transformPerspective: 1000 }}
      >
        {/* Decorative Header */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-pink-100 to-transparent pointer-events-none" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-pink-400 hover:bg-pink-50 hover:text-pink-600 transition-colors shadow-sm"
        >
          <X size={24} />
        </button>

        <div className="p-8 pt-12 relative z-10 flex flex-col items-center text-center">
          {/* Icon Header */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6"
          >
            {type === 'frame' ? (
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center shadow-inner border-4 border-white">
                <Heart className="w-10 h-10 text-purple-400" fill="currentColor" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center shadow-inner border-4 border-white">
                <Sparkles className="w-10 h-10 text-yellow-400" fill="currentColor" />
              </div>
            )}
          </motion.div>

          <h2 className="text-3xl font-serif italic text-slate-700 mb-4">
            {type === 'frame' ? 'A Special Memory' : 'Magical Poster'}
          </h2>

          {/* Content Placeholder */}
          <div className="w-full aspect-[4/3] bg-slate-50 rounded-2xl border-2 border-dashed border-pink-200 flex flex-col items-center justify-center p-6 text-slate-400 mb-6">
            <p className="font-medium mb-2">Image Placeholder</p>
            <p className="text-sm opacity-70">Replace this area with your image or content later.</p>
          </div>

          <div className="w-full bg-pink-50/50 rounded-xl p-4 border border-pink-100 text-slate-600 italic">
            <p>"A cute message goes here..."</p>
          </div>
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles size={10 + Math.random() * 10} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
