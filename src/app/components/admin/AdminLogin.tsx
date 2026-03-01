/**
 * Admin Login Component
 * Login page for admin panel with demo credentials
 */

import { useState } from 'react';
import { setCurrentAdminUser } from '@/utils/adminAuth';
import { mockAdminUsers } from '@/data/mockAdminData';
import { showToast } from '@/utils/toast';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack?: () => void;
}

export function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast.error('Email dan password harus diisi');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Find user by email
      const user = mockAdminUsers.find(u => u.email === email);
      
      if (!user) {
        showToast.error('Email atau password salah');
        setIsLoading(false);
        return;
      }

      // In production, check password hash
      // For demo, accept any password for existing emails
      
      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString(),
      };

      // Save to localStorage
      setCurrentAdminUser(updatedUser);
      
      showToast.success(`Selamat datang, ${user.name}!`);
      setIsLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  const quickLogin = (userEmail: string) => {
    const user = mockAdminUsers.find(u => u.email === userEmail);
    if (user) {
      setEmail(userEmail);
      setPassword('demo123'); // Demo password
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#243D68] to-[#30518B] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Card */}
        <div className="bg-white rounded-2xl p-6 mb-6 text-center shadow-xl overflow-hidden">
          <div className="w-16 h-16 bg-[#FAC06E] rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[#243D68] text-3xl">mosque</span>
          </div>
          <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#243D68] mb-1 overflow-hidden text-ellipsis whitespace-nowrap px-4">
            AlMaqdisi Project
          </h1>
          <p className="text-sm text-[#6B7280]">Admin Panel</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h2 className="font-bold text-xl text-[#0E1B33] mb-2">Login Admin</h2>
          <p className="text-sm text-[#6B7280] mb-6">
            Masukkan kredensial Anda untuk mengakses admin panel
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@almaqdisi.org"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-[#6B7280] mb-2 block font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
                disabled={isLoading}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold uppercase tracking-wider transition-all ${
                isLoading
                  ? 'bg-[#6B7280] cursor-not-allowed'
                  : 'bg-[#243D68] hover:bg-[#1a2f54] shadow-lg hover:shadow-xl'
              } text-white`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">login</span>
                  <span>Login</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Toggle */}
          <div className="mt-6">
            <button
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[#243D68] hover:bg-[#F8F9FA] rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-lg">info</span>
              <span>{showDemoCredentials ? 'Sembunyikan' : 'Lihat'} Demo Credentials</span>
            </button>
          </div>

          {/* Demo Credentials */}
          {showDemoCredentials && (
            <div className="mt-4 p-4 bg-[#FFF9E6] border border-[#FAC06E] rounded-lg">
              <p className="text-xs font-semibold text-[#92400E] mb-3">
                Quick Login (Demo Mode):
              </p>
              <div className="space-y-2">
                {[
                  { email: 'ahmad.zaki@almaqdisi.org', role: 'Super Admin' },
                  { email: 'siti.nurhaliza@almaqdisi.org', role: 'Moderator' },
                  { email: 'fatimah.azzahra@almaqdisi.org', role: 'PIC' },
                ].map(cred => (
                  <button
                    key={cred.email}
                    onClick={() => quickLogin(cred.email)}
                    className="w-full flex items-center justify-between p-2 bg-white hover:bg-gray-50 rounded-lg transition-colors text-left"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#0E1B33]">{cred.email}</p>
                      <p className="text-xs text-[#6B7280]">{cred.role}</p>
                    </div>
                    <span className="material-symbols-outlined text-[#243D68] text-lg">
                      arrow_forward
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#92400E] mt-3 italic">
                Password: apa saja (demo mode)
              </p>
            </div>
          )}

          {/* Back to Main */}
          {onBack && (
            <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
              <button
                onClick={onBack}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-[#6B7280] hover:text-[#243D68] transition-colors"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                <span>Kembali ke Website</span>
              </button>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white text-center">
          <p className="text-xs opacity-80">
            Sistem manajemen alumni AlMaqdisi Project dengan role-based access control
          </p>
        </div>
      </div>
    </div>
  );
}