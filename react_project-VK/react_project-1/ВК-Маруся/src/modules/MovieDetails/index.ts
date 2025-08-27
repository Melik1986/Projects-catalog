// Public API для модуля MovieDetails

// Компоненты
export { MovieInfo } from './components/MovieInfo/MovieInfo';
export { default as TrailerModal } from './components/TrailerModal/TrailerModal';

// Хуки
export { useTrailerModal } from './hooks/useTrailerModal';
export { useVideoPlayer } from './hooks/useVideoPlayer';

// Типы
export type { PlayerState, PlayerControls } from './types/player';

// Сервисы
export { YouTubeAdapter } from './services/YouTubeAdapter';

// Константы
export { PLAYER_CONSTANTS, YOUTUBE_PLAYER_STATES, ARIA_LABELS } from './constants/player';

// Redux экспорты из MovieCatalog
export {
  fetchMovieById,
  selectCurrentMovie,
  selectCurrentMovieLoading,
  clearCurrentMovie,
} from '../MovieCatalog/store/moviesSlice';
