import { SlideData } from './types';

// =====================================================================
// تعليمات تغيير الصور:
// قم باستبدال الروابط أدناه بروابط الصور الخاصة بك.
// =====================================================================

export const SLIDES: SlideData[] = [
  {
    id: 1,
    type: 'hero',
    title: "رحلتي وتجربتي",
    subtitle: "ديلارا",
    bullets: [],
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop",
    color: "cyan"
  },
  {
    id: 2,
    type: 'standard',
    title: "من أنا",
    bullets: [
      "اسمي ديلارا",
      "عمري 26 سنة",
      "أنا من تركيا"
    ],
    image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop", // Placeholder for Dilara/Generic
    color: "rose"
  },
  {
    id: 3,
    type: 'standard',
    title: "أين أعيش الآن",
    bullets: [
      "حالياً أعيش في الرياض، السعودية",
      "أدرس وأتعلم اللغة العربية",
      "أتعرف على الثقافة السعودية والحياة هنا"
    ],
    image: "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1920&auto=format&fit=crop", // Riyadh
    color: "emerald",
    coordinates: [24.7136, 46.6753] // Riyadh Coordinates
  },
  {
    id: 4,
    type: 'standard',
    title: "عني (شخصياً)",
    bullets: [
      "أحب السفر",
      "أحب اكتشاف أماكن جديدة",
      "أستمتع بالتعرف على أشخاص من ثقافات مختلفة"
    ],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1000&auto=format&fit=crop", // Travel/Social
    color: "amber"
  },
  {
    id: 5,
    type: 'standard',
    title: "أسفاري",
    bullets: [
      "سافرت إلى مدن في تركيا",
      "سافرت إلى الأردن",
      "سافرت إلى قطر",
      "عشت في قبرص لفترة من الزمن"
    ],
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop", // Map/Travel
    color: "fuchsia"
  },
  {
    id: 6,
    type: 'standard',
    title: "ما تعلمته من العيش في الخارج",
    bullets: [
      "تعلمت عن ثقافات مختلفة",
      "تعلمت معنى التعايش",
      "أصبحت أكثر انفتاحاً"
    ],
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1000&auto=format&fit=crop", // Friendship/Culture
    color: "purple"
  },
  {
    id: 7,
    type: 'standard',
    title: "مدني المفضلة (نظرة عامة)",
    subtitle: "مدني المفضلة هي:",
    bullets: [
      "أنطاليا (تركيا)",
      "كابادوكيا (تركيا)",
      "كيرينيا (قبرص)"
    ],
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1000&auto=format&fit=crop", // Collage/Choice
    color: "cyan"
  },
  {
    id: 8,
    type: 'city',
    title: "أنطاليا",
    bullets: [
      "شواطئ جميلة",
      "بحر أزرق",
      "مدينة نشيطة وحيوية"
    ],
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1920&auto=format&fit=crop", // Antalya
    color: "blue",
    coordinates: [36.8841, 30.7056]
  },
  {
    id: 9,
    type: 'city',
    title: "كابادوكيا",
    bullets: [
      "تكوينات صخرية فريدة",
      "مناطيد الهواء الساخن",
      "تشعر وكأنك في عالم آخر"
    ],
    image: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=1920&auto=format&fit=crop", // Cappadocia
    color: "orange",
    coordinates: [38.6431, 34.8289]
  },
  {
    id: 10,
    type: 'city',
    title: "كيرينيا",
    bullets: [
      "إطلالات بحرية هادئة",
      "شوارع تاريخية",
      "ذكريات جميلة بالنسبة لي"
    ],
    image: "https://images.unsplash.com/photo-1533552097241-e9455325c8d6?q=80&w=1920&auto=format&fit=crop", // Kyrenia
    color: "teal",
    coordinates: [35.3364, 33.3184]
  },
  {
    id: 11,
    type: 'standard',
    title: "حلمي في المستقبل",
    bullets: [
      "أريد السفر إلى سويسرا",
      "أريد رؤية الشفق القطبي"
    ],
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1920&auto=format&fit=crop", // Switzerland/Aurora
    color: "indigo"
  },
  {
    id: 12,
    type: 'standard',
    title: "لماذا هذا مهم لي",
    bullets: [
      "ستكون تجربة سحرية",
      "ستكون تجربة لا تُنسى"
    ],
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1000&auto=format&fit=crop", // Magical/Experience
    color: "pink"
  },
  {
    id: 13,
    type: 'conclusion',
    title: "الخاتمة",
    bullets: [
      "السفر يساعدنا على النمو",
      "التجارب الجديدة تجعلنا أكثر انفتاحاً",
      "شكراً لحسن الاستماع"
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1920&auto=format&fit=crop", // Sunset/Plane
    color: "violet"
  }
];

// Re-export constants for backward compatibility if needed, but app uses SLIDES now.
export const HERO_TITLE = SLIDES[0].title;
export const HERO_SUBTITLE = SLIDES[0].subtitle;
export const COUNTRIES = [];
export const TOP_CITIES = [];
export const TRAVEL_PHILOSOPHY = { title: "", points: [] };