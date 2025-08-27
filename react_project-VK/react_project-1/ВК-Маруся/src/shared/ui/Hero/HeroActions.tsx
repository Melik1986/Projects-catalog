import React, { useCallback } from 'react';
import { Button } from '@/shared/ui';
import buttonStyles from '@/shared/ui/Button/Button.module.scss';
import SpriteIcon from '../SpriteIcon/SpriteIcon';
import { useFavoriteActions } from '@/modules/Favorites';
import type { HeroActions as HeroActionsType, Movie } from '../../types';
import styles from './Hero.module.scss';

interface HeroActionsProps {
  actions: Omit<HeroActionsType, 'isFavorite' | 'onFavoriteClick'>;
  movie?: Movie;
  openAuthModal?: () => void;
  buttonSize?: 'default' | 'wide';
  showActions?: boolean;
}

const HeroActions: React.FC<HeroActionsProps> = React.memo(
  ({ actions, movie, openAuthModal, buttonSize = 'default', showActions = false }) => {
    const { onTrailerClick, onInfoClick, onRefreshClick } = actions;
    const { isFavorite, handleFavoriteClick } = useFavoriteActions(openAuthModal);

    const handleFavoriteButtonClick = useCallback(() => {
      if (movie) {
        handleFavoriteClick(movie);
      }
    }, [handleFavoriteClick, movie]);

    const isMovieFavorite = movie ? isFavorite(movie.id) : false;

    return (
      <div className={styles.hero__actions}>
        {onTrailerClick && (
          <Button
            variant="blue"
            onClick={onTrailerClick}
            className={`${styles.hero__button_trailer} ${buttonSize === 'wide' ? styles['hero__button_trailer--wide'] : ''}`}
          >
            Трейлер
          </Button>
        )}
        {onInfoClick && showActions && (
          <Button variant="dark" onClick={onInfoClick} className={styles.hero__button_info}>
            О фильме
          </Button>
        )}
        <Button
          variant="small"
          className={`${isMovieFavorite ? styles.iconBtn_active : ''} ${styles.hero__button_favorite}`}
          onClick={handleFavoriteButtonClick}
          aria-label="Избранное"
        >
          <SpriteIcon
            id="heart"
            className={`${buttonStyles.icon__heart} ${isMovieFavorite ? buttonStyles.icon__heart_active : ''}`}
          />
        </Button>
        {onRefreshClick && showActions && (
          <Button
            variant="small"
            onClick={onRefreshClick}
            aria-label="Обновить"
            className={styles.hero__button_refresh}
          >
            <SpriteIcon id="refresh" className={buttonStyles.icon__refresh} />
          </Button>
        )}
      </div>
    );
  },
);

HeroActions.displayName = 'HeroActions';

export default HeroActions;
