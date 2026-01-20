import { useState } from 'react';

interface MessagesAlumniProps {
  onBack: () => void;
}

export function MessagesAlumni({ onBack }: MessagesAlumniProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'important'>('all');

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] overflow-x-hidden w-full max-w-full">
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

              <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all bg-white/10 text-white w-full relative">
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
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden max-w-full">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-6 lg:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center lg:hidden">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-base md:text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase px-2">
            Pesan
          </h2>
          <div className="flex items-center justify-end gap-2">
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#F8F9FA] transition-colors">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#F8F9FA] transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-24 overflow-x-hidden max-w-full">
          {/* Welcome Section */}
          <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4">
            <div className="flex items-start gap-3">
              <div>
                <h1 className="text-[#333333] text-2xl md:text-3xl font-['Archivo_Black'] leading-tight mb-1">
                  Hai, Rania! 👋
                </h1>
                <p className="text-[#6B7280] text-sm md:text-base">Siap berkolaborasi hari ini?</p>
              </div>
            </div>
          </div>

          {/* Tugas Hari Ini */}
          <div className="px-4 md:px-6 lg:px-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68] text-xl">flag</span>
                <h3 className="text-[#333333] text-base md:text-lg font-bold">Tugas Hari Ini</h3>
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Task Card 1 - Blue */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="material-symbols-outlined text-blue-300 text-4xl opacity-20">description</span>
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-semibold text-blue-600 mb-2 block">@DevTeam • 20 mnt lalu</span>
                  <h4 className="text-base font-black text-[#243D68] mb-2">Pengkajian Desain UI/UX</h4>
                  <p className="text-sm text-[#6B7280] mb-3">Perlu review mockup baru dari DesignLab.</p>
                  <button className="bg-[#243D68] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#1a2d4d] transition-colors">
                    Laporkann
                  </button>
                </div>
              </div>

              {/* Task Card 2 - Yellow */}
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <span className="bg-orange-500 text-white text-xs font-black px-2 py-1 rounded">High</span>
                </div>
                <div className="relative z-10">
                  <span className="text-xs font-semibold text-yellow-700 mb-2 block">@Management • 2 jam lalu</span>
                  <h4 className="text-base font-black text-[#243D68] mb-2">Briefing Tim Dev</h4>
                  <p className="text-sm text-[#6B7280] mb-3">Tim butuh arahan untuk sprint berikutnya.</p>
                  <button className="bg-[#FAC06E] text-[#243D68] px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#e8b05e] transition-colors">
                    Mulai
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Project Saya */}
          <div className="px-4 md:px-6 lg:px-8 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#243D68] text-xl">work</span>
                <h3 className="text-[#333333] text-base md:text-lg font-bold">Project Saya</h3>
              </div>
              <button className="text-[#243D68] text-sm font-bold hover:underline">Lihat Semua</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Card 1 */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-blue-600 text-2xl">folder</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">75%</span>
                </div>
                <h4 className="text-base font-bold text-[#333333] mb-2">Digitalisasi Arsip</h4>
                <p className="text-sm text-[#6B7280] mb-4">Sistem manajemen dokumen digital</p>
                <button className="w-full bg-blue-50 text-blue-700 py-2 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                  Masuk Project
                </button>
              </div>

              {/* Project Card 2 */}
              <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-green-600 text-2xl">groups</span>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">Active</span>
                </div>
                <h4 className="text-base font-bold text-[#333333] mb-2">AlumniMentorship</h4>
                <p className="text-sm text-[#6B7280] mb-4">Platform mentoring alumni UB</p>
                <button className="w-full bg-green-50 text-green-700 py-2 rounded-lg text-sm font-bold hover:bg-green-100 transition-colors">
                  Masuk Project
                </button>
              </div>
            </div>
          </div>

          {/* Aktivitas Terbaru */}
          <div className="px-4 md:px-6 lg:px-8 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#243D68] text-xl">history</span>
              <h3 className="text-[#333333] text-base md:text-lg font-bold">Aktivitas Terbaru</h3>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-xl p-5">
              <div className="space-y-4">
                {/* Activity 1 */}
                <div className="flex gap-3 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-purple-600 text-sm">check_circle</span>
                    </div>
                    <div className="w-0.5 h-full bg-[#E5E7EB] mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#333333] mb-1">
                      Milestone Tercapai! "Task-list selesai untuk Digitalisasi Arsip"
                    </p>
                    <p className="text-xs text-[#6B7280]">Kemarin, 16:30</p>
                  </div>
                </div>

                {/* Activity 2 */}
                <div className="flex gap-3 pb-4 border-b border-[#E5E7EB] last:border-0 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-green-600 text-sm">celebration</span>
                    </div>
                    <div className="w-0.5 h-full bg-[#E5E7EB] mt-2"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#333333] mb-1">
                      <span className="font-black">Budi H.</span> menyelesaikan "Build WebPanel" di AlumniMentorship.
                    </p>
                    <p className="text-xs text-[#6B7280]">2 hari yang lalu</p>
                  </div>
                </div>

                {/* Activity 3 */}
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-yellow-600 text-sm">person_add</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#333333] mb-1">
                      <span className="font-black">Siti A.</span> bergabung sebagai UI Designer.
                    </p>
                    <p className="text-xs text-[#6B7280]">3 hari yang lalu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
