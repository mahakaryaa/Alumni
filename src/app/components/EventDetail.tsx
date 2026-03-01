import { useState } from 'react';
import { Logo } from './Logo';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import type { EventRegistration } from '@/types';

interface EventDetailProps {
  onBack: () => void;
  userRole?: 'donatur' | 'alumni' | 'alumni-guest' | null;
  onEventRegistrationSubmitted?: (registration: EventRegistration) => void;
  onNavigateToLogin?: () => void;
}

// Mock event data
const EVENT_DATA = {
  id: 'event-workshop-2025',
  title: 'Workshop Alumni di Surabaya!',
  date: '12 November 2025',
  time: '09:00 - 17:00 WIB',
  location: 'Surabaya Convention Hall',
  isPrivateEvent: false, // false = terbuka untuk umum, true = alumni only
  isFree: true, // true = gratis, false = berbayar
  ticketPrice: null, // null jika gratis, atau nominal jika berbayar (misal: 50000)
  facilities: ['Sertifikat kehadiran', 'Konsumsi (snack & lunch)', 'Materi digital', 'Goodie bag'],
  dresscode: 'Smart Casual', // null jika tidak ada
};

export function EventDetail({ onBack, userRole, onEventRegistrationSubmitted, onNavigateToLogin }: EventDetailProps) {
  const { language, t } = useTranslation();
  const [registrationStatus, setRegistrationStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state - simplified
  const [whatsapp, setWhatsapp] = useState('');
  const [hasAttendedBefore, setHasAttendedBefore] = useState(false);

  const isAlumni = userRole === 'alumni';
  const isLoggedIn = userRole !== null;

  const handleOpenRegister = () => {
    // Jika event private dan user bukan alumni, redirect ke login
    if (EVENT_DATA.isPrivateEvent && !isAlumni) {
      toast.error(t.eventDetailPage.alumniOnlyEvent);
      onNavigateToLogin?.();
      return;
    }
    
    // Jika event public dan user belum login, redirect ke login
    if (!EVENT_DATA.isPrivateEvent && !isLoggedIn) {
      toast.info(t.eventDetailPage.loginRequired);
      onNavigateToLogin?.();
      return;
    }
    
    setShowRegisterModal(true);
  };

  const handleSubmitRegistration = async () => {
    if (!whatsapp.trim()) {
      toast.error(language === 'id' ? 'Nomor WhatsApp wajib diisi' : 'WhatsApp number is required');
      return;
    }

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));

    const newRegistration: EventRegistration = {
      id: `reg-${Date.now()}`,
      eventId: EVENT_DATA.id,
      eventTitle: EVENT_DATA.title,
      eventDate: EVENT_DATA.date,
      eventTime: EVENT_DATA.time,
      eventLocation: EVENT_DATA.location,
      alumniId: 'current-user-id',
      alumniName: 'Alumni User',
      alumniEmail: 'alumni@example.com',
      alumniPhone: whatsapp,
      alumniAngkatan: '2019',
      alumniKota: 'Surabaya',
      hasAttendedBefore,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    onEventRegistrationSubmitted?.(newRegistration);
    setRegistrationStatus('pending');
    setShowRegisterModal(false);
    setIsSubmitting(false);
    toast.success(language === 'id' ? 'Pendaftaran berhasil dikirim! Menunggu persetujuan panitia.' : 'Registration sent! Waiting for committee approval.');
  };

  const getRegistrationButtonState = () => {
    if (registrationStatus === 'pending') return { label: t.eventDetailPage.registrationPending, icon: 'schedule', disabled: true, color: 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300' };
    if (registrationStatus === 'approved') return { label: `${t.eventDetailPage.registered} ✓`, icon: 'check_circle', disabled: true, color: 'bg-green-100 text-green-700 border-2 border-green-300' };
    if (registrationStatus === 'rejected') return { label: t.eventDetailPage.registrationRejected, icon: 'cancel', disabled: true, color: 'bg-red-100 text-red-700 border-2 border-red-300' };
    
    if (EVENT_DATA.isPrivateEvent && !isAlumni) {
      return { label: language === 'id' ? 'Login Alumni untuk Daftar' : 'Login as Alumni to Register', icon: 'lock', disabled: false, color: 'bg-[#E5E8EC] text-[#6B7280] border-2 border-[#D6DCE8]' };
    }
    
    if (!EVENT_DATA.isPrivateEvent && !isLoggedIn) {
      return { label: t.eventDetailPage.registerNow, icon: 'how_to_reg', disabled: false, color: 'bg-[#183A74] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1' };
    }
    
    return { label: t.eventDetailPage.registerNow, icon: 'how_to_reg', disabled: false, color: 'bg-[#183A74] text-white shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1' };
  };

  const btnState = getRegistrationButtonState();

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#2B4468] border-r border-[#2B4468] fixed inset-y-0 z-30">
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
                onClick={onBack}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">{t.nav.home}</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">{t.nav.explore}</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">{t.nav.messages}</span>
                <span className="absolute top-3 left-11 w-2 h-2 bg-red-500 rounded-full border border-[#2B4468]"></span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">{t.nav.settings}</span>
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
              <span className="tracking-wide text-sm">{t.nav.logout}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#D6DCE8]">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#E5E8EC] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
            {t.eventDetailPage.eventDetail}
          </h2>
          <div className="flex items-center justify-end">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#E5E8EC] transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-28 lg:pb-8">
          {/* Hero Image */}
          <div className="px-6 md:px-8 pt-6 pb-4">
            <div className="w-full rounded-2xl overflow-hidden relative aspect-[16/9] md:aspect-[2.35/1]">
              <img
                alt="Workshop Alumni di Surabaya"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8SmFgeNYy36LFLNB19PYMFgDizekyt5iqu3G9c8CI4dsJxfM2gKR6YaCcPuDHRcipHwNf8dIZq29QeGMnQbTFtTjUtsj92TMZxF-Y7hbiPa8osv6hM-cDDpPFosc9mEL19N4fHcpohxJ6xOFA4jlqkHloXCGm4LK1lvslhIj5mxQyjeFIcW9-fu2qiPU94mbDJy8Hzt5fp-Un1Pro5GIilncogrJ_gEj6CbmbQ7xO497w_ibP1U614Bkz5F7pbozz0F1goS1GKtjh"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-[#FAC06E] text-[#16243F] text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  Offline Event
                </span>
              </div>
            </div>
          </div>

          {/* Title & Info */}
          <div className="px-6 md:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-2xl md:text-4xl font-['Archivo_Black'] leading-tight mb-4 uppercase">
              Workshop Alumni di Surabaya!
            </h1>

            {/* Key Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-normal">{t.eventDetailPage.date}</p>
                    <p className="text-[#333333] text-sm font-bold">12 November 2025</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">schedule</span>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-normal">{t.eventDetailPage.time}</p>
                    <p className="text-[#333333] text-sm font-bold">09:00 - 17:00 WIB</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-xl">location_on</span>
                  </div>
                  <div>
                    <p className="text-[#6B7280] text-xs font-normal">{t.eventDetailPage.location}</p>
                    <p className="text-[#333333] text-sm font-bold">Surabaya Convention Hall</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Status */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#30518B] rounded-xl p-5 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm opacity-90 mb-1">{t.eventDetailPage.participantQuota}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-['Archivo_Black']">127</span>
                    <span className="text-sm opacity-80">/ 200 {t.eventDetailPage.persons}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                    <div className="bg-[#FAC06E] h-2 rounded-full" style={{ width: '63.5%' }}></div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="material-symbols-outlined text-5xl opacity-30">groups</span>
                </div>
              </div>
            </div>

            {/* Registration Status Banner (if registered) */}
            {registrationStatus === 'pending' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-yellow-600 text-2xl">schedule</span>
                <div>
                  <p className="font-semibold text-yellow-800">{t.eventDetailPage.registrationPending}</p>
                  <p className="text-sm text-yellow-700">{language === 'id' ? 'Pendaftaran Anda sedang dalam peninjauan. Kami akan memberi tahu Anda segera.' : 'Your registration is being reviewed. We will notify you soon.'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Content Sections */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            {/* Deskripsi */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">description</span>
                {t.eventDetailPage.aboutEvent}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed mb-3">
                Workshop Alumni kali ini akan membahas berbagai topik menarik seputar pengembangan karir, networking, dan kontribusi sosial yang bisa dilakukan oleh para alumni.
              </p>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                Acara ini akan dihadiri oleh alumni dari berbagai angkatan dan akan menjadi kesempatan emas untuk membangun koneksi, berbagi pengalaman, dan berkolaborasi dalam proyek-proyek sosial yang bermakna.
              </p>
            </div>

            {/* Benefit */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">workspace_premium</span>
                {t.eventDetailPage.facilities}
              </h3>
              <ul className="space-y-3 text-[#6B7280] text-sm leading-relaxed">
                {['Sertifikat kehadiran dari IKA', 'Materi workshop dalam format digital', 'Konsumsi (snack, lunch, coffee break)', 'Networking session dengan alumni sukses', 'Goodie bag eksklusif'].map(benefit => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-green-500 text-lg mt-0.5">check_circle</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
              <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68]">contact_support</span>
                {language === 'id' ? 'Kontak Panitia' : 'Committee Contact'}
              </h3>
              <div className="space-y-3">
                {[
                  { icon: 'phone', text: '+62 812-3456-7890 (Budi)' },
                  { icon: 'email', text: 'workshop@almaqdisi.id' },
                  { icon: 'location_on', text: 'Jl. Mayjen Sungkono No. 123, Surabaya' },
                ].map(item => (
                  <div key={item.icon} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4A90E2]">{item.icon}</span>
                    <p className="text-sm text-[#6B7280]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registration Button - Fixed Bottom */}
          <div className="fixed bottom-0 left-0 right-0 lg:static bg-white border-t border-[#D6DCE8] p-4 lg:px-8 lg:pb-8 z-10">
            <button
              onClick={btnState.disabled ? undefined : handleOpenRegister}
              disabled={btnState.disabled}
              className={`w-full lg:max-w-md lg:mx-auto flex items-center justify-center gap-2 py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 ${btnState.color} ${btnState.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className="material-symbols-outlined">{btnState.icon}</span>
              <span>{btnState.label}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="bg-white w-full md:max-w-lg rounded-t-3xl md:rounded-2xl max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl md:rounded-t-2xl border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-['Archivo_Black'] text-lg uppercase text-[#0E1B33]">{t.eventDetailPage.registerForm}</h3>
                <p className="text-sm text-[#6B7280]">Workshop Alumni di Surabaya</p>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F8F9FA] transition-colors text-[#6B7280]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {/* Pre-filled info - Nama Lengkap */}
              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] font-semibold uppercase tracking-wide mb-2">{language === 'id' ? 'Data Anda' : 'Your Data'}</p>
                <p className="font-semibold text-[#0E1B33]">Alumni User</p>
                <p className="text-sm text-[#6B7280]">alumni@example.com • Angkatan 2019</p>
              </div>

              {/* WhatsApp */}
              <div>
                <label className="block text-sm font-semibold text-[#0E1B33] mb-1.5">
                  No. WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  placeholder="+62 8xx-xxxx-xxxx"
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl focus:border-[#243D68] focus:outline-none"
                />
              </div>

              {/* Informasi Event */}
              <div className="bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-xl p-5 text-white space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/20">
                  <h4 className="font-bold text-sm uppercase tracking-wide">{t.eventDetailPage.eventInfo}</h4>
                  {EVENT_DATA.isFree ? (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">GRATIS</span>
                  ) : (
                    <span className="bg-[#FAC06E] text-[#16243F] text-xs font-bold px-3 py-1 rounded-full">
                      Rp {EVENT_DATA.ticketPrice?.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>

                {/* Tanggal & Jam */}
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#FAC06E]">event</span>
                  <div className="flex-1">
                    <p className="text-xs opacity-80">{t.eventDetailPage.date} & {t.eventDetailPage.time}</p>
                    <p className="font-semibold text-sm">{EVENT_DATA.date} • {EVENT_DATA.time}</p>
                  </div>
                </div>

                {/* Lokasi */}
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#FAC06E]">location_on</span>
                  <div className="flex-1">
                    <p className="text-xs opacity-80">{t.eventDetailPage.location}</p>
                    <p className="font-semibold text-sm">{EVENT_DATA.location}</p>
                  </div>
                </div>

                {/* Fasilitas */}
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#FAC06E]">workspace_premium</span>
                  <div className="flex-1">
                    <p className="text-xs opacity-80 mb-2">{t.eventDetailPage.facilities}</p>
                    <div className="space-y-1.5">
                      {EVENT_DATA.facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#FAC06E] rounded-full"></div>
                          <p className="text-sm">{facility}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dresscode */}
                {EVENT_DATA.dresscode && (
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#FAC06E]">checkroom</span>
                    <div className="flex-1">
                      <p className="text-xs opacity-80">Dresscode</p>
                      <p className="font-semibold text-sm">{EVENT_DATA.dresscode}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Has attended before */}
              <label className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasAttendedBefore}
                  onChange={e => setHasAttendedBefore(e.target.checked)}
                  className="w-5 h-5 accent-[#243D68] cursor-pointer"
                />
                <div>
                  <p className="font-semibold text-[#0E1B33] text-sm">{t.eventDetailPage.attendedBefore}</p>
                  <p className="text-xs text-[#6B7280]">{language === 'id' ? 'Centang jika Anda alumni yang pernah hadir di event AlMaqdisi' : 'Check if you have attended a previous AlMaqdisi event'}</p>
                </div>
              </label>

              {/* Terms info */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
                <span className="material-symbols-outlined text-blue-600 text-lg flex-shrink-0">info</span>
                <p className="text-xs text-blue-700 leading-relaxed">
                  {language === 'id' ? 'Pendaftaran Anda akan ditinjau oleh panitia. Anda akan mendapat notifikasi setelah pendaftaran diproses.' : 'Your registration will be reviewed by the committee. You will receive a notification once processed.'}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4">
              <button
                onClick={handleSubmitRegistration}
                disabled={isSubmitting || !whatsapp.trim()}
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  isSubmitting || !whatsapp.trim()
                    ? 'bg-[#E5E8EC] text-[#6B7280] cursor-not-allowed'
                    : 'bg-[#243D68] text-white hover:bg-[#183A74] shadow-[4px_4px_0px_0px_rgba(250,192,110,1)] hover:shadow-[2px_2px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-xl">send</span>
                    <span>{t.eventDetailPage.submitRegistration}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}