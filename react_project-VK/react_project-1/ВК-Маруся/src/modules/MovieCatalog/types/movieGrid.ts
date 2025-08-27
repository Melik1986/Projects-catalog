import type { Movie } from '../../../shared/types';

export interface MovieGridProps {
  title?: string;
  movies: Movie[];
  showRanking?: boolean;
  maxItems?: number;
  onMovieClick?: (movie: Movie) => void;
  openAuthModal?: () => void;
  className?: string;
  variant?: string;
  itemSize?: 'default' | 'large';
  cardModifier?: string;
  scrollableWrapper?: boolean;
  hasMoreMovies?: boolean;
  isLoading?: boolean;
  onLoadMore?: () => void;
}

// GridItemProps больше не используется - удален react-window
