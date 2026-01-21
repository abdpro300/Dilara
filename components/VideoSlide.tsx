import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlideData } from '../types';
import { Play } from 'lucide-react';

interface Props {
  data: SlideData;
  isStatic?: boolean;
}

const VideoSlide: React.FC<Props> = ({ data, isStatic = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when slide comes into view (if not static)
    if (!isStatic && videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, [isStatic]);

  if (isStatic) {
    // Render a static image representation for PDF export
    return (
      <div className="h-full w-full relative bg-black flex items-center justify-center overflow-hidden">
        <img 
          src={data.image} 
          alt={data.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute z-10 flex flex-col items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-2 border-white/50 mb-4">
                <Play className="fill-white text-white ml-2" size={48} />
            </div>
            <h2 className="text-4xl font-bold text-white shadow-black drop-shadow-lg">{data.title}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative bg-black flex items-center justify-center overflow-hidden group">
        {/* Title Overlay - Fades out on hover or after a delay if preferred, kept simple here */}
        <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-8 left-0 right-0 z-20 text-center pointer-events-none"
        >
            <h2 className="text-3xl md:text-5xl font-black text-white/80 drop-shadow-md">{data.title}</h2>
        </motion.div>

        <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={data.videoUrl}
            poster={data.image}
            controls
            autoPlay
            muted
            loop
            playsInline
        >
            Your browser does not support the video tag.
        </video>
        
        {/* Decorative border frame */}
        <div className="absolute inset-0 border-[20px] border-slate-950/20 pointer-events-none z-10"></div>
    </div>
  );
};

export default VideoSlide;
