import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { fetchMovieById } from '../store/moviesSlice';
import { useErrorHandler } from '@/shared/lib/errors/hooks/useErrorHandler';
import type { Movie } from '@/shared/types';

interface UseMovieResult {
  movie: Movie | null;
  loading: boolean;
  movieId: number | null;
  refetchMovie: () => void;
}

/**
 * Хук для управления данными фильма
 * Объединяет логику получения ID из URL, загрузки данных фильма и управления состоянием
 */
export const useMovie = (): UseMovieResult => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { showError } = useErrorHandler();

  const movieId = id ? parseInt(id, 10) : null;
  const movie = useAppSelector((state) => state.movies.currentMovie);
  const loading = useAppSelector((state) => state.movies.isLoadingCurrent);

  // Загрузка фильма по ID
  const loadMovie = useCallback(
    async (movieId: number): Promise<void> => {
      try {
        await dispatch(fetchMovieById(movieId)).unwrap();
      } catch (error) {
        showError(error);
      }
    },
    [dispatch, showError],
  );

  // Загружаем фильм при монтировании компонента или изменении ID
  useEffect(() => {
    if (movieId) {
      loadMovie(movieId);
    }
  }, [loadMovie, movieId]);

  return {
    movie,
    loading,
    movieId,
    refetchMovie: () => movieId && loadMovie(movieId),
  };
};
