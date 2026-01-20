import React from 'react';

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, totalSections, onNavigate }) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className={`relative transition-all duration-500 flex items-center justify-center ${
            currentSection === index 
              ? 'w-4 h-4' 
              : 'w-2 h-2 hover:w-3 hover:h-3'
          }`}
          aria-label={`Go to section ${index + 1}`}
        >
          {/* Outer Glow for Active */}
          <span className={`absolute inset-0 rounded-full transition-all duration-500 ${
             currentSection === index ? 'bg-cyan-400/50 blur-sm scale-150' : 'bg-transparent'
          }`}></span>
          
          {/* Inner Dot */}
          <span className={`w-full h-full rounded-full transition-all duration-500 border ${
            currentSection === index 
              ? 'bg-cyan-400 border-cyan-300' 
              : 'bg-white/20 border-white/10 hover:bg-white/50'
          }`}></span>
        </button>
      ))}
    </div>
  );
};

export default Navigation;