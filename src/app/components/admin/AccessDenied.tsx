/**
 * Access Denied Component
 * Displayed when user tries to access features without proper permissions
 */

interface AccessDeniedProps {
  message?: string;
  onBack?: () => void;
}

export function AccessDenied({ 
  message = 'Anda tidak memiliki akses untuk fitur ini',
  onBack 
}: AccessDeniedProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px] p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-red-600 text-5xl">
              lock
            </span>
          </div>
        </div>

        {/* Message */}
        <h2 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-3">
          Akses Ditolak
        </h2>
        <p className="text-[#6B7280] mb-6">
          {message}
        </p>

        {/* Action Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-[#243D68] text-white hover:bg-[#1a2f54] transition-colors mx-auto"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span>Kembali</span>
          </button>
        )}
      </div>
    </div>
  );
}
