import { useState } from 'react';
import { DonationPage } from './DonationPage';
import { useTranslation } from '@/hooks/useTranslation';

interface ProjectDetailProps {
  onBack: () => void;
}

export function ProjectDetail({ onBack }: ProjectDetailProps) {
  const { language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'members'>('overview');
  const [showDonation, setShowDonation] = useState(false);

  // Project info for donation
  const projectTitle = "Bantuan Pangan Gaza";
  const projectCategory = "Kemanusiaan";

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
            <div className="bg-[#FAC06E] p-3 flex items-center gap-3 shadow-md rounded-[15px]">
              <div className="w-8 h-8 border-2 border-[#2B4468] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#2B4468] text-xl font-bold">mosque</span>
              </div>
              <span className="font-['Archivo_Black'] text-base uppercase tracking-tight text-[#2B4468]">
                PROJEKKITA
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
                <span className="tracking-wide text-sm">Home</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full relative">
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
                <span className="absolute top-3 left-11 w-2 h-2 bg-red-500 rounded-full border border-[#2B4468]"></span>
              </button>

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all text-white/60 hover:bg-white/5 hover:text-white w-full">
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
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase">
            Detail Proyek
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
          <div className="px-6 md:px-8 pt-6 pb-4">
            <div
              className="w-full bg-gradient-to-br from-[#243D68] to-[#30518B] flex flex-col justify-end overflow-hidden rounded-2xl min-h-[200px] md:min-h-[320px] p-4 relative shadow-lg"
              aria-label="Abstract geometric pattern representing the project's theme"
            >
              <div
                className="absolute inset-0 z-0 opacity-10"
                style={{
                  backgroundImage:
                    "url('data:image/svg+xml,%3Csvg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M12 2L2 12L12 22L22 12L12 2Z\" stroke=\"%23ffffff\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/%3E%3Cpath d=\"M2 12L12 2L22 12\" stroke=\"%23ffffff\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/%3E%3Cpath d=\"M12 22L22 12L12 2\" stroke=\"%23ffffff\" stroke-width=\"1.5\" stroke-linejoin=\"round\"/%3E%3C/svg%3E')",
                  backgroundSize: '24px',
                }}
              ></div>
            </div>
          </div>

          {/* Title, Tags & Project Lead */}
          <div className="px-6 md:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-2xl md:text-4xl font-['Archivo_Black'] leading-tight mb-3 uppercase">
              Bantuan Pangan Gaza
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
          <div className="sticky top-[57px] z-10 bg-white border-b border-[#E5E7EB] px-6 md:px-8 pb-0 shadow-sm">
            <div className="flex items-center gap-8">
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
              <button
                className={`text-center py-3 text-sm font-semibold transition-colors ${
                  activeTab === 'members' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
                }`}
                onClick={() => setActiveTab('members')}
              >
                Members
              </button>
            </div>
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
                      Deskripsi Proyek
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
                      Tujuan Proyek
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
                      Benefit
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
                      Lokasi / Fokus Kegiatan
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
                    Kebutuhan Tim
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
                    Progress Proyek
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
                    Tahapan Proyek
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
                    Update Terbaru
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

            {activeTab === 'members' && (
              <>
                {/* Project-in-Charge */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">person</span>
                    Project-in-Charge
                  </h3>
                  <div className="flex items-center gap-4">
                    <div
                      className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 shrink-0"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCdGdNRPdJTq7rYpI57MpyJAbrSzME4063Cv_eMCLbsbiX9dr1pAWJ-x2jtf9FUGMvNLmaD7OnFNquRX_2qWE9w_g_Cao9dkoNjDXClNwSVxd0KVd1quE2fKWPIUyyQa8e7YS-sU5n7-Qujeartl5LnjAc8otjPS2CPInJpxfiKdxwgGHevu3k6Ae2UZ5bS98LmB3QZUWRyZsx8xo3-eL_WkfzdY3Ar5UJkj5RMf-jP94L3kJbYozRZnMr3F0byq8Dj6iSBjDygsbaI")',
                      }}
                    ></div>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-[#333333]">Budi Hartono</p>
                      <p className="text-sm text-[#6B7280]">Teknik Informatika '15</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#4A90E2] text-xl">verified</span>
                    </div>
                  </div>
                </div>

                {/* Tim Inti */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">groups</span>
                    Tim Inti
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 pb-4 border-b border-[#D6DCE8]">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 shrink-0"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiTCni6xCVaBuSHYW9yXo4lhDCML_Cp6QKgGXN6fU4Sxwl-E-6K_4bLGC0gu_nS-I8pGEEyTEqzf9XY8MH_bBN_5dJy36wNXq4gUzT5bGqXQpwpRJRv84P9LBSg8HppXOV8WYGYe-oYIbBk8LEO8HJuUaVq4bGaGDf0rJL74OqYJzLAw7cg1iA15o9uHDZV-c5l8xf3u7OX-FPJJzcBR_qAnbWgK8TXiRWuUt_p8a4Gex_pUKCJoN4Fk6Rn9vWDhWL8FBhUBmB")',
                        }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#333333]">Siti Aminah</p>
                        <p className="text-xs text-[#6B7280]">Desain Komunikasi Visual '17</p>
                        <p className="text-xs text-[#4A90E2] mt-1 font-medium">UI/UX Designer</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-12 w-12 shrink-0"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAYNLi_7xA-cI8wq9jF0m-oUqGH3gq4yjHu8RBv8F4UfyVEBk7KdPULbS_QzOcdLtSLH4P-kE1Q0Lk0rkVZYzJLfbfGsqNEiSEhbcO4O_8aJhGqQ3TGVklWAHJqgQmFz4GmSBvIqAYu8sD_L_QfzYqTjH2VzGjpLsGzGqvFn8QyHbXpSQzHBLqDTcB9cLRvJqHbO4wE6tQTzP5F_QmBVpZQqGzF3tQKlVqB3fJzVqD8sHtQxL4FyQzT)")',
                        }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[#333333]">Agus Setiawan</p>
                        <p className="text-xs text-[#6B7280]">Teknik Informatika '16</p>
                        <p className="text-xs text-[#4A90E2] mt-1 font-medium">Mobile Developer</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Volunteer */}
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">volunteer_activism</span>
                    Volunteer
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-[#4A90E2]">8 Orang</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-[#D6DCE8] border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#6B7280]">+3</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 lg:left-64 right-0 w-full md:max-w-3xl mx-auto bg-white p-4 border-t border-[#E5E7EB] shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <button className="w-full flex items-center justify-center gap-3 rounded-xl h-14 bg-gradient-to-r from-[#243D68] to-[#30518B] text-white text-base font-bold leading-normal tracking-widest shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase" onClick={() => setShowDonation(true)}>
            <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
            <span>{language === 'id' ? 'Donasi Sekarang' : 'Donate Now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}