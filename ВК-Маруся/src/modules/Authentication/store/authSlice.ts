import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthAPI } from '../api/auth.api';
import { getAxiosErrorMessage } from '@/shared/lib/errors/utils/apiErrorHandler';
import type { AuthInfo, RegisterData, SuccessfulResult, UserProfile } from '@/shared/types';
import type { AxiosError } from 'axios';
import type { RootState } from '@/shared/lib/store';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAttempts: number;
  user: UserProfile | null;
  isInitialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
  loginAttempts: 0,
  user: null,
  isInitialized: false,
};

export const loginUser = createAsyncThunk<UserProfile, AuthInfo>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const result = await AuthAPI.login(credentials);
      if ('error' in result) {
        return rejectWithValue(result.error);
      }

      // После успешного входа получаем профиль пользователя
      const profile = await AuthAPI.getProfile();
      return profile;
    } catch (error) {
      // Извлекаем только сериализуемые данные из AxiosError
      if (error instanceof Error && 'isAxiosError' in error && error.isAxiosError) {
        const axiosError = error as AxiosError;
        const serializedError = {
          message: getAxiosErrorMessage(axiosError),
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        };
        return rejectWithValue(serializedError);
      }
      const serializedError = {
        message: error instanceof Error ? error.message : 'Неизвестная ошибка',
        status: undefined,
        data: undefined,
      };
      return rejectWithValue(serializedError);
    }
  },
);

export const registerUser = createAsyncThunk<SuccessfulResult, RegisterData>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const result = await AuthAPI.register(userData);
      if ('error' in result) {
        return rejectWithValue(result.error);
      }
      return result as SuccessfulResult;
    } catch (error) {
      // Извлекаем только сериализуемые данные из AxiosError
      if (error instanceof Error && 'isAxiosError' in error && error.isAxiosError) {
        const axiosError = error as AxiosError;
        const serializedError = {
          message: getAxiosErrorMessage(axiosError),
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        };
        return rejectWithValue(serializedError);
      }
      const serializedError = {
        message: error instanceof Error ? error.message : 'Неизвестная ошибка',
        status: undefined,
        data: undefined,
      };
      return rejectWithValue(serializedError);
    }
  },
);

export const logoutUser = createAsyncThunk<SuccessfulResult, void>(
  'auth/logout',
  async (_, { dispatch }) => {
    const result = await AuthAPI.logout();
    // Очищаем избранное при выходе
    const { clearFavorites } = await import('../../Favorites/store/favoritesSlice');
    dispatch(clearFavorites());
    return result;
  },
);

export const checkAuthStatus = createAsyncThunk<UserProfile, void>(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      // Проверяем авторизацию на сервере
      // Если есть валидная сессия/токен, сервер вернет профиль
      const profile = await AuthAPI.getProfile();
      return profile;
    } catch (error) {
      // Если запрос неудачен (401, 403 и т.д.), пользователь не авторизован
      if (error instanceof Error && 'isAxiosError' in error && error.isAxiosError) {
        const axiosError = error as AxiosError;
        const serializedError = {
          message: getAxiosErrorMessage(axiosError),
          status: axiosError.response?.status,
          data: axiosError.response?.data,
        };
        return rejectWithValue(serializedError);
      }
      return rejectWithValue(error);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state): void => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loginAttempts = 0;
      state.user = null;
      state.isInitialized = false;
    },
    logout: (state): void => {
      state.isAuthenticated = false;
      state.isLoading = false;
      state.loginAttempts = 0;
      state.user = null;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loginAttempts = 0;
        state.isInitialized = true;
      })
      .addCase(loginUser.rejected, (state): void => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.loginAttempts += 1;
        state.isInitialized = true;
      })
      .addCase(registerUser.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state): void => {
        state.isLoading = false;
        // Не устанавливаем isAuthenticated при регистрации
        // Авторизация произойдет через отдельный вызов loginUser
        state.isInitialized = true;
      })
      .addCase(registerUser.rejected, (state): void => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isInitialized = true;
      })
      .addCase(checkAuthStatus.pending, (state): void => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action): void => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(checkAuthStatus.rejected, (state): void => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.isInitialized = true;
      })
      .addCase(logoutUser.fulfilled, (state): void => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.loginAttempts = 0;
      })
      .addCase(logoutUser.rejected, (state): void => {
        state.isLoading = false;
      });
  },
});

export const { resetAuthState, logout } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState): boolean => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState): boolean => state.auth.isLoading;
export const selectLoginAttempts = (state: RootState): number => state.auth.loginAttempts;
export const selectUser = (state: RootState): UserProfile | null => state.auth.user;
export const selectIsInitialized = (state: RootState): boolean => state.auth.isInitialized;

export default authSlice.reducer;
