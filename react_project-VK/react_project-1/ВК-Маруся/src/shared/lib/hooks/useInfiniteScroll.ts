import { useRef, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  /** Функция загрузки новых данных */
  onLoadMore?: () => void;
  /** Есть ли еще данные для загрузки */
  hasMoreData?: boolean;
  /** Флаг загрузки */
  isLoading?: boolean;
  /** Отключить бесконечный скролл */
  disabled?: boolean;
}

interface UseInfiniteScrollReturn {
  /** Ref для элемента-сентинеля (наблюдаемого элемента) */
  sentinelRef: React.RefObject<HTMLDivElement>;
}

/**
 * Простой хук для бесконечного скролла
 * Отслеживает пересечение sentinel элемента и вызывает onLoadMore
 */
export const useInfiniteScroll = ({
  onLoadMore,
  hasMoreData = false,
  isLoading = false,
  disabled = false,
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];

      if (entry?.isIntersecting && hasMoreData && !isLoading && !disabled && onLoadMore) {
        onLoadMore();
      }
    },
    [hasMoreData, isLoading, disabled, onLoadMore],
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || disabled) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '100px', // Загружаем за 100px до видимости
      threshold: 0.1,
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersection, disabled]);

  return { sentinelRef };
};
