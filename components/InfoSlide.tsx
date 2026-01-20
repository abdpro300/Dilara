import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../types';
import InteractiveMap from './InteractiveMap';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  data: SlideData;
}

const InfoSlide: React.FC<Props> = ({ data }) => {
  const isConclusion = data.type === 'conclusion';
  const isCity = data.type === 'city';

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col md:flex-row">
      
      {/* Visual Side (Image) */}
      <div className={`w-full md:w-1/2 h-1/3 md:h-full relative overflow-hidden group ${isConclusion ? 'md:order-2' : ''}`}>
        <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full"
        >
           <img 
            src={data.image} 
            alt={data.title} 
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700"
          />
        </motion.div>
        
        {/* Overlay Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${data.color}-900/40 to-slate-950/20 mix-blend-overlay`}></div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full bg-slate-950 p-6 md:p-12 flex flex-col justify-center relative z-10 overflow-y-auto no-scrollbar">
        
        {/* Abstract Background Element */}
        <motion.div 
            animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute -top-20 -right-20 w-96 h-96 bg-${data.color}-500/5 rounded-full blur-[80px] pointer-events-none`}
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-xl mx-auto md:mx-0 w-full"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
             {isCity && <Sparkles className={`text-${data.color}-400`} size={40} />}
             <h2 className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white via-white to-${data.color}-400 leading-tight`}>
                {data.title}
             </h2>
          </div>
          
          {data.subtitle && (
            <p className="text-xl md:text-2xl text-slate-400 mb-4 font-light">{data.subtitle}</p>
          )}

          <div className={`h-1.5 w-24 bg-gradient-to-r from-${data.color}-500 to-transparent rounded-full mb-8`}></div>

          {/* Bullet Points */}
          <div className="space-y-6 mb-8">
            {data.bullets.map((point, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.1) }}
                    className="flex items-start gap-4 text-slate-200 text-lg md:text-2xl group"
                >
                    <div className={`mt-1.5 min-w-[24px]`}>
                        <CheckCircle2 size={24} className={`text-${data.color}-500 group-hover:scale-125 transition-transform`} />
                    </div>
                    <span className="group-hover:text-white transition-colors leading-relaxed font-light">{point}</span>
                </motion.div>
            ))}
          </div>

          {/* Interactive Map (if coordinates exist) */}
          {data.coordinates && (
            <motion.div
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.6 }}
               className="mt-8"
            >
               <InteractiveMap coordinates={data.coordinates} color={data.color} />
            </motion.div>
          )}

          {isConclusion && (
            <div className="mt-8 text-center md:text-right">
                <span className="inline-block px-6 py-3 border border-white/20 rounded-full text-white/60 text-sm tracking-widest uppercase">
                    النهاية
                </span>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InfoSlide;