import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { movieApi } from '@/modules/MovieCatalog';
import type { RootState } from '@/app/store';

import type { Movie, MovieSearchParams, Genre } from '@/shared/types';

/**
 * Состояние фильмов
 */
interface MoviesState {
  movies: Movie[];
  currentMovie: Movie | null;
  randomMovie: Movie | null;
  topMovies: Movie[];
  genres: Genre[];
  isLoading: boolean;
  isLoadingCurrent: boolean;
  isLoadingRandom: boolean;
  isLoadingTop: boolean;
  isLoadingGenres: boolean;
  searchParams: MovieSearchParams | null;
  totalCount: number;
  currentPage: number;
}

/**
 * Начальное состояние
 */
const initialState: MoviesState = {
  movies: [],
  currentMovie: null,
  randomMovie: null,
  topMovies: [],
  genres: [],
  isLoading: false,
  isLoadingCurrent: false,
  isLoadingRandom: false,
  isLoadingTop: false,
  isLoadingGenres: false,
  searchParams: null,
  totalCount: 0,
  currentPage: 1,
};

/**
 * Асинхронный thunk для получения списка фильмов
 */
export const fetchMovies = createAsyncThunk<Movie[], MovieSearchParams | undefined>(
  'movies/fetchMovies',
  async (params) => {
    const response = await movieApi.getMovies(params);
    return response;
  },
);

/**
 * Асинхронный thunk для получения фильма по ID
 */
export const fetchMovieById = createAsyncThunk<Movie, number | string>(
  'movies/fetchMovieById',
  async (id) => {
    const movie = await movieApi.getMovieById(id);
    return movie;
  },
);

/**
 * Асинхронный thunk для получения случайного фильма
 */
export const fetchRandomMovie = createAsyncThunk<Movie, void>(
  'movies/fetchRandomMovie',
  async () => {
    const movie = await movieApi.getRandomMovie();
    return movie;
  },
);

/**
 * Асинхронный thunk для получения топ фильмов
 */
export const fetchTopMovies = createAsyncThunk<Movie[], number | undefined>(
  'movies/fetchTopMovies',
  async (count) => {
    const movies = await movieApi.getTopMovies(count);
    return movies;
  },
);

/**
 * Асинхронный thunk для получения фильмов по жанру
 */
export const fetchMoviesByGenre = createAsyncThunk<
  Movie[],
  { genre: string; page?: number; count?: number; signal?: AbortSignal }
>('movies/fetchMoviesByGenre', async ({ genre, page = 1, count = 10, signal }) => {
  const movies = await movieApi.getMoviesByGenre(genre, page, count, signal);
  return movies;
});

export const fetchGenres = createAsyncThunk<Genre[], string>(
  'movies/fetchGenres',
  async (language) => {
    const genres = await movieApi.getGenres(language);
    return genres;
  },
);

/**
 * Слайс фильмов
 */
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    /**
     * Очистка текущего фильма
     */
    clearCurrentMovie: (state): void => {
      state.currentMovie = null;
    },

    /**
     * Очистка случайного фильма
     */
    clearRandomMovie: (state): void => {
      state.randomMovie = null;
    },

    /**
     * Установка параметров поиска
     */
    setSearchParams: (state, action: PayloadAction<MovieSearchParams>): void => {
      state.searchParams = action.payload;
    },

    /**
     * Очистка списка фильмов
     */
    clearMovies: (state): void => {
      state.movies = [];
      state.totalCount = 0;
      state.currentPage = 1;
      state.searchParams = null;
    },

    /**
     * Установка текущей страницы
     */
    setCurrentPage: (state, action: PayloadAction<number>): void => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка получения списка фильмов
      .addCase(fetchMovies.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.movies = action.payload;
        state.totalCount = (action.payload || []).length;
      })
      .addCase(fetchMovies.rejected, (state): void => {
        state.isLoading = false;
      })
      // Обработка получения фильма по ID
      .addCase(fetchMovieById.pending, (state): void => {
        state.isLoadingCurrent = true;
      })
      .addCase(fetchMovieById.fulfilled, (state, action): void => {
        state.isLoadingCurrent = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state): void => {
        state.isLoadingCurrent = false;
      })
      // Обработка получения случайного фильма
      .addCase(fetchRandomMovie.pending, (state): void => {
        state.isLoadingRandom = true;
      })
      .addCase(fetchRandomMovie.fulfilled, (state, action): void => {
        state.isLoadingRandom = false;
        state.randomMovie = action.payload;
      })
      .addCase(fetchRandomMovie.rejected, (state): void => {
        state.isLoadingRandom = false;
      })
      // Обработка получения топ фильмов
      .addCase(fetchTopMovies.pending, (state): void => {
        state.isLoadingTop = true;
      })
      .addCase(fetchTopMovies.fulfilled, (state, action): void => {
        state.isLoadingTop = false;
        state.topMovies = action.payload;
      })
      .addCase(fetchTopMovies.rejected, (state): void => {
        state.isLoadingTop = false;
      })
      // Обработка получения жанров
      .addCase(fetchGenres.pending, (state): void => {
        state.isLoadingGenres = true;
      })
      .addCase(fetchGenres.fulfilled, (state, action): void => {
        state.isLoadingGenres = false;
        state.genres = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchGenres.rejected, (state): void => {
        state.isLoadingGenres = false;
      })
      // Обработка получения фильмов по жанру
      .addCase(fetchMoviesByGenre.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action): void => {
        state.isLoading = false;
        if (state.currentPage === 1) {
          state.movies = action.payload;
        } else {
          // Фильтруем новые фильмы, исключая дубликаты по ID
          const existingIds = new Set((state.movies || []).map((movie) => movie.id));
          const newMovies = action.payload.filter((movie) => !existingIds.has(movie.id));
          state.movies = [...(state.movies || []), ...newMovies];
        }
        state.totalCount = (state.movies || []).length;
      })
      .addCase(fetchMoviesByGenre.rejected, (state): void => {
        state.isLoading = false;
      });
  },
});

// Экспорт экшенов
export const { clearCurrentMovie, clearRandomMovie, setSearchParams, clearMovies, setCurrentPage } =
  moviesSlice.actions;

// Селекторы
export const selectMovies = (state: RootState): Movie[] => state.movies.movies || [];

export const selectCurrentMovie = (state: RootState): Movie | null => state.movies.currentMovie;

export const selectRandomMovie = (state: RootState): Movie | null => state.movies.randomMovie;

export const selectTopMovies = (state: RootState): Movie[] => state.movies.topMovies || [];

export const selectMoviesLoading = (state: RootState): boolean => state.movies.isLoading;

export const selectCurrentMovieLoading = (state: RootState): boolean =>
  state.movies.isLoadingCurrent;

export const selectRandomMovieLoading = (state: RootState): boolean => state.movies.isLoadingRandom;

export const selectTopMoviesLoading = (state: RootState): boolean => state.movies.isLoadingTop;

export const selectSearchParams = (state: RootState): MovieSearchParams | null =>
  state.movies.searchParams;

export const selectTotalCount = (state: RootState): number => state.movies.totalCount;

export const selectCurrentPage = (state: RootState): number => state.movies.currentPage;

export const selectGenres = (state: RootState): Genre[] => state.movies.genres;

export const selectGenresLoading = (state: RootState): boolean => state.movies.isLoadingGenres;

// Экспорт редьюсера
export default moviesSlice.reducer;
