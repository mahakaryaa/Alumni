import { useState } from 'react';

interface SettingsDonaturProps {
  onBack: () => void;
  onLogout?: () => void;
}

export function SettingsDonatur({ 
  onBack,
  onLogout
}: SettingsDonaturProps) {
  // Profile states
  const [profilePhoto, setProfilePhoto] = useState('');
  const [fullName, setFullName] = useState('Ahmad Fauzi');
  const [email, setEmail] = useState('ahmad.fauzi@email.com');
  const [phone, setPhone] = useState('081234567890');
  
  // Security states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification states
  const [notifProjectUpdates, setNotifProjectUpdates] = useState(true);
  const [notifDonationReminder, setNotifDonationReminder] = useState(true);
  
  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditSecurity, setShowEditSecurity] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setShowEditProfile(false);
    alert('Profil berhasil disimpan!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Password baru tidak cocok!');
      return;
    }
    setShowEditSecurity(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password berhasil diubah!');
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    if (onLogout) {
      onLogout();
    } else {
      alert('Logout berhasil!');
      onBack();
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
            <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight uppercase">Settings</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-8 w-full">
          <div className="max-w-2xl mx-auto px-4 md:px-8 py-6 space-y-6 w-full">
            
            {/* Quick Profile Card */}
            <div className="bg-gradient-to-br from-[#243D68] to-[#2B4468] rounded-2xl p-4 md:p-6 shadow-lg">
              <div className="flex items-center gap-3 md:gap-4 flex-wrap md:flex-nowrap">
                <div className="relative flex-shrink-0">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white/20" />
                  ) : (
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-[#FAC06E] rounded-full flex items-center justify-center border-4 border-white/20">
                      <span className="material-symbols-outlined text-[#243D68] text-2xl md:text-3xl">person</span>
                    </div>
                  )}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base md:text-lg truncate">{fullName}</h3>
                  <p className="text-white/80 text-xs truncate">{email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-[#FAC06E]/20 text-[#FAC06E] text-xs font-semibold rounded-full">
                      Donatur
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="px-3 py-2 md:px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-xs md:text-sm transition-colors backdrop-blur-sm border border-white/20 whitespace-nowrap"
                >
                  Edit Profil
                </button>
              </div>
            </div>

            {/* 1. INFORMASI PRIBADI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span>
                Informasi Pribadi
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">badge</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Data Profil</p>
                    <p className="text-xs text-[#6B7280]">Nama, foto, email, dan nomor HP</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 2. KEAMANAN AKUN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">security</span>
                Keamanan Akun
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowEditSecurity(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">lock</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Ubah Password</p>
                    <p className="text-xs text-[#6B7280]">Update password akun Anda</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 3. NOTIFIKASI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">notifications</span>
                Notifikasi
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-5">
                <p className="text-xs text-[#6B7280] mb-4">Atur notifikasi yang ingin Anda terima</p>

                <div className="space-y-4">
                  {/* Update Proyek yang Didonasi */}
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">Update Proyek</p>
                      <p className="text-xs text-[#6B7280]">Perkembangan proyek yang saya donasi</p>
                    </div>
                    <button
                      onClick={() => setNotifProjectUpdates(!notifProjectUpdates)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifProjectUpdates ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifProjectUpdates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reminder Donasi */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">Reminder Donasi</p>
                      <p className="text-xs text-[#6B7280]">Pengingat untuk proyek yang perlu dukungan</p>
                    </div>
                    <button
                      onClick={() => setNotifDonationReminder(!notifDonationReminder)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifDonationReminder ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifDonationReminder ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="pt-4">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full bg-white border border-[#E5E7EB] hover:bg-red-50 hover:border-red-200 text-red-600 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-xl">logout</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Edit Profile */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditProfile(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-[#0E1B33]">Edit Profil</h3>
              <button onClick={() => setShowEditProfile(false)} className="p-1 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Photo Upload */}
              <div className="flex flex-col items-center gap-3">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#243D68]/10" />
                ) : (
                  <div className="w-24 h-24 bg-[#FAC06E] rounded-full flex items-center justify-center border-4 border-[#243D68]/10">
                    <span className="material-symbols-outlined text-[#243D68] text-4xl">person</span>
                  </div>
                )}
                <label className="px-4 py-2 bg-[#243D68]/10 hover:bg-[#243D68]/20 text-[#243D68] rounded-lg font-semibold text-sm transition-colors cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  Ganti Foto
                </label>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68]"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68]"
                  placeholder="Masukkan email"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Nomor HP</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68]"
                  placeholder="Masukkan nomor HP"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 px-4 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-xl font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 px-4 py-3 bg-[#243D68] text-white rounded-xl font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Change Password */}
      {showEditSecurity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditSecurity(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-[#E5E7EB] p-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0E1B33]">Ubah Password</h3>
              <button onClick={() => setShowEditSecurity(false)} className="p-1 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              {/* Old Password */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Password Lama</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68]"
                  placeholder="Masukkan password lama"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Password Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68]"
                  placeholder="Masukkan password baru"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Konfirmasi Password Baru</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68]"
                  placeholder="Konfirmasi password baru"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowEditSecurity(false)}
                  className="flex-1 px-4 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-xl font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex-1 px-4 py-3 bg-[#243D68] text-white rounded-xl font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  Ubah Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowLogoutConfirm(false)}>
          <div className="bg-white rounded-2xl max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-red-600 text-3xl">logout</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E1B33] mb-2">Konfirmasi Logout</h3>
              <p className="text-sm text-[#6B7280] mb-6">
                Apakah Anda yakin ingin keluar dari akun?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-xl font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Ya, Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
