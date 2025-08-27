import React, { Suspense } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import type { Movie } from '@/shared/types';
import { LoadingSpinner, ErrorDisplay } from '@/shared/ui';
import SEO from '@/shared/ui/SEO/SEO';

import { useGenreMovies, MovieGrid } from '@/modules/MovieCatalog';
import { useModal } from '@/shared/lib/hooks/useModal';
import { translateGenre } from '@/shared/lib/utils';
import { Modal } from '@/shared/ui';
import SpriteIcon from '@/shared/ui/SpriteIcon/SpriteIcon';

import styles from './Genre.module.scss';

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

interface GenreParams {
  genreName?: string;
  [key: string]: string | undefined;
}

const Genre: React.FC = () => {
  const { genreName } = useParams<GenreParams>();
  const navigate = useNavigate();
  const { isOpen: isAuthOpen, openModal: openAuth, closeModal: closeAuth } = useModal();
  const [authMode, setAuthMode] = React.useState<'login' | 'register'>('login');

  const { movies, loading, error, hasMoreMovies, loadMovies, loadMoreMovies, retryLoad } =
    useGenreMovies();

  const translatedGenre = genreName ? translateGenre(genreName) : 'Неизвестный жанр';

  React.useEffect(() => {
    if (genreName) {
      loadMovies(genreName);
    }
  }, [genreName, loadMovies]);

  const handleMovieClick = React.useCallback(
    (movie: Movie): void => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate],
  );

  const handleLoadMore = React.useCallback((): void => {
    if (genreName && !loading && hasMoreMovies) {
      loadMoreMovies(genreName);
    }
  }, [genreName, loading, hasMoreMovies, loadMoreMovies]);

  if (error) {
    return (
      <main className={styles.genre}>
        <div className={styles.genre__header}>
          <Link to="/genres" className={styles.genre__back}>
            <SpriteIcon id="arrow-left" />
            Назад к жанрам
          </Link>
          <h1 className={styles.genre__title}>{translatedGenre}</h1>
        </div>
        <ErrorDisplay
          error={error}
          title={`Ошибка загрузки фильмов жанра "${translatedGenre}" `}
          onRetry={retryLoad}
          showRetry={true}
          size="large"
        />
      </main>
    );
  }

  if (loading && movies.length === 0) {
    return (
      <main className={styles.genre}>
        <div className={styles.genre__header}>
          <Link to="/genres" className={styles.genre__back}>
            <SpriteIcon id="back" className={styles.genre__back_icon} />
          </Link>
          <h1 className={styles.genre__title}>{translatedGenre}</h1>
        </div>
        <LoadingSpinner size="large" text={`Загрузка фильмов жанра "${translatedGenre}" ...`} />
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${translatedGenre} - Фильмы жанра | ВК Маруся`}
        description={`Смотрите лучшие фильмы жанра ${translatedGenre}. Большая коллекция качественного кино.`}
        keywords={`${translatedGenre}, фильмы ${genreName}, кино, ВК Маруся`}
      />
      <main className={styles.genre}>
        <div className={styles.genre__header}>
          <Link to="/genres" className={styles.genre__back}>
            <SpriteIcon id="back" className={styles.genre__back_icon} />
          </Link>
          <h1 className={styles.genre__title}>{translatedGenre}</h1>
        </div>

        <div className={styles.genre__content}>
          <MovieGrid
            movies={movies}
            onMovieClick={handleMovieClick}
            hasMoreMovies={hasMoreMovies}
            isLoading={loading}
            onLoadMore={handleLoadMore}
            openAuthModal={openAuth}
            variant="scrollable"
            cardModifier="genre"
          />
        </div>

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

export default Genre;
