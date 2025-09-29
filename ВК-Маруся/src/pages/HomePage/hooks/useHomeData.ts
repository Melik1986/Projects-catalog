import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { fetchTopMovies } from '@/modules/MovieCatalog/store/moviesSlice';
import { useErrorHandler } from '@/shared/lib/errors/hooks/useErrorHandler';
import { useAppDispatch } from '@/shared/lib/store';
import { selectIsInitialized } from '@/modules/Authentication';
import type { RootState } from '@/app/store';
import type { Movie } from '@/shared/types';

export const useHomeData = (): {
  movies: Movie[];
  currentMovie: Movie | null;
  loading: boolean;
  handleRetry: () => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const { showError } = useErrorHandler();
  const { topMovies } = useSelector((state: RootState) => state.movies);
  const isLoadingTop = useSelector((state: RootState) => state.movies.isLoadingTop);
  const isInitialized = useSelector(selectIsInitialized);
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null);

  const loadData = useCallback(async (): Promise<void> => {
    try {
      // Загружаем только топ фильмы для главной страницы
      await dispatch(fetchTopMovies(10)).unwrap();
    } catch (error) {
      showError(error);
    }
  }, [dispatch, showError]);

  useEffect(() => {
    // Загружаем данные только после инициализации приложения
    if (isInitialized) {
      loadData();
    }
  }, [loadData, isInitialized]);

  useEffect(() => {
    if (topMovies.length > 0 && !currentMovie) {
      const randomIndex = Math.floor(Math.random() * topMovies.length);
      const selectedMovie = topMovies[randomIndex];
      if (selectedMovie) {
        setCurrentMovie(selectedMovie);
      }
    }
  }, [topMovies, currentMovie]);

  const handleRetry = useCallback(async (): Promise<void> => {
    try {
      await dispatch(fetchTopMovies(10)).unwrap();
    } catch (error) {
      showError(error);
    }
  }, [dispatch, showError]);

  return {
    movies: topMovies,
    currentMovie,
    loading: isLoadingTop,
    handleRetry,
  };
};
