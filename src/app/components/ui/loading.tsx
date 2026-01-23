// Loading Spinner Component
export function LoadingSpinner({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div
      className={`${sizeStyles[size]} border-[#243D68] border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}

// Card Skeleton Loader
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm animate-pulse ${className}`}>
      {/* Image skeleton */}
      <div className="w-full aspect-video bg-[#E5E7EB] rounded-xl mb-4" />
      
      {/* Tag skeleton */}
      <div className="w-24 h-4 bg-[#E5E7EB] rounded-full mb-3" />
      
      {/* Title skeleton */}
      <div className="w-full h-6 bg-[#E5E7EB] rounded-lg mb-2" />
      <div className="w-3/4 h-6 bg-[#E5E7EB] rounded-lg mb-3" />
      
      {/* Description skeleton */}
      <div className="w-full h-4 bg-[#E5E7EB] rounded mb-2" />
      <div className="w-5/6 h-4 bg-[#E5E7EB] rounded mb-4" />
      
      {/* Button skeleton */}
      <div className="w-full h-12 bg-[#E5E7EB] rounded-xl" />
    </div>
  );
}

// Text Skeleton Loader
export function TextSkeleton({ 
  lines = 3, 
  className = '' 
}: { 
  lines?: number; 
  className?: string 
}) {
  return (
    <div className={`space-y-3 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-[#E5E7EB] rounded ${
            index === lines - 1 ? 'w-4/5' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

// Full Page Loading
export function PageLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA]">
      <div className="text-center space-y-4">
        {/* Logo Animation */}
        <div className="w-16 h-16 mx-auto bg-[#FAC06E] rounded-xl flex items-center justify-center animate-bounce">
          <span className="material-symbols-outlined text-[#243D68] text-3xl font-bold">mosque</span>
        </div>
        
        {/* Loading Spinner */}
        <LoadingSpinner size="lg" />
        
        {/* Loading Text */}
        <p className="text-[#6B7280] text-sm font-medium">Memuat...</p>
      </div>
    </div>
  );
}

// Button Loading State
export function ButtonLoading({ 
  text = 'Memproses...', 
  className = '' 
}: { 
  text?: string; 
  className?: string 
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <LoadingSpinner size="sm" />
      <span>{text}</span>
    </div>
  );
}

// Inline Loading (for replacing content)
export function InlineLoading({ text = 'Memuat...' }: { text?: string }) {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner size="md" className="mr-3" />
      <span className="text-[#6B7280] text-sm font-medium">{text}</span>
    </div>
  );
}

// Overlay Loading
export function OverlayLoading({ text = 'Memuat...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center space-y-4 max-w-sm mx-4">
        <LoadingSpinner size="lg" className="mx-auto" />
        <p className="text-[#0E1B33] font-semibold">{text}</p>
      </div>
    </div>
  );
}
