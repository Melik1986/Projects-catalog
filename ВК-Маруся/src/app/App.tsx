import React from 'react';
import AppRouter from './providers/routes/AppRouter';
import ErrorBoundary from '@/shared/lib/errors/ErrorBoundary/ErrorBoundary';
import { ErrorDisplay } from '@/shared/lib/errors';
import { useAppSelector, useAppDispatch } from '@/shared/lib/store';
import { selectGlobalError, clearGlobalError } from '@/shared/lib/errors/slices/errorSlice';
import { useGlobalErrorTimer } from '@/shared/lib/errors/hooks/useGlobalErrorTimer';
import AppInitializer from './AppInitializer';
import '@/assets/styles/global.scss';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const App: React.FC = () => {
  const globalError = useAppSelector(selectGlobalError);
  const dispatch = useAppDispatch();
  useGlobalErrorTimer();

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {globalError && (
          <ErrorDisplay
            error={globalError}
            title="Ошибка"
            onRetry={() => dispatch(clearGlobalError())}
            showRetry={globalError.category !== 'critical'}
            size="medium"
          />
        )}
        <AppInitializer>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <AppRouter />
          </BrowserRouter>
        </AppInitializer>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
