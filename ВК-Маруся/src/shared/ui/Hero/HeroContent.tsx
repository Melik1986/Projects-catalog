import React from 'react';
import { RatingBadge } from '../RatingBadge/RatingBadge';
import { translateGenre } from '../../lib/utils';
import type { MovieInfo } from '../../types';
import styles from './Hero.module.scss';

const HeroContent: React.FC<{ movieInfo: MovieInfo }> = React.memo(({ movieInfo }) => {
  const { title, subtitle, tmdbRating, releaseYear, genre, duration } = movieInfo;

  const truncatedTitle = title.length > 60 ? `${title.slice(0, 60)}...` : title;
  const truncatedSubtitle =
    subtitle && subtitle.length > 180 ? `${subtitle.slice(0, 180)}...` : subtitle;

  return (
    <>
      <div className={styles.hero__meta}>
        <RatingBadge rating={tmdbRating} />
        <span className={styles.hero__year}>{releaseYear}</span>
        <span className={styles.hero__genre}>{translateGenre(genre)}</span>
        <span className={styles.hero__duration}>{duration}</span>
      </div>
      <h1 className={styles.hero__title}>{truncatedTitle}</h1>
      {subtitle && <p className={styles.hero__subtitle}>{truncatedSubtitle}</p>}
    </>
  );
});

HeroContent.displayName = 'HeroContent';

export default HeroContent;
