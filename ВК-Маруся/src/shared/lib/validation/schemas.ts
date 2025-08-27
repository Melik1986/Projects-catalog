import { z } from 'zod';
import { API_LIMITS } from '../constants/api';
import type {
  UserProfile,
  AuthInfo,
  RegisterData,
  SuccessfulResult,
  Movie,
  MovieSearchParams,
} from '../../types';
import type { ApiError, ApiResponse } from '../../types/api';

// =============================================================================
// СХЕМЫ API НА ОСНОВЕ ТИПОВ ИЗ /types
// =============================================================================

/**
 * Схема пользователя (на основе UserProfile)
 */
export const userSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  surname: z.string(),
  favorites: z.array(z.string()),
}) satisfies z.ZodType<UserProfile>;

/**
 * Схема данных для аутентификации (на основе AuthInfo)
 */
export const authInfoSchema = z.object({
  email: z.string(),
  password: z.string(),
}) satisfies z.ZodType<AuthInfo>;

/**
 * Схема успешного результата (на основе SuccessfulResult)
 */
export const successfulResultSchema = z.object({
  result: z.boolean(),
}) satisfies z.ZodType<SuccessfulResult>;

/**
 * Схема ошибки (на основе ApiError)
 */
export const errorSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
}) satisfies z.ZodType<ApiError>;

/**
 * Схема простой ошибки (для ответов с полем error)
 */
export const simpleErrorSchema = z.object({
  error: z.string(),
});

/**
 * Схема данных для регистрации (на основе RegisterData)
 */
export const registerDataSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
}) satisfies z.ZodType<RegisterData>;

/**
 * Схема фильма (на основе Movie)
 */
export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  releaseYear: z.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.number(),
  budget: z.string().nullable(),
  revenue: z.string().nullable(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string(),
  backdropUrl: z.string().nullable(),
  trailerUrl: z.string(),
  trailerYouTubeId: z.string(),
  tmdbRating: z.number(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string(),
  production: z.string().nullable(),
  awardsSummary: z.string().nullable(),
}) satisfies z.ZodType<Movie>;

/**
 * Схема ответа API (на основе ApiResponse)
 */
export const apiResponseSchema = z.object({
  code: z.number(),
  type: z.string(),
  message: z.string(),
}) satisfies z.ZodType<ApiResponse>;

/**
 * Схема тела запроса для избранного
 */
export const favoritesBodySchema = z.object({
  id: z.number(),
});

// =============================================================================
// СХЕМЫ ДЛЯ ФОРМ (UI-валидация)
// =============================================================================

export const loginFormSchema = z.object({
  email: z.string().email('Некорректный email'),
  password: z.string().min(1, 'Пароль обязателен'),
});

export const registerFormSchema = z
  .object({
    email: z.string().email('Некорректный email'),
    name: z.string().min(1, 'Имя обязательно'),
    surname: z.string().min(1, 'Фамилия обязательна'),
    password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

// =============================================================================
// СХЕМЫ ДЛЯ ПОИСКА ФИЛЬМОВ
// =============================================================================

/**
 * Схема параметров поиска фильмов (на основе MovieSearchParams)
 */
export const movieSearchParamsSchema = z.object({
  count: z.number().min(1).max(API_LIMITS.MAX_COUNT_PER_REQUEST).optional(),
  page: z.number().min(1).optional(),
  title: z.string().min(1).max(255).optional(),
  genre: z.string().min(1).max(50).optional(),
}) satisfies z.ZodType<MovieSearchParams>;

/**
 * Схема поискового запроса (для UI)
 */
export const searchQuerySchema = z.object({
  query: z
    .string()
    .min(1, 'Поисковый запрос не может быть пустым')
    .max(255, 'Поисковый запрос слишком длинный')
    .regex(/^[\p{L}\p{N}\s\-.,!?]+$/u, 'Недопустимые символы в поисковом запросе'),
  limit: z.number().min(1).max(20).optional().default(10),
});

/**
 * Схема валидации поискового ввода (строгая для UI)
 */
export const searchInputSchema = z
  .string()
  .min(1, 'Введите поисковый запрос')
  .max(255, 'Поисковый запрос слишком длинный')
  .regex(/^[\p{L}\p{N}\s\-.,!?]+$/u, 'Используйте только буквы, цифры и базовые знаки препинания');

// =============================================================================
// ТИПЫ, ГЕНЕРИРУЕМЫЕ ИЗ СХЕМ (только для валидации)
// =============================================================================

// Типы для валидации форм
export type LoginFormInputs = z.infer<typeof loginFormSchema>;
export type RegisterFormInputs = z.infer<typeof registerFormSchema>;
export type FavoritesBody = z.infer<typeof favoritesBodySchema>;

// Типы для валидации поиска
export type MovieSearchParamsInputs = z.infer<typeof movieSearchParamsSchema>;
export type SearchQueryInputs = z.infer<typeof searchQuerySchema>;
export type SearchInputValue = z.infer<typeof searchInputSchema>;

// Примечание: Все схемы API основаны на типах из /types для обеспечения
// единого источника истины и избежания дублирования
