import { ALLOWED_GENRES } from '../constants/genres';

/**
 * Хук для получения списка жанров
 * Возвращает статичный список из 8 жанров согласно ТЗ
 */
export const useGenres = (): { genres: string[]; loading: boolean } => {
  // Преобразуем массив строк в массив объектов с названием и изображением
  const genres: string[] = Array.isArray(ALLOWED_GENRES) ? [...ALLOWED_GENRES] : [];

  // Всегда возвращаем false для loading, так как данные статичные
  const loading = false;

  return { genres, loading };
};
