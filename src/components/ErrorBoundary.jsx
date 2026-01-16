import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <div className="error-fallback__card">
            <div className="error-fallback__icon">⚠️</div>
            <h2 className="error-fallback__title">Something went wrong</h2>
            <p className="error-fallback__message">
              {this.state.error?.message || 'An unexpected error occurred with the 3D scene.'}
            </p>
            <p className="error-fallback__hint">
              Try refreshing the page or updating your browser.
            </p>
            <button
              className="error-fallback__button"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
