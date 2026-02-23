import { Logo } from './Logo';

interface MessagePageProps {
  onBack: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateSettings?: () => void;
  onNavigateMessages?: () => void;
  activeNav?: string;
}

export function MessagePage({ onBack, onNavigateHome, onNavigateExplore, onNavigateSettings, onNavigateMessages, activeNav = 'pesan' }: MessagePageProps) {
  // Mock data - laporan donasi dengan berbagai status
  const donations = [
    {
      id: 1,
      refNumber: 'PK05187621522',
      project: 'Bantuan Pangan Gaza',
      category: 'Kemanusiaan',
      amount: 50000,
      method: 'DANA',
      date: '17 Februari 2026',
      transferTime: '17 Februari 2026 pukul 12.13',
      status: 'verifikasi', // dalam proses verifikasi
    },
    {
      id: 2,
      refNumber: 'PK05187621423',
      project: 'Pendidikan Al-Aqsa',
      category: 'Pendidikan',
      amount: 100000,
      method: 'BCA',
      date: '15 Februari 2026',
      transferTime: '15 Februari 2026 pukul 09.30',
      status: 'confirmed', // berhasil dikonfirmasi
    },
    {
      id: 3,
      refNumber: 'PK05187621321',
      project: 'Rumah Sakit Gaza',
      category: 'Kesehatan',
      amount: 75000,
      method: 'Mandiri',
      date: '14 Februari 2026',
      transferTime: '14 Februari 2026 pukul 15.45',
      status: 'rejected', // ditolak
      rejectReason: 'Bukti transfer tidak valid. Mohon upload ulang bukti transfer yang jelas.',
    },
    {
      id: 4,
      refNumber: 'PK05187621220',
      project: 'Renovasi Masjid Al-Ikhlas',
      category: 'Infrastruktur',
      amount: 500000,
      method: 'BNI',
      date: '12 Jan 2026',
      transferTime: '12 Jan 2026 pukul 10.20',
      status: 'confirmed', // Berhasil (old data)
    },
  ];

  // Mock data - pengumuman
  const announcements = [
    {
      id: 1,
      type: 'kebijakan',
      title: 'Pembaruan Kebijakan Privasi',
      message: 'Kami telah memperbarui kebijakan privasi untuk meningkatkan perlindungan data Anda. Silakan tinjau perubahan di pengaturan akun.',
      date: '14 Jan 2026',
      icon: 'policy',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      type: 'sistem',
      title: 'Maintenance Terjadwal',
      message: 'Sistem akan menjalani maintenance pada 20 Januari 2026, pukul 01:00 - 05:00 WIB. Beberapa fitur mungkin tidak tersedia sementara.',
      date: '13 Jan 2026',
      icon: 'build',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 3,
      type: 'info',
      title: 'Fitur Baru: Laporan Donasi',
      message: 'Sekarang Anda dapat melihat riwayat donasi dan laporan lengkap di halaman Pesan. Terima kasih atas kontribusi Anda!',
      date: '10 Jan 2026',
      icon: 'new_releases',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  // Mock data - pesan personal (conditional)
  const personalMessages = [
    {
      id: 1,
      project: 'Renovasi Masjid Al-Ikhlas',
      message: 'Terima kasih atas kontribusi Anda sebesar Rp 500.000 untuk Renovasi Masjid Al-Ikhlas. Proyek ini telah mencapai 75% dari target dana!',
      date: '12 Jan 2026',
      hasMessage: true,
    },
  ];

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const hasPersonalMessages = personalMessages.some(m => m.hasMessage);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30 shadow-sm">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <Logo />
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
                onClick={onNavigateHome}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">Home</span>
              </button>

              <button 
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
                onClick={onNavigateExplore}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white bg-white/10 shadow-sm w-full">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
              </button>

              <button 
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full"
                onClick={onNavigateSettings}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 pb-6">
            <button
              onClick={onBack}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
            >
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
            <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight uppercase">Pesan</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 md:px-8 py-6 pb-24 lg:pb-10 space-y-8 max-w-4xl mx-auto w-full">
          {/* Pesan Personal - Conditional */}
          {hasPersonalMessages && (
            <section>
              <h3 className="text-xl font-bold text-[#333333] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">mail</span>
                Pesan Personal
              </h3>
              <div className="space-y-4">
                {personalMessages
                  .filter(msg => msg.hasMessage)
                  .map((message) => (
                    <div
                      key={message.id}
                      className="bg-gradient-to-r from-[#FAC06E]/10 to-[#FAC06E]/5 rounded-xl p-5 border border-[#FAC06E]/30 shadow-sm"
                    >
                      <div className="flex gap-4">
                        <div className="shrink-0 w-12 h-12 bg-[#FAC06E]/20 rounded-xl flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#243D68]">
                            celebration
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-[#333333]">{message.project}</h4>
                            <span className="text-xs text-[#6B7280] whitespace-nowrap ml-2">
                              {message.date}
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280] leading-relaxed">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* Laporan Donasi */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-[#333333] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">receipt_long</span>
                Laporan Donasi
              </h3>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-2xl p-6 mb-4 text-white shadow-lg">
              <p className="text-white/80 text-sm mb-1">Total Donasi Anda</p>
              <p className="text-3xl font-bold mb-3">
                Rp {totalDonations.toLocaleString('id-ID')}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#FAC06E] text-lg">verified</span>
                  <span>{donations.length} Proyek</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#FAC06E] text-lg">favorite</span>
                  <span>Terima Kasih!</span>
                </div>
              </div>
            </div>

            {/* Donation List */}
            <div className="space-y-3">
              {donations.map((donation) => {
                // Determine status styling
                let statusBadge = {
                  icon: 'check_circle',
                  text: 'Berhasil',
                  color: 'text-[#4CAF50]',
                  bgColor: 'bg-[#E8F5E9]'
                };

                if (donation.status === 'verifikasi') {
                  statusBadge = {
                    icon: 'schedule',
                    text: 'Dalam Verifikasi',
                    color: 'text-[#FF9800]',
                    bgColor: 'bg-[#FFF3E0]'
                  };
                } else if (donation.status === 'rejected') {
                  statusBadge = {
                    icon: 'cancel',
                    text: 'Ditolak',
                    color: 'text-[#F44336]',
                    bgColor: 'bg-[#FFEBEE]'
                  };
                } else if (donation.status === 'confirmed') {
                  statusBadge = {
                    icon: 'check_circle',
                    text: 'Berhasil',
                    color: 'text-[#4CAF50]',
                    bgColor: 'bg-[#E8F5E9]'
                  };
                }

                return (
                  <div
                    key={donation.id}
                    className={`bg-white rounded-xl p-5 border hover:shadow-md transition-shadow ${
                      donation.status === 'rejected' 
                        ? 'border-[#F44336]/30 bg-red-50/30' 
                        : donation.status === 'verifikasi'
                        ? 'border-[#FF9800]/30 bg-orange-50/30'
                        : 'border-[#E5E7EB]'
                    }`}
                  >
                    {/* Status Badge - Top */}
                    <div className="mb-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold ${statusBadge.color} ${statusBadge.bgColor} px-3 py-1.5 rounded-full`}>
                        <span className="material-symbols-outlined text-sm">{statusBadge.icon}</span>
                        {statusBadge.text}
                      </span>
                    </div>

                    {/* Ref Number with Copy Button */}
                    <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                      <p className="text-xs text-[#6B7280] mb-1">Nomor Referensi Donasi</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-bold text-[#243D68]">{donation.refNumber}</code>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(donation.refNumber);
                            // You can add toast notification here
                          }}
                          className="p-1 hover:bg-[#F8F9FA] rounded transition-colors"
                          title="Salin nomor referensi"
                        >
                          <span className="material-symbols-outlined text-[#6B7280] text-base">content_copy</span>
                        </button>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div>
                        <p className="text-xs text-[#6B7280]">Project</p>
                        <p className="font-semibold text-[#333333]">{donation.project}</p>
                        <p className="text-xs text-[#FAC06E] font-medium">{donation.category}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div>
                          <p className="text-xs text-[#6B7280]">Nominal Donasi</p>
                          <p className="font-bold text-[#243D68]">Rp {donation.amount.toLocaleString('id-ID')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280]">Metode Pembayaran</p>
                          <p className="font-semibold text-[#333333]">{donation.method}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-[#6B7280]">Waktu Transfer</p>
                        <p className="text-sm text-[#333333]">{donation.transferTime}</p>
                      </div>
                    </div>

                    {/* Status Messages */}
                    {donation.status === 'verifikasi' && (
                      <div className="bg-[#FFF3E0] border border-[#FF9800]/30 rounded-lg p-3 mt-3">
                        <div className="flex gap-2">
                          <span className="material-symbols-outlined text-[#FF9800] text-lg mt-0.5">info</span>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-[#FF9800] mb-1">Donasi dalam Proses Verifikasi</p>
                            <p className="text-xs text-[#6B7280]">
                              Terima kasih atas konfirmasi Anda. Bukti transfer telah kami terima dan sedang dalam proses verifikasi.
                            </p>
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-[#6B7280]">• Donasi akan diverifikasi dalam 1x24 jam</p>
                              <p className="text-xs text-[#6B7280]">• Anda akan menerima email konfirmasi setelah verifikasi</p>
                              <p className="text-xs text-[#6B7280]">• Notifikasi juga akan dikirim melalui aplikasi</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {donation.status === 'rejected' && donation.rejectReason && (
                      <div className="bg-[#FFEBEE] border border-[#F44336]/30 rounded-lg p-3 mt-3">
                        <div className="flex gap-2">
                          <span className="material-symbols-outlined text-[#F44336] text-lg mt-0.5">error</span>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-[#F44336] mb-1">Donasi Ditolak</p>
                            <p className="text-xs text-[#6B7280] mb-2">{donation.rejectReason}</p>
                            <button className="text-xs font-semibold text-[#243D68] bg-white px-3 py-1.5 rounded-lg hover:bg-[#F8F9FA] transition-colors border border-[#E5E7EB]">
                              Upload Ulang Bukti Transfer
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {donation.status === 'confirmed' && (
                      <div className="bg-[#E8F5E9] border border-[#4CAF50]/30 rounded-lg p-3 mt-3">
                        <div className="flex gap-2">
                          <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">check_circle</span>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-[#4CAF50] mb-1">Donasi Berhasil Dikonfirmasi</p>
                            <p className="text-xs text-[#6B7280]">
                              Terima kasih! Donasi Anda telah berhasil diverifikasi dan diteruskan untuk {donation.project}.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Pengumuman */}
          <section>
            <h3 className="text-xl font-bold text-[#333333] mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#243D68]">campaign</span>
              Pengumuman
            </h3>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className="bg-white rounded-xl p-5 border border-[#E5E7EB] hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className={`shrink-0 w-12 h-12 ${announcement.bgColor} rounded-xl flex items-center justify-center`}>
                      <span className={`material-symbols-outlined ${announcement.color}`}>
                        {announcement.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-[#333333]">{announcement.title}</h4>
                        <span className="text-xs text-[#6B7280] whitespace-nowrap ml-2">
                          {announcement.date}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{announcement.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Empty State - when no messages */}
          {!hasPersonalMessages && donations.length === 0 && announcements.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#6B7280] text-5xl">inbox</span>
              </div>
              <h3 className="text-lg font-semibold text-[#333333] mb-2">Belum Ada Pesan</h3>
              <p className="text-sm text-[#6B7280]">
                Pesan dan notifikasi akan muncul di sini
              </p>
            </div>
          )}
        </div>
      </div>

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
            onClick={onNavigateSettings}
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