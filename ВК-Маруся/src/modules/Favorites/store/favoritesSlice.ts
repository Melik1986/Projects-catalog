import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { favoritesApi } from '@/modules/Favorites';
import type { Movie, UserProfile } from '@/shared/types';
import type { RootState } from '@/app/store';
import { toGlobalError } from '@/shared/lib/errors/utils/apiErrorHandler';

interface FavoritesState {
  items: Movie[];
  isLoading: boolean;
  isUpdating: boolean;
  lastUpdated: string | null;
}

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  isUpdating: false,
  lastUpdated: null,
};

export const fetchFavorites = createAsyncThunk<Movie[], void>(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    try {
      const favorites = await favoritesApi.getFavorites();
      return favorites;
    } catch (error) {
      // Не показываем глобальную ошибку для избранного - она обрабатывается в axiosConfig
      const globalError = toGlobalError(error);
      return thunkAPI.rejectWithValue(globalError.message);
    }
  },
);

export const addToFavorites = createAsyncThunk<UserProfile, string>(
  'favorites/addToFavorites',
  async (movieId, thunkAPI) => {
    try {
      const updatedProfile = await favoritesApi.addToFavorites(movieId);
      return updatedProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(toGlobalError(error).message);
    }
  },
);

export const removeFromFavorites = createAsyncThunk<UserProfile, string>(
  'favorites/removeFromFavorites',
  async (movieId, thunkAPI) => {
    try {
      const updatedProfile = await favoritesApi.removeFromFavorites(movieId);
      return updatedProfile;
    } catch (error) {
      return thunkAPI.rejectWithValue(toGlobalError(error).message);
    }
  },
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state): void => {
      state.items = [];
      state.lastUpdated = null;
    },
    addFavoriteOptimistic: (state, action: PayloadAction<Movie>): void => {
      const exists = state.items.some((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        state.lastUpdated = new Date().toISOString();
      }
    },
    removeFavoriteOptimistic: (state, action: PayloadAction<number>): void => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.lastUpdated = new Date().toISOString();
    },
    updateFavoritesByMovieId: (state, action: PayloadAction<string[]>): void => {
      state.items = state.items.filter((item) => action.payload.includes(item.id.toString()));
      state.lastUpdated = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.items = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchFavorites.rejected, (state): void => {
        state.isLoading = false;
      })
      .addCase(addToFavorites.pending, (state): void => {
        state.isUpdating = true;
      })
      .addCase(addToFavorites.fulfilled, (state): void => {
        state.isUpdating = false;
        state.lastUpdated = new Date().toISOString();
        // После успешного добавления нужно перезагрузить список избранного
        // чтобы получить актуальные данные с сервера
      })
      .addCase(addToFavorites.rejected, (state): void => {
        state.isUpdating = false;
      })
      .addCase(removeFromFavorites.pending, (state): void => {
        state.isUpdating = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state): void => {
        state.isUpdating = false;
        state.lastUpdated = new Date().toISOString();
        // После успешного удаления нужно перезагрузить список избранного
        // чтобы получить актуальные данные с сервера
      })
      .addCase(removeFromFavorites.rejected, (state): void => {
        state.isUpdating = false;
      })
      // Очищаем избранное при выходе из системы
      .addCase('auth/logout', (state): void => {
        state.items = [];
        state.lastUpdated = null;
        state.isLoading = false;
        state.isUpdating = false;
      });
  },
});

export const {
  clearFavorites,
  addFavoriteOptimistic,
  removeFavoriteOptimistic,
  updateFavoritesByMovieId,
} = favoritesSlice.actions;

export const selectFavoriteItems = (state: RootState): Movie[] => state.favorites.items;

export const selectFavoritesLoading = (state: RootState): boolean => state.favorites.isLoading;

export const selectFavoritesUpdating = (state: RootState): boolean => state.favorites.isUpdating;

export const selectFavoritesLastUpdated = (state: RootState): string | null =>
  state.favorites.lastUpdated;

export const selectFavoriteMovieIds = createSelector(
  [selectFavoriteItems],
  (items: Movie[]): string[] => items.filter((item) => item?.id).map((item) => item.id.toString()),
);

export const selectIsFavorite =
  (movieId: string) =>
  (state: RootState): boolean =>
    state.favorites.items.some((item: Movie) => item?.id && item.id.toString() === movieId);

export const selectFavoritesCount = (state: RootState): number => state.favorites.items.length;

// Мемоизированный селектор для быстрого поиска
export const selectFavoriteIdsSet = createSelector(
  [selectFavoriteItems],
  (items: Movie[]) => new Set(items.map((item) => item.id)),
);

export default favoritesSlice.reducer;
