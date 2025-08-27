// Централизованный экспорт системы обработки ошибок
export { default as ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
export { ErrorDisplay } from './ErrorDisplay/ErrorDisplay';
export { useErrorHandler } from './hooks/useErrorHandler';
export { setGlobalError, clearGlobalError, selectGlobalError } from './slices/errorSlice';
export type { GlobalError } from '../../types';
export type { ErrorDisplayProps, ErrorBoundaryProps } from '../../types';
