import { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  activeNav?: string;
}

export function SettingsPage({ 
  onBack, 
  onNavigateHome, 
  onNavigateExplore, 
  onNavigateMessages, 
  onNavigateSettings,
  onLogout,
  activeNav = 'settings' 
}: SettingsPageProps) {
  // Profile states
  const [profilePhoto, setProfilePhoto] = useState('');
  const [fullName, setFullName] = useState('Budi Santoso');
  const [username, setUsername] = useState('budisantoso');
  const [email, setEmail] = useState('budi.santoso@email.com');
  const [phone, setPhone] = useState('081234567890');
  const [angkatan, setAngkatan] = useState('2015');
  const [jurusan, setJurusan] = useState('Teknik Informatika');
  const [bio, setBio] = useState('Alumni aktif yang passionate dalam teknologi dan pendidikan');
  const [currentStatus, setCurrentStatus] = useState('Bekerja');
  const [company, setCompany] = useState('PT. Teknologi Nusantara');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  
  // Security states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailVerified, setEmailVerified] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Notification states
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [notifProjectUpdates, setNotifProjectUpdates] = useState(true);
  const [notifNewVote, setNotifNewVote] = useState(true);
  const [notifMentions, setNotifMentions] = useState(true);
  const [notifNewDiscussion, setNotifNewDiscussion] = useState(true);
  const [notifDonationReminder, setNotifDonationReminder] = useState(false);
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);
  
  // Privacy states
  const [profileVisibility, setProfileVisibility] = useState('alumni');
  const [contactVisibility, setContactVisibility] = useState('alumni');
  const [mentionPermission, setMentionPermission] = useState('all');
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  
  // Preferences states
  const [language, setLanguage] = useState('id');
  const [timezone, setTimezone] = useState('WIB');
  const [theme, setTheme] = useState('light');
  
  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditSecurity, setShowEditSecurity] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showBugReport, setShowBugReport] = useState(false);
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
    // Implement save profile logic
    setShowEditProfile(false);
    alert('Profil berhasil disimpan!');
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Password baru tidak cocok!');
      return;
    }
    // Implement password change logic
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
    <div className="flex min-h-screen bg-[#F8F9FA] overflow-x-hidden">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md rounded-lg">
              <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center rounded-md">
                <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                ALMAQDISI PROJECT
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'home' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateHome}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">Home</span>
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'explore' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateExplore}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'pesan' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateMessages}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all bg-white/10 text-white w-full">
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </button>
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-5 pb-6">
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden w-full">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors lg:hidden flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
            <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight uppercase">Settings</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 lg:pb-8 w-full">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6 w-full">
            
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
                  {username && (
                    <p className="text-[#FAC06E] text-xs font-semibold truncate">@{username}</p>
                  )}
                  <p className="text-white/80 text-xs truncate">{email}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-white/70 text-xs font-medium">Angkatan {angkatan}</span>
                    <span className="text-white/60">•</span>
                    <span className="text-white/70 text-xs truncate">{jurusan}</span>
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

            {/* 1. PROFIL ALUMNI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span>
                Profil Alumni
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">badge</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Informasi Pribadi</p>
                    <p className="text-xs text-[#6B7280]">Nama, foto, bio, dan kontak</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowEditProfile(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">school</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Data Alumni</p>
                    <p className="text-xs text-[#6B7280]">Angkatan, jurusan, status saat ini</p>
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
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
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

                <div className="flex items-center gap-3 md:gap-4 p-4 md:p-5 border-b border-[#E5E7EB]">
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">verified_user</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Verifikasi Email</p>
                    <div className="flex items-center gap-2 mt-1">
                      {emailVerified ? (
                        <>
                          <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                          <span className="text-xs text-green-600 font-semibold">Terverifikasi</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-orange-600 text-sm">error</span>
                          <span className="text-xs text-orange-600 font-semibold">Belum Terverifikasi</span>
                        </>
                      )}
                    </div>
                  </div>
                  {!emailVerified && (
                    <button className="text-xs font-bold text-[#243D68] hover:underline flex-shrink-0">
                      Kirim Ulang
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 p-4 md:p-5">
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#243D68]">phonelink_lock</span>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">Two-Factor Authentication</p>
                      <p className="text-xs text-[#6B7280]">Keamanan tambahan untuk akun</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                      twoFactorEnabled ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
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
                  {/* Push Notifications */}
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">Push Notifications</p>
                      <p className="text-xs text-[#6B7280]">Notifikasi di aplikasi</p>
                    </div>
                    <button
                      onClick={() => setPushNotifications(!pushNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        pushNotifications ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          pushNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Email Notifications */}
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">Email Notifications</p>
                      <p className="text-xs text-[#6B7280]">Notifikasi via email</p>
                    </div>
                    <button
                      onClick={() => setEmailNotifications(!emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        emailNotifications ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-xs font-semibold text-[#0E1B33] pt-2">Notifikasi Per Kategori:</p>

                  {/* Update Proyek */}
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">Update proyek yang saya ikuti</p>
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

                  {/* Vote Baru */}
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">Vote baru dibuat</p>
                    </div>
                    <button
                      onClick={() => setNotifNewVote(!notifNewVote)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifNewVote ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifNewVote ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Mentions */}
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">Seseorang mention saya</p>
                    </div>
                    <button
                      onClick={() => setNotifMentions(!notifMentions)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifMentions ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifMentions ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Diskusi Baru */}
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">Diskusi baru di proyek saya</p>
                    </div>
                    <button
                      onClick={() => setNotifNewDiscussion(!notifNewDiscussion)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifNewDiscussion ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifNewDiscussion ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Reminder Donasi */}
                  <div className="flex items-center justify-between gap-3 pb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">Reminder deadline donasi</p>
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

                  {/* Announcements */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">Announcement dari admin</p>
                    </div>
                    <button
                      onClick={() => setNotifAnnouncements(!notifAnnouncements)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
                        notifAnnouncements ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifAnnouncements ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. PRIVASI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">lock</span>
                Privasi
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowPrivacySettings(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">visibility</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Pengaturan Privasi</p>
                    <p className="text-xs text-[#6B7280]">Visibilitas profil, kontak, dan lainnya</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 5. DONASI & PEMBAYARAN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
                Donasi & Pembayaran
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowPaymentMethods(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">credit_card</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Metode Pembayaran</p>
                    <p className="text-xs text-[#6B7280]">Kelola metode pembayaran tersimpan</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">history</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Riwayat Donasi</p>
                    <p className="text-xs text-[#6B7280]">Lihat semua riwayat donasi Anda</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 6. PREFERENSI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">tune</span>
                Preferensi
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-5 space-y-4">
                {/* Bahasa */}
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Bahasa</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none text-sm"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>

                {/* Zona Waktu */}
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Zona Waktu</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none text-sm"
                  >
                    <option value="WIB">WIB (UTC+7)</option>
                    <option value="WITA">WITA (UTC+8)</option>
                    <option value="WIT">WIT (UTC+9)</option>
                  </select>
                </div>

                {/* Theme */}
                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Theme</label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                        theme === 'light'
                          ? 'border-[#243D68] bg-[#243D68]/5 text-[#243D68] font-semibold'
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#243D68]/30'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl block mb-1">light_mode</span>
                      <span className="text-xs">Light</span>
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                        theme === 'dark'
                          ? 'border-[#243D68] bg-[#243D68]/5 text-[#243D68] font-semibold'
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#243D68]/30'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl block mb-1">dark_mode</span>
                      <span className="text-xs">Dark</span>
                    </button>
                    <button
                      onClick={() => setTheme('auto')}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${
                        theme === 'auto'
                          ? 'border-[#243D68] bg-[#243D68]/5 text-[#243D68] font-semibold'
                          : 'border-[#E5E7EB] text-[#6B7280] hover:border-[#243D68]/30'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl block mb-1">contrast</span>
                      <span className="text-xs">Auto</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. TENTANG & BANTUAN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">info</span>
                Tentang & Bantuan
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="p-4 md:p-5 border-b border-[#E5E7EB]">
                  <p className="text-xs text-[#6B7280] mb-1">Versi Aplikasi</p>
                  <p className="text-sm font-bold text-[#0E1B33]">v1.0.0</p>
                </div>

                <button
                  onClick={() => setShowTerms(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Syarat & Ketentuan</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Kebijakan Privasi</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowHelp(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Pusat Bantuan & FAQ</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowContact(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Hubungi Kami</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowBugReport(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">Laporkan Bug</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 8. LOGOUT Section */}
            <div>
              <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-4 md:p-5">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span>Keluar dari Akun</span>
                </button>
                <p className="text-xs text-[#6B7280] text-center mt-3 italic">
                  Anda dapat kembali kapan saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-30 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button 
            onClick={onNavigateHome}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeNav === 'home' ? 'text-[#243D68]' : 'text-[#6B7280]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">home</span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={onNavigateExplore}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#6B7280]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">explore</span>
            <span className="text-xs font-medium">Explore</span>
          </button>
          <button 
            onClick={onNavigateMessages}
            className={`flex flex-col items-center gap-1 px-4 py-2 ${
              activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#6B7280]'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">chat_bubble</span>
            <span className="text-xs font-medium">Pesan</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 px-4 py-2 text-[#243D68]"
          >
            <span className="material-symbols-outlined text-2xl">settings</span>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>

      {/* MODALS */}

      {/* Modal - Edit Profile */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Edit Profil Alumni</h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {/* Photo Upload */}
              <div className="flex flex-col items-center pb-4 border-b border-[#E5E7EB]">
                <div className="relative mb-3">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#FAC06E]" />
                  ) : (
                    <div className="w-24 h-24 bg-[#243D68]/10 rounded-full flex items-center justify-center border-4 border-[#FAC06E]">
                      <span className="material-symbols-outlined text-[#243D68] text-4xl">person</span>
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#FAC06E] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#e8b05e] transition-colors border-2 border-white">
                    <span className="material-symbols-outlined text-[#243D68] text-sm">edit</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                  </label>
                </div>
                <p className="text-xs text-[#6B7280]">Klik icon untuk upload foto</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Nama Sapaan / Username
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] font-semibold">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    className="w-full pl-8 pr-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                    placeholder="budisantoso"
                    maxLength={20}
                  />
                </div>
                <p className="text-xs text-[#6B7280] mt-1">
                  Hanya huruf kecil, angka, dan underscore. Maksimal 20 karakter.
                </p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="081234567890"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Angkatan */}
                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                    Angkatan *
                  </label>
                  <select
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  >
                    {Array.from({ length: 17 }, (_, i) => 2026 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Jurusan */}
                <div>
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                    Jurusan *
                  </label>
                  <select
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  >
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
                    <option value="Teknik Elektro">Teknik Elektro</option>
                    <option value="Teknik Mesin">Teknik Mesin</option>
                    <option value="Manajemen">Manajemen</option>
                    <option value="Akuntansi">Akuntansi</option>
                    <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none resize-none"
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                />
              </div>

              {/* Current Status */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Status Saat Ini *
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                >
                  <option value="Bekerja">Bekerja</option>
                  <option value="Wirausaha">Wirausaha</option>
                  <option value="Kuliah Lanjut">Kuliah Lanjut</option>
                  <option value="Mencari Kerja">Mencari Kerja</option>
                  <option value="Freelancer">Freelancer</option>
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Perusahaan/Institusi
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="Nama perusahaan atau institusi"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  LinkedIn/Portfolio URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-[#E5E7EB] rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowEditProfile(false)}
                className="flex-1 py-3 rounded-xl font-bold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg transition-all"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Edit Security */}
      {showEditSecurity && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Ubah Password</h3>
              <button 
                onClick={() => setShowEditSecurity(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Password Lama
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="Masukkan password lama"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Password Baru
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="Masukkan password baru"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="Konfirmasi password baru"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-800">
                  <strong>Tips:</strong> Password harus minimal 8 karakter dan mengandung huruf besar, huruf kecil, serta angka.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E5E7EB] rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowEditSecurity(false)}
                className="flex-1 py-3 rounded-xl font-bold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleChangePassword}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg transition-all"
              >
                Ubah Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Privacy Settings */}
      {showPrivacySettings && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Pengaturan Privasi</h3>
              <button 
                onClick={() => setShowPrivacySettings(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Visibilitas Profil
                </label>
                <select
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                >
                  <option value="public">Publik - Semua orang</option>
                  <option value="alumni">Hanya Alumni</option>
                  <option value="private">Private - Hanya Saya</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Siapa yang bisa melihat kontak saya?
                </label>
                <select
                  value={contactVisibility}
                  onChange={(e) => setContactVisibility(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                >
                  <option value="all">Semua Orang</option>
                  <option value="alumni">Hanya Alumni</option>
                  <option value="none">Tidak Ada</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Siapa yang bisa mention saya?
                </label>
                <select
                  value={mentionPermission}
                  onChange={(e) => setMentionPermission(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                >
                  <option value="all">Semua Orang</option>
                  <option value="members">Hanya Anggota Proyek</option>
                  <option value="none">Tidak Ada</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-sm font-semibold text-[#0E1B33]">Tampilkan Status Online</p>
                  <p className="text-xs text-[#6B7280]">Orang lain bisa melihat ketika Anda online</p>
                </div>
                <button
                  onClick={() => setShowOnlineStatus(!showOnlineStatus)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showOnlineStatus ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showOnlineStatus ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E5E7EB] rounded-b-2xl">
              <button
                onClick={() => {
                  setShowPrivacySettings(false);
                  alert('Pengaturan privasi berhasil disimpan!');
                }}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg transition-all"
              >
                Simpan Pengaturan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Payment Methods */}
      {showPaymentMethods && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Metode Pembayaran</h3>
              <button 
                onClick={() => setShowPaymentMethods(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Saved Payment Method */}
              <div className="border-2 border-[#243D68] rounded-xl p-4 bg-[#243D68]/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-[#E5E7EB]">
                      <span className="material-symbols-outlined text-[#243D68]">account_balance</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0E1B33]">Bank BCA</p>
                      <p className="text-xs text-[#6B7280]">****1234</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FAC06E] bg-[#243D68] px-2 py-1 rounded">PRIMARY</span>
                </div>
              </div>

              <button className="w-full py-4 border-2 border-dashed border-[#E5E7EB] rounded-xl hover:border-[#243D68] hover:bg-[#243D68]/5 transition-colors flex items-center justify-center gap-2 text-[#243D68] font-semibold">
                <span className="material-symbols-outlined">add</span>
                <span>Tambah Metode Baru</span>
              </button>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-800">
                  <strong>Informasi:</strong> Metode pembayaran yang tersimpan akan dienkripsi dan aman.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#E5E7EB] rounded-b-2xl">
              <button
                onClick={() => setShowPaymentMethods(false)}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Terms & Conditions */}
      {showTerms && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Syarat & Ketentuan</h3>
              <button 
                onClick={() => setShowTerms(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto prose prose-sm">
              <p className="text-[#4B5563] mb-3">
                Dengan menggunakan layanan ProjekKita, Anda setuju untuk mematuhi syarat dan ketentuan berikut:
              </p>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">1. Penggunaan Platform</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Pengguna harus berusia minimal 17 tahun</li>
                <li>Informasi yang diberikan harus akurat dan benar</li>
                <li>Dilarang menyalahgunakan platform untuk tujuan ilegal</li>
              </ul>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">2. Donasi</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Semua donasi bersifat sukarela dan tidak dapat dikembalikan</li>
                <li>Donasi akan digunakan sesuai tujuan proyek</li>
                <li>Laporan penggunaan dana akan dipublikasikan</li>
              </ul>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">3. Tanggung Jawab</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>ProjekKita tidak bertanggung jawab atas kerugian akibat penggunaan platform</li>
                <li>Pengguna bertanggung jawab atas aktivitas akun mereka</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Privacy Policy */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Kebijakan Privasi</h3>
              <button 
                onClick={() => setShowPrivacyPolicy(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto prose prose-sm">
              <p className="text-[#4B5563] mb-3">
                Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda berikan.
              </p>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">Data yang Kami Kumpulkan:</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Informasi akun (nama, email, nomor telepon)</li>
                <li>Riwayat donasi dan kontribusi</li>
                <li>Preferensi notifikasi</li>
                <li>Data interaksi dengan platform</li>
              </ul>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">Penggunaan Data:</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Mengelola akun dan layanan Anda</li>
                <li>Mengirimkan update proyek dan laporan</li>
                <li>Meningkatkan pengalaman pengguna</li>
                <li>Keamanan dan pencegahan fraud</li>
              </ul>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">Keamanan Data:</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#4B5563]">
                <li>Data dienkripsi dengan standar industri</li>
                <li>Tidak dibagikan kepada pihak ketiga tanpa izin</li>
                <li>Akses data dibatasi hanya untuk keperluan operasional</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Help & FAQ */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Pusat Bantuan & FAQ</h3>
              <button 
                onClick={() => setShowHelp(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              <div className="border-b border-[#E5E7EB] pb-4">
                <h4 className="font-bold text-[#0E1B33] mb-2">Bagaimana cara membuat donasi?</h4>
                <p className="text-sm text-[#4B5563]">
                  Pilih proyek yang ingin Anda dukung, klik tombol "Donasi Sekarang", masukkan nominal, pilih metode pembayaran, dan konfirmasi donasi Anda.
                </p>
              </div>
              <div className="border-b border-[#E5E7EB] pb-4">
                <h4 className="font-bold text-[#0E1B33] mb-2">Apakah donasi saya aman?</h4>
                <p className="text-sm text-[#4B5563]">
                  Ya, semua transaksi menggunakan payment gateway terverifikasi dan data Anda dienkripsi dengan standar keamanan tinggi.
                </p>
              </div>
              <div className="border-b border-[#E5E7EB] pb-4">
                <h4 className="font-bold text-[#0E1B33] mb-2">Bagaimana saya bisa melihat laporan dana?</h4>
                <p className="text-sm text-[#4B5563]">
                  Buka halaman detail proyek, pilih tab "Progress" atau "Wallet" untuk melihat laporan penggunaan dana secara transparan.
                </p>
              </div>
              <div className="pb-4">
                <h4 className="font-bold text-[#0E1B33] mb-2">Bagaimana cara bergabung dengan proyek?</h4>
                <p className="text-sm text-[#4B5563]">
                  Alumni dapat bergabung dengan proyek melalui halaman detail proyek. Klik "Gabung Proyek" dan ikuti instruksi selanjutnya.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Contact Us */}
      {showContact && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Hubungi Kami</h3>
              <button 
                onClick={() => setShowContact(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-xl">
                <span className="material-symbols-outlined text-[#243D68]">mail</span>
                <div>
                  <p className="text-xs text-[#6B7280]">Email</p>
                  <p className="text-sm font-bold text-[#0E1B33]">support@projekkita.id</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-xl">
                <span className="material-symbols-outlined text-[#243D68]">phone</span>
                <div>
                  <p className="text-xs text-[#6B7280]">WhatsApp</p>
                  <p className="text-sm font-bold text-[#0E1B33]">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-xl">
                <span className="material-symbols-outlined text-[#243D68]">schedule</span>
                <div>
                  <p className="text-xs text-[#6B7280]">Jam Operasional</p>
                  <p className="text-sm font-bold text-[#0E1B33]">Senin - Jumat, 09:00 - 17:00 WIB</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E5E7EB] rounded-b-2xl">
              <button
                onClick={() => setShowContact(false)}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Bug Report */}
      {showBugReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <div className="bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Laporkan Bug</h3>
              <button 
                onClick={() => setShowBugReport(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Judul Masalah
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                  placeholder="Deskripsi singkat masalah"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                  Detail Masalah
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none resize-none"
                  placeholder="Jelaskan masalah yang Anda alami secara detail..."
                />
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                <p className="text-xs text-orange-800">
                  <strong>Catatan:</strong> Tim kami akan menindaklanjuti laporan Anda dalam 1-2 hari kerja.
                </p>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-[#E5E7EB] rounded-b-2xl flex gap-3">
              <button
                onClick={() => setShowBugReport(false)}
                className="flex-1 py-3 rounded-xl font-bold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  setShowBugReport(false);
                  alert('Laporan berhasil dikirim! Terima kasih.');
                }}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg transition-all"
              >
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-red-600 text-4xl">logout</span>
              </div>
              <h3 className="text-xl font-bold text-[#0E1B33] mb-2">Keluar dari Akun?</h3>
              <p className="text-sm text-[#6B7280] mb-6">
                Anda yakin ingin keluar? Anda dapat login kembali kapan saja.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Ya, Keluar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
