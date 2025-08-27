import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction, AnyAction } from '@reduxjs/toolkit';
import { AuthAPI } from '../api/auth.api';
import type { RootState } from '@/shared/lib/store';

import type { UserProfile } from '@/shared/types';

/**
 * Интерфейс для action с payload
 */
interface ActionWithPayload extends AnyAction {
  payload?: UserProfile;
}

/**
 * Состояние пользователя
 */
interface UserState {
  profile: UserProfile | null;
  isLoading: boolean;
  lastUpdated: string | null;
}

/**
 * Начальное состояние
 */
const initialState: UserState = {
  profile: null,
  isLoading: false,
  lastUpdated: null,
};

/**
 * Асинхронный thunk для получения профиля пользователя
 */
export const fetchUserProfile = createAsyncThunk<UserProfile, void>(
  'user/fetchProfile',
  async () => {
    const profile = await AuthAPI.getProfile();
    return profile;
  },
);

/**
 * Слайс пользователя
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Очистка профиля пользователя
     */
    clearUserProfile: (state): void => {
      state.profile = null;
      state.lastUpdated = null;
    },

    /**
     * Обновление избранных фильмов в профиле
     */
    updateUserFavorites: (state, action: PayloadAction<string[]>): void => {
      if (state.profile) {
        state.profile.favorites = action.payload;
        state.lastUpdated = new Date().toISOString();
      }
    },

    /**
     * Добавление фильма в избранное
     */
    addToUserFavorites: (state, action: PayloadAction<string>): void => {
      if (state.profile) {
        const movieId = action.payload;
        if (!state.profile.favorites.includes(movieId)) {
          state.profile.favorites.push(movieId);
          state.lastUpdated = new Date().toISOString();
        }
      }
    },

    /**
     * Удаление фильма из избранного
     */
    removeFromUserFavorites: (state, action: PayloadAction<string>): void => {
      if (state.profile) {
        const movieId = action.payload;
        state.profile.favorites = state.profile.favorites.filter((id) => id !== movieId);
        state.lastUpdated = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка получения профиля
      .addCase(fetchUserProfile.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.profile = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchUserProfile.rejected, (state): void => {
        state.isLoading = false;
      })
      // Обработка добавления в избранное
      .addCase('favorites/addToFavorites/fulfilled', (state, action: ActionWithPayload): void => {
        if (state.profile && action.payload?.favorites) {
          // Обновляем только список избранного, сохраняя остальные данные профиля
          state.profile.favorites = action.payload.favorites;
          state.lastUpdated = new Date().toISOString();
        }
      })
      // Обработка удаления из избранного
      .addCase(
        'favorites/removeFromFavorites/fulfilled',
        (state, action: ActionWithPayload): void => {
          if (state.profile && action.payload?.favorites) {
            // Обновляем только список избранного, сохраняя остальные данные профиля
            state.profile.favorites = action.payload.favorites;
            state.lastUpdated = new Date().toISOString();
          }
        },
      );
  },
});

// Экспорт экшенов
export const {
  clearUserProfile,
  updateUserFavorites,
  addToUserFavorites,
  removeFromUserFavorites,
} = userSlice.actions;

// Селекторы
export const selectUserProfile = (state: RootState): UserProfile | null => state.user.profile;

export const selectUserLoading = (state: RootState): boolean => state.user.isLoading;

export const selectUserFavorites = createSelector(
  [(state: RootState): string[] | undefined => state.user.profile?.favorites],
  (favorites: string[] | undefined): string[] => favorites || [],
);

export const selectUserLastUpdated = (state: RootState): string | null => state.user.lastUpdated;

// Экспорт редьюсера
export default userSlice.reducer;
