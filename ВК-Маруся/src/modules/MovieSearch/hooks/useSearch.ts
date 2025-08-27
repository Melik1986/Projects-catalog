import { useState, useCallback, useRef, useEffect } from 'react';
import { movieApi } from '@/modules/MovieCatalog';
import { searchInputSchema } from '@/shared/lib/validation/schemas';
import { useErrorHandler } from '@/shared/lib/errors/hooks/useErrorHandler';
import type { Movie, MovieList } from '@/shared/types';

interface UseSearchResult {
  movies: Movie[];
  isLoading: boolean;
  shouldShowDropdown: boolean;
  searchMovies: (query: string) => Promise<void>;
  clearResults: () => void;
  setShouldShowDropdown: (show: boolean) => void;
}

/**
 * Хук для поиска фильмов с валидацией
 * @returns объект с результатами поиска и методами управления
 */
export const useSearch = (): UseSearchResult => {
  const [movies, setMovies] = useState<MovieList>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowDropdown, setShouldShowDropdown] = useState(false);
  const { showError } = useErrorHandler();
  const abortControllerRef = useRef<AbortController | null>(null);

  const searchMovies = useCallback(
    async (query: string): Promise<void> => {
      // Валидация поискового запроса
      const validationResult = searchInputSchema.safeParse(query);
      if (!validationResult.success) {
        showError(validationResult.error.errors[0]?.message || 'Некорректный поисковый запрос');
        return;
      }

      // Отменяем предыдущий запрос
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Создаем новый AbortController
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      setIsLoading(true);

      try {
        const response: MovieList = await movieApi.getMovies({ title: query }, signal);

        // Проверяем, не был ли запрос отменен
        if (signal.aborted) return;

        setMovies(response);
      } catch (err) {
        // Игнорируем ошибки отмены
        if (signal.aborted) return;

        showError(err);
        setMovies([]);
      } finally {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      }
    },
    [showError],
  );

  const clearResults = useCallback((): void => {
    setMovies([]);
    setShouldShowDropdown(false);
  }, []);

  // Cleanup при размонтировании
  useEffect(() => {
    return (): void => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    movies,
    isLoading,
    shouldShowDropdown,
    searchMovies,
    clearResults,
    setShouldShowDropdown,
  };
};
