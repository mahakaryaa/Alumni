import { useState } from 'react';
import { Logo } from './Logo';
import { useTranslation } from '@/hooks/useTranslation';

interface SettingsPageProps {
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  onNavigateMyDonations?: () => void;
  onNavigateMyJoinRequests?: () => void;
  onNavigateBookmarks?: () => void;
  activeNav?: string;
  userRole?: 'donatur' | 'alumni' | 'alumni-guest' | null;
  language?: 'id' | 'en';
  onLanguageChange?: (lang: 'id' | 'en') => void;
}

export function SettingsPage({ 
  onBack, 
  onNavigateHome, 
  onNavigateExplore, 
  onNavigateMessages, 
  onNavigateSettings,
  onLogout,
  onNavigateMyDonations,
  onNavigateMyJoinRequests,
  onNavigateBookmarks,
  activeNav = 'settings',
  userRole = 'alumni',
}: SettingsPageProps) {
  // Profile states
  const [profilePhoto, setProfilePhoto] = useState('');
  const [fullName, setFullName] = useState('Muhammad Alfatih');
  const [username, setUsername] = useState('muhammadalfatih');
  const [email, setEmail] = useState('muhammad.alfatih@email.com');
  const [phone, setPhone] = useState('081234567890');
  const [jurusan, setJurusan] = useState('Teknik Informatika');
  const [bio, setBio] = useState('Alumni aktif yang passionate dalam teknologi dan pendidikan');
  const [currentStatus, setCurrentStatus] = useState('Bekerja');
  const [company, setCompany] = useState('PT. Teknologi Nusantara');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  
  // Saladin Camp participation state - support multiple participations
  const [saladinCampParticipations, setSaladinCampParticipations] = useState<Array<{ batch: string; level: string }>>([
    { batch: 'Batch 1 — 30 April – 4 Mei 2024', level: 'Beginner' }
  ]);
  
  // Additional Informasi Pribadi states
  const [namaPanggilan, setNamaPanggilan] = useState('Fatih');
  const [domisili, setDomisili] = useState('Jakarta');
  const [statusPernikahan, setStatusPernikahan] = useState('Single');
  const [statusPekerjaan, setStatusPekerjaan] = useState('Bekerja');
  const [instagramPribadi, setInstagramPribadi] = useState('');
  
  // Additional Data Alumni states
  const [jurusanS2, setJurusanS2] = useState('');
  const [skills, setSkills] = useState('Web Development, UI/UX Design');
  const [sedangDipelajari, setSedangDipelajari] = useState('React Native, Machine Learning');
  const [sosmedEdukasi, setSosmedEdukasi] = useState('');
  
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
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);
  
  // Privacy states
  const [profileVisibility, setProfileVisibility] = useState('alumni');
  const [contactVisibility, setContactVisibility] = useState('alumni');
  const [mentionPermission, setMentionPermission] = useState('all');
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  
  // Preferences states - use global language from LanguageProvider
  const { language, setLanguage, t } = useTranslation();
  
  // Modal states
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfileType, setEditProfileType] = useState<'pribadi' | 'alumni'>('pribadi'); // Track which form to show
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
    <div className="flex min-h-screen bg-[#F8F9FA] overflow-x-hidden max-w-full">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <Logo />
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
                <span className="tracking-wide text-sm">{t.nav.home}</span>
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'explore' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateExplore}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">{t.nav.explore}</span>
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'pesan' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
                onClick={onNavigateMessages}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">{t.nav.messages}</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all bg-white/10 text-white w-full">
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">{t.nav.settings}</span>
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
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden w-full max-w-full">
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
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20 lg:pb-8 w-full max-w-full">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-6 space-y-6 w-full">
            
            {/* Quick Profile Card */}
            <div className="bg-gradient-to-br from-[#243D68] to-[#2B4468] rounded-2xl p-4 md:p-6 shadow-lg overflow-hidden">
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
                  <h3 className="text-white font-bold text-base md:text-lg truncate break-words">{fullName}</h3>
                  {(userRole === 'alumni' || userRole === 'alumni-guest') && username && (
                    <p className="text-[#FAC06E] text-xs font-semibold truncate break-words">@{username}</p>
                  )}
                  <p className="text-white/80 text-xs truncate break-words">{email}</p>
                  {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-white/70 text-xs truncate break-words">{jurusan}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setEditProfileType('pribadi');
                    setShowEditProfile(true);
                  }}
                  className="px-3 py-2 md:px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-xs md:text-sm transition-colors backdrop-blur-sm border border-white/20 whitespace-nowrap"
                >
                  {t.settings.editProfileBtn}
                </button>
              </div>
            </div>

            {/* 1. PROFIL ALUMNI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">person</span>
                {userRole === 'donatur' ? t.settings.account : t.settings.alumniProfile}
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <button
                  onClick={() => {
                    setEditProfileType('pribadi');
                    setShowEditProfile(true);
                  }}
                  className={`w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors ${
                    (userRole === 'alumni' || userRole === 'alumni-guest') ? 'border-b border-[#E5E7EB]' : ''
                  }`}
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">badge</span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.personalInfo}</p>
                    <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Nama, foto, bio, dan kontak' : 'Name, photo, bio, and contact'}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                  <>
                    <button
                      onClick={() => {
                        setEditProfileType('alumni');
                        setShowEditProfile(true);
                      }}
                      className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                    >
                      <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[#243D68]">school</span>
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.alumniData}</p>
                        <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Skill, edukasi, batch Saladin Camp' : 'Skills, education, Saladin Camp batch'}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                    </button>

                    <button
                      onClick={onNavigateBookmarks}
                      className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                    >
                      <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[#243D68]">bookmark</span>
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <p className="text-sm font-semibold text-[#0E1B33]">{language === 'id' ? 'Project Tersimpan' : 'Saved Projects'}</p>
                        <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Lihat semua project yang di-bookmark' : 'View all bookmarked projects'}</p>
                      </div>
                      <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 2. KEAMANAN AKUN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">security</span>
                {t.settings.accountSecurity}
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
                    <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.changePassword}</p>
                    <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Update password akun Anda' : 'Update your account password'}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                  <div className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 ${
                    (userRole === 'alumni' || userRole === 'alumni-guest') ? 'border-b border-[#E5E7EB]' : ''
                  }`}>
                    <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#243D68]">verified_user</span>
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.emailVerification}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {emailVerified ? (
                          <>
                            <span className="material-symbols-outlined text-green-600 text-sm">check_circle</span>
                            <span className="text-xs text-green-600 font-semibold">{t.settings.verified}</span>
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-orange-600 text-sm">error</span>
                            <span className="text-xs text-orange-600 font-semibold">{t.settings.notVerified}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {!emailVerified && (
                      <button className="text-xs font-bold text-[#243D68] hover:underline flex-shrink-0">
                        {t.settings.resend}
                      </button>
                    )}
                  </div>

                {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                  <div className="flex items-center justify-between gap-3 p-4 md:p-5">
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[#243D68]">phonelink_lock</span>
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.twoFactor}</p>
                      <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Keamanan tambahan untuk akun' : 'Additional security for account'}</p>
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
                )}
              </div>
            </div>

            {/* 3. NOTIFIKASI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">notifications</span>
                {t.settings.notifications}
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-5">
                <p className="text-xs text-[#6B7280] mb-4">{language === 'id' ? 'Atur notifikasi yang ingin Anda terima' : 'Manage the notifications you want to receive'}</p>

                <div className="space-y-4">
                  {/* Push Notifications */}
                  <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.pushNotifications}</p>
                      <p className="text-xs text-[#6B7280]">{t.settings.inAppNotifications}</p>
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
                      <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.emailNotifications}</p>
                      <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Notifikasi via email' : 'Email notifications'}</p>
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

                  {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                    <>
                      <p className="text-xs font-semibold text-[#0E1B33] pt-2">{t.settings.notificationCategories}</p>

                      {/* Update Proyek */}
                      <div className="flex items-center justify-between gap-3 pb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0E1B33]">{t.settings.projectUpdates}</p>
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
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 4. PRIVASI Section */}
            {(userRole === 'alumni' || userRole === 'alumni-guest') && (
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
            )}

            {/* 6. PREFERENSI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">tune</span>
                {t.settings.preferences}
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 md:p-5 space-y-4">
                {/* Bahasa */}
                <div className="pb-4 border-b border-[#E5E7EB]">
                  <label className="block text-sm font-semibold text-[#0E1B33] mb-2">{t.settings.language}</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none text-sm appearance-none bg-white"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.5rem'
                    }}
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 7. TENTANG & BANTUAN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">info</span>
                {language === 'id' ? 'TENTANG & BANTUAN' : 'ABOUT & SUPPORT'}
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <div className="p-4 md:p-5 border-b border-[#E5E7EB]">
                  <p className="text-xs text-[#6B7280] mb-1">{t.settings.appVersion}</p>
                  <p className="text-sm font-bold text-[#0E1B33]">v1.0.0</p>
                </div>

                <button
                  onClick={() => setShowTerms(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.termsConditions}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowPrivacyPolicy(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.privacyPolicy}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowHelp(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">{language === 'id' ? 'Pusat Bantuan & FAQ' : 'Help Center & FAQ'}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowContact(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.contactUs}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowBugReport(true)}
                  className="w-full flex items-center gap-3 md:gap-4 p-4 md:p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-[#0E1B33]">{t.settings.reportBug}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280] flex-shrink-0">chevron_right</span>
                </button>
              </div>
            </div>

            {/* 9. LOGOUT Section */}
            <div>
              <div className="bg-white rounded-2xl border border-red-200 shadow-sm p-4 md:p-5">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span>{language === 'id' ? 'Keluar dari Akun' : 'Logout'}</span>
                </button>
                <p className="text-xs text-[#6B7280] text-center mt-3 italic">
                  {language === 'id' ? 'Anda dapat kembali kapan saja' : 'You can come back anytime'}
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
              <h3 className="text-lg font-bold text-white">
                {editProfileType === 'pribadi' ? 'Informasi Pribadi' : 'Data Alumni'}
              </h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-white">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              
              {editProfileType === 'pribadi' ? (
                <>
                  {/* FORM INFORMASI PRIBADI */}
                  
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

                  {/* Nama Panggilan */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      value={namaPanggilan}
                      onChange={(e) => setNamaPanggilan(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                      placeholder="Nama panggilan Anda"
                    />
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

                  {/* Domisili */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Domisili Saat Ini
                    </label>
                    <input
                      type="text"
                      value={domisili}
                      onChange={(e) => setDomisili(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                      placeholder="Kota tempat tinggal"
                    />
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

                  {/* Status Pernikahan - Only for Alumni */}
                  {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                    <div>
                      <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                        Status Pernikahan
                      </label>
                      <select
                        value={statusPernikahan}
                        onChange={(e) => setStatusPernikahan(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.5rem'
                        }}
                      >
                        <option value="Single">Single</option>
                        <option value="Menikah">Menikah</option>
                        <option value="Duda">Duda</option>
                        <option value="Janda">Janda</option>
                      </select>
                    </div>
                  )}

                  {/* Status Pekerjaan - Only for Alumni */}
                  {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                    <div>
                      <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                        Status Pekerjaan
                      </label>
                      <select
                        value={statusPekerjaan}
                        onChange={(e) => setStatusPekerjaan(e.target.value)}
                        className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 1rem center',
                          backgroundSize: '1.5rem'
                        }}
                      >
                        <option value="Bekerja">Bekerja</option>
                        <option value="Pelajar">Pelajar</option>
                        <option value="Mahasiswa">Mahasiswa</option>
                        <option value="Wirausaha">Wirausaha</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Mencari Kerja">Mencari Kerja</option>
                      </select>
                    </div>
                  )}

                  {/* Instagram Pribadi - Only for Alumni */}
                  {(userRole === 'alumni' || userRole === 'alumni-guest') && (
                    <div>
                      <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                        Akun Instagram Pribadi
                      </label>
                      <input
                        type="text"
                        value={instagramPribadi}
                        onChange={(e) => setInstagramPribadi(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                        placeholder="@username"
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* FORM DATA ALUMNI */}
                  
                  {/* Jurusan S1 */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Jurusan S1 *
                    </label>
                    <select
                      value={jurusan}
                      onChange={(e) => setJurusan(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5rem'
                      }}
                    >
                      <option value="Teknik Informatika">Teknik Informatika</option>
                      <option value="Teknik Informatika">Teknik Informatika</option>
                      <option value="Sistem Informasi">Sistem Informasi</option>
                      <option value="Teknik Elektro">Teknik Elektro</option>
                      <option value="Teknik Mesin">Teknik Mesin</option>
                      <option value="Teknik Sipil">Teknik Sipil</option>
                      <option value="Teknik Industri">Teknik Industri</option>
                      <option value="Manajemen">Manajemen</option>
                      <option value="Akuntansi">Akuntansi</option>
                      <option value="Ekonomi Syariah">Ekonomi Syariah</option>
                      <option value="Ilmu Komunikasi">Ilmu Komunikasi</option>
                      <option value="Pendidikan Agama Islam">Pendidikan Agama Islam</option>
                      <option value="Hukum">Hukum</option>
                      <option value="Desain Komunikasi Visual">Desain Komunikasi Visual</option>
                      <option value="Arsitektur">Arsitektur</option>
                      <option value="Psikologi">Psikologi</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  {/* Jurusan S2 */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Jurusan S2 (Opsional)
                    </label>
                    <input
                      type="text"
                      value={jurusanS2}
                      onChange={(e) => setJurusanS2(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                      placeholder="Jurusan magister (jika ada)"
                    />
                  </div>

                  {/* Skills/Keahlian */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Skill / Keahlian
                    </label>
                    <textarea
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none resize-none"
                      placeholder="Contoh: Web Development, UI/UX Design, Content Writing"
                    />
                    <p className="text-xs text-[#6B7280] mt-1">Pisahkan dengan koma</p>
                  </div>

                  {/* Yang Sedang Dipelajari */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Yang Sedang Dipelajari
                    </label>
                    <textarea
                      value={sedangDipelajari}
                      onChange={(e) => setSedangDipelajari(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none resize-none"
                      placeholder="Contoh: React Native, Machine Learning, Arabic Language"
                    />
                    <p className="text-xs text-[#6B7280] mt-1">Pisahkan dengan koma</p>
                  </div>

                  {/* Akun Sosmed Edukasi Baitul Maqdis */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                      Akun Sosmed Edukasi Baitul Maqdis
                    </label>
                    <input
                      type="text"
                      value={sosmedEdukasi}
                      onChange={(e) => setSosmedEdukasi(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                      placeholder="@username_edukasi (Instagram/TikTok/YouTube)"
                    />
                    <p className="text-xs text-[#6B7280] mt-1">Akun khusus untuk konten edukasi Baitul Maqdis & Al Aqsa</p>
                  </div>

                  {/* Saladin Camp Participation */}
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-[#0E1B33] flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#243D68]">military_tech</span>
                        Partisipasi Saladin Camp
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setSaladinCampParticipations([
                            ...saladinCampParticipations,
                            { batch: 'Batch 1 — 30 April – 4 Mei 2024', level: 'Beginner' }
                          ]);
                        }}
                        className="flex items-center gap-1 text-xs font-semibold text-[#243D68] hover:text-[#1a2d4d] transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">add_circle</span>
                        Tambah
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {saladinCampParticipations.map((participation, index) => (
                        <div key={index} className="relative p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB]">
                          {/* Remove button - only show if more than 1 participation */}
                          {saladinCampParticipations.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                setSaladinCampParticipations(
                                  saladinCampParticipations.filter((_, i) => i !== index)
                                );
                              }}
                              className="absolute top-2 right-2 p-1 hover:bg-red-100 rounded-lg transition-colors group"
                              title="Hapus partisipasi"
                            >
                              <span className="material-symbols-outlined text-[#6B7280] group-hover:text-red-500 text-sm">close</span>
                            </button>
                          )}
                          
                          <div className="grid grid-cols-2 gap-3">
                            {/* Batch */}
                            <div>
                              <label className="block text-xs font-semibold text-[#0E1B33] mb-2">
                                Batch
                              </label>
                              <select
                                value={participation.batch}
                                onChange={(e) => {
                                  const newParticipations = [...saladinCampParticipations];
                                  newParticipations[index].batch = e.target.value;
                                  setSaladinCampParticipations(newParticipations);
                                }}
                                className="w-full pl-3 pr-10 py-2.5 text-sm border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 0.5rem center',
                                  backgroundSize: '1.25rem'
                                }}
                              >
                                <option value="Batch 1 — 30 April – 4 Mei 2024">Batch 1 — 30 April – 4 Mei 2024</option>
                                <option value="Batch 2 — 23 – 29 September 2024">Batch 2 — 23 – 29 September 2024</option>
                                <option value="Batch 3 — Lampung AWG">Batch 3 — Lampung AWG</option>
                                <option value="Batch 4 — UMJ & Bogor — Mei 2025">Batch 4 — UMJ & Bogor — Mei 2025</option>
                                <option value="Batch 5 — Bogor — 5–19 Oktober 2025">Batch 5 — Bogor — 5–19 Oktober 2025</option>
                                <option value="Batch 6 — Semarang — November 2025">Batch 6 — Semarang — November 2025</option>
                              </select>
                            </div>

                            {/* Level */}
                            <div>
                              <label className="block text-xs font-semibold text-[#0E1B33] mb-2">
                                Level
                              </label>
                              <select
                                value={participation.level}
                                onChange={(e) => {
                                  const newParticipations = [...saladinCampParticipations];
                                  newParticipations[index].level = e.target.value;
                                  setSaladinCampParticipations(newParticipations);
                                }}
                                className="w-full pl-3 pr-10 py-2.5 text-sm border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                                style={{
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                                  backgroundRepeat: 'no-repeat',
                                  backgroundPosition: 'right 0.5rem center',
                                  backgroundSize: '1.25rem'
                                }}
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate 1">Intermediate 1</option>
                                <option value="Intermediate 2">Intermediate 2</option>
                                <option value="Advance">Advance</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <p className="text-xs text-[#6B7280] mt-2">
                      Tambahkan semua batch dan level Saladin Camp yang pernah Anda ikuti
                    </p>
                  </div>
                </>
              )}
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
                Simpan
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
                  className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
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
                  className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
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
                  className="w-full pl-4 pr-12 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.5rem'
                  }}
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
              <h3 className="text-lg font-bold text-white">{t.settings.termsConditions}</h3>
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
              <h3 className="text-lg font-bold text-white">{t.settings.privacyPolicy}</h3>
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
              <h3 className="text-lg font-bold text-white">{t.settings.contactUs}</h3>
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
              <h3 className="text-lg font-bold text-white">{t.settings.reportBug}</h3>
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
