import React from 'react';
import type { Movie } from '@/shared/types';
import { RatingBadge } from '@/shared/ui/RatingBadge/RatingBadge';
import styles from './SearchInput.module.scss';
import { optimizeCloudinaryImage, CLOUDINARY_SIZES } from '@/shared/lib/utils/cloudinary';

interface SearchDropdownProps {
  movies: Movie[];
  onItemClick: (id: number) => void;
  isVisible: boolean;
}

export const SearchDropdown: React.FC<SearchDropdownProps> = React.memo(
  ({ movies, onItemClick, isVisible }) => {
    if (!isVisible || !movies || movies.length === 0) {
      return null;
    }

    return (
      <ul className={styles['search__dropdown']}>
        {movies.slice(0, 5).map((movie) => (
          <li
            key={movie.id}
            className={styles['search__dropdown-item']}
            onMouseDown={(): void => onItemClick(movie.id)}
          >
            {movie.posterUrl && (
              <img
                src={optimizeCloudinaryImage(movie.posterUrl, CLOUDINARY_SIZES.searchDropdown)}
                alt={movie.title}
                className={styles['search__dropdown-item-poster']}
                loading="lazy"
                width="40"
                height="60"
              />
            )}
            <div className={styles['search__dropdown-item-info']}>
              <div className={styles['search__dropdown-item-meta']}>
                <RatingBadge rating={movie.tmdbRating} />
                {movie.releaseYear}
                {Array.isArray(movie.genres) && movie.genres.length > 0 && (
                  <span className={styles['search__dropdown-item-genre']}>{movie.genres[0]}</span>
                )}
                {movie.runtime && (
                  <span className={styles['search__dropdown-item-runtime']}>
                    {movie.runtime} мин
                  </span>
                )}
              </div>
              <div className={styles['search__dropdown-item-title']}>{movie.title}</div>
            </div>
          </li>
        ))}
      </ul>
    );
  },
);

SearchDropdown.displayName = 'SearchDropdown';
