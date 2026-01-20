export interface City {
  name: string;
  rank: number;
  description: string;
  image: string;
}

export interface CountryData {
  id: string;
  name: string;
  flag: string; // Emoji or image URL
  description: string;
  opinion: string;
  image: string;
  color: string; // Tailwind color class prefix (e.g., 'cyan', 'purple')
  highlights: string[];
  badge: string; // A unique title for the country based on preference
}

export interface TravelPhilosophy {
  title: string;
  points: string[];
}