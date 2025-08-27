import axios from 'axios';
import type { AxiosError } from 'axios';
// ИСКЛЮЧЕНИЕ: импорт store instance из app слоя необходим для interceptors
import { store } from '@/app/store';
import { setGlobalError } from '../lib/errors/slices/errorSlice';
import { logout } from '@/modules/Authentication/store/authSlice';
import { clearFavorites } from '@/modules/Favorites';
import { toGlobalError } from '../lib/errors/utils/apiErrorHandler';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cinemaguide.skillbox.cc';

export const http = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Перехватчик запросов для логирования
http.interceptors.request.use((config) => {
  // Не логируем служебные запросы проверки авторизации, избранного и публичные эндпоинты
  // (dev-only console.log удалён)
  return config;
});

// Централизованный перехват ошибок API
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url || '';

    // Не показываем глобальные ошибки для проверки авторизации, избранного и публичных эндпоинтов при инициализации
    const isAuthCheck = url.includes('/profile');
    const isFavoritesCheck = url.includes('/favorites') && error.config?.method === 'get';
    const isPublicMovieEndpoint =
      url.includes('/movie/top10') ||
      url.includes('/movie/genres') ||
      url.includes('/movie/random');
    const shouldShowGlobalError = !isAuthCheck && !isFavoritesCheck && !isPublicMovieEndpoint;

    // При ошибке 401 очищаем состояние авторизации
    if (status === 401) {
      store.dispatch(logout());
      store.dispatch(clearFavorites());
      // (dev-only console.warn удалён)
    }

    // Показываем глобальную ошибку только если это не служебные запросы
    if (shouldShowGlobalError) {
      const globalError = toGlobalError(error);
      store.dispatch(setGlobalError(globalError));
    }

    return Promise.reject(error);
  },
);
