import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

interface InteractiveMapProps {
  coordinates: [number, number];
  color: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ coordinates, color }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Map color names to hex for Leaflet/Style usage
  const getColorHex = (c: string) => {
    const colors: Record<string, string> = {
      rose: '#f43f5e',
      amber: '#f59e0b',
      red: '#ef4444',
      emerald: '#10b981',
      fuchsia: '#d946ef',
      cyan: '#06b6d4',
    };
    return colors[c] || '#ffffff';
  };

  const hexColor = getColorHex(color);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      // Initialize map
      const map = L.map(mapRef.current, {
        center: coordinates,
        zoom: 4,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      });

      // Dark theme tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      // Custom futuristic marker icon
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="background-color: ${hexColor}" class="w-4 h-4 rounded-full animate-ping absolute opacity-75"></div>
          <div style="background-color: ${hexColor}" class="w-4 h-4 rounded-full relative border-2 border-white shadow-[0_0_10px_${hexColor}]"></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker(coordinates, { icon }).addTo(map);
      markerRef.current = marker;

      // Prepare a circle for the "highlight border" effect (visual approximation)
      const circle = L.circle(coordinates, {
        color: hexColor,
        fillColor: hexColor,
        fillOpacity: 0.1,
        radius: 200000, // Starts large or hidden
        weight: 1,
        opacity: 0
      }).addTo(map);
      circleRef.current = circle;

      mapInstance.current = map;
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []); // Run once on mount

  // Update effect for coordinates change or zoom toggle
  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;

    if (isZoomed) {
      // Zoom in
      map.flyTo(coordinates, 7, { duration: 1.5 });
      map.dragging.enable();
      
      // Show "Border" circle
      if (circleRef.current) {
        circleRef.current.setStyle({ opacity: 0.8, fillOpacity: 0.2 });
        circleRef.current.setRadius(150000); // Adjust radius based on country size roughly
      }
    } else {
      // Zoom out
      map.flyTo(coordinates, 4, { duration: 1.5 });
      map.dragging.disable();
      
      if (circleRef.current) {
        circleRef.current.setStyle({ opacity: 0, fillOpacity: 0 });
      }
    }
  }, [isZoomed, coordinates]);

  return (
    <div className={`relative w-full h-48 rounded-xl overflow-hidden border border-${color}-500/30 shadow-lg group transition-all duration-500`}>
       <div ref={mapRef} className="w-full h-full z-0 bg-slate-900" />
       
       {/* Interaction Overlay */}
       <div 
         onClick={() => setIsZoomed(!isZoomed)}
         className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
       >
          {!isZoomed && (
             <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-sm font-bold text-white">استكشف الموقع</span>
             </div>
          )}
       </div>
       
       {isZoomed && (
         <button 
           onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
           className="absolute top-2 right-2 z-20 bg-slate-900/80 text-white p-2 rounded-full text-xs hover:bg-slate-800 transition-colors border border-white/10"
         >
            تصغير
         </button>
       )}
    </div>
  );
};
export default InteractiveMap;