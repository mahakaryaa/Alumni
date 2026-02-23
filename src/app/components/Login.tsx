import { useState } from 'react';
import { validateLoginForm } from '@/utils/validation';
import { toastMessages } from '@/utils/toast';
import { useTranslation } from '@/hooks/useTranslation';
import { Logo } from './Logo';

interface LoginProps {
  onBack: () => void;
  onLoginSuccess?: (role: 'donatur' | 'alumni') => void;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export function Login({ onBack, onLoginSuccess }: LoginProps) {
  const { language } = useTranslation();
  const [role, setRole] = useState<'donatur' | 'alumni'>('donatur');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

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
      
      if (onLoginSuccess) {
        onLoginSuccess(role);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <Logo />
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                onClick={onBack}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white bg-white/10 w-full shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm font-semibold">Home</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full group">
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full group">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full group">
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 pb-6">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full group">
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <main className="flex-1 flex flex-col relative bg-white overflow-hidden">
        {/* Back Button - Desktop */}
        <button 
          onClick={onBack}
          className="hidden lg:flex absolute top-8 left-8 z-20 items-center gap-2 text-[#243D68] hover:text-[#183A74] transition-all duration-300 font-semibold group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-sm uppercase tracking-wider">Kembali</span>
        </button>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 sm:p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#243D68] flex items-center justify-center">
              <span className="material-symbols-outlined text-[#FAC06E] text-xl">mosque</span>
            </div>
            <span className="font-['Archivo_Black'] text-base sm:text-lg uppercase tracking-tight text-[#243D68]">
              ProjekKita
            </span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-[#243D68] hover:text-[#183A74] transition-all duration-300 font-semibold"
          >
            <span className="material-symbols-outlined text-xl">close</span>
            <span className="text-xs sm:text-sm uppercase tracking-wider">{language === 'id' ? 'Tutup' : 'Close'}</span>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-12 right-12 w-32 h-32 border-8 border-[#FAC06E] rounded-full opacity-10 pointer-events-none hidden lg:block"></div>
        <div className="absolute top-24 right-24 w-3 h-3 bg-[#FAC06E] rounded-full pointer-events-none hidden lg:block"></div>
        <div className="absolute bottom-20 left-12 w-24 h-24 bg-[#243D68] opacity-5 rotate-45 pointer-events-none hidden lg:block"></div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <header className="text-center lg:text-left">
              <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                <span className="text-[#243D68] uppercase block">Misi Suci,</span>
                <span className="text-[#FAC06E] uppercase block">Aksi Nyata</span>
              </h1>
              
              <p className="text-[#6B7280] text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">
                {mode === 'login' 
                  ? 'Masuk untuk melanjutkan perjalanan penuh keberkahan bersama ribuan pejuang lainnya.'
                  : 'Daftar sekarang dan mulai berkontribusi dalam proyek-proyek penuh keberkahan.'
                }
              </p>
            </header>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Role Toggle */}
              <div className="flex border-2 border-[#E5E7EB] rounded-lg overflow-hidden">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="donatur"
                    checked={role === 'donatur'}
                    onChange={(e) => setRole(e.target.value as 'donatur' | 'alumni')}
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
                    onChange={(e) => setRole(e.target.value as 'donatur' | 'alumni')}
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
              </div>

              {mode === 'login' ? (
                <>
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="EMAIL ATAU USERNAME"
                      className={`block w-full px-4 py-4 bg-[#F8F9FA] border-2 ${
                        errors.email ? 'border-red-500' : 'border-[#E5E7EB]'
                      } text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold`}
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
                      className={`block w-full px-4 py-4 bg-[#F8F9FA] border-2 ${
                        errors.password ? 'border-red-500' : 'border-[#E5E7EB]'
                      } text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all pr-12 placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold`}
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
                </>
              ) : (
                <>
                  {/* Register Form Fields */}
                  {/* Email Input */}
                  <div className="relative">
                    <input
                      type="email"
                      id="reg-email"
                      name="email"
                      placeholder="EMAIL"
                      className="block w-full px-4 py-4 bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold"
                    />
                  </div>

                  {/* Nama Input */}
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="NAMA LENGKAP"
                      className="block w-full px-4 py-4 bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold"
                    />
                  </div>

                  {/* Alumni Angkatan - Only for Alumni Role */}
                  {role === 'alumni' && (
                    <div className="relative">
                      <select
                        id="angkatan"
                        name="angkatan"
                        className="block w-full px-4 py-4 bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all text-xs tracking-wider font-semibold appearance-none"
                      >
                        <option value="">PILIH ANGKATAN ALUMNI</option>
                        <option value="1-jogja">Angkatan 1 - Jogja</option>
                        <option value="2-jogja">Angkatan 2 - Jogja</option>
                        <option value="3-jakarta">Angkatan 3 - Jakarta</option>
                        <option value="4-kampung-magfiroh">Angkatan 4 - Kampung Magfiroh</option>
                        <option value="5-bandung">Angkatan 5 - Bandung</option>
                        <option value="6-surabaya">Angkatan 6 - Surabaya</option>
                        <option value="7-medan">Angkatan 7 - Medan</option>
                        <option value="8-makassar">Angkatan 8 - Makassar</option>
                        <option value="9-semarang">Angkatan 9 - Semarang</option>
                        <option value="10-malang">Angkatan 10 - Malang</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#FAC06E] pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  )}

                  {/* No HP Input */}
                  <div className="relative">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="NO HP (WHATSAPP)"
                      className="block w-full px-4 py-4 bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="reg-password"
                      name="password"
                      placeholder="PASSWORD"
                      className="block w-full px-4 py-4 bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all pr-12 placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold"
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
                  </div>

                  {/* Confirm Password Input */}
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      name="confirmPassword"
                      placeholder="KONFIRMASI PASSWORD"
                      className="block w-full px-4 py-4 bg-[#F8F9FA] border-2 border-[#E5E7EB] text-[#243D68] focus:ring-0 focus:border-[#243D68] transition-all pr-12 placeholder:text-[#6B7280]/50 placeholder:text-xs placeholder:tracking-wider placeholder:font-semibold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAC06E] hover:text-[#243D68] transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showConfirmPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-[#243D68] text-white font-['Archivo_Black'] uppercase text-base md:text-lg py-4 tracking-widest shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 group ${
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
                      <span>{mode === 'login' ? 'Lanjutkan Misi' : 'Daftar Sekarang'}</span>
                      <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs uppercase tracking-widest text-[#6B7280] font-semibold">
                  Atau Akses Cepat
                </span>
              </div>
            </div>

            {/* Social Login */}
            <button className="w-full border-2 border-[#E5E7EB] bg-white py-3 flex justify-center items-center gap-3 hover:bg-[#F8F9FA] hover:border-[#243D68] transition-all group">
              <svg className="h-5 w-5 text-[#243D68]" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"></path>
              </svg>
              <span className="text-sm font-semibold text-[#243D68] uppercase tracking-wide">Masuk Dengan Google</span>
            </button>

            {/* Register/Login Toggle Link */}
            <div className="text-center">
              <p className="text-sm text-[#6B7280] mb-3">
                {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}
              </p>
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-[#243D68] to-[#1a2e52] text-white hover:shadow-[0_8px_24px_rgba(36,61,104,0.25)] active:scale-[0.98] transition-all duration-200 border-2 border-transparent hover:border-[#FAC06E]"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {mode === 'login' ? 'person_add' : 'login'}
                </span>
                <span>{mode === 'login' ? 'Daftar Sekarang' : 'Login Sekarang'}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}