import { useNavigate } from 'react-router';

/**
 * 404 Not Found Page
 * Displayed when user navigates to a non-existent route
 */
export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#243D68] via-[#2B4468] to-[#243D68] flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        {/* 404 Illustration */}
        <div className="mb-8 relative">
          <h1 className="text-[180px] md:text-[240px] font-['Archivo_Black'] text-white/10 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-[#FAC06E] rounded-full flex items-center justify-center shadow-2xl">
              <span className="material-symbols-outlined text-[#243D68] text-7xl">search_off</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-['Archivo_Black'] text-white mb-4 uppercase">
          Halaman Tidak Ditemukan
        </h2>

        {/* Description */}
        <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-md mx-auto">
          Maaf, halaman yang Anda cari tidak tersedia atau mungkin sudah dipindahkan. 
          Mari kembali dan temukan sesuatu yang menarik!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-white/20 transition-all border-2 border-white/20 flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Kembali
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-gradient-to-r from-[#FAC06E] to-[#f4b555] text-[#243D68] rounded-xl font-bold hover:shadow-[0_0_20px_rgba(250,192,110,0.5)] transition-all flex items-center gap-2 group"
          >
            <span className="material-symbols-outlined">home</span>
            Ke Beranda
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm mb-4 uppercase tracking-wider font-semibold">
            Link Cepat
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => navigate('/explore')}
              className="px-4 py-2 bg-white/5 text-white/80 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Jelajah Proyek
            </button>
            <button
              onClick={() => navigate('/stories')}
              className="px-4 py-2 bg-white/5 text-white/80 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Cerita Alumni
            </button>
            <button
              onClick={() => navigate('/events')}
              className="px-4 py-2 bg-white/5 text-white/80 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
