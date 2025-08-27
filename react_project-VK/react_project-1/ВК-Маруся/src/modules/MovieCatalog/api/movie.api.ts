import { http } from '../../../shared/api/axiosConfig';
import { API_LIMITS } from '../../../shared/lib/constants/api';
import type { Movie, MovieList, MovieSearchParams, Genre } from '../../../shared/types';

export const movieApi = {
  // Получение фильмов по заданным фильтрам
  getMovies: (params?: MovieSearchParams, signal?: AbortSignal): Promise<MovieList> => {
    return http.get('/movie', { params, signal }).then((response) => response.data);
  },

  // Получение фильма по id
  getMovieById: (id: number | string): Promise<Movie> => {
    return http.get(`/movie/${id}`).then((response) => response.data);
  },

  // Получение случайного фильма
  getRandomMovie: (): Promise<Movie> => {
    return http.get('/movie/random').then((response) => response.data);
  },

  // Получение фильмов с наивысшим рейтингом
  getTopMovies: (count?: number): Promise<MovieList> => {
    return http.get('/movie/top10', { params: { count } }).then((response) => response.data);
  },

  // Получение жанров
  getGenres: (language?: string): Promise<Genre[]> => {
    return http.get('/movie/genres', { params: { language } }).then((response) => response.data);
  },

  // Получение фильмов по жанру
  getMoviesByGenre: (
    genre: string,
    page: number = 1,
    count: number = API_LIMITS.ITEMS_PER_PAGE,
    signal?: AbortSignal,
  ): Promise<MovieList> => {
    return http
      .get(`/movie`, {
        params: { genre, page, count },
        signal,
      })
      .then((response) => response.data);
  },
};
