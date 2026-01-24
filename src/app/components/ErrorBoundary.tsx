import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you would send this to an error tracking service
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided by parent
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-red-600 text-5xl">error</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-['Archivo_Black'] text-[#243D68] mb-3 uppercase">
              Oops! Terjadi Kesalahan
            </h1>

            {/* Description */}
            <p className="text-[#6B7280] text-base leading-relaxed mb-6">
              Maaf, aplikasi mengalami kesalahan yang tidak terduga. Tim kami telah menerima laporan ini dan akan segera memperbaikinya.
            </p>

            {/* Error Details (only in development) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-left mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                <summary className="cursor-pointer font-semibold text-red-800 mb-2">
                  Detail Error (Development Mode)
                </summary>
                <pre className="text-xs text-red-700 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.error.stack}
                </pre>
              </details>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-[#243D68] text-white rounded-xl font-bold hover:bg-[#1a2d4d] transition-colors"
              >
                Coba Lagi
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-[#FAC06E] text-[#243D68] rounded-xl font-bold hover:bg-[#f4b555] transition-colors"
              >
                Kembali ke Beranda
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Functional wrapper for easier usage with hooks
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
