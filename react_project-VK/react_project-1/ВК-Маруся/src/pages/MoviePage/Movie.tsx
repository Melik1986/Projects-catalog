import React, { Suspense } from 'react';
import { Hero } from '@/shared/ui';
import { LoadingSpinner, ErrorDisplay } from '@/shared/ui';
import SEO from '@/shared/ui/SEO/SEO';
import { Modal } from '@/shared/ui';
import { MovieInfo, useTrailerModal } from '@/modules/MovieDetails';
import { useMovie } from '@/modules/MovieCatalog';
import { useModal } from '@/shared/lib/hooks/useModal';
import styles from './Movie.module.scss';

// Lazy loading для форм аутентификации
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

// Lazy loading для TrailerModal
const TrailerModal = React.lazy(
  () => import('@/modules/MovieDetails/components/TrailerModal/TrailerModal'),
);

const Movie: React.FC = () => {
  const { movie, loading, movieId } = useMovie();
  const { isOpen: isAuthOpen, openModal: openAuth, closeModal: closeAuth } = useModal();
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login');
  const { isTrailerOpen, videoId, handleOpenTrailer, handleCloseTrailer } = useTrailerModal(movie);

  if (loading) {
    return <LoadingSpinner size="large" text="Загрузка информации о фильме..." />;
  }

  if (!movie || !movieId) {
    return (
      <ErrorDisplay
        title="Фильм не найден"
        message="К сожалению, информация о запрашиваемом фильме не найдена."
        size="large"
      />
    );
  }

  return (
    <>
      <SEO
        title={`${movie.title} (${movie.releaseYear}) | ВК Маруся`}
        description={movie.plot || `Смотрите фильм ${movie.title} на ВК Маруся`}
        keywords={`${movie.title}, ${movie.genres?.join(', ')}, фильм, кино, трейлер`}
      />
      <main className={styles['movie-page']}>
        <Hero
          movieInfo={{
            title: movie.title,
            subtitle: movie.plot,
            tmdbRating: movie.tmdbRating,
            releaseYear: movie.releaseYear,
            genre: movie.genres?.join(', ') || 'Не указан',
            duration: `${movie.runtime || 120} мин`,
            posterUrl: movie.posterUrl,
          }}
          actions={{
            onTrailerClick: handleOpenTrailer,
          }}
          movie={movie}
          openAuthModal={openAuth}
          showActions={false}
        />
        <MovieInfo movie={movie} />

        {/* Lazy-loaded TrailerModal */}
        {isTrailerOpen && videoId && (
          <Suspense fallback={<LoadingSpinner size="small" text="Загрузка плеера..." />}>
            <TrailerModal open={isTrailerOpen} onClose={handleCloseTrailer} videoId={videoId} />
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
      </main>
    </>
  );
};

export default Movie;
