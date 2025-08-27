import { useEffect, useState, useCallback } from 'react';

/**
 * Хук для дебаунса значения
 * @param value - значение для дебаунса
 * @param delay - задержка в миллисекундах (по умолчанию 150ms)
 * @returns дебаунсированное значение
 */
export const useDebounce = <T>(value: T, delay: number = 150): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const updateValue = useCallback((): void => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(updateValue, delay);

    return (): void => {
      clearTimeout(handler);
    };
  }, [updateValue, delay]);

  return debouncedValue;
};
