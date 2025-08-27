// Константы для жанров согласно API документации
export const ALLOWED_GENRES = [
  'drama',
  'comedy',
  'mystery',
  'family',
  'history',
  'thriller',
  'fantasy',
  'adventure',
] as const;

// Изображения для жанров
export const GENRE_IMAGES: Record<string, string> = {
  drama: '/drama.png',
  comedy: '/komedi.png',
  mystery: '/mystery.png',
  family: '/family.png',
  history: '/history.png',
  thriller: '/thriller.png',
  fantasy: '/fantasy.png',
  adventure: '/adventure.png',
};
