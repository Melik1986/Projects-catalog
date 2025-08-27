// Главный barrel export для всего приложения
export * from './app';

// Pages (компоненты страниц)
export { Home, Movie as MoviePage, Genre as GenrePage, Genres, User, NotFound } from './pages';

// Components
// export * from './components'; // Папка components не существует
export * from './shared';

// Types (переименовываем конфликтующие типы)
export type {
  Movie,
  Genre,
  UserProfile,
  AuthInfo,
  RegisterData,
  SuccessfulResult,
} from './shared/types';

// Остальные типы без конфликтов
export * from './shared/lib/validation';
export * from './shared/config';

// Примечание: Хуки и сервисы теперь доступны через Public API модулей
// Например: import { useSearch } from '@/modules/MovieSearch';
// Или: import { YouTubeAdapter } from '@/modules/MovieDetails';
