import React, { useRef, useState, useEffect } from 'react';
import { SLIDES } from './constants';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import InfoSlide from './components/InfoSlide';
import { motion, useScroll, useSpring } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const handleGeneratePDF = async () => {
    if (isExporting || !pdfContainerRef.current) return;
    setIsExporting(true);

    // Wait a brief moment for the hidden container to render fully with "isStatic" props active
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080] // Match slide resolution
      });

      const slides = pdfContainerRef.current.children;
      
      for (let i = 0; i < slides.length; i++) {
        const slideElement = slides[i] as HTMLElement;
        
        // Capture the slide
        const canvas = await html2canvas(slideElement, {
            scale: 1, // 1:1 scale since we set div to 1920x1080
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#0f172a' // Slate-950
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.9);

        if (i > 0) {
            pdf.addPage([1920, 1080], 'landscape');
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);
      }

      pdf.save('dilara-journey.pdf');
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Failed to generate PDF. Check console.");
    } finally {
        setIsExporting(false);
    }
  };

  // Keyboard Navigation & Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const next = Math.min(currentSection + 1, totalSections - 1);
        scrollToSection(next);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prev = Math.max(currentSection - 1, 0);
        scrollToSection(prev);
      }

      // PDF Export Shortcut: Ctrl + Shift + E
      if (e.ctrlKey && e.shiftKey && (e.key === 'e' || e.key === 'E' || e.key === 'ث')) {
        e.preventDefault();
        handleGeneratePDF();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, totalSections, isExporting]);

  return (
    <div className="relative w-full h-screen text-white font-sans overflow-hidden bg-slate-950">
      <AnimatedBackground />
      
      {/* Loading Overlay for PDF */}
      {isExporting && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center">
            <Loader2 size={64} className="text-cyan-400 animate-spin mb-4" />
            <h2 className="text-2xl font-bold text-white">Generating PDF...</h2>
            <p className="text-slate-400">Rendering {totalSections} slides. Please wait.</p>
        </div>
      )}

      {/* Hidden Container for PDF Rendering */}
      {/* We keep it in DOM but off-screen to ensure accurate capture */}
      <div 
        ref={pdfContainerRef}
        className="fixed top-0 left-[-10000px] z-[-10]"
        style={{ 
            width: '1920px', 
            visibility: isExporting ? 'visible' : 'hidden' 
        }}
      >
        {isExporting && SLIDES.map((slide) => (
            <div key={`pdf-${slide.id}`} style={{ width: '1920px', height: '1080px', position: 'relative', overflow: 'hidden', background: '#0f172a' }}>
                 {slide.type === 'hero' ? (
                    <HeroSection data={slide} isStatic={true} />
                 ) : (
                    <InfoSlide data={slide} isStatic={true} />
                 )}
            </div>
        ))}
      </div>
      
      {/* Futuristic Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 z-50 bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.7)]"
          style={{ scaleX, transformOrigin: "0%" }}
        />
      </div>

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
          <section key={slide.id} className="h-screen w-full snap-start relative perspective-1000">
             {slide.type === 'hero' ? (
                <HeroSection scrollContainerRef={containerRef} data={slide} />
             ) : (
                <InfoSlide data={slide} />
             )}
          </section>
        ))}

        {/* Footer/Contact Info */}
        <div className="fixed bottom-4 left-6 text-xs text-white/30 pointer-events-none z-50 font-mono tracking-widest">
          DILARA_JOURNEY_V2.0
        </div>
      </div>
    </div>
  );
};

export default App;