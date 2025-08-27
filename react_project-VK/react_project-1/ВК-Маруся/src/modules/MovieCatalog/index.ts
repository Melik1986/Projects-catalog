// Public API для модуля MovieCatalog

// Components
export { GenreCard } from './components/GenreCard';
export { GenresGrid } from './components/GenresGrid';
export { MovieCard } from './components/MovieCard';
export { MovieGrid } from './components/MovieGrid';

// Hooks
export { useGenres } from './hooks/useGenres';
export { useGenreMovies } from './hooks/useGenreMovies';
export { useMovie } from './hooks/useMovie';

// Types
export type { MovieGridProps } from './types/movieGrid';
export type { GenreList } from './types/genre';
export type { Movie, MovieList, Genre } from './types/movie';

// Константы
export { ALLOWED_GENRES } from './constants/genres';

// Store
export {
  fetchMovies,
  fetchMovieById,
  fetchRandomMovie,
  fetchTopMovies,
  fetchGenres,
  fetchMoviesByGenre,
  clearCurrentMovie,
  clearRandomMovie,
  setSearchParams,
  clearMovies,
  setCurrentPage,
  selectMovies,
  selectCurrentMovie,
  selectRandomMovie,
  selectTopMovies,
  selectMoviesLoading,
  selectCurrentMovieLoading,
  selectRandomMovieLoading,
  selectTopMoviesLoading,
  selectSearchParams,
  selectTotalCount,
  selectCurrentPage,
  selectGenres,
  selectGenresLoading,
} from './store/moviesSlice';
export { default as moviesSlice } from './store/moviesSlice';

// API
export { movieApi } from './api/movie.api';
