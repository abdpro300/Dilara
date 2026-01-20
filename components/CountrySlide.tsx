import React from 'react';
import { motion } from 'framer-motion';
import { CountryData } from '../types';
import { Star, MapPin, Quote, CheckCircle2, Heart } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

interface Props {
  data: CountryData;
}

const CountrySlide: React.FC<Props> = ({ data }) => {
  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col md:flex-row">
      
      {/* Visual Side (Image) */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden group">
        <motion.div
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 10, ease: "linear" }}
            className="w-full h-full"
        >
           <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700"
          />
        </motion.div>
        
        {/* Overlay Gradients */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${data.color}-900/40 to-slate-950/20 mix-blend-overlay`}></div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>

        {/* Floating Badge on Image */}
        <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className={`absolute top-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full font-bold shadow-2xl flex items-center gap-2`}
        >
            <Heart className={`text-${data.color}-400 fill-${data.color}-400`} size={20} />
            {data.badge}
        </motion.div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full bg-slate-950 p-6 md:p-12 flex flex-col justify-center relative z-10 overflow-y-auto no-scrollbar">
        
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
          className="relative max-w-xl mx-auto md:mx-0"
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-2">
             <span className="text-5xl md:text-6xl filter drop-shadow-lg">{data.flag}</span>
             <h2 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white via-white to-${data.color}-400`}>
                {data.name}
             </h2>
          </div>
          
          <div className={`h-1.5 w-24 bg-gradient-to-r from-${data.color}-500 to-transparent rounded-full mb-6`}></div>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 mb-6 leading-relaxed font-light opacity-90">
            {data.description}
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Opinion Box */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm border-r-4 border-l-0 border-white/10 p-5 rounded-2xl relative hover:bg-white/10 transition-colors duration-300"
            >
               <Quote className={`absolute -top-3 -right-3 text-${data.color}-500/40 fill-current`} size={32} />
               <div className="relative z-10">
                  <h3 className={`text-${data.color}-400 font-bold text-lg mb-2 flex items-center gap-2`}>
                    <Star size={18} fill="currentColor" />
                    رأيي الشخصي
                  </h3>
                  <p className="text-base text-slate-200 italic leading-loose">
                    "{data.opinion}"
                  </p>
               </div>
            </motion.div>

            {/* Map Component */}
            <motion.div
               initial={{ y: 20, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               transition={{ delay: 0.3 }}
            >
               <InteractiveMap coordinates={data.coordinates} color={data.color} />
            </motion.div>
          </div>

          {/* Highlights Grid */}
          <div className="mb-6">
            <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full bg-${data.color}-500`}></span>
                أكثر ما أحببت
            </h4>
            <div className="grid grid-cols-2 gap-3">
                {data.highlights.map((highlight, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                        className="flex items-center gap-2 text-slate-300 text-sm md:text-base group"
                    >
                        <CheckCircle2 size={16} className={`text-${data.color}-500 group-hover:scale-125 transition-transform`} />
                        <span className="group-hover:text-white transition-colors">{highlight}</span>
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Footer Status */}
          <div className="flex gap-4">
             <div className={`px-4 py-1.5 rounded-full bg-${data.color}-500/10 text-${data.color}-400 border border-${data.color}-500/20 text-xs md:text-sm flex items-center gap-2`}>
                <MapPin size={14} />
                <span>تمت الزيارة</span>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountrySlide;