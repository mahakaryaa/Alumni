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
  const [selectedRole, setSelectedRole] = useState<'pic' | 'moderator' | 'superadmin' | null>(null);

  const demoCredentials = [
    {
      role: 'pic' as const,
      label: 'PIC (Project In Charge)',
      email: 'fatimah.azzahra@almaqdisi.org',
      password: 'pic123',
      description: 'Mengelola operasional project',
      icon: 'engineering'
    },
    {
      role: 'moderator' as const,
      label: 'Moderator',
      email: 'siti.nurhaliza@almaqdisi.org',
      password: 'moderator123',
      description: 'Moderasi konten dan diskusi',
      icon: 'shield_person'
    },
    {
      role: 'superadmin' as const,
      label: 'Superadmin',
      email: 'ahmad.zaki@almaqdisi.org',
      password: 'superadmin123',
      description: 'Akses penuh ke sistem',
      icon: 'admin_panel_settings'
    }
  ];

  const handleRoleSelect = (role: 'pic' | 'moderator' | 'superadmin') => {
    setSelectedRole(role);
    const credential = demoCredentials.find(c => c.role === role);
    if (credential) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const user = loginAdmin(credential.email, credential.password);
        
        if (user) {
          showToast.success(`Selamat datang, ${user.name}!`);
          onLoginSuccess();
        } else {
          showToast.error('Login gagal');
          setIsLoading(false);
          setSelectedRole(null);
        }
      }, 800);
    }
  };

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
          <div className="text-center mb-8 overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-br from-[#243D68] to-[#FAC06E] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-white text-3xl">admin_panel_settings</span>
            </div>
            <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
              Admin Panel
            </h1>
            <p className="text-[#6B7280] text-sm overflow-hidden text-ellipsis whitespace-nowrap px-4">
              AlMaqdisi Project Management System
            </p>
          </div>

          {/* Demo Credentials Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-blue-600">info</span>
              <p className="text-sm font-bold text-blue-900">Demo Mode - Pilih Role:</p>
            </div>
            <p className="text-xs text-blue-700 mb-4">Klik salah satu untuk langsung masuk</p>
            
            {/* Quick Login Buttons */}
            <div className="space-y-3">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => handleRoleSelect(cred.role)}
                  disabled={isLoading}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedRole === cred.role 
                      ? 'border-[#243D68] bg-[#243D68] text-white' 
                      : 'border-[#E5E7EB] bg-white hover:border-[#243D68]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedRole === cred.role ? 'bg-white/20' : 'bg-[#243D68]/10'
                    }`}>
                      <span className={`material-symbols-outlined text-xl ${
                        selectedRole === cred.role ? 'text-white' : 'text-[#243D68]'
                      }`}>
                        {cred.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className={`font-bold text-sm ${
                        selectedRole === cred.role ? 'text-white' : 'text-[#0E1B33]'
                      }`}>
                        {cred.label}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        selectedRole === cred.role ? 'text-white/80' : 'text-[#6B7280]'
                      }`}>
                        {cred.description}
                      </p>
                    </div>
                    {selectedRole === cred.role && isLoading && (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {selectedRole !== cred.role && (
                      <span className="material-symbols-outlined text-[#6B7280]">
                        arrow_forward
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5E7EB]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#6B7280] font-medium">Atau login manual</span>
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