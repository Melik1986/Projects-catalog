// Типы для централизованной системы ошибок
import type { ReactNode } from 'react';

/**
 * Категории ошибок для различной обработки
 */
export type ErrorCategory = 'critical' | 'warning' | 'info';

/**
 * Типы ошибок по источнику
 */
export type ErrorType =
  | 'network'
  | 'validation'
  | 'auth'
  | 'permission'
  | 'notFound'
  | 'server'
  | 'unknown';

/**
 * Глобальная ошибка с расширенной информацией
 */
export interface GlobalError {
  message: string;
  category?: ErrorCategory;
  type?: ErrorType;
  code?: string | number;
  details?: Record<string, unknown>;
  timestamp?: number;
  autoHide?: boolean;
  duration?: number;
  priority?: 'high' | 'medium' | 'low';
}

// Пропсы для ErrorBoundary
export interface ErrorBoundaryProps {
  children: ReactNode;
}

// Состояние ErrorBoundary
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

// Пропсы для ErrorDisplay
export interface ErrorDisplayProps {
  error?: Error | string | GlobalError | null;
  title?: string;
  message?: string;
  showRetry?: boolean;
  showDetails?: boolean;
  onRetry?: () => void;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  actions?: ReactNode;
}

// Информация об ошибке React
export interface ErrorInfo {
  componentStack: string;
}
