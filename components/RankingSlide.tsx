import React from 'react';
import { motion } from 'framer-motion';
import { TOP_CITIES } from '../constants';
import { Trophy, Heart, ArrowUp } from 'lucide-react';

const RankingSlide: React.FC = () => {
  // Sort cities by rank (1 to 4)
  const sortedCities = [...TOP_CITIES].sort((a, b) => a.rank - b.rank);

  return (
    <div className="h-full w-full bg-slate-950 relative overflow-hidden flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-slate-950 to-slate-950"></div>
      
      <motion.div 
        className="z-10 text-center mb-8 md:mb-12"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          <span className="text-yellow-400 inline-block mr-2"><Trophy size={48} /></span>
          المدن المفضلة
        </h2>
        <p className="text-slate-400 text-xl">ترتيب القائمة الذهبية لرحلاتي</p>
      </motion.div>

      {/* Grid Layout for 4 items */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 z-10 items-end">
        {sortedCities.map((city) => {
            const isWinner = city.rank === 1;
            
            // Dynamic styling based on rank
            let heightClass = 'h-[350px]';
            let color = 'slate';
            
            if (city.rank === 1) {
                heightClass = 'h-[500px]';
                color = 'yellow';
            } else if (city.rank === 2) {
                heightClass = 'h-[440px]';
                color = 'cyan';
            } else if (city.rank === 3) {
                heightClass = 'h-[400px]';
                color = 'rose';
            } else {
                heightClass = 'h-[360px]';
                color = 'amber';
            }

            return (
                <CityCard 
                    key={city.rank} 
                    city={city} 
                    color={color} 
                    delay={0.2 * city.rank} 
                    heightClass={heightClass} 
                    isWinner={isWinner} 
                />
            );
        })}
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
      className={`relative rounded-2xl overflow-hidden group ${heightClass} ${isWinner ? 'md:-mt-12 shadow-[0_0_50px_rgba(234,179,8,0.3)] ring-2 ring-yellow-500/50' : 'hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}
    >
      <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
      
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${color}-500 text-white font-bold text-xl mb-4 shadow-lg`}>
          #{city.rank}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center gap-2">
          {city.name}
          {isWinner && <Heart className="fill-red-500 text-red-500 animate-pulse" />}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
          {city.description}
        </p>
      </div>
    </motion.div>
  )
}

export default RankingSlide;