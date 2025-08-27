import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Movie } from '@/modules/MovieCatalog/types/movie';
import { MovieCard } from '@/modules/MovieCatalog/components/MovieCard';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { ErrorDisplay } from '@/shared/lib/errors/ErrorDisplay';
import { useFavoriteActions } from '../../hooks/useFavoriteActions';
import styles from './FavoritesList.module.scss';

interface FavoritesListProps {
  openAuthModal?: () => void;
}

const FavoritesListComponent: React.FC<FavoritesListProps> = ({ openAuthModal }) => {
  const navigate = useNavigate();
  const { movies: favoriteMovies, isLoading, removeFromFavorites } = useFavoriteActions();

  const handleMovieClick = useCallback(
    (movie: Movie) => {
      navigate(`/movie/${movie.id}`);
    },
    [navigate],
  );

  const handleRemoveFavorite = useCallback(
    (movie: Movie) => {
      removeFromFavorites(movie.id);
    },
    [removeFromFavorites],
  );

  const sortedMovies = useMemo(() => {
    return [...(favoriteMovies || [])].sort((a, b) => a.title.localeCompare(b.title));
  }, [favoriteMovies]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <LoadingSpinner size="large" text="Загружаем ваши любимые фильмы..." />
      </div>
    );
  }

  if (!favoriteMovies || favoriteMovies.length === 0) {
    return (
      <div className={styles.container}>
        <ErrorDisplay
          title="Список избранного пуст"
          message="Вы еще не добавили ни одного фильма в избранное. Найдите интересные фильмы и добавьте их!"
          size="large"
        />
      </div>
    );
  }

  return (
    <section className={styles['favorites-list']}>
      <h2 className={`${styles['favorites-list__title']} visualhidden`}>Избранные фильмы</h2>
      <div className={styles['favorites-list__grid']}>
        {sortedMovies.map((movie, idx) => (
          <div key={movie.id} style={{ animationDelay: `${idx * 50}ms` }}>
            <MovieCard
              movie={movie}
              onClick={() => handleMovieClick(movie)}
              openAuthModal={openAuthModal}
              data-movie-card
              showRemoveButton={true}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

FavoritesListComponent.displayName = 'FavoritesList';

export const FavoritesList = React.memo(FavoritesListComponent);
