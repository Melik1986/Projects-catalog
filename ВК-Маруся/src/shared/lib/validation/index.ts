import { z } from 'zod';

// Экспорт всех схем валидации
export * from './schemas';

// =============================================================================
// УТИЛИТЫ ДЛЯ РАБОТЫ С ОШИБКАМИ ВАЛИДАЦИИ
// =============================================================================

/**
 * Проверяет, является ли ошибка ошибкой валидации Zod
 */
export const isValidationError = (error: unknown): error is z.ZodError => {
  return error instanceof z.ZodError;
};

/**
 * Форматирует ошибки валидации Zod в удобочитаемый формат
 */
export const formatValidationErrors = (error: z.ZodError): Record<string, string> => {
  const formattedErrors: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formattedErrors[path] = err.message;
  });

  return formattedErrors;
};

/**
 * Получает первую ошибку валидации в виде строки
 */
export const getValidationError = (error: z.ZodError): string => {
  return error.errors[0]?.message || 'Ошибка валидации';
};

// =============================================================================
// ВАЛИДАЦИЯ API ОТВЕТОВ
// =============================================================================

/**
 * Создает валидатор для API ответов
 */
export const createApiValidator = <T>(schema: z.ZodSchema<T>) => {
  return (data: unknown): T => {
    const result = schema.safeParse(data);
    if (!result.success) {
      console.error('API Response validation failed:', result.error);
      throw new Error(`Некорректный формат данных от сервера`);
    }
    return result.data;
  };
};
