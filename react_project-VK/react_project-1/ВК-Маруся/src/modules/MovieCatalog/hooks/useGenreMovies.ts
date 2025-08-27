import { useCallback, useRef, useState, useMemo } from 'react';
import { useErrorHandler } from '@/shared/lib/errors/hooks/useErrorHandler';
import { API_LIMITS } from '@/shared/lib/constants/api';
import {
  fetchMoviesByGenre,
  selectMovies,
  selectMoviesLoading,
  clearMovies,
  setCurrentPage,
  selectCurrentPage,
} from '../store/moviesSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import type { Movie } from '@/shared/types';

interface UseGenreMoviesResult {
  movies: Movie[];
  isLoading: boolean;
  loading: boolean; // alias для isLoading
  error: any;
  currentPage: number;
  hasMoreMovies: boolean;
  loadMovies: (genre: string, page?: number) => Promise<void>;
  loadMoreMovies: (genre: string) => Promise<void>;
  retryLoad: () => void;
  clearMoviesList: () => void;
}

/**
 * Хук для управления фильмами по жанру
 * Использует готовые Redux thunk и селекторы
 * Интегрируется с useErrorHandler
 * Управляет пагинацией через существующий MovieSearchParams
 */
export const useGenreMovies = (): UseGenreMoviesResult => {
  const dispatch = useAppDispatch();
  const { showError } = useErrorHandler();
  const abortControllerRef = useRef<AbortController | null>(null);
  const isLoadingRef = useRef(false);

  const movies = useAppSelector(selectMovies);
  const isLoading = useAppSelector(selectMoviesLoading);
  const currentPage = useAppSelector(selectCurrentPage);

  // Определяем есть ли еще фильмы для загрузки
  // Улучшенная логика: проверяем размер последней страницы, общее количество фильмов и лимиты API
  const [lastPageSize, setLastPageSize] = useState<number>(API_LIMITS.ITEMS_PER_PAGE);
  const hasMoreMovies = useMemo(() => {
    // Если нет фильмов, можем загружать
    if (movies.length === 0) {
      return true;
    }

    // Если достигли максимального лимита API, больше не загружаем
    if (movies.length >= API_LIMITS.MAX_TOTAL_ITEMS) {
      return false;
    }

    // Если последняя страница была неполной (меньше ITEMS_PER_PAGE), это конец
    if (lastPageSize < API_LIMITS.ITEMS_PER_PAGE) {
      return false;
    }

    // Дополнительная проверка: если загружено кратное количество страниц
    // и последняя страница была полной, можем продолжать
    const canLoadMore = lastPageSize === API_LIMITS.ITEMS_PER_PAGE;
    return canLoadMore;
  }, [movies.length, lastPageSize, currentPage]);

  const loadMovies = useCallback(
    async (genre: string, page: number = 1): Promise<void> => {
      // Проверяем флаг загрузки для предотвращения дублирования запросов
      if (isLoadingRef.current) {
        return;
      }

      // Отменяем предыдущий запрос если он есть
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Создаем новый AbortController для этого запроса
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      isLoadingRef.current = true;

      try {
        if (page === 1) {
          dispatch(clearMovies());
          setLastPageSize(API_LIMITS.ITEMS_PER_PAGE); // Сбрасываем размер последней страницы
        }
        dispatch(setCurrentPage(page));
        const result = await dispatch(
          fetchMoviesByGenre({ genre, page, count: API_LIMITS.ITEMS_PER_PAGE, signal }),
        ).unwrap();

        // Проверяем, что запрос не был отменен
        if (signal.aborted) {
          return;
        }

        setLastPageSize(result.length); // Сохраняем размер загруженной страницы
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        console.error('[useGenreMovies] Ошибка загрузки фильмов:', error);
        showError(error);
      } finally {
        isLoadingRef.current = false;
        abortControllerRef.current = null;
      }
    },
    [dispatch, showError],
  );

  const loadMoreMovies = useCallback(
    async (genre: string): Promise<void> => {
      if (isLoadingRef.current || !hasMoreMovies) {
        return;
      }

      const nextPage = currentPage + 1;
      await loadMovies(genre, nextPage);
    },
    [currentPage, loadMovies, hasMoreMovies],
  );

  const clearMoviesList = useCallback((): void => {
    dispatch(clearMovies());
  }, [dispatch]);

  return {
    movies,
    isLoading,
    loading: isLoading, // alias для isLoading
    error: null, // TODO: добавить обработку ошибок если нужно
    currentPage,
    hasMoreMovies,
    loadMovies,
    loadMoreMovies,
    retryLoad: () => {}, // TODO: добавить retry логику если нужно
    clearMoviesList: clearMoviesList,
  };
};
