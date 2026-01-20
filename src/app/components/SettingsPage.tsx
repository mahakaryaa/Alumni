import { useState } from 'react';

interface SettingsPageProps {
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  activeNav?: string;
}

type NotificationSettings = {
  projectUpdates: boolean;
  fundingReports: boolean;
  importantAnnouncements: boolean;
  contributionReminders: boolean;
};

export function SettingsPage({ onBack, onNavigateHome, onNavigateExplore, onNavigateMessages, activeNav = 'settings' }: SettingsPageProps) {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    projectUpdates: false,
    fundingReports: true,
    importantAnnouncements: true,
    contributionReminders: false,
  });

  const [showEditName, setShowEditName] = useState(false);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showTransparency, setShowTransparency] = useState(false);
  const [showDataPolicy, setShowDataPolicy] = useState(false);
  const [showFundManagement, setShowFundManagement] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContactAdmin, setShowContactAdmin] = useState(false);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const [displayName, setDisplayName] = useState('Erda Aniva');
  const [email, setEmail] = useState('erda@email.com');

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    // Implement logout logic
    alert('Logout berhasil!');
    onBack();
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="p-5">
            <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md">
              <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                PROJEKKITA
              </span>
            </div>
          </div>

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

          <div className="p-5 pb-6">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
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
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-8">
          <div className="max-w-3xl mx-auto px-6 md:px-8 py-6 space-y-6">
            {/* AKUN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3">Akun</h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                {/* Nama Tampilan */}
                <button
                  onClick={() => setShowEditName(true)}
                  className="w-full flex items-center gap-4 p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">person</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Nama Tampilan</p>
                    <p className="text-sm text-[#6B7280]">{displayName}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                {/* Email */}
                <button
                  onClick={() => setShowEditEmail(true)}
                  className="w-full flex items-center gap-4 p-5 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">mail</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Email</p>
                    <p className="text-sm text-[#6B7280]">{email}</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                {/* Ubah Kata Sandi */}
                <button
                  onClick={() => setShowChangePassword(true)}
                  className="w-full flex items-center gap-4 p-5 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#243D68]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68]">lock</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Ubah Kata Sandi</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* NOTIFIKASI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3">Notifikasi</h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
                <p className="text-xs text-[#6B7280] mb-4">Anda mengatur pesan yang diterima</p>

                <div className="space-y-4">
                  {/* Update Proyek */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0E1B33]">Update Proyek</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('projectUpdates')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.projectUpdates ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.projectUpdates ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Laporan Penggunaan Dana */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0E1B33]">Laporan Penggunaan Dana</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('fundingReports')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.fundingReports ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.fundingReports ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Pengumuman Penting */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0E1B33]">Pengumuman Penting</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('importantAnnouncements')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.importantAnnouncements ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.importantAnnouncements ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Pengingat Kontribusi */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#0E1B33]">Pengingat Kontribusi</p>
                    </div>
                    <button
                      onClick={() => toggleNotification('contributionReminders')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.contributionReminders ? 'bg-[#243D68]' : 'bg-[#E5E7EB]'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications.contributionReminders ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                  <p className="text-xs text-[#6B7280] italic text-center">
                    Kami hanya mengirim info penting
                  </p>
                </div>
              </div>
            </div>

            {/* PRIVASI & TRANSPARANSI Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3">
                Privasi & Transparansi
              </h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <p className="text-xs text-[#6B7280] px-5 pt-5 pb-3">
                  Prinsip pengelolaan & amanah dana
                </p>

                <button
                  onClick={() => setShowTransparency(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Prinsip Transparansi PROJEKKITA</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowDataPolicy(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Kebijakan Penggunaan Data</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowFundManagement(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Cara Dana Dikelola</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowContact(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Kontak Pengelola</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* BANTUAN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3">Bantuan</h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <p className="text-xs text-[#6B7280] px-5 pt-5 pb-3">
                  Kami siap membantu bila diperlukan
                </p>

                <button
                  onClick={() => setShowFAQ(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Pertanyaan Umum (FAQ)</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowContactAdmin(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors border-b border-[#E5E7EB]"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Hubungi Admin</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>

                <button
                  onClick={() => setShowReportIssue(true)}
                  className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#F8F9FA] transition-colors"
                >
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-[#0E1B33]">Laporkan Masalah</p>
                  </div>
                  <span className="material-symbols-outlined text-[#6B7280]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* AKSI AKUN Section */}
            <div>
              <h3 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-3">Aksi Akun</h3>
              <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5">
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-[#DC2626] hover:bg-red-50 transition-colors"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span>Keluar Akun</span>
                </button>
                <p className="text-xs text-[#6B7280] text-center mt-3 italic">
                  Anda dapat kembali kapan saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal - Edit Name */}
      {showEditName && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-[#0E1B33] mb-4">Edit Nama Tampilan</h3>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditName(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setShowEditName(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#243D68] hover:bg-[#1a2f54] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Edit Email */}
      {showEditEmail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-[#0E1B33] mb-4">Edit Email</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditEmail(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setShowEditEmail(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#243D68] hover:bg-[#1a2f54] transition-colors"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Change Password */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-[#0E1B33] mb-4">Ubah Kata Sandi</h3>
            <div className="space-y-3 mb-4">
              <input
                type="password"
                placeholder="Kata sandi lama"
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
              />
              <input
                type="password"
                placeholder="Kata sandi baru"
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
              />
              <input
                type="password"
                placeholder="Konfirmasi kata sandi baru"
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => setShowChangePassword(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#243D68] hover:bg-[#1a2f54] transition-colors"
              >
                Ubah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Transparency Principles */}
      {showTransparency && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Prinsip Transparansi PROJEKKITA</h3>
              <button onClick={() => setShowTransparency(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-[#4B5563]">
              <p className="mb-3">
                PROJEKKITA berkomitmen untuk menjalankan prinsip transparansi dan amanah dalam setiap pengelolaan
                dana yang dipercayakan kepada kami.
              </p>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">Prinsip Kami:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Setiap donasi akan dilaporkan secara terbuka dan real-time</li>
                <li>Penggunaan dana diaudit oleh lembaga independen</li>
                <li>Laporan keuangan dapat diakses oleh semua donatur</li>
                <li>Bukti penggunaan dana dipublikasikan secara berkala</li>
                <li>Komunikasi terbuka dengan semua stakeholder</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Data Policy */}
      {showDataPolicy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Kebijakan Penggunaan Data</h3>
              <button onClick={() => setShowDataPolicy(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-[#4B5563]">
              <p className="mb-3">
                Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda berikan.
              </p>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">Data yang Kami Kumpulkan:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Informasi akun (nama, email, nomor telepon)</li>
                <li>Riwayat donasi dan kontribusi</li>
                <li>Preferensi notifikasi</li>
                <li>Data interaksi dengan platform</li>
              </ul>
              <h4 className="font-bold text-[#0E1B33] mt-4 mb-2">Penggunaan Data:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Mengelola akun dan layanan Anda</li>
                <li>Mengirimkan update proyek dan laporan</li>
                <li>Meningkatkan pengalaman pengguna</li>
                <li>Keamanan dan pencegahan fraud</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Fund Management */}
      {showFundManagement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Cara Dana Dikelola</h3>
              <button onClick={() => setShowFundManagement(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="prose prose-sm max-w-none text-[#4B5563]">
              <h4 className="font-bold text-[#0E1B33] mb-2">Alur Pengelolaan Dana:</h4>
              <ol className="list-decimal pl-5 space-y-2">
                <li><strong>Penerimaan:</strong> Dana diterima melalui payment gateway terverifikasi</li>
                <li><strong>Verifikasi:</strong> Tim finance melakukan verifikasi dalam 1x24 jam</li>
                <li><strong>Rekening Khusus:</strong> Dana disimpan di rekening khusus project</li>
                <li><strong>Pencairan:</strong> Pencairan dilakukan sesuai tahapan proyek</li>
                <li><strong>Pelaporan:</strong> Laporan penggunaan dana dipublikasikan berkala</li>
                <li><strong>Audit:</strong> Audit independen dilakukan setiap 6 bulan</li>
              </ol>
              <div className="bg-[#FFF9E6] border border-[#FAC06E] rounded-xl p-4 mt-4">
                <p className="text-sm text-[#92400E]">
                  <strong>Komitmen Kami:</strong> 100% dana yang masuk akan digunakan untuk proyek yang dituju.
                  Biaya operasional platform ditanggung oleh sponsor dan iklan non-intrusive.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Contact Info */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Kontak Pengelola</h3>
              <button onClick={() => setShowContact(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl">
                <span className="material-symbols-outlined text-[#243D68]">mail</span>
                <div>
                  <p className="text-xs text-[#6B7280]">Email</p>
                  <p className="text-sm font-semibold text-[#0E1B33]">info@projekkita.id</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl">
                <span className="material-symbols-outlined text-[#243D68]">phone</span>
                <div>
                  <p className="text-xs text-[#6B7280]">WhatsApp</p>
                  <p className="text-sm font-semibold text-[#0E1B33]">+62 812-3456-7890</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#F8F9FA] rounded-xl">
                <span className="material-symbols-outlined text-[#243D68]">location_on</span>
                <div>
                  <p className="text-xs text-[#6B7280]">Alamat</p>
                  <p className="text-sm font-semibold text-[#0E1B33]">Jl. Amanah No. 123, Jakarta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - FAQ */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Pertanyaan Umum (FAQ)</h3>
              <button onClick={() => setShowFAQ(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-b border-[#E5E7EB] pb-4">
                <h4 className="font-semibold text-[#0E1B33] mb-2">Bagaimana cara berdonasi?</h4>
                <p className="text-sm text-[#6B7280]">
                  Pilih proyek yang ingin Anda dukung, klik tombol "Donasi", pilih nominal, dan ikuti instruksi pembayaran.
                </p>
              </div>
              <div className="border-b border-[#E5E7EB] pb-4">
                <h4 className="font-semibold text-[#0E1B33] mb-2">Apakah donasi saya aman?</h4>
                <p className="text-sm text-[#6B7280]">
                  Ya, kami menggunakan payment gateway terverifikasi dan seluruh transaksi dienkripsi.
                </p>
              </div>
              <div className="border-b border-[#E5E7EB] pb-4">
                <h4 className="font-semibold text-[#0E1B33] mb-2">Bagaimana saya tahu dana digunakan dengan benar?</h4>
                <p className="text-sm text-[#6B7280]">
                  Setiap proyek memiliki laporan transparansi yang dapat Anda akses. Kami juga mengirimkan update berkala.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-[#0E1B33] mb-2">Apakah saya bisa membatalkan donasi?</h4>
                <p className="text-sm text-[#6B7280]">
                  Donasi yang sudah dikonfirmasi tidak dapat dibatalkan. Namun Anda bisa menghubungi admin untuk kasus khusus.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Contact Admin */}
      {showContactAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Hubungi Admin</h3>
              <button onClick={() => setShowContactAdmin(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <textarea
                placeholder="Tulis pesan Anda di sini..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none resize-none"
              />
              <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#243D68] hover:bg-[#1a2f54] transition-colors">
                Kirim Pesan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Report Issue */}
      {showReportIssue && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0E1B33]">Laporkan Masalah</h3>
              <button onClick={() => setShowReportIssue(false)} className="p-2 hover:bg-[#F8F9FA] rounded-lg">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div className="relative">
                <select className="w-full px-4 py-3 pr-12 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none appearance-none bg-white">
                  <option>Pilih kategori masalah</option>
                  <option>Masalah Pembayaran</option>
                  <option>Bug / Error Sistem</option>
                  <option>Konten Tidak Pantas</option>
                  <option>Lainnya</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#243D68] pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
              <textarea
                placeholder="Jelaskan masalah yang Anda alami..."
                rows={5}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none resize-none"
              />
              <button className="w-full py-3 rounded-xl font-semibold text-white bg-[#243D68] hover:bg-[#1a2f54] transition-colors">
                Kirim Laporan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[#DC2626] text-3xl">logout</span>
              </div>
              <h3 className="text-lg font-bold text-[#0E1B33] mb-2">Keluar dari Akun?</h3>
              <p className="text-sm text-[#6B7280]">
                Anda yakin ingin keluar dari akun? Anda dapat login kembali kapan saja.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-xl font-semibold text-[#6B7280] bg-[#F8F9FA] hover:bg-[#E5E7EB] transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#DC2626] hover:bg-[#B91C1C] transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6DCE8] lg:hidden z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          <button
            onClick={onNavigateHome}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'home' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'home' ? 'filled' : ''}`}>
              home
            </span>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={onNavigateExplore}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'explore' ? 'filled' : ''}`}>
              explore
            </span>
            <span className="text-xs font-medium">Explore</span>
          </button>
          <button
            onClick={onNavigateMessages}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors relative ${
              activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'pesan' ? 'filled' : ''}`}>
              chat_bubble
            </span>
            <span className="text-xs font-medium">Pesan</span>
            <span className="absolute top-1.5 right-1/4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'settings' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'settings' ? 'filled' : ''}`}>
              settings
            </span>
            <span className="text-xs font-medium">Setting</span>
          </button>
        </div>
      </nav>
    </div>
  );
}