import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SlideData } from '../types';
import InteractiveMap from './InteractiveMap';
import { CheckCircle2, Sparkles, Star, Heart, Compass, BookOpen, Crown } from 'lucide-react';

interface Props {
  data: SlideData;
  isStatic?: boolean;
}

interface SlideVariants {
  container: Variants;
  item: Variants;
  image: Variants;
  wrapperClass: string;
}

const InfoSlide: React.FC<Props> = ({ data, isStatic = false }) => {
  const isConclusion = data.type === 'conclusion';
  const isCity = data.type === 'city';

  // --- Unique Animation Logic per Slide ID ---
  const getUniqueVariants = (id: number): SlideVariants => {
    switch (id) {
      case 2: // Who Am I: "The Bloom"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3 } } },
          item: { hidden: { opacity: 0, scale: 0.5, rotate: -10 }, show: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", bounce: 0.6 } } },
          // Changed to simpler opacity/scale to avoid stuck hidden state
          image: { hidden: { opacity: 0, scale: 1.1 }, show: { opacity: 1, scale: 1, transition: { duration: 1.2 } } },
          wrapperClass: "origin-center"
        };
      case 3: // Riyadh: "The Mirage"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } },
          item: { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } },
          // Changed from y: "100%" to safer clip-path/opacity reveal to ensure layout presence
          image: { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 1 } } },
          wrapperClass: ""
        };
      case 4: // Personal: "The Snap"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } },
          item: { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } } },
          image: { hidden: { x: "50%", opacity: 0 }, show: { x: "0%", opacity: 1, transition: { duration: 1, ease: "easeInOut" } } },
          wrapperClass: ""
        };
      case 5: // Travels: "The Compass"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } },
          item: { 
            hidden: (i: number) => ({ opacity: 0, x: i % 2 === 0 ? 50 : -50 }), 
            show: { opacity: 1, x: 0, transition: { type: "spring", damping: 12 } } 
          },
          image: { hidden: { scale: 0.8, rotate: 10, opacity: 0 }, show: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 1.2 } } },
          wrapperClass: ""
        };
      case 6: // Learned: "The Book"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.25 } } },
          item: { hidden: { opacity: 0, rotateX: -90 }, show: { opacity: 1, rotateX: 0, transition: { duration: 0.8, ease: "backOut" } } },
          image: { hidden: { opacity: 0, filter: "grayscale(100%)" }, show: { opacity: 1, filter: "grayscale(0%)", transition: { duration: 2 } } },
          wrapperClass: "perspective-1000"
        };
      case 7: // Fav Cities: "The Gallery"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } },
          item: { hidden: { opacity: 0, filter: "blur(10px)" }, show: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.8 } } },
          image: { hidden: { opacity: 0, scale: 1.1 }, show: { opacity: 1, scale: 1, transition: { duration: 1.2 } } },
          wrapperClass: ""
        };
      case 8: // Antalya: "The Wave"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3 } } },
          item: { hidden: { opacity: 0, x: -30, y: 20 }, show: { opacity: 1, x: 0, y: 0, transition: { type: "spring", mass: 1.2 } } },
          image: { hidden: { clipPath: "circle(0% at 0% 100%)" }, show: { clipPath: "circle(150% at 0% 100%)", transition: { duration: 1.8, ease: "easeInOut" } } },
          wrapperClass: ""
        };
      case 9: // Cappadocia: "The Balloon"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.5 } } },
          item: { hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } } },
          image: { hidden: { opacity: 0, y: 50, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.5 } } },
          wrapperClass: ""
        };
      case 10: // Kyrenia: "The Ancient"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3 } } },
          item: { hidden: { opacity: 0, width: "0%" }, show: { opacity: 1, width: "100%", transition: { duration: 1, ease: "circOut" } } },
          image: { hidden: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.5, ease: "easeInOut" } } },
          wrapperClass: ""
        };
      case 11: // Future: "The Dream"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.4 } } },
          item: { hidden: { opacity: 0, textShadow: "0 0 0px rgba(255,255,255,0)" }, show: { opacity: 1, textShadow: "0 0 10px rgba(255,255,255,0.5)", transition: { duration: 1.5 } } },
          image: { hidden: { opacity: 0, scale: 1.2, filter: "hue-rotate(90deg)" }, show: { opacity: 1, scale: 1, filter: "hue-rotate(0deg)", transition: { duration: 2 } } },
          wrapperClass: ""
        };
      case 12: // Why Important: "The Heartbeat"
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.3 } } },
          item: { hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 10 } } },
          image: { hidden: { opacity: 0, maskImage: "radial-gradient(circle at center, transparent 0%, black 100%)" }, show: { opacity: 1, maskImage: "radial-gradient(circle at center, black 100%, black 100%)", transition: { duration: 1.5 } } },
          wrapperClass: ""
        };
      default: // Conclusion
        return {
          container: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } },
          item: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
          image: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1 } } },
          wrapperClass: ""
        };
    }
  };

  const variants = getUniqueVariants(data.id);

  // Helper icons based on slide type/id to add extra cuteness
  const getIcon = () => {
    if (data.id === 5) return <Compass size={40} className={`text-${data.color}-400`} />;
    if (data.id === 6) return <BookOpen size={40} className={`text-${data.color}-400`} />;
    if (data.id === 13) return <Crown size={40} className={`text-${data.color}-400`} />;
    if (isCity) return <Sparkles className={`text-${data.color}-400`} size={40} />;
    return <Star className={`text-${data.color}-400`} size={40} />;
  };

  return (
    <div className="h-full w-full relative overflow-hidden flex flex-col md:flex-row bg-slate-950">
      
      {/* Visual Side (Image) */}
      <motion.div 
        className={`w-full md:w-1/2 min-h-[35vh] md:h-full relative overflow-hidden group z-0 ${isConclusion ? 'md:order-2' : ''}`}
        variants={variants.image}
        initial={isStatic ? "show" : "hidden"}
        whileInView={isStatic ? undefined : "show"}
        animate={isStatic ? "show" : undefined}
        // Updated viewport settings: triggers earlier (0.1) and only once to prevent re-hiding issues
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="w-full h-full relative">
           <img 
            src={data.image} 
            alt={data.title} 
            className="w-full h-full object-cover filter contrast-110 saturate-110"
            loading="eager" // Force eager loading for these hero images
          />
        </div>
        
        {/* Modern Gradient Overlays */}
        <div className={`absolute inset-0 bg-gradient-to-br from-${data.color}-900/50 via-transparent to-slate-950/60 mix-blend-overlay`}></div>
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950 via-transparent to-transparent"></div>
        
        {/* Floating Cute Badge - Unique per slide type */}
        <motion.div 
          initial={isStatic ? undefined : { y: -20, opacity: 0 }}
          whileInView={isStatic ? undefined : { y: 0, opacity: 1 }}
          animate={isStatic ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.5, type: "spring" }}
          viewport={{ once: true }}
          className="absolute top-6 left-6 z-10"
        >
          <div className="backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-full shadow-lg">
             {isCity ? <Heart className={`fill-${data.color}-400 text-${data.color}-400 animate-pulse`} /> : <Star className="text-yellow-300 fill-yellow-300 animate-spin-slow" />}
          </div>
        </motion.div>
      </motion.div>

      {/* Content Side */}
      <div className="w-full md:w-1/2 h-2/3 md:h-full relative z-10 overflow-y-auto no-scrollbar flex flex-col justify-center">
        
        {/* Dynamic Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <motion.div 
             animate={isStatic ? {} : { scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
             transition={{ duration: 5, repeat: Infinity }}
             className={`absolute -top-20 -right-20 w-80 h-80 bg-${data.color}-500/10 rounded-full blur-[60px]`}
           />
           <div className={`absolute bottom-20 left-10 w-40 h-40 bg-${data.color}-400/10 rounded-full blur-[40px]`}></div>
        </div>

        <motion.div
          variants={variants.container}
          initial={isStatic ? "show" : "hidden"}
          whileInView={isStatic ? undefined : "show"}
          animate={isStatic ? "show" : undefined}
          viewport={{ once: true, amount: 0.2 }}
          className={`relative max-w-2xl mx-auto md:mx-0 w-full p-8 md:p-16 ${variants.wrapperClass || ''}`}
        >
          {/* Header Area */}
          <div className="mb-8 relative">
             <div className="flex items-center gap-4 mb-2">
                <motion.div 
                  whileHover={isStatic ? {} : { rotate: 180 }}
                  transition={{ duration: 0.5 }}
                >
                  {getIcon()}
                </motion.div>
                
                <h2 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-l from-white via-white to-${data.color}-400 leading-[1.6] py-4 drop-shadow-md`}>
                    {data.title}
                </h2>
             </div>
             
             {data.subtitle && (
                <p className="text-2xl md:text-3xl text-slate-300 font-light mt-2 leading-loose">{data.subtitle}</p>
             )}

             <motion.div 
               initial={isStatic ? { width: 100 } : { width: 0 }}
               whileInView={isStatic ? undefined : { width: 100 }}
               animate={isStatic ? { width: 100 } : undefined}
               transition={{ delay: 0.5, duration: 0.8 }}
               className={`h-1.5 bg-gradient-to-r from-${data.color}-500 to-transparent rounded-full mt-6`}
             />
          </div>

          {/* Bullet Points with Unique Animation */}
          <div className="space-y-5 mb-8">
            {data.bullets.map((point, idx) => (
                <motion.div 
                    key={idx}
                    custom={idx} // Pass index for custom variants if needed
                    variants={variants.item}
                    whileHover={isStatic ? {} : { x: -10, scale: 1.02, transition: { duration: 0.2 } }}
                    className="flex items-center gap-5 p-5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-colors group cursor-default shadow-lg"
                >
                    <div className={`p-2 rounded-full bg-${data.color}-500/20 group-hover:bg-${data.color}-500/40 transition-colors shrink-0`}>
                        <CheckCircle2 size={24} className={`text-${data.color}-400`} />
                    </div>
                    {/* Arabic text with relaxed leading */}
                    <span className="text-xl md:text-2xl text-slate-100 font-medium leading-[1.8]">{point}</span>
                </motion.div>
            ))}
          </div>

          {/* Map Section */}
          {data.coordinates && (
            <motion.div
               variants={variants.item}
               className="mt-8 p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent"
            >
               <InteractiveMap coordinates={data.coordinates} color={data.color} />
            </motion.div>
          )}

          {isConclusion && (
            <motion.div variants={variants.item} className="mt-12 text-center md:text-right">
                <span className="inline-block px-10 py-5 border border-white/30 rounded-full text-white/80 text-xl tracking-widest uppercase hover:bg-white/10 transition-colors cursor-pointer font-bold">
                    شكراً للمتابعة ❤️
                </span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default InfoSlide;