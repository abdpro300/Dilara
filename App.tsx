import React, { useRef, useState, useEffect } from 'react';
import { COUNTRIES } from './constants';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CountrySlide from './components/CountrySlide';
import RankingSlide from './components/RankingSlide';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  // Calculate total sections: Hero + Countries + Ranking
  const totalSections = 1 + COUNTRIES.length + 1;

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
        {/* Section 1: Hero */}
        <section className="h-screen w-full snap-start relative flex items-center justify-center">
          <HeroSection scrollContainerRef={containerRef} />
        </section>

        {/* Sections 2-N: Countries */}
        {COUNTRIES.map((country) => (
          <section key={country.id} className="h-screen w-full snap-start relative">
             <CountrySlide data={country} />
          </section>
        ))}

        {/* Final Section: Ranking */}
        <section className="h-screen w-full snap-start relative">
          <RankingSlide />
        </section>

        {/* Footer/Contact Info (Optional small strip) */}
        <div className="absolute bottom-4 left-0 w-full text-center text-xs text-white/20 pointer-events-none z-50">
          تم التصميم باستخدام تقنيات React & Tailwind
        </div>
      </div>
    </div>
  );
};

export default App;