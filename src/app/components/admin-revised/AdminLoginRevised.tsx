/**
 * Admin Login Component (REVISED)
 */

import { useState } from 'react';
import { loginAdmin } from '@/utils/adminAuthRevised';
import { showToast } from '@/utils/toast';

interface AdminLoginRevisedProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export function AdminLoginRevised({ onLoginSuccess, onBack }: AdminLoginRevisedProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast.error('Email dan password harus diisi');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const user = loginAdmin(email, password);
      
      if (user) {
        showToast.success(`Selamat datang, ${user.name}!`);
        onLoginSuccess();
      } else {
        showToast.error('Email atau password salah');
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#243D68] to-[#1a2d4d] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
          <span>Kembali</span>
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
            </div>
            <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
              Admin Panel
            </h1>
            <p className="text-[#6B7280] text-sm">
              AlMaqdisi Project Management System
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
            <div className="text-xs text-blue-800 space-y-1">
              <p><strong>PIC:</strong> fatimah.azzahra@almaqdisi.org / pic123</p>
              <p><strong>Moderator:</strong> siti.nurhaliza@almaqdisi.org / moderator123</p>
              <p><strong>Superadmin:</strong> ahmad.zaki@almaqdisi.org / superadmin123</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  mail
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none transition-colors"
                  placeholder="admin@almaqdisi.org"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Password
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none transition-colors"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#243D68] transition-colors"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#243D68] to-[#1a2d4d] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Login</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
            <p className="text-xs text-center text-[#6B7280]">
              Secured by AlMaqdisi Project System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
