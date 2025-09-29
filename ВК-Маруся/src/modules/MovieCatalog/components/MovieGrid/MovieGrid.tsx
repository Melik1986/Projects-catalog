import React, { useCallback } from 'react';
import type { Movie } from '@/modules/MovieCatalog/types/movie';
import type { MovieGridProps } from '@/modules/MovieCatalog/types/movieGrid';
import { useInfiniteScroll } from '@/shared/lib/hooks';
import { MovieCard } from '@/modules/MovieCatalog/components/MovieCard';
import { ErrorDisplay } from '@/shared/lib/errors';
import styles from './MovieGrid.module.scss';

export const MovieGrid = React.memo<MovieGridProps>(
  ({
    movies,
    showRanking = false,
    maxItems,
    onMovieClick,
    openAuthModal,
    className,
    variant,
    itemSize = 'default',
    cardModifier,
    hasMoreMovies = false,
    isLoading = false,
    onLoadMore,
  }) => {
    // Infinite scroll
    const { sentinelRef } = useInfiniteScroll({
      onLoadMore,
      hasMoreData: hasMoreMovies,
      isLoading,
    });

    const handleMovieClick = useCallback(
      (movie: Movie) => {
        onMovieClick?.(movie);
      },
      [onMovieClick],
    );

    const displayedMovies =
      maxItems && movies && movies.length > maxItems ? movies.slice(0, maxItems) : movies;

    if (!movies || movies.length === 0) {
      return (
        <ErrorDisplay
          title="Фильмы не найдены"
          message="К сожалению, по вашему запросу фильмы не найдены."
          size="medium"
        />
      );
    }

    const gridClassName = [styles.grid, variant && styles[`grid--${variant}`], className]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={gridClassName}>
        {displayedMovies.map((movie, idx) => (
          <div key={movie.id} style={{ animationDelay: `${idx * 50}ms` }} data-movie-card>
            <MovieCard
              movie={movie}
              showRanking={showRanking}
              ranking={idx + 1}
              onClick={() => handleMovieClick(movie)}
              openAuthModal={openAuthModal}
              itemSize={itemSize}
              modifier={cardModifier}
              isPriority={idx < 3}
            />
          </div>
        ))}
        {hasMoreMovies && <div ref={sentinelRef} className={styles.sentinel} />}
      </div>
    );
  },
);
