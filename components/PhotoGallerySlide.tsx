import React from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../types';

interface Props {
  data: SlideData;
  isStatic?: boolean;
}

const PhotoGallerySlide: React.FC<Props> = ({ data, isStatic = false }) => {
  const images = data.galleryImages || [];

  return (
    <div className="h-full w-full bg-slate-950 relative flex overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-0"></div>
      
      <div className="w-full h-full z-10 grid grid-cols-1 md:grid-cols-3 gap-0 relative">
        {images.map((imgUrl, index) => (
          <motion.div
            key={index}
            // Simplified entrance animation for stability
            initial={isStatic ? false : { opacity: 0, y: 30 }}
            whileInView={isStatic ? undefined : { opacity: 1, y: 0 }}
            animate={isStatic ? { opacity: 1, y: 0 } : undefined}
            transition={{ 
                duration: 0.8, 
                delay: index * 0.15, 
                ease: "easeOut" 
            }}
            // Trigger slightly before fully in view to ensure it renders during fast scroll
            viewport={{ once: true, margin: "-10%" }}
            className="relative w-full h-full group overflow-hidden border-r border-slate-900/50 last:border-r-0"
          >
            {/* Image */}
            <motion.img 
              src={imgUrl} 
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-[2s] ease-in-out group-hover:scale-110"
              initial={isStatic ? false : { scale: 1.1 }}
              whileInView={isStatic ? undefined : { scale: 1 }}
              animate={isStatic ? { scale: 1 } : undefined}
              transition={{ duration: 1.5 }}
              loading="eager"
            />
            
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Decorative Number */}
            <div className="absolute bottom-6 right-6 text-8xl font-black text-white/5 group-hover:text-white/20 transition-colors duration-500 select-none">
              0{index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallerySlide;