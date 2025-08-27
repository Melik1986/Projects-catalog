// API константы
export const API_URL = process.env.VITE_API_URL || 'https://cinemaguide.skillbox.cc';
export const USE_MOCK_DATA = process.env.VITE_USE_MOCK_DATA === 'true';

// Константы для пагинации и лимитов
export const API_LIMITS = {
  // Количество фильмов, загружаемых за один запрос
  ITEMS_PER_PAGE: 50, // Исправлено с 10 на 50 (соответствует серверу)
  // Максимальное количество фильмов, которое может вернуть API
  MAX_TOTAL_ITEMS: 200, // Увеличено с 50 до 200
  // Максимальное значение параметра count в одном запросе
  MAX_COUNT_PER_REQUEST: 100,
} as const;
