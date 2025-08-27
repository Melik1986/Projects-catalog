/**
 * Константы API эндпоинтов
 * Централизованное хранение всех URL для API запросов
 */

// Базовый URL API
export const API_BASE_URL = 'https://cinemaguide.skillbox.cc';

// Эндпоинты авторизации
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REGISTER: '/user',
  PROFILE: '/profile',
} as const;

// Эндпоинты фильмов
export const MOVIE_ENDPOINTS = {
  LIST: '/movie',
  RANDOM: '/movie/random',
  TOP_10: '/movie/top10',
  BY_ID: (id: number) => `/movie/${id}`,
} as const;

// Эндпоинты жанров
export const GENRE_ENDPOINTS = {
  LIST: '/movie/genres',
} as const;

// Эндпоинты избранного
export const FAVORITES_ENDPOINTS = {
  LIST: '/favorites',
  ADD: '/favorites',
  REMOVE: (id: number) => `/favorites/${id}`,
} as const;

// Эндпоинты поиска
export const SEARCH_ENDPOINTS = {
  MOVIES: '/movie',
  BY_TITLE: '/movie',
  BY_GENRE: '/movie',
} as const;

// Эндпоинты дашборда
export const DASHBOARD_ENDPOINTS = {
  TOP_MOVIES: '/movie/top10',
  RANDOM_MOVIE: '/movie/random',
  GENRES: '/movie/genres',
  STATS: '/dashboard/stats',
  TRENDING: '/dashboard/trending',
  POPULARITY: '/dashboard/popularity',
  RECOMMENDATIONS: '/dashboard/recommendations',
} as const;

// Объединенный объект всех эндпоинтов
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  MOVIES: MOVIE_ENDPOINTS,
  GENRES: GENRE_ENDPOINTS,
  FAVORITES: FAVORITES_ENDPOINTS,
  SEARCH: SEARCH_ENDPOINTS,
  DASHBOARD: DASHBOARD_ENDPOINTS,
} as const;

// Типы для эндпоинтов
export type AuthEndpoints = typeof AUTH_ENDPOINTS;
export type MovieEndpoints = typeof MOVIE_ENDPOINTS;
export type GenreEndpoints = typeof GENRE_ENDPOINTS;
export type FavoritesEndpoints = typeof FAVORITES_ENDPOINTS;
export type SearchEndpoints = typeof SEARCH_ENDPOINTS;
export type DashboardEndpoints = typeof DASHBOARD_ENDPOINTS;
export type ApiEndpoints = typeof API_ENDPOINTS;
