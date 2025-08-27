export interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  language: string;
  releaseYear: number;
  releaseDate: string;
  genres: string[];
  plot: string;
  runtime: number;
  budget: string | null;
  revenue: string | null;
  homepage: string;
  status: string;
  posterUrl: string;
  backdropUrl: string | null;
  trailerUrl: string;
  trailerYouTubeId: string;
  tmdbRating: number;
  searchL: string;
  keywords: string[];
  countriesOfOrigin: string[];
  languages: string[];
  cast: string[];
  director: string;
  production: string | null;
  awardsSummary: string | null;
}

// Унифицированный тип для массива фильмов
// Используется во всех API ответах, возвращающих список фильмов
export type MovieList = Movie[];

// Параметры поиска фильмов
export interface MovieSearchParams {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}

// Жанр — строка из списка доступных жанров
export type Genre =
  | 'drama'
  | 'comedy'
  | 'mystery'
  | 'family'
  | 'history'
  | 'thriller'
  | 'fantasy'
  | 'adventure'
  | string; // Для совместимости с API
