import React from 'react';
import SpriteIcon from '../SpriteIcon/SpriteIcon';
import styles from './RatingBadge.module.scss';

interface RatingBadgeProps {
  rating: number;
  maxRating?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showText?: boolean;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating, className }) => {
  let colorClass = styles['rating-badge--gray'];
  if (rating >= 8) colorClass = styles['rating-badge--green'];
  else if (rating >= 6) colorClass = styles['rating-badge--yellow'];

  return (
    <span className={`${styles['rating-badge']} ${colorClass} ${className || ''}`}>
      <SpriteIcon id="star" className={styles['rating-badge__star']} />
      {rating}
    </span>
  );
};
