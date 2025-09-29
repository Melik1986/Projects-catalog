import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { checkAuthStatus } from '@/modules/Authentication/store/authSlice';
import { fetchFavorites } from '@/modules/Favorites/store/favoritesSlice';
import type { RootState } from '@/app/store';
import { useAppDispatch } from '@/shared/lib/store';
import { useErrorHandler } from '@/shared/lib/errors/hooks/useErrorHandler';

import LoadingSpinner from '@/shared/ui/LoadingSpinner/LoadingSpinner';

const AppInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isInitialized } = useSelector((state: RootState) => state.auth);
  const { showError } = useErrorHandler();
  const favoritesLoadedRef = useRef(false);

  useEffect((): void => {
    const initializeApp = async (): Promise<void> => {
      try {
        const authResult = await dispatch(checkAuthStatus());
        // Загружаем избранное только если пользователь авторизован и еще не загружали
        if (checkAuthStatus.fulfilled.match(authResult) && !favoritesLoadedRef.current) {
          favoritesLoadedRef.current = true;
          await dispatch(fetchFavorites());
        }
      } catch (error) {
        showError(error);
      }
    };

    initializeApp();
  }, [dispatch, showError]);

  if (!isInitialized) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default AppInitializer;
