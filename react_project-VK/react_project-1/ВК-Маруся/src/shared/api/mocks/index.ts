// Централизованный экспорт всех моковых данных
export { REAL_API_MOVIES, REAL_API_GENRES, MOCK_MOVIES, MOCK_GENRES } from './realApiData';
export { default as moviesData } from './movies.json';

// Используем централизованные типы из types
export type { Movie, Genre, MovieSearchParams } from '../../types';
