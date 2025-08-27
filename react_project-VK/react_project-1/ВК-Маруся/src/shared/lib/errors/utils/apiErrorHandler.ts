import type { AxiosError } from 'axios';
import type { GlobalError, ErrorCategory, ErrorType } from '@/shared/types';

/**
 * Проверяет, является ли ошибка AxiosError
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  );
}

/**
 * Извлекает сообщение из AxiosError
 */
export function getAxiosErrorMessage(error: AxiosError): string {
  // Специальная обработка для ошибки 409 при регистрации
  if (error.response?.status === 409 && error.config?.url?.includes('/user')) {
    return 'Пользователь с таким email уже существует. Попробуйте использовать другой email или войдите в существующий аккаунт.';
  }

  if (error.response?.data && typeof error.response.data === 'object') {
    const data = error.response.data as Record<string, unknown>;
    if (typeof data.message === 'string') return data.message;
    if (typeof data.error === 'string') return data.error;
  }
  return error.message || 'Произошла ошибка сети';
}

/**
 * Определяет категорию и тип ошибки по HTTP статусу
 */
function getErrorMetadata(status?: number): { category: ErrorCategory; type: ErrorType } {
  switch (status) {
    case 400:
      return { category: 'warning', type: 'validation' };
    case 401:
      return { category: 'warning', type: 'auth' };
    case 403:
      return { category: 'warning', type: 'permission' };
    case 404:
      return { category: 'info', type: 'notFound' };
    case 409:
      return { category: 'warning', type: 'validation' };
    case 500:
    case 502:
    case 503:
      return { category: 'critical', type: 'server' };
    default:
      return { category: 'warning', type: 'network' };
  }
}

/**
 * Преобразует любую ошибку в GlobalError с расширенной информацией
 * Используется в useErrorHandler для унификации ошибок
 */
export function toGlobalError(error: unknown): GlobalError {
  const timestamp = Date.now();

  if (typeof error === 'string') {
    return {
      message: error,
      category: 'info',
      type: 'unknown',
      timestamp,
      autoHide: true,
      duration: 5000,
      priority: 'low',
    };
  }

  if (isAxiosError(error)) {
    const status = error.response?.status;
    const { category, type } = getErrorMetadata(status);
    const priority = category === 'critical' ? 'high' : category === 'warning' ? 'medium' : 'low';

    return {
      message: getAxiosErrorMessage(error),
      category,
      type,
      code: status,
      timestamp,
      autoHide: category !== 'critical',
      duration: category === 'critical' ? 10000 : 5000,
      details: {
        url: error.config?.url,
        method: error.config?.method,
      },
      priority,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      category: 'warning',
      type: 'unknown',
      timestamp,
      autoHide: true,
      duration: 5000,
      priority: 'medium',
    };
  }

  return {
    message: 'Произошла неизвестная ошибка',
    category: 'warning',
    type: 'unknown',
    timestamp,
    autoHide: true,
    duration: 5000,
    priority: 'medium',
  };
}
