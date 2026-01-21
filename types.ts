export interface SlideData {
  id: number;
  type: 'hero' | 'standard' | 'city' | 'conclusion';
  title: string;
  subtitle?: string;
  bullets: string[];
  image: string;
  color: string; // Tailwind color class prefix (e.g., 'cyan', 'purple')
  coordinates?: [number, number]; // Optional: Only for slides that need a map
}

// Deprecated interfaces kept to avoid immediate breakage if referenced elsewhere, 
// though they won't be used in the new flow.
export interface City {
  name: string;
  rank: number;
  description: string;
  image: string;
}

export interface CountryData {
  id: string;
  name: string;
  flag: string;
  description: string;
  opinion: string;
  image: string;
  color: string;
  highlights: string[];
  badge: string;
  coordinates: [number, number];
}

export interface TravelPhilosophy {
  title: string;
  points: string[];
}