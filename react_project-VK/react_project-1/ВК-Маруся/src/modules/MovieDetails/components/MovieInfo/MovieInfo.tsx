import React from 'react';
import type { Movie } from '@/shared/types';
import styles from './MovieInfo.module.scss';

interface MovieInfoProps {
  movie: Movie;
}

/**
 * Компонент для отображения детальной информации о фильме
 */
export const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  const { director, cast, countriesOfOrigin, language, budget, revenue, awardsSummary } = movie;

  // Преобразование budget и revenue к числу, если возможно
  const budgetNumber = !isNaN(Number(budget)) ? Number(budget) : null;
  const revenueNumber = !isNaN(Number(revenue)) ? Number(revenue) : null;

  return (
    <section className={styles['movie-info']}>
      <h2 className={styles['movie-info__title']}>О фильме</h2>
      <div className={styles['movie-info__container']}>
        <ul className={styles['movie-info__details']}>
          {director && director.trim() && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Режиссёр:</span>
              <span className={styles['movie-info__value']}>{director}</span>
            </li>
          )}

          {cast && Array.isArray(cast) && cast.length > 0 && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>В ролях:</span>
              <span className={styles['movie-info__value']}>{cast.join(', ')}</span>
            </li>
          )}

          {countriesOfOrigin &&
            Array.isArray(countriesOfOrigin) &&
            countriesOfOrigin.length > 0 && (
              <li className={styles['movie-info__detail']}>
                <span className={styles['movie-info__label']}>Страна:</span>
                <span className={styles['movie-info__value']}>{countriesOfOrigin.join(', ')}</span>
              </li>
            )}

          {language && language.trim() && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Язык:</span>
              <span className={styles['movie-info__value']}>{language}</span>
            </li>
          )}

          {budgetNumber !== null && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Бюджет:</span>
              <span className={styles['movie-info__value']}>${budgetNumber.toLocaleString()}</span>
            </li>
          )}
          {/* Если budget строка, но не число, просто покажем как есть */}
          {budget && budgetNumber === null && budget.trim() && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Бюджет:</span>
              <span className={styles['movie-info__value']}>{budget}</span>
            </li>
          )}

          {revenueNumber !== null && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Сборы:</span>
              <span className={styles['movie-info__value']}>${revenueNumber.toLocaleString()}</span>
            </li>
          )}
          {revenue && revenueNumber === null && revenue.trim() && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Сборы:</span>
              <span className={styles['movie-info__value']}>{revenue}</span>
            </li>
          )}

          {awardsSummary && awardsSummary.trim() && (
            <li className={styles['movie-info__detail']}>
              <span className={styles['movie-info__label']}>Награды:</span>
              <span className={styles['movie-info__value']}>{awardsSummary}</span>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};
