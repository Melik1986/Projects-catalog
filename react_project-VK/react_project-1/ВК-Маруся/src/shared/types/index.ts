// Общие типы для всего приложения
// Только локальные типы shared слоя

// Общие типы приложения
export * from './api';
export * from './errors';
export * from './header';
export * from './Hero';
export * from './SEO';

// Экспорт типов из модулей
export type {
  Movie,
  Genre,
  MovieList,
  MovieSearchParams,
} from '@/modules/MovieCatalog/types/movie';
export type { AuthInfo, RegisterData, SuccessfulResult } from '@/modules/Authentication/types/auth';
export type { UserProfile } from '@/modules/Authentication/types/user';
export type { FavoritesListProps, FavoriteItemProps } from '@/modules/Favorites/types/favorites';
export type { MovieGridProps } from '@/modules/MovieCatalog/types/movieGrid';
