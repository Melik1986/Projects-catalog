import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchRandomMovie, clearRandomMovie } from '@/modules/MovieCatalog/store/moviesSlice';
import { useErrorHandler } from '@/shared/lib/errors/hooks/useErrorHandler';
import { useAppDispatch } from '@/shared/lib/store';
import type { RootState } from '@/shared/lib/store';
import type { Movie } from '@/shared/types';

export const useHomeActions = (): {
  randomMovie: Movie | null;
  loading: boolean;
  isTrailerOpen: boolean;
  handleWatchTrailer: () => void;
  handleCloseModal: () => void;
  navigateToMovie: (id: string) => void;
  pickRandomMovie: () => Promise<void>;
} => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const randomMovie = useSelector((state: RootState) => state.movies.randomMovie);
  const loading = useSelector((state: RootState) => state.movies.isLoadingRandom);
  const { showError } = useErrorHandler();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadRandomMovie = useCallback(async (): Promise<void> => {
    try {
      await dispatch(fetchRandomMovie()).unwrap();
    } catch (error) {
      showError(error);
    }
  }, [dispatch, showError]);

  useEffect(() => {
    loadRandomMovie();
    return (): void => {
      dispatch(clearRandomMovie());
    };
  }, [dispatch, showError, loadRandomMovie]);

  const handleWatchTrailer = useCallback((): void => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback((): void => {
    setIsModalOpen(false);
  }, []);

  const navigateToMovie = useCallback(
    (id: string): void => {
      navigate(`/movie/${id}`);
    },
    [navigate],
  );

  const pickRandomMovie = useCallback(async (): Promise<void> => {
    try {
      await dispatch(fetchRandomMovie()).unwrap();
    } catch (error) {
      showError(error);
    }
  }, [dispatch, showError]);

  return {
    randomMovie,
    loading,
    isTrailerOpen: isModalOpen,
    handleWatchTrailer,
    handleCloseModal,
    navigateToMovie,
    pickRandomMovie,
  };
};
