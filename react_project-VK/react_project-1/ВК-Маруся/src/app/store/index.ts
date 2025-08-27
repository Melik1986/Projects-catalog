import { configureStore } from '@reduxjs/toolkit';
import errorReducer from '@/shared/lib/errors/slices/errorSlice';
import authReducer from '@/modules/Authentication/store/authSlice';
import userReducer from '@/modules/Authentication/store/userSlice';
import moviesReducer from '@/modules/MovieCatalog/store/moviesSlice';
import favoritesReducer from '@/modules/Favorites/store/favoritesSlice';
import { errorMiddleware } from './middleware/errorMiddleware';

/**
 * Конфигурация Redux Store
 * Пока включает только errorSlice для глобального управления ошибками
 * Остальные слайсы будут добавлены по мере разработки
 */
export const store = configureStore({
  reducer: {
    // Слайсы состояния
    errors: errorReducer, // Глобальное управление ошибками
    auth: authReducer, // Управление аутентификацией
    user: userReducer, // Управление профилем пользователя
    movies: moviesReducer, // Управление фильмами
    favorites: favoritesReducer, // Управление избранными фильмами
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Определение типов состояния
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Экспорт для использования в компонентах
export default store;

// Реэкспорт хуков из shared/lib/store
export { useAppDispatch, useAppSelector } from '@/shared/lib/store';
