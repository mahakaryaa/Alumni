import { useState } from 'react';
import { validateLoginForm } from '@/utils/validation';
import { toastMessages } from '@/utils/toast';

interface LoginWidgetProps {
  onClose: () => void;
  onLoginSuccess: (role: 'donatur' | 'alumni' | 'alumni-guest') => void;
  onRegisterClick: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function LoginWidget({ onClose, onLoginSuccess, onRegisterClick }: LoginWidgetProps) {
  const [role, setRole] = useState<'donatur' | 'alumni' | 'alumni-guest'>('donatur');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showManualLogin, setShowManualLogin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form
    const validation = validateLoginForm({ email, password });
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      toastMessages.form.error();
      return;
    }

    // Simulate loading
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toastMessages.login.success();
      onLoginSuccess(role);
    }, 800);
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    toastMessages.login.success();
    onLoginSuccess(role);
  };

  const handleQuickLogin = (quickRole: 'donatur' | 'alumni' | 'alumni-guest') => {
    // Simulate quick login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toastMessages.login.success();
      onLoginSuccess(quickRole);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8F9FA] transition-colors z-10"
        >
          <span className="material-symbols-outlined text-[#6B7280]">close</span>
        </button>

        <div className="p-8 pt-12">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="font-['Archivo_Black'] text-3xl sm:text-4xl leading-tight mb-3">
              <span className="text-[#243D68] uppercase block">Misi Suci,</span>
              <span className="text-[#FAC06E] uppercase block">Aksi Nyata</span>
            </h1>
            
            <p className="text-[#6B7280] text-sm leading-relaxed">
              Masuk untuk melanjutkan perjalanan penuh keberkahan bersama ribuan pejuang lainnya.
            </p>
          </header>

          {!showManualLogin ? (
            /* Demo Mode - Quick Login */
            <div className="space-y-6">
              {/* Demo Mode Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-blue-600 text-xl mt-0.5">info</span>
                  <div>
                    <h3 className="font-bold text-blue-900 text-sm mb-1">Demo Mode - Pilih Role:</h3>
                    <p className="text-blue-700 text-xs leading-relaxed">
                      Klik salah satu untuk langsung masuk
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Login Options */}
              <div className="space-y-3">
                {/* Donatur */}
                <button
                  onClick={() => handleQuickLogin('donatur')}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl p-4 hover:border-[#243D68] hover:shadow-md transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#FAC06E]/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#243D68] text-xl">volunteer_activism</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-[#0E1B33] text-sm">Donatur</h3>
                        <p className="text-xs text-[#6B7280]">Berdonasi untuk proyek</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68] transition-colors">arrow_forward</span>
                  </div>
                </button>

                {/* Alumni */}
                <button
                  onClick={() => handleQuickLogin('alumni')}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl p-4 hover:border-[#243D68] hover:shadow-md transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#243D68]/10 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#243D68] text-xl">groups</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-[#0E1B33] text-sm">Alumni</h3>
                        <p className="text-xs text-[#6B7280]">Join dan kelola project</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68] transition-colors">arrow_forward</span>
                  </div>
                </button>

                {/* Alumni Guest */}
                <button
                  onClick={() => handleQuickLogin('alumni-guest')}
                  disabled={isLoading}
                  className="w-full bg-white border-2 border-[#E5E7EB] rounded-xl p-4 hover:border-[#243D68] hover:shadow-md transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-700 text-xl">person_search</span>
                      </div>
                      <div className="text-left">
                        <h3 className="font-bold text-[#0E1B33] text-sm">Alumni (Belum Join)</h3>
                        <p className="text-xs text-[#6B7280]">Explore dan cari project</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68] transition-colors">arrow_forward</span>
                  </div>
                </button>
              </div>

              {/* Toggle to Manual Login */}
              <div className="text-center pt-2">
                <button
                  onClick={() => setShowManualLogin(true)}
                  className="text-sm text-[#243D68] hover:text-[#183A74] font-semibold hover:underline transition-colors"
                >
                  Atau login manual
                </button>
              </div>
            </div>
          ) : (
            /* Manual Login Form */
            <>
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Role Toggle */}
                <div className="flex border-2 border-[#E5E7EB] rounded-lg overflow-hidden">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="donatur"
                      checked={role === 'donatur'}
                      onChange={(e) => setRole(e.target.value as 'donatur' | 'alumni' | 'alumni-guest')}
                      className="peer sr-only"
                    />
                    <div className={`w-full text-center py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      role === 'donatur' 
                        ? 'bg-[#243D68] text-white' 
                        : 'text-[#6B7280] hover:text-[#243D68] hover:bg-[#F8F9FA]'
                    }`}>
                      Donatur
                    </div>
                  </label>
                  
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="alumni"
                      checked={role === 'alumni'}
                      onChange={(e) => setRole(e.target.value as 'donatur' | 'alumni' | 'alumni-guest')}
                      className="peer sr-only"
                    />
                    <div className={`w-full text-center py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      role === 'alumni' 
                        ? 'bg-[#243D68] text-white' 
                        : 'text-[#6B7280] hover:text-[#243D68] hover:bg-[#F8F9FA]'
                    }`}>
                      Alumni
                    </div>
                  </label>

                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="alumni-guest"
                      checked={role === 'alumni-guest'}
                      onChange={(e) => setRole(e.target.value as 'donatur' | 'alumni' | 'alumni-guest')}
                      className="peer sr-only"
                    />
                    <div className={`w-full text-center py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      role === 'alumni-guest' 
                        ? 'bg-[#243D68] text-white' 
                        : 'text-[#6B7280] hover:text-[#243D68] hover:bg-[#F8F9FA]'
                    }`}>
                      Alumni Guest
                    </div>
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ATAU USERNAME"
                    className={`block w-full px-4 py-3.5 bg-[#F8F9FA] border-2 ${
                      errors.email ? 'border-red-500' : 'border-[#E5E7EB]'
                    } rounded-lg text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                    className={`block w-full px-4 py-3.5 bg-[#F8F9FA] border-2 ${
                      errors.password ? 'border-red-500' : 'border-[#E5E7EB]'
                    } rounded-lg text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all pr-12 placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAC06E] hover:text-[#243D68] transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs uppercase font-semibold tracking-wider text-[#6B7280] hover:text-[#243D68] transition-colors"
                  >
                    Lupa Password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#243D68] text-white font-['Archivo_Black'] uppercase text-base py-4 tracking-widest rounded-lg shadow-[4px_4px_0px_0px_rgba(250,192,110,1)] hover:shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 group ${
                    isLoading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <span>Lanjutkan Misi</span>
                      <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </form>

              {/* Toggle back to Quick Login */}
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowManualLogin(false)}
                  className="text-sm text-[#243D68] hover:text-[#183A74] font-semibold hover:underline transition-colors"
                >
                  ← Kembali ke Quick Login
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-xs uppercase tracking-widest text-[#6B7280] font-semibold">
                    Atau Akses Cepat
                  </span>
                </div>
              </div>

              {/* Google Login */}
              <button 
                onClick={handleGoogleLogin}
                className="w-full border-2 border-[#E5E7EB] bg-white py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-[#F8F9FA] hover:border-[#243D68] transition-all group"
              >
                <svg className="h-5 w-5 text-[#243D68]" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
                </svg>
                <span className="text-sm font-semibold text-[#243D68] uppercase tracking-wide">Masuk Dengan Google</span>
              </button>

              {/* Register Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-[#6B7280] mb-3">
                  Belum punya akun?
                </p>
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-[#243D68] to-[#1a2e52] text-white hover:shadow-[0_8px_24px_rgba(36,61,104,0.25)] active:scale-[0.98] transition-all duration-200 border-2 border-transparent hover:border-[#FAC06E]"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>Daftar Sekarang</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}