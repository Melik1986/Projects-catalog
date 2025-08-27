import React, { Suspense, useCallback } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/shared/lib/store';

import { LoadingSpinner } from '@/shared/ui';
import { Footer, Header } from '@/shared/ui/layout';

// Ленивая загрузка страниц
const Home = React.lazy(() => import('@/pages/HomePage/Home'));
const Movie = React.lazy(() => import('@/pages/MoviePage/Movie'));
const User = React.lazy(() => import('@/pages/UserPage/User'));
const Genres = React.lazy(() => import('@/pages/GenresPage/Genres'));
const Genre = React.lazy(() => import('@/pages/GenrePage/Genre'));
const NotFound = React.lazy(() => import('@/pages/NotFound/NotFound'));

// Компонент для защиты роутов
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

const AppRouter: React.FC = () => {
  const navigate = useNavigate();
  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        navigate(`/?search=${encodeURIComponent(query.trim())}`);
      }
    },
    [navigate],
  );

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner size="large" text="Загрузка страницы..." />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <Suspense fallback={<LoadingSpinner size="large" text="Загрузка страницы..." />}>
                <Movie />
              </Suspense>
            }
          />
          <Route
            path="/genres"
            element={
              <Suspense fallback={<LoadingSpinner size="large" text="Загрузка страницы..." />}>
                <Genres />
              </Suspense>
            }
          />
          <Route
            path="/genre/:genreName"
            element={
              <Suspense fallback={<LoadingSpinner size="large" text="Загрузка страницы..." />}>
                <Genre />
              </Suspense>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner size="large" text="Загрузка страницы..." />}>
                  <User />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingSpinner size="large" text="Загрузка страницы..." />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default AppRouter;
