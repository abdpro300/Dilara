import React from 'react';
import { motion } from 'framer-motion';
import { HERO_TITLE, HERO_SUBTITLE, TRAVEL_PHILOSOPHY } from '../constants';
import { Plane, Globe, Map } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative p-8">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/1920/1080?grayscale&blur=2" 
          alt="Background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
      </div>

      <div className="z-10 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
           <h1 className="text-6xl md:text-8xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-purple-400 drop-shadow-lg leading-tight py-2">
            {HERO_TITLE}
          </h1>
          <p className="text-2xl md:text-3xl text-slate-300 font-light tracking-wide mb-12">
            {HERO_SUBTITLE}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4 text-cyan-400">
              <Globe size={28} />
              <h3 className="text-xl font-bold">{TRAVEL_PHILOSOPHY.title}</h3>
            </div>
            <ul className="space-y-3">
              {TRAVEL_PHILOSOPHY.points.map((point, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 + (idx * 0.1) }}
                  className="flex items-start gap-2 text-slate-300"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0"></span>
                  {point}
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col justify-center items-center gap-6">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;