import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { fetchFavorites, addToFavorites as addToFavoritesThunk, removeFromFavorites as removeFromFavoritesThunk, selectFavoriteItems, selectFavoriteMovieIds, selectFavoritesLoading, selectFavoritesUpdating } from '@/modules/Favorites';
import { removeFavoriteOptimistic } from '../store/favoritesSlice';
import type { Movie } from '@/shared/types';

/**
 * Хук для управления действиями с избранными фильмами
 * @param openAuthModal - Функция для открытия модального окна авторизации
 * @returns объект с методами и состоянием избранного
 */
export const useFavoriteActions = (
  openAuthModal?: () => void,
): {
  movies: Movie[];
  favoriteIds: string[];
  isLoading: boolean;
  isUpdating: boolean;
  isFavorite: (movieId: number) => boolean;
  addToFavorites: (movie: Movie) => Promise<void>;
  removeFromFavorites: (movieId: number) => Promise<void>;
  handleFavoriteClick: (movie: Movie) => Promise<void>;
  loadFavorites: () => void;
} => {
  const dispatch = useAppDispatch();
  const favoriteItems = useAppSelector(selectFavoriteItems);
  const favoriteIds = useAppSelector(selectFavoriteMovieIds);
  const isLoading = useAppSelector(selectFavoritesLoading);
  const isUpdating = useAppSelector(selectFavoritesUpdating);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const favoriteMovies = favoriteItems;

  const isFavorite = useCallback(
    (movieId: number): boolean => {
      return favoriteIds.includes(movieId?.toString() || '');
    },
    [favoriteIds],
  );

  const addToFavorites = useCallback(async (movie: Movie): Promise<void> => {
    if (!isAuthenticated) {
      openAuthModal?.();
      return;
    }
    try {
      await dispatch(addToFavoritesThunk(movie.id?.toString() || '')).unwrap();
      dispatch(fetchFavorites());
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
    }
  }, [dispatch, isAuthenticated, openAuthModal]);

  const removeFromFavorites = useCallback(async (movieId: number): Promise<void> => {
    if (!isAuthenticated) {
      openAuthModal?.();
      return;
    }
    try {
      await dispatch(removeFromFavoritesThunk(movieId?.toString() || '')).unwrap();
      dispatch(removeFavoriteOptimistic(movieId));
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
    }
  }, [dispatch, isAuthenticated, openAuthModal]);

  const handleFavoriteClick = useCallback(async (movie: Movie): Promise<void> => {
    if (!isAuthenticated) {
      openAuthModal?.();
      return;
    }
    if (isFavorite(movie.id)) {
      await removeFromFavorites(movie.id);
    } else {
      await addToFavorites(movie);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites, isAuthenticated, openAuthModal]);

  const loadFavorites = useCallback((): void => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  return {
    movies: favoriteMovies,
    favoriteIds,
    isLoading,
    isUpdating,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    handleFavoriteClick,
    loadFavorites,
  };
};
