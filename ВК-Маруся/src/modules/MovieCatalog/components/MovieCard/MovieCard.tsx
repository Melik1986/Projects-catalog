import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { Movie } from '@/shared/types';
import SpriteIcon from '@/shared/ui/SpriteIcon/SpriteIcon';
import { useAppSelector, useAppDispatch } from '@/shared/lib/store';
import { addToFavorites, removeFromFavorites, selectFavoriteIdsSet } from '@/modules/Favorites';
import styles from './MovieCard.module.scss';
import {
  optimizeCloudinaryImage,
  generateCloudinaryImageSrcSet,
  CLOUDINARY_SIZES,
} from '@/shared/lib/utils/cloudinary';

export interface MovieCardProps {
  movie: Movie;
  showRanking?: boolean;
  ranking?: number;
  onClick?: (movie: Movie) => void;
  openAuthModal?: () => void;
  itemSize?: 'default' | 'large' | 'genre';
  modifier?: string;
  isPriority?: boolean;
  showRemoveButton?: boolean;
  onRemoveFavorite?: (movie: Movie) => void;
}

const MovieCardComponent: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  openAuthModal,
  showRanking,
  ranking,
  isPriority = false,
  itemSize,
  modifier,
  showRemoveButton,
  onRemoveFavorite,
}) => {
  const favoriteIdsSet = useAppSelector(selectFavoriteIdsSet);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current && isPriority) {
      imgRef.current.setAttribute('fetchpriority', 'high');
    } else if (imgRef.current) {
      imgRef.current.setAttribute('fetchpriority', 'low');
    }
  }, [isPriority, movie.posterUrl]);

  const handleFavoriteButtonClick = useCallback(
    async (e: React.MouseEvent): Promise<void> => {
      e.stopPropagation();
      if (!isAuthenticated) {
        openAuthModal?.();
        return;
      }
      const isCurrentlyFavorite = favoriteIdsSet.has(movie.id);
      if (isCurrentlyFavorite) {
        await dispatch(removeFromFavorites(movie.id.toString()));
      } else {
        await dispatch(addToFavorites(movie.id.toString()));
      }
    },
    [dispatch, isAuthenticated, openAuthModal, favoriteIdsSet, movie],
  );

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  const handleCardClick = useCallback(() => {
    onClick?.(movie);
  }, [onClick, movie]);

  const isMovieFavorite = favoriteIdsSet.has(movie.id);

  const { width, height } = CLOUDINARY_SIZES.movieCard;
  const optimizedPosterUrl = optimizeCloudinaryImage(movie.posterUrl || '', { width, height });
  const srcSet = generateCloudinaryImageSrcSet(movie.posterUrl || '', width, height);

  return (
    <div
      className={[
        styles['movie-card'],
        itemSize === 'large' ? styles['movie-card--large'] : '',
        modifier ? styles[`movie-card--${modifier}`] : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      data-movie-card
    >
      <div className={styles['movie-card__image-container']}>
        {!imageError && (
          <img
            ref={imgRef}
            src={optimizedPosterUrl}
            srcSet={srcSet}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 224px"
            alt={movie.title}
            className={`${styles['movie-card__poster']} ${imageLoaded ? styles['movie-card__poster--loaded'] : ''}`}
            loading={isPriority ? 'eager' : 'lazy'}
            decoding="async"
            width={width}
            height={height}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </div>
      {showRanking && (
        <div className={styles['movie-card__rank']}>
          <span className={styles['movie-card__rank-number']}>{ranking}</span>
        </div>
      )}
      <button
        className={`${styles['movie-card__favorite-btn']} ${isMovieFavorite ? styles['movie-card__favorite-btn--active'] : ''}`}
        onClick={handleFavoriteButtonClick}
        aria-label={isMovieFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        aria-pressed={isMovieFavorite}
      >
        <SpriteIcon id="heart" className={styles['movie-card__heart-icon']} />
      </button>
      {showRemoveButton && (
        <button
          className={styles['movie-card__remove-btn']}
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFavorite?.(movie);
          }}
          aria-label="Удалить из избранного"
        >
          <SpriteIcon id="close" className={styles['movie-card__remove-icon']} />
        </button>
      )}
    </div>
  );
};

MovieCardComponent.displayName = 'MovieCard';

export const MovieCard = React.memo(MovieCardComponent);
