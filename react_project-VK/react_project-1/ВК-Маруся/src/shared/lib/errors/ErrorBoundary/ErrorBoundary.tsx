import { Component, type ErrorInfo, type ReactNode } from 'react';
import type { ErrorBoundaryState } from '../../../types';
import { ErrorDisplay } from '../ErrorDisplay/ErrorDisplay';

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorDisplay error={this.state.error} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
