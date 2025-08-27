import React from 'react';
import styles from './LoadingSpinner.module.scss';
// Определяем интерфейс LoadingSpinnerProps локально
export interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text = 'Загрузка...',
  className,
}) => {
  return (
    <div className={`${styles.loadingContainer} ${className || ''}`}>
      <div className={`${styles.spinner} ${styles[size]}`}>
        <div className={styles.spinnerInner}></div>
      </div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
