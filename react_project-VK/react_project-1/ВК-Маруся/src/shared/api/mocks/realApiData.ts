// Реальные данные из API для использования в качестве мок-данных
import moviesData from './movies.json';

// Используем централизованные данные фильмов
export const REAL_API_MOVIES = moviesData;

// Извлекаем уникальные жанры из реальных данных
export const REAL_API_GENRES = Array.from(
  new Set(REAL_API_MOVIES.flatMap((movie) => movie.genres)),
).sort();

// Экспортируем для совместимости с существующим кодом
export const MOCK_MOVIES = REAL_API_MOVIES;
export const MOCK_GENRES = REAL_API_GENRES;
