import { useState } from 'react';
import { toast } from 'sonner';
import { DonationPage } from './DonationPage';
import { useTranslation } from '../../hooks/useTranslation';
import type { JoinRequest } from '@/types';

export interface AvailablePositionDonatur {
  id: string;
  title: string;
  slots: number;
}

interface ProjectDetailProps {
  onBack: () => void;
  projectType?: 'open-volunteer' | 'galeri-with-funding' | 'galeri-documentation' | 'campaign';
  availablePositions?: AvailablePositionDonatur[];
  onJoinRequestSubmitted?: (joinRequest: JoinRequest) => void;
  projectTitle?: string; // NEW: Dynamic project title
  projectCategory?: string; // NEW: Dynamic project category
  projectId?: string; // NEW: Dynamic project ID
  projectImageUrl?: string; // NEW: Dynamic project image
}

export function ProjectDetail({ 
  onBack, 
  projectType = 'open-volunteer', 
  availablePositions = [], 
  onJoinRequestSubmitted,
  projectTitle = 'Bantuan Pangan Gaza', // Default for backward compatibility
  projectCategory = 'Kemanusiaan', // Default for backward compatibility
  projectId = 'bantuan-pangan-gaza',
  projectImageUrl
}: ProjectDetailProps) {
  const { language, t } = useTranslation();
  
  // DEBUG: Log props yang diterima
  console.log('📄 [ProjectDetail - Donatur] Component rendered with props:', {
    projectId,
    projectTitle,
    projectCategory,
    projectType
  });
  
  const [activeTab, setActiveTab] = useState<'overview' | 'progress'>('overview');
  const [showDonation, setShowDonation] = useState(false);
  
  // Join project states
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'none' | 'pending' | 'approved'>('none');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [commitmentDuration, setCommitmentDuration] = useState('3-months');
  const [customDuration, setCustomDuration] = useState('');
  const [joinReason, setJoinReason] = useState('');

  const handleJoinSubmit = () => {
    if (!selectedPosition) {
      toast.error(language === 'id' ? 'Pilih posisi yang ingin Anda apply' : 'Select the position you want to apply for');
      return;
    }
    if (!joinReason.trim()) {
      toast.error(language === 'id' ? 'Alasan bergabung harus diisi' : 'Reason to join is required');
      return;
    }
    if (commitmentDuration === 'custom' && !customDuration.trim()) {
      toast.error(language === 'id' ? 'Mohon isi durasi komitmen custom' : 'Please fill in custom commitment duration');
      return;
    }

    let durationDisplay = '';
    switch (commitmentDuration) {
      case '1-month': durationDisplay = '1 Bulan'; break;
      case '3-months': durationDisplay = '3 Bulan'; break;
      case '6-months': durationDisplay = '6 Bulan'; break;
      case '1-year': durationDisplay = '1 Tahun'; break;
      case 'custom': durationDisplay = customDuration; break;
    }

    const position = availablePositions.find(p => p.id === selectedPosition);

    const joinRequest: JoinRequest = {
      id: `join-${Date.now()}`,
      projectId: projectId, // Dynamic from props
      projectTitle: projectTitle, // Dynamic from props
      alumniId: 'current-user-id',
      alumniName: 'Donatur User',
      alumniEmail: 'donatur@example.com',
      reason: joinReason,
      commitment: commitmentDuration,
      commitmentDuration: durationDisplay,
      interestedPosition: position?.title || '',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    setApplicationStatus('pending');
    setShowJoinModal(false);

    if (onJoinRequestSubmitted) {
      onJoinRequestSubmitted(joinRequest);
    }

    setSelectedPosition('');
    setJoinReason('');
    setCommitmentDuration('3-months');
    setCustomDuration('');

    toast.success(language === 'id' ? 'Pengajuan berhasil dikirim!' : 'Application sent successfully!', {
      description: language === 'id' ? 'Menunggu persetujuan dari PIC project' : 'Waiting for PIC approval',
      duration: 4000,
    });
  };

  // Project info for donation - removed hardcoded values, now using props

  if (showDonation) {
    return (
      <DonationPage
        onBack={() => setShowDonation(false)}
        projectTitle={projectTitle}
        projectCategory={projectCategory}
      />
    );
  }

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
            <div className="bg-[#FAC06E] px-4 py-3 flex items-center gap-3 shadow-md rounded-[20px]">
              <div className="w-8 h-8 bg-[#2B4468] rounded-[8px] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-lg">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-sm uppercase tracking-tight text-[#2B4468] whitespace-nowrap overflow-hidden text-ellipsis">
                ALMAQDISI PROJECT
              </span>
            </div>
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
        <div className="sticky top-0 z-20 flex items-center bg-white px-6 md:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
            {t.projectDetailDonatur.projectDetail}
          </h2>
          <div className="flex items-center justify-end">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#F8F9FA] transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-24 lg:pb-24">
          {/* Hero Image */}
          <div className="px-0 md:px-8 pt-6 pb-4">
            <div
              className="w-full bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-none md:rounded-2xl min-h-[200px] md:min-h-[320px] relative shadow-none md:shadow-lg"
              style={{
                backgroundImage: `url('${projectImageUrl || 'https://images.unsplash.com/photo-1637826397913-68af81f4d14a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlc3RpbmUlMjBmb29kJTIwYWlkJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc2OTY1MjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080'}')`
              }}
              aria-label="Project cover image"
            >
            </div>
          </div>

          {/* Title, Tags & Project Lead */}
          <div className="px-6 md:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-2xl md:text-4xl font-['Archivo_Black'] leading-tight mb-3 uppercase">
              {projectTitle}
            </h1>
            <div className="flex gap-2 mb-4">
              <div className="flex h-7 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#243D68]/10 px-3 border border-[#243D68]/20">
                <p className="text-[#243D68] text-xs font-semibold leading-normal">Kemanusiaan</p>
              </div>
              <div className="flex h-7 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#E8F5E9] px-3 border border-[#4CAF50]/20">
                <p className="text-[#4CAF50] text-xs font-semibold leading-normal">Mendesak</p>
              </div>
            </div>

            {/* Project Lead Inline */}
            <div className="bg-[#F8F9FA] rounded-xl p-4 border border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-10 w-10"
                  style={{
                    backgroundImage:
                      'url("https://images.unsplash.com/photo-1767780441166-3ffeecced031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBtdXNsaW0lMjBjb21tdW5pdHklMjBsZWFkZXJ8ZW58MXx8fHwxNzY5NjUyMTMwfDA&ixlib=rb-4.1.0&q=80&w=1080")',
                  }}
                ></div>
                <div>
                  <p className="text-[#6B7280] text-xs font-normal">Project-in-Charge</p>
                  <p className="text-[#333333] text-sm font-semibold leading-normal">Ahmad Zulfikar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-2 text-center border-b border-[#E5E7EB] bg-white">
            <button
              className={`text-center py-3 text-sm font-semibold transition-colors ${
                activeTab === 'overview' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`text-center py-3 text-sm font-semibold transition-colors ${
                activeTab === 'progress' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
              }`}
              onClick={() => setActiveTab('progress')}
            >
              Progress
            </button>
          </div>

          {/* Content Cards */}
          <div className="px-6 md:px-8 py-6 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Description & Goals */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm">
                      <span className="material-symbols-outlined text-white">description</span>
                      {t.projectDetailDonatur.projectDescription}
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-[#6B7280] text-sm leading-relaxed">
                      <li>Menyalurkan paket sembako untuk 1000 keluarga terdampak di Gaza.</li>
                      <li>Menyediakan makanan bergizi bagi anak-anak dan keluarga yang membutuhkan.</li>
                      <li>Koordinasi dengan mitra lokal untuk distribusi yang aman dan efektif.</li>
                    </ul>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm">
                      <span className="material-symbols-outlined text-white">flag</span>
                      {t.projectDetailDonatur.projectGoals}
                    </h3>
                    <ul className="space-y-3 text-[#6B7280] text-sm leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Meningkatkan akses masyarakat Gaza ke pangan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Menyediakan dukungan logistik dan distribusi pangan.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Memfasilitasi kegiatan dan acara alumni secara efisien.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Benefits & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm">
                      <span className="material-symbols-outlined text-white">workspace_premium</span>
                      {t.projectDetailDonatur.benefits}
                    </h3>
                    <ul className="space-y-3 text-[#6B7280] text-sm leading-relaxed">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                          check_circle
                        </span>
                        <span>Sertifikat Digital sebagai kontributor proyek.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">check_circle</span>
                        <span>Cendera Mata eksklusif dari IKA UB.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">check_circle</span>
                        <span>Kesempatan networking dengan para alumni.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">check_circle</span>
                        <span>Portofolio proyek yang berharga.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm">
                      <span className="material-symbols-outlined text-white">location_on</span>
                      {t.projectDetailDonatur.locationFocus}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#243D68]">public</span>
                      <p className="text-[#6B7280] text-sm leading-relaxed">Online</p>
                    </div>
                  </div>
                </div>

                {/* Team Needs */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit mb-4">
                    <span className="material-symbols-outlined text-white">groups</span>
                    {t.projectDetailDonatur.teamNeeds}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
                      <h4 className="font-bold text-[#333333] mb-1">UI/UX Designer</h4>
                      <p className="text-xs text-[#6B7280] mb-3">1 Posisi Dibutuhkan</p>
                      <ul className="list-disc list-inside space-y-1 text-[#6B7280] text-sm leading-relaxed mb-4">
                        <li>Merancang antarmuka yang intuitif.</li>
                        <li>Membuat desain yang menarik untuk aplikasi.</li>
                      </ul>
                      <button className="flex h-9 items-center justify-center rounded-lg bg-[#E8F5E9] px-4 w-fit">
                        <p className="text-[#4CAF50] text-sm font-semibold leading-normal">Posisi Tersedia</p>
                      </button>
                    </div>
                    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
                      <h4 className="font-bold text-[#333333] mb-1">Mobile Developer (React Native)</h4>
                      <p className="text-xs text-[#6B7280] mb-3">2 Posisi Dibutuhkan</p>
                      <ul className="list-disc list-inside space-y-1 text-[#6B7280] text-sm leading-relaxed mb-4">
                        <li>Mengembangkan aplikasi cross-platform.</li>
                        <li>Menggunakan React Native sesuai desain.</li>
                      </ul>
                      <button className="flex h-9 items-center justify-center rounded-lg bg-[#E8F5E9] px-4 w-fit">
                        <p className="text-[#4CAF50] text-sm font-semibold leading-normal">Posisi Tersedia</p>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'progress' && (
              <>
                {/* Progress Bar */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">trending_up</span>
                    {t.projectDetailDonatur.projectProgress}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#4A90E2]">60%</span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden">
                    <div className="bg-[#4A90E2] h-3 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                  </div>
                  <p className="text-sm text-[#6B7280] mt-3">Estimasi selesai: Maret 2026</p>
                </div>

                {/* Milestones */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">timeline</span>
                    {t.projectDetailDonatur.projectPhases}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#4CAF50] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333333]">Riset & Planning</h4>
                        <p className="text-sm text-[#6B7280]">Selesai - Desember 2025</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#4CAF50] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333333]">UI/UX Design</h4>
                        <p className="text-sm text-[#6B7280]">Selesai - Januari 2026</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#4A90E2] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        radio_button_checked
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333333]">Development</h4>
                        <p className="text-sm text-[#6B7280]">Sedang Berjalan - Target Feb 2026</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#6B7280] text-2xl">
                        radio_button_unchecked
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333333]">Testing</h4>
                        <p className="text-sm text-[#6B7280]">Belum Dimulai - Target Maret 2026</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-[#6B7280] text-2xl">
                        radio_button_unchecked
                      </span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#333333]">Launch</h4>
                        <p className="text-sm text-[#6B7280]">Belum Dimulai - Target Maret 2026</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Updates */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">notifications</span>
                    {t.projectDetailDonatur.latestUpdates}
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-3 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-[#4A90E2] rounded-full mt-2"></div>
                        <div className="w-0.5 h-full bg-[#D6DCE8] mt-1"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#333333]">API Integration selesai 80%</p>
                        <p className="text-xs text-[#6B7280] mt-1">10 Januari 2026</p>
                        <p className="text-sm text-[#6B7280] mt-2">Tim development berhasil menyelesaikan integrasi dengan backend API.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-[#4A90E2] rounded-full mt-2"></div>
                        <div className="w-0.5 h-full bg-[#D6DCE8] mt-1"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#333333]">Design System Final Review</p>
                        <p className="text-xs text-[#6B7280] mt-1">5 Januari 2026</p>
                        <p className="text-sm text-[#6B7280] mt-2">Design system telah di-review dan disetujui oleh stakeholder.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 bg-[#4A90E2] rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#333333]">Kickoff Meeting</p>
                        <p className="text-xs text-[#6B7280] mt-1">1 Januari 2026</p>
                        <p className="text-sm text-[#6B7280] mt-2">Pertemuan awal tim untuk membahas roadmap dan pembagian tugas.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom CTA - DONATUR HANYA BISA DONASI */}
        {(projectType === 'galeri-with-funding' || projectType === 'campaign') && (
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 w-full bg-white p-4 border-t border-[#E5E7EB] shadow-[0_-4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
            <button className="w-full lg:w-auto lg:min-w-[448px] flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2B4468] text-white text-base font-bold leading-normal tracking-widest border-4 border-[#FAC06E] hover:bg-[#243D68] transition-colors uppercase" onClick={() => setShowDonation(true)}>
              <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
              <span className="text-center">{t.projectDetailDonatur.donateNow}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}