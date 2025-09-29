import React from 'react';
import { GenreCard } from '../GenreCard';
import styles from './GenresGrid.module.scss';

interface GenresGridProps {
  genres: string[];
  loading?: boolean;
}

export const GenresGrid: React.FC<GenresGridProps> = ({ genres, loading = false }) => {
  if (loading) {
    return <div className={styles.loading}>Загрузка жанров...</div>;
  }

  if (!genres || !Array.isArray(genres) || genres.length === 0) {
    return <div className={styles.loading}>Жанры не найдены</div>;
  }

  return (
    <div className={styles.genres__grid}>
      {genres.map((genre) => (
        <div key={genre} data-genre-card>
          <GenreCard genre={genre} />
        </div>
      ))}
    </div>
  );
};
