import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'signature' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles
  const baseStyles = 'font-bold transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary: 'bg-[#243D68] text-white hover:bg-[#183A74] shadow-md hover:shadow-lg active:scale-[0.98]',
    secondary: 'bg-[#E5E7EB] text-[#243D68] hover:bg-[#D1D5DB] shadow-sm hover:shadow-md active:scale-[0.98]',
    outline: 'bg-white border-2 border-[#243D68] text-[#243D68] hover:bg-[#F8F9FA] shadow-sm hover:shadow-md active:scale-[0.98]',
    signature: 'bg-gradient-to-r from-[#243D68] to-[#30518B] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1',
    ghost: 'bg-transparent text-[#243D68] hover:bg-[#F8F9FA] active:scale-[0.98]',
  };

  // Size styles with proper touch targets (minimum 44x44px)
  const sizeStyles = {
    sm: 'text-sm px-4 py-2.5 rounded-lg min-h-[44px]',
    md: 'text-base px-6 py-3 rounded-xl min-h-[48px]',
    lg: 'text-lg px-8 py-4 rounded-xl min-h-[52px]',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}

// Icon Button Component (for icon-only buttons with proper touch target)
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost';
}

export function IconButton({
  icon,
  size = 'md',
  variant = 'default',
  className = '',
  ...props
}: IconButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    default: 'text-[#243D68] hover:bg-[#F8F9FA] active:scale-[0.95]',
    ghost: 'text-[#6B7280] hover:text-[#243D68] hover:bg-[#F8F9FA] active:scale-[0.95]',
  };

  // Ensure minimum 44x44px touch target
  const sizeStyles = {
    sm: 'w-11 h-11 rounded-lg',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-14 h-14 rounded-xl',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
}
