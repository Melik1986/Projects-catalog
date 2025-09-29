import React from 'react';
import { Link } from 'react-router-dom';
import { translateGenre } from '@/shared/lib/utils';
import { GENRE_IMAGES } from '@/modules/MovieCatalog/constants/genres';
import styles from './GenreCard.module.scss';

export interface GenreCardProps {
  genre: string;
}

export const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  const displayName = translateGenre(genre);
  const image = (GENRE_IMAGES && GENRE_IMAGES[genre as keyof typeof GENRE_IMAGES]) || (GENRE_IMAGES && GENRE_IMAGES.drama) || '';

  return (
    <Link
      to={`/genre/${encodeURIComponent(genre)}`}
      className={styles.genres__card}
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <h3 className={styles.genres__card_title}>{displayName}</h3>
    </Link>
  );
};
