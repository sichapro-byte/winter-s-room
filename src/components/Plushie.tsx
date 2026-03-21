import { motion } from 'motion/react';
import { Heart, Star, Cloud, Moon } from 'lucide-react';

interface PlushieProps {
  id: string;
  x: number; // percentage
  y: number; // percentage
  size: number; // percentage
  type: 'bunny' | 'bear' | 'star' | 'cat';
  onClick: () => void;
}

export default function Plushie({ id, x, y, size, type, onClick }: PlushieProps) {
  // Select icon based on type for placeholder
  const getIcon = () => {
    switch (type) {
      case 'bunny': return <Cloud className="text-pink-300 w-full h-full" fill="currentColor" />;
      case 'bear': return <Heart className="text-red-300 w-full h-full" fill="currentColor" />;
      case 'star': return <Star className="text-yellow-300 w-full h-full" fill="currentColor" />;
      case 'cat': return <Moon className="text-purple-300 w-full h-full" fill="currentColor" />;
      default: return null;
    }
  };

  return (
    <motion.div
      className="absolute flex items-center justify-center cursor-pointer pointer-events-auto group drop-shadow-xl"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: `${size}%`,
      }}
      whileHover={{ scale: 1.15, rotate: Math.random() > 0.5 ? 5 : -5, y: -10, zIndex: 20 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      {/* Plushie Body (Placeholder shape) */}
      <div className="relative w-full h-full bg-white rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden border-4 border-pink-100">
        <div className="w-1/2 h-1/2 opacity-80">
          {getIcon()}
        </div>
        
        {/* Blush */}
        <div className="absolute top-[60%] left-[20%] w-[15%] h-[10%] bg-pink-300 rounded-full blur-[2px] opacity-70" />
        <div className="absolute top-[60%] right-[20%] w-[15%] h-[10%] bg-pink-300 rounded-full blur-[2px] opacity-70" />
        
        {/* Eyes */}
        <div className="absolute top-[50%] left-[30%] w-[10%] h-[15%] bg-slate-700 rounded-full" />
        <div className="absolute top-[50%] right-[30%] w-[10%] h-[15%] bg-slate-700 rounded-full" />
      </div>

      {/* Hover Sparkles */}
      <motion.div 
        className="absolute inset-[-20%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      >
        <Star className="absolute top-0 left-1/2 text-yellow-300 w-4 h-4" fill="currentColor" />
        <Star className="absolute bottom-0 left-1/4 text-pink-300 w-3 h-3" fill="currentColor" />
        <Star className="absolute top-1/2 right-0 text-purple-300 w-5 h-5" fill="currentColor" />
      </motion.div>
    </motion.div>
  );
}
