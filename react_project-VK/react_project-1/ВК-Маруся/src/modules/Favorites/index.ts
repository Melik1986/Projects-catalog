// Public API для модуля Favorites

// Компоненты
export { FavoritesList } from './components/FavoritesList/FavoritesList';

// Хуки
export { useFavoriteActions } from './hooks/useFavoriteActions';

// Типы
export type {
  FavoritesListProps,
  FavoriteItemProps,
  FavoritesListState,
  FavoritesListActions,
} from './types/favorites';

// Store actions и selectors
export {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  addFavoriteOptimistic,
  removeFavoriteOptimistic,
  updateFavoritesByMovieId,
  selectFavoriteItems,
  selectFavoritesLoading,
  selectFavoritesUpdating,
  selectFavoritesLastUpdated,
  selectFavoriteMovieIds,
  selectIsFavorite,
  selectFavoritesCount,
  selectFavoriteIdsSet,
} from './store/favoritesSlice';
export { default as favoritesSlice } from './store/favoritesSlice';

// API
export { favoritesApi } from './api/favorites.api';
