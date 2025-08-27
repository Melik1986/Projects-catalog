import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { setGlobalError } from '@/shared/lib/errors/slices/errorSlice';
import { toGlobalError } from '@/shared/lib/errors/utils/apiErrorHandler';

/**
 * Middleware для обработки rejected actions
 * Автоматически диспатчит глобальную ошибку для всех rejected thunks,
 * кроме служебных запросов (checkAuthStatus), которые обрабатываются в axios interceptor
 */
export const errorMiddleware: Middleware = (api) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    // Исключаем checkAuthStatus из автоматической обработки ошибок
    // так как его ошибки уже обрабатываются в axios interceptor
    if (action.type === 'auth/checkStatus/rejected') {
      return next(action);
    }

    const error = action.payload ?? action.error;
    api.dispatch(setGlobalError(toGlobalError(error)));
  }
  return next(action);
};
