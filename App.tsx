import React, { useRef, useState, useEffect } from 'react';
import { SLIDES } from './constants';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import InfoSlide from './components/InfoSlide';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  const totalSections = SLIDES.length;

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrolled = containerRef.current.scrollTop;
        const height = window.innerHeight;
        const index = Math.round(scrolled / height);
        setCurrentSection(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full h-screen text-white font-sans overflow-hidden">
      <AnimatedBackground />
      
      <Navigation 
        currentSection={currentSection} 
        totalSections={totalSections} 
        onNavigate={scrollToSection} 
      />

      {/* Main Scroll Container */}
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar"
      >
        {SLIDES.map((slide) => (
          <section key={slide.id} className="h-screen w-full snap-start relative">
             {slide.type === 'hero' ? (
                <HeroSection scrollContainerRef={containerRef} data={slide} />
             ) : (
                <InfoSlide data={slide} />
             )}
          </section>
        ))}

        {/* Footer/Contact Info */}
        <div className="absolute bottom-4 left-0 w-full text-center text-xs text-white/20 pointer-events-none z-50">
          ديلارا | 2025
        </div>
      </div>
    </div>
  );
};

export default App;