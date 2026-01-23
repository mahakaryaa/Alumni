import { ReactNode } from 'react';

// Form Input with Error State
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  success?: boolean;
}

export function InputField({
  label,
  error,
  helperText,
  icon,
  success,
  className = '',
  ...props
}: InputFieldProps) {
  const hasError = !!error;
  const hasSuccess = success && !hasError;

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-[#0E1B33]">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {icon}
          </div>
        )}
        
        <input
          className={`
            w-full px-4 py-4 bg-[#F8F9FA] border-2 rounded-xl
            text-[#243D68] placeholder:text-[#6B7280]/50
            transition-all duration-200 outline-none
            ${icon ? 'pl-12' : ''}
            ${hasError 
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : hasSuccess 
                ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                : 'border-[#E5E7EB] focus:border-[#243D68] focus:ring-2 focus:ring-[#243D68]/20'
            }
            ${className}
          `}
          {...props}
        />
        
        {/* Error Icon */}
        {hasError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
            <span className="material-symbols-outlined text-xl">error</span>
          </div>
        )}
        
        {/* Success Icon */}
        {hasSuccess && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
            <span className="material-symbols-outlined text-xl">check_circle</span>
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-red-600">
          <span className="material-symbols-outlined text-sm">info</span>
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      
      {/* Helper Text */}
      {helperText && !error && (
        <p className="text-sm text-[#6B7280]">{helperText}</p>
      )}
    </div>
  );
}

// Alert Component
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Alert({ type, title, message, onClose, action }: AlertProps) {
  const styles = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: 'check_circle',
      iconColor: 'text-green-500',
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'error',
      iconColor: 'text-red-500',
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: 'warning',
      iconColor: 'text-amber-500',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'info',
      iconColor: 'text-blue-500',
    },
  };

  const currentStyle = styles[type];

  return (
    <div className={`${currentStyle.container} border-2 rounded-2xl p-4 flex items-start gap-3 shadow-sm animate-in slide-in-from-top-2 duration-300`}>
      {/* Icon */}
      <span className={`material-symbols-outlined text-2xl ${currentStyle.iconColor} shrink-0`}>
        {currentStyle.icon}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-bold text-sm mb-1">{title}</h4>}
        <p className="text-sm leading-relaxed">{message}</p>
        
        {/* Action Button */}
        {action && (
          <button
            onClick={action.onClick}
            className="mt-3 text-sm font-bold underline hover:no-underline transition-all"
          >
            {action.label}
          </button>
        )}
      </div>

      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity shrink-0"
          aria-label="Close alert"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      )}
    </div>
  );
}

// Toast Notification (can be used with state management)
interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  visible: boolean;
  onClose: () => void;
}

export function Toast({ type, message, visible, onClose }: ToastProps) {
  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-amber-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  if (!visible) return null;

  return (
    <div 
      className={`
        fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-[9999]
        ${styles[type]} px-6 py-4 rounded-2xl shadow-2xl
        flex items-center gap-3 min-w-[300px] max-w-md mx-4
        animate-in slide-in-from-bottom-4 duration-300
      `}
    >
      <span className="material-symbols-outlined text-2xl">
        {type === 'success' ? 'check_circle' : type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info'}
      </span>
      <p className="flex-1 font-semibold text-sm">{message}</p>
      <button
        onClick={onClose}
        className="hover:opacity-70 transition-opacity"
        aria-label="Close"
      >
        <span className="material-symbols-outlined text-xl">close</span>
      </button>
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon = 'inbox', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-[#F8F9FA] flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-5xl text-[#6B7280]">{icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-[#0E1B33] mb-2">{title}</h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-[#6B7280] max-w-md mb-6 leading-relaxed">{description}</p>
      )}

      {/* Action Button */}
      {action && (
        <button
          onClick={action.onClick}
          className="bg-[#243D68] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#183A74] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

// Error Boundary Fallback
interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-5xl text-red-500">error</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-[#0E1B33] mb-2">Oops! Terjadi Kesalahan</h2>

        {/* Description */}
        <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
          {error?.message || 'Maaf, terjadi kesalahan yang tidak terduga. Tim kami sedang menangani masalah ini.'}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {resetError && (
            <button
              onClick={resetError}
              className="flex-1 bg-[#243D68] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#183A74] transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              Coba Lagi
            </button>
          )}
          <button
            onClick={() => window.location.href = '/'}
            className="flex-1 bg-[#E5E7EB] text-[#243D68] px-6 py-3 rounded-xl font-semibold hover:bg-[#D1D5DB] transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    </div>
  );
}
