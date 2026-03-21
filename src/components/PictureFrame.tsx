import { motion } from 'motion/react';

interface PictureFrameProps {
  id: string;
  x: number; // percentage
  y: number; // percentage
  width: number; // percentage
  height: number; // percentage
  onClick: () => void;
}

export default function PictureFrame({ id, x, y, width, height, onClick }: PictureFrameProps) {
  return (
    <motion.div
      className="absolute bg-white border-[6px] border-pink-200 rounded-xl shadow-[0_10px_30px_rgba(244,114,182,0.3),inset_0_0_20px_rgba(0,0,0,0.05)] cursor-pointer overflow-hidden group pointer-events-auto"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
      whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {/* Inner Frame Detail */}
      <div className="absolute inset-1 border-2 border-dashed border-pink-100 rounded-lg pointer-events-none" />
      
      {/* Placeholder Content Area */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center animate-pulse">
          <span className="text-pink-400 text-xs font-bold">?</span>
        </div>
      </div>

      {/* Glass Reflection */}
      <div className="absolute top-0 left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-white/40 to-transparent transform -rotate-45 translate-y-[-50%] pointer-events-none" />
    </motion.div>
  );
}
