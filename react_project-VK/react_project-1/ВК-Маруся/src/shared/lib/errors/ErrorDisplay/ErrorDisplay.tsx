import React from 'react';
import type { ErrorDisplayProps } from '@/shared/types/errors';
import styles from './ErrorDisplay.module.scss';

/**
 * Упрощенный компонент для отображения ошибок
 */
export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  title,
  message,
  showRetry = true,
  showDetails = false,
  onRetry,
  className,
  actions,
}) => {
  const getErrorMessage = (): string => {
    if (message) return message;
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    if (error && typeof error === 'object' && 'message' in error) {
      return (error as { message: string }).message;
    }
    return 'Произошла неожиданная ошибка';
  };

  const getIcon = (): string => {
    if (typeof error === 'object' && error !== null && 'priority' in error) {
      switch ((error as { priority: string }).priority) {
        case 'high':
          return '❌';
        case 'medium':
          return '⚠️';
        case 'low':
          return 'ℹ️';
        default:
          return '❌';
      }
    }
    return '❌';
  };

  const displayTitle = title || 'Что-то пошло не так';
  const displayMessage = getErrorMessage();

  const handleRetry = (): void => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <div className={`${styles.error__Display} ${className || ''}`}>
      <div className={styles.error__Content}>
        <div className={styles.error__Icon}>{getIcon()}</div>
        <h2 className={styles.error__Title}>{displayTitle}</h2>
        <p className={styles.error__Message}>{displayMessage}</p>
        {actions ? (
          <div className={styles.error__Actions}>{actions}</div>
        ) : showRetry ? (
          <div className={styles.error__Actions}>
            <button type="button" className={styles.error__retryButton} onClick={handleRetry}>
              Попробовать снова
            </button>
          </div>
        ) : null}
        {showDetails && error && (
          <details className={styles.error__Details}>
            <summary>Техническая информация</summary>
            <div className={styles.error__Stack}>
              <strong>Error:</strong> {displayMessage}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;
