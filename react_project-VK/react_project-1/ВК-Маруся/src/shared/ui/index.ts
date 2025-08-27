// Shared UI компоненты
// Только базовые UI компоненты, без импортов из модулей

// Error handling components
export { default as ErrorBoundary } from '@/shared/lib/errors/ErrorBoundary/ErrorBoundary';
export { ErrorDisplay } from '@/shared/lib/errors/ErrorDisplay/ErrorDisplay';

// Layout components
export { Header } from './layout';
export { Footer } from './layout';

// Basic UI components
export * from './Button';
export * from './Modal';
export * from './LoadingSpinner';
export * from './Logo';
export * from './RatingBadge';
export * from './SpriteIcon';
export * from './InputField';
export * from './SEO';
export { Hero } from './Hero';

// Примечание: Компоненты из модулей (MovieCard, MovieGrid, SearchInput)
// должны импортироваться напрямую из их Public API, а не через shared/ui
