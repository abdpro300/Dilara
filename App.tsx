import React, { useRef, useState, useEffect } from 'react';
import { SLIDES } from './constants';
import AnimatedBackground from './components/AnimatedBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import InfoSlide from './components/InfoSlide';
import PhotoGallerySlide from './components/PhotoGallerySlide';
import VideoSlide from './components/VideoSlide';
import { motion, useScroll, useSpring } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

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
    setExportProgress(0);

    // 1. Allow React to render the hidden container
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1920, 1080] // Match slide resolution
      });

      const container = pdfContainerRef.current;

      // 2. Wait for Fonts to be ready
      await document.fonts.ready;

      // 3. Wait for all Images inside the hidden container to load
      const images = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];
      const imagePromises = images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = () => resolve(null);
          img.onerror = () => resolve(null); // Don't block if one fails
        });
      });
      await Promise.all(imagePromises);

      // 4. Extra stabilization time for layout/rendering
      await new Promise(resolve => setTimeout(resolve, 2000));

      const slides = container.children;
      const totalSlides = slides.length;
      
      for (let i = 0; i < totalSlides; i++) {
        setExportProgress(Math.round(((i + 1) / totalSlides) * 100));
        const slideElement = slides[i] as HTMLElement;
        
        // Capture the slide
        const canvas = await html2canvas(slideElement, {
            scale: 1.5, // Higher scale for better text clarity
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#0f172a', // Slate-950
            logging: false,
            // Ensure we capture the full size
            width: 1920,
            height: 1080,
            windowWidth: 1920,
            windowHeight: 1080
        });

        // Add to PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Slightly compressed for file size

        if (i > 0) {
            pdf.addPage([1920, 1080], 'landscape');
        }
        
        pdf.addImage(imgData, 'JPEG', 0, 0, 1920, 1080);

        // Add Page Number (Skipping the Title Page at index 0)
        if (i > 0) {
           pdf.setFontSize(24);
           pdf.setTextColor(255, 255, 255);
           // Add a small shadow/stroke effect for readability
           pdf.text(`${i + 1} / ${totalSlides}`, 1820, 1040, { align: 'right' });
        }
      }

      pdf.save('Dilara_Journey_Presentation.pdf');
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Failed to generate PDF. Check console for details.");
    } finally {
        setIsExporting(false);
        setExportProgress(0);
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

  const renderSlide = (slide: typeof SLIDES[0], isStatic = false) => {
    if (slide.type === 'hero') {
      return <HeroSection data={slide} isStatic={isStatic} scrollContainerRef={isStatic ? undefined : containerRef} />;
    }
    if (slide.type === 'gallery') {
      return <PhotoGallerySlide data={slide} isStatic={isStatic} />;
    }
    if (slide.type === 'video') {
      return <VideoSlide data={slide} isStatic={isStatic} />;
    }
    return <InfoSlide data={slide} isStatic={isStatic} />;
  };

  return (
    <div className="relative w-full h-screen text-white font-sans overflow-hidden bg-slate-950">
      <AnimatedBackground />
      
      {/* Loading Overlay for PDF */}
      {isExporting && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center">
            <div className="relative">
                <Loader2 size={80} className="text-cyan-400 animate-spin mb-6" />
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
                    {exportProgress}%
                </span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 font-cairo">جاري تجهيز العرض...</h2>
            <p className="text-slate-400 font-cairo">يرجى الانتظار، يتم تصدير {totalSections} شريحة بجودة عالية</p>
        </div>
      )}

      {/* Hidden Container for PDF Rendering */}
      <div 
        ref={pdfContainerRef}
        className="fixed top-0 left-0 z-[-10]"
        style={{ 
            width: '1920px', 
            height: '1080px',
            transform: isExporting ? 'translateX(0)' : 'translateX(-200vw)',
            opacity: isExporting ? 1 : 0, 
            pointerEvents: 'none',
            position: 'fixed'
        }}
      >
        {isExporting && SLIDES.map((slide) => (
            <div 
                key={`pdf-${slide.id}`} 
                style={{ 
                    width: '1920px', 
                    height: '1080px', 
                    position: 'relative', 
                    overflow: 'hidden', 
                    background: '#0f172a',
                    direction: 'rtl' 
                }}
            >
                 {renderSlide(slide, true)}
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
             {renderSlide(slide, false)}
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