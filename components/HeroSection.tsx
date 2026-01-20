import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Plane, Map } from 'lucide-react';
import { SlideData } from '../types';

interface HeroSectionProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  data: SlideData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollContainerRef, data }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    container: scrollContainerRef,
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={sectionRef} className="h-full w-full flex flex-col justify-center items-center relative p-8 overflow-hidden">
      {/* Background Image Overlay with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={data.image} 
          alt="Background" 
          className="w-full h-full object-cover opacity-20 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </motion.div>

      <div className="z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
           <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-400 drop-shadow-lg leading-tight py-2">
            {data.title}
          </h1>
          <p className="text-3xl md:text-5xl text-slate-300 font-light tracking-wide mb-12">
            {data.subtitle}
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col justify-center items-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="relative w-40 h-40 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center"
             >
                <Plane className="text-purple-400" size={40} />
             </motion.div>
             <p className="text-sm text-slate-400 uppercase tracking-widest">
               مرر للأسفل لتبدأ الرحلة
             </p>
             <Map className="animate-bounce text-white/50" />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;