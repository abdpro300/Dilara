import React from 'react';
import { motion } from 'framer-motion';
import { TOP_CITIES } from '../constants';
import { Trophy, Heart, ArrowUp } from 'lucide-react';

const RankingSlide: React.FC = () => {
  return (
    <div className="h-full w-full bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950"></div>
      
      <motion.div 
        className="z-10 text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          <span className="text-yellow-400 inline-block mr-2"><Trophy size={48} /></span>
          المدن المفضلة
        </h2>
        <p className="text-slate-400 text-xl">ترتيب القائمة الذهبية لرحلاتي</p>
      </motion.div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 z-10 items-end">
        
        {/* Rank 2: Antalya */}
        <CityCard city={TOP_CITIES[1]} color="cyan" delay={0.4} heightClass="h-[400px]" />

        {/* Rank 1: Istanbul */}
        <CityCard city={TOP_CITIES[0]} color="yellow" delay={0.2} heightClass="h-[480px]" isWinner />

        {/* Rank 3: Girne */}
        <CityCard city={TOP_CITIES[2]} color="rose" delay={0.6} heightClass="h-[350px]" />
        
      </div>
    </div>
  );
};

const CityCard: React.FC<{ city: any; color: string; delay: number; heightClass: string; isWinner?: boolean }> = ({ city, color, delay, heightClass, isWinner }) => {
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={`relative rounded-2xl overflow-hidden group ${heightClass} ${isWinner ? 'md:-mt-12 shadow-[0_0_50px_rgba(234,179,8,0.3)] ring-2 ring-yellow-500/50' : ''}`}
    >
      <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${color}-500 text-white font-bold text-xl mb-4 shadow-lg`}>
          #{city.rank}
        </div>
        <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-2">
          {city.name}
          {isWinner && <Heart className="fill-red-500 text-red-500 animate-pulse" />}
        </h3>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          {city.description}
        </p>
      </div>
    </motion.div>
  )
}

export default RankingSlide;