import type { Movie } from '../../MovieCatalog/types/movie';

// Избранные фильмы теперь представляют собой массив Movie напрямую
// согласно реальному API ответу

// Пропсы для компонента списка избранного
export interface FavoritesListProps {
  className?: string;
  openAuthModal?: () => void;
}

// Пропсы для элемента избранного
export interface FavoriteItemProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
  onRemoveFavorite: (movieId: number) => void;
  openAuthModal?: () => void;
  className?: string;
}

// Состояние списка избранного
export interface FavoritesListState {
  movies: Movie[];
  loading: boolean;
}

// Действия для списка избранного
export interface FavoritesListActions {
  removeFromFavorites: (movieId: number) => void;
  navigateToMovie: (movie: Movie) => void;
}
