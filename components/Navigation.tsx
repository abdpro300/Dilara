import React from 'react';

interface NavigationProps {
  currentSection: number;
  totalSections: number;
  onNavigate: (index: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, totalSections, onNavigate }) => {
  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalSections }).map((_, index) => (
        <button
          key={index}
          onClick={() => onNavigate(index)}
          className={`w-3 h-3 rounded-full transition-all duration-500 border border-white/50 ${
            currentSection === index 
              ? 'bg-cyan-400 scale-150 shadow-[0_0_10px_rgba(34,211,238,0.8)]' 
              : 'bg-white/20 hover:bg-white/50'
          }`}
          aria-label={`Go to section ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Navigation;