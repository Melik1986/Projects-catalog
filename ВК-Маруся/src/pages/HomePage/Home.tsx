import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { useHomeData } from '@/pages/HomePage/hooks/useHomeData';
import { useHomeActions } from '@/pages/HomePage/hooks/useHomeActions';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Hero } from '@/shared/ui';
import { MovieGrid } from '@/modules/MovieCatalog';
import { Modal } from '@/shared/ui';
import SEO from '@/shared/ui/SEO/SEO';
import { LoadingSpinner } from '@/shared/ui';

import type { Movie } from '@/shared/types';
import styles from './Home.module.scss';

// Lazy loading для тяжелых компонентов с формами
const LoginForm = React.lazy(() =>
  import('@/modules/Authentication/ui/LoginForm/LoginForm').then((module) => ({
    default: module.LoginForm,
  })),
);
const RegisterForm = React.lazy(() =>
  import('@/modules/Authentication/ui/RegisterForm/RegisterForm').then((module) => ({
    default: module.RegisterForm,
  })),
);
const TrailerModal = React.lazy(
  () => import('@/modules/MovieDetails/components/TrailerModal/TrailerModal'),
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isOpen: isAuthOpen, openModal: openAuth, closeModal: closeAuth } = useModal();

  const { movies, loading } = useHomeData();
  const {
    randomMovie,
    isTrailerOpen,
    handleWatchTrailer,
    handleCloseModal,
    navigateToMovie,
    pickRandomMovie,
  } = useHomeActions();
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login');

  const handleMovieClick = React.useCallback(
    (movie: Movie): void => navigate(`/movie/${movie.id}`),
    [navigate],
  );

  if (loading) return <LoadingSpinner size="large" text="Загрузка фильмов..." />;

  return (
    <>
      <SEO
        title="ВК Маруся | Главная"
        description="Откройте для себя мир кино с ВК Маруся."
        keywords="фильмы, кино, трейлеры"
      />
      <main className={styles['home-page']}>
        {randomMovie && (
          <Hero
            movieInfo={{
              title: randomMovie.title,
              subtitle: randomMovie.plot,
              tmdbRating: randomMovie.tmdbRating,
              releaseYear: randomMovie.releaseYear,
              genre: randomMovie.genres?.join(', ') || 'Не указан',
              duration: `${randomMovie.runtime || 120} мин`,
              posterUrl: randomMovie.posterUrl,
            }}
            actions={{
              onTrailerClick: handleWatchTrailer,
              onInfoClick: () => navigateToMovie(randomMovie.id.toString()),
              onRefreshClick: pickRandomMovie,
            }}
            movie={randomMovie}
            openAuthModal={openAuth}
            showActions={true}
          />
        )}

        {/* Lazy-loaded TrailerModal */}
        {isTrailerOpen && (
          <Suspense fallback={<LoadingSpinner size="small" text="Загрузка плеера..." />}>
            <TrailerModal
              open={isTrailerOpen}
              onClose={handleCloseModal}
              videoId={randomMovie?.trailerYouTubeId || ''}
            />
          </Suspense>
        )}

        {/* Lazy-loaded Auth Forms */}
        <Modal open={isAuthOpen} onClose={closeAuth}>
          <Suspense fallback={<LoadingSpinner size="small" text="Загрузка формы..." />}>
            {authMode === 'login' ? (
              <LoginForm onSuccess={closeAuth} onSwitchMode={() => setAuthMode('register')} />
            ) : (
              <RegisterForm onSuccess={closeAuth} onSwitchMode={() => setAuthMode('login')} />
            )}
          </Suspense>
        </Modal>

        <div className={styles['home-page__grid']}>
          <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
        </div>
      </main>
    </>
  );
};

export default Home;
