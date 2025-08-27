import { useState, useCallback, useMemo } from 'react';
import type { Movie } from '../../../shared/types';

interface UseTrailerModalResult {
  isTrailerOpen: boolean;
  videoId: string | null;
  handleOpenTrailer: () => void;
  handleCloseTrailer: () => void;
}

/**
 * Хук для управления модальным окном трейлера
 * Использует существующий useVideoPlayer для воспроизведения
 */
export const useTrailerModal = (movie: Movie | null): UseTrailerModalResult => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  // Извлекаем videoId из URL трейлера
  const videoId = useMemo(() => {
    if (!movie?.trailerUrl) return null;

    try {
      const url = new URL(movie.trailerUrl);

      // Поддержка различных форматов YouTube URL
      if (url.hostname.includes('youtube.com')) {
        return url.searchParams.get('v');
      }

      if (url.hostname.includes('youtu.be')) {
        return url.pathname.slice(1);
      }

      return null;
    } catch {
      return null;
    }
  }, [movie?.trailerUrl]);

  const handleOpenTrailer = useCallback((): void => {
    if (videoId) {
      setIsTrailerOpen(true);
    }
  }, [videoId]);

  const handleCloseTrailer = useCallback((): void => {
    setIsTrailerOpen(false);
  }, []);

  return {
    isTrailerOpen,
    videoId,
    handleOpenTrailer,
    handleCloseTrailer,
  };
};
