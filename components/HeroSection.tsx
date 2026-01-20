import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Map, Star, Sparkles } from 'lucide-react';
import { SlideData } from '../types';

interface HeroSectionProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
  data: SlideData;
  isStatic?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollContainerRef, data, isStatic = false }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Conditional hook usage: If static, we provide dummy values or ignore hooks
  const { scrollYProgress } = useScroll({
    container: isStatic ? undefined : scrollContainerRef,
    target: isStatic ? undefined : sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Static styles for PDF export
  const staticStyle = { y: "0%", opacity: 1, scale: 1 };

  return (
    <div ref={sectionRef} className="h-full w-full flex flex-col justify-center items-center relative p-8 overflow-hidden perspective-1000">
      {/* Parallax Background */}
      <motion.div 
        style={isStatic ? staticStyle : { y, opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={data.image} 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950"></div>
      </motion.div>

      {/* Decorative Floating Elements */}
      <motion.div 
        animate={isStatic ? {} : { y: [-20, 20, -20], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 text-cyan-400 opacity-20 z-0"
      >
        <Sparkles size={64} />
      </motion.div>
      <motion.div 
        animate={isStatic ? {} : { y: [20, -20, 20], rotate: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 text-pink-400 opacity-20 z-0"
      >
        <Star size={48} fill="currentColor" />
      </motion.div>

      <div className="z-10 text-center max-w-5xl relative">
        {/* Glow Effect behind Title */}
        <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full opacity-50 animate-pulse"></div>

        <motion.div
          initial={isStatic ? false : { opacity: 0, scale: 0.8, y: 100 }}
          whileInView={isStatic ? undefined : { opacity: 1, scale: 1, y: 0 }}
          animate={isStatic ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="relative"
        >
           {/* Updated Typography for Arabic Support */}
           <h1 className="text-6xl md:text-9xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-pink-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] leading-[1.6] py-8">
            {data.title}
          </h1>
          <motion.div 
            initial={isStatic ? false : { width: 0 }}
            whileInView={isStatic ? undefined : { width: "100%" }}
            animate={isStatic ? { width: "100%" } : undefined}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"
          />
          <p className="text-3xl md:text-5xl text-white font-light tracking-wide mb-12 drop-shadow-lg leading-loose py-4">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col justify-center items-center gap-6"
          initial={isStatic ? false : { opacity: 0 }}
          whileInView={isStatic ? undefined : { opacity: 1 }}
          animate={isStatic ? { opacity: 1 } : undefined}
          transition={{ delay: 1, duration: 1 }}
        >
             <motion.button 
               whileHover={isStatic ? {} : { scale: 1.1, rotate: 180 }}
               whileTap={isStatic ? {} : { scale: 0.9 }}
               transition={{ duration: 0.5 }}
               className="relative w-24 h-24 border-2 border-dashed border-white/30 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-sm cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]"
             >
                <Plane className="text-cyan-300 rotate-45" size={40} />
             </motion.button>
             
             <motion.div
               animate={isStatic ? {} : { y: [0, 10, 0] }}
               transition={{ duration: 1.5, repeat: Infinity }}
             >
               <Map className="text-white/50" />
             </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;