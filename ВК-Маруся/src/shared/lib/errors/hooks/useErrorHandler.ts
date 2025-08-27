import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setGlobalError, clearGlobalError } from '../slices/errorSlice';
import { toGlobalError } from '../utils/apiErrorHandler';
import type { AppDispatch } from '../../store';

/**
 * Хук для обработки ошибок
 * Позволяет показывать и очищать глобальные ошибки
 * Автоматически преобразует любые типы ошибок в GlobalError
 */
export const useErrorHandler = (): {
  showError: (error: unknown) => void;
  clearError: () => void;
} => {
  const dispatch = useDispatch<AppDispatch>();

  const showError = useCallback(
    (error: unknown): void => {
      // Преобразуем любую ошибку в GlobalError
      const globalError = toGlobalError(error);
      dispatch(setGlobalError(globalError));
    },
    [dispatch],
  );

  const clearError = useCallback((): void => {
    dispatch(clearGlobalError());
  }, [dispatch]);

  return {
    showError,
    clearError,
  };
};
