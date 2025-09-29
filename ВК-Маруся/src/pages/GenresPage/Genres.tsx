import React, { useEffect } from 'react';
import { useGenres, GenresGrid } from '@/modules/MovieCatalog';
import { LoadingSpinner } from '@/shared/ui';
import SEO from '@/shared/ui/SEO/SEO';
import { useAppDispatch } from '@/shared/lib/store';
import { fetchGenres } from '@/modules/MovieCatalog/store/moviesSlice';
import styles from './Genres.module.scss';

const Genres: React.FC = () => {
  const dispatch = useAppDispatch();
  const { genres, loading } = useGenres();

  // Загружаем жанры только при заходе на страницу жанров
  useEffect(() => {
    if (!genres || genres.length === 0) {
      dispatch(fetchGenres('ru'));
    }
  }, [dispatch, genres]);

  if (loading) {
    return <LoadingSpinner size="large" text="Загрузка жанров..." />;
  }

  return (
    <>
      <SEO
        title="Жанры фильмов | ВК Маруся"
        description="Выберите жанр и найдите лучшие фильмы: боевики, комедии, драмы, фантастика и многое другое."
        keywords="жанры фильмов, категории кино, боевики, комедии, драмы, фантастика"
      />
      <main className={styles.genres}>
        <GenresGrid genres={genres} />
      </main>
    </>
  );
};

export default Genres;
