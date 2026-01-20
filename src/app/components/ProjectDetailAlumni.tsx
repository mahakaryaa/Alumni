import { useState } from 'react';

interface ProjectDetailAlumniProps {
  onBack: () => void;
}

export function ProjectDetailAlumni({ onBack }: ProjectDetailAlumniProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'members' | 'discussion' | 'wallet'>('discussion');
  const [showSearch, setShowSearch] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  const [walletFilter, setWalletFilter] = useState<'all' | 'internal' | 'donation' | 'expense'>('all');

  const toggleExpand = (id: number) => {
    if (expandedMessages.includes(id)) {
      setExpandedMessages(expandedMessages.filter(msgId => msgId !== id));
    } else {
      setExpandedMessages([...expandedMessages, id]);
    }
  };

  // All transactions data
  const allTransactions = [
    {
      id: 1,
      type: 'donation',
      title: 'Donasi dari Alumni Angkatan 2015',
      date: '12 Jan 2026, 14:30',
      amount: 5000000,
      icon: 'volunteer_activism',
      iconColor: 'green'
    },
    {
      id: 2,
      type: 'internal',
      title: 'Dana Internal - Iuran Anggota',
      date: '11 Jan 2026, 09:15',
      amount: 2500000,
      icon: 'account_balance',
      iconColor: 'blue'
    },
    {
      id: 3,
      type: 'expense',
      title: 'Pembelian Server & Hosting',
      date: '10 Jan 2026, 16:45',
      amount: -3200000,
      icon: 'shopping_cart',
      iconColor: 'red'
    },
    {
      id: 4,
      type: 'donation',
      title: 'Donasi PT. Teknologi Nusantara',
      date: '9 Jan 2026, 11:20',
      amount: 10000000,
      icon: 'payments',
      iconColor: 'green'
    },
    {
      id: 5,
      type: 'expense',
      title: 'Biaya Operasional Tim Developer',
      date: '8 Jan 2026, 10:00',
      amount: -5500000,
      icon: 'receipt_long',
      iconColor: 'red'
    },
    {
      id: 6,
      type: 'internal',
      title: 'Dana Cadangan Proyek',
      date: '7 Jan 2026, 13:30',
      amount: 8000000,
      icon: 'savings',
      iconColor: 'blue'
    }
  ];

  // Filter transactions based on active filter
  const filteredTransactions = walletFilter === 'all' 
    ? allTransactions 
    : allTransactions.filter(transaction => transaction.type === walletFilter);

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
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden max-w-full">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-6 lg:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-base md:text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase px-2">
            Detail Proyek
          </h2>
          <div className="flex items-center justify-end gap-2">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#F8F9FA] transition-colors"
            >
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-[#243D68] hover:bg-[#F8F9FA] transition-colors">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <button className="text-[#243D68]" onClick={() => setShowSearch(false)}>
                <span className="material-symbols-outlined text-2xl">arrow_back</span>
              </button>
              <input 
                className="flex-1 ml-4 p-2 bg-[#F8F9FA] rounded-lg text-[#243D68] focus:outline-none focus:ring-2 focus:ring-[#243D68] border-none" 
                placeholder="Cari di diskusi ini..." 
                type="text"
              />
              <button className="text-[#243D68] ml-2">
                <span className="material-symbols-outlined text-2xl">mic</span>
              </button>
            </div>
            <div className="mt-4 text-[#6B7280] text-center">
              <p>Ketik untuk mencari pesan, vote, atau file.</p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 pb-24 overflow-x-hidden max-w-full">
          {/* Hero Image */}
          <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4">
            <div
              className="w-full bg-gradient-to-br from-[#243D68] to-[#30518B] flex flex-col justify-end overflow-hidden rounded-2xl min-h-[180px] p-4 relative shadow-lg"
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

          {/* Title */}
          <div className="px-4 md:px-6 lg:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-xl md:text-2xl lg:text-3xl font-['Archivo_Black'] leading-tight uppercase">
              Pengembangan Aplikasi AlumniConnect
            </h1>
          </div>

          {/* Tabs */}
          <div className="sticky top-[73px] z-10 bg-white border-b border-[#E5E7EB] px-4 md:px-8 lg:px-12 pb-0 shadow-sm">
            <div className="flex items-center gap-3 md:gap-6 lg:gap-8 overflow-x-auto no-scrollbar max-w-screen-xl mx-auto">
              <button
                className={`text-center py-3 px-2 md:px-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'overview' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`text-center py-3 px-2 md:px-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'progress' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
                }`}
                onClick={() => setActiveTab('progress')}
              >
                Progress
              </button>
              <button
                className={`text-center py-3 px-2 md:px-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'members' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
                }`}
                onClick={() => setActiveTab('members')}
              >
                Anggota
              </button>
              <button
                className={`text-center py-3 px-2 md:px-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'discussion' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
                }`}
                onClick={() => setActiveTab('discussion')}
              >
                Diskusi
              </button>
              <button
                className={`text-center py-3 px-2 md:px-4 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === 'wallet' ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]'
                }`}
                onClick={() => setActiveTab('wallet')}
              >
                Wallet
              </button>
            </div>
          </div>

          {/* Tab Content - Discussion */}
          {activeTab === 'discussion' && (
            <div className="flex-1 bg-[#F8F9FA] pb-20 overflow-x-hidden max-w-full">
              {/* Voting Alert Card - ENHANCED FOR TABLET & DESKTOP */}
              <div className="bg-gradient-to-br from-[#243D68] via-[#2B4468] to-[#1a2d4d] mx-3 md:mx-6 lg:mx-8 my-4 md:my-6 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-2xl max-w-full relative overflow-hidden">
                {/* Decorative Background Elements - Desktop Only */}
                <div className="hidden md:block absolute top-0 right-0 w-64 h-64 bg-[#FAC06E] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                
                {/* Animated Border - Desktop Only */}
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#FAC06E]/20 via-transparent to-[#FAC06E]/20 rounded-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4 md:mb-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FAC06E] rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                        <span className="material-symbols-outlined text-[#243D68] text-2xl md:text-3xl font-bold">how_to_vote</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs md:text-sm font-black text-[#FAC06E] uppercase tracking-wider block mb-1 md:mb-2">VOTING AKTIF</span>
                        <h3 className="text-base md:text-xl lg:text-2xl font-black text-white leading-tight break-words">Meeting Teknis: Senin, 10:00 WIB</h3>
                      </div>
                    </div>
                    
                    {/* Deadline Badge */}
                    <div className="bg-red-500 rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-2.5 inline-flex items-center gap-2 shadow-lg shrink-0 animate-pulse">
                      <span className="material-symbols-outlined text-white text-base md:text-lg">schedule</span>
                      <div className="flex flex-col">
                        <span className="text-[10px] md:text-xs text-white/80 font-semibold">DEADLINE</span>
                        <span className="text-xs md:text-sm font-black text-white whitespace-nowrap">Hari ini, 23:59</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats Row - Enhanced for Desktop */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
                    {/* Main Percentage */}
                    <div className="col-span-2 md:col-span-1 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <span className="text-xs md:text-sm text-white/70 font-semibold block mb-1">Persetujuan</span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FAC06E]">70%</span>
                            <span className="text-sm md:text-base text-white/90 font-bold">SETUJU</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-500/20 rounded-full px-3 py-1.5 border border-green-400/30 self-start md:self-auto">
                          <span className="material-symbols-outlined text-green-400 text-lg md:text-xl">trending_up</span>
                          <span className="text-sm md:text-base font-black text-green-400">+15%</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Total Votes - Desktop Only */}
                    <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <span className="text-sm text-white/70 font-semibold block mb-2">Total Partisipasi</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-black text-white">10</span>
                        <span className="text-base text-white/90 font-bold">VOTES</span>
                      </div>
                    </div>
                    
                    {/* Time Remaining - Desktop Only */}
                    <div className="hidden md:block bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <span className="text-sm text-white/70 font-semibold block mb-2">Waktu Tersisa</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl lg:text-5xl font-black text-orange-300">5</span>
                        <span className="text-base text-white/90 font-bold">JAM</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-[#FAC06E] to-[#e8b05e] text-[#243D68] py-3 md:py-4 lg:py-5 rounded-lg md:rounded-xl font-black text-sm md:text-base lg:text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-xl border-2 border-[#FAC06E]/50">
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <span className="material-symbols-outlined text-xl md:text-2xl">how_to_vote</span>
                      <span>Vote Sekarang</span>
                      <span className="material-symbols-outlined text-xl md:text-2xl">arrow_forward</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Messages Container */}
              <div className="space-y-0 overflow-x-hidden max-w-full">
                {/* Date Separator */}
                <div className="flex justify-center py-3 bg-[#F8F9FA]">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#6B7280] shadow-sm">
                    Kemarin, 11 Jan 2026
                  </span>
                </div>

                {/* Message 1 */}
                <div className="bg-white px-3 py-3.5 border-b border-[#F3F4F6] overflow-hidden">
                  <div className="flex gap-2.5 max-w-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      AP
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#1F2937]">Andi Pratama</span>
                        <span className="text-xs text-[#9CA3AF]">14:20</span>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed mb-2 break-words">
                        Halo tim! Untuk update desain landing page apakah sudah siap direview? Saya udah cek mockup yang kemarin, overall keren banget!
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-base">favorite_border</span>
                          <span className="text-xs">12</span>
                        </button>
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                          <span className="text-xs">3</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message 2 - User */}
                <div className="bg-[#F0F9FF] px-3 py-3.5 border-b border-[#E0F2FE] overflow-hidden">
                  <div className="flex gap-2.5 flex-row-reverse max-w-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      AK
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <span className="text-xs text-[#9CA3AF]">14:35</span>
                        <span className="text-sm font-bold text-[#1F2937]">Anda</span>
                        <span className="material-symbols-outlined text-sm text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed mb-2 break-words">
                        Siap Ndra, sudah aku upload di folder drive. Cek ya!
                      </p>
                      <div className="flex items-center gap-3 justify-end">
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="text-xs">8</span>
                          <span className="material-symbols-outlined text-base">favorite_border</span>
                        </button>
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="text-xs">1</span>
                          <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Separator */}
                <div className="flex justify-center py-3 bg-[#F8F9FA]">
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-[#6B7280] shadow-sm">
                    Hari ini, 12 Jan 2026
                  </span>
                </div>

                {/* Message 3 - Admin */}
                <div className="bg-white px-3 py-3.5 border-b border-[#F3F4F6] overflow-hidden">
                  <div className="flex gap-2.5 max-w-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      SB
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-sm font-bold text-[#1F2937]">Siti Budiman</span>
                        <span className="px-1.5 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded uppercase">Admin</span>
                        <span className="text-xs text-[#9CA3AF]">09:15</span>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed mb-2 break-words">
                        Keren banget progressnya! Btw, besok kita meeting jam 10 pagi ya untuk bahas integrasi API. Jangan lupa siapin notes masing-masing.
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-base">favorite_border</span>
                          <span className="text-xs">24</span>
                        </button>
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                          <span className="text-xs">5</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voting Card In Feed - SIMPLIFIED */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 px-3 py-3.5 border-b-2 border-indigo-200 overflow-hidden">
                  <div className="flex gap-2.5 mb-3 max-w-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      SB
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold text-[#1F2937]">Siti Budiman</span>
                        <span className="text-xs text-[#9CA3AF]">09:16</span>
                      </div>
                      <div className="flex items-center gap-1 text-indigo-600 font-bold text-xs">
                        <span className="material-symbols-outlined text-base">poll</span>
                        <span>Membuat voting</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-3 shadow border border-indigo-100 max-w-full overflow-hidden">
                    <h3 className="text-sm font-black text-[#1F2937] mb-2 break-words">
                      Vote: Waktu Meeting Teknis
                    </h3>
                    
                    <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-lg text-xs font-bold mb-3 inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <span className="whitespace-nowrap">Deadline: 12 Okt, 15:00</span>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="relative h-11 bg-[#F1F5F9] rounded-lg overflow-hidden border border-indigo-300">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-indigo-400" style={{ width: '70%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-between px-2.5">
                          <div className="flex items-center gap-1.5 z-10">
                            <span className="material-symbols-outlined text-white text-base">check_circle</span>
                            <span className="text-sm font-bold text-white whitespace-nowrap">Senin, 10:00 WIB</span>
                          </div>
                          <span className="text-sm font-black text-white z-10 whitespace-nowrap">7 votes</span>
                        </div>
                      </div>
                      
                      <div className="relative h-11 bg-[#F1F5F9] rounded-lg overflow-hidden border border-gray-200">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-200" style={{ width: '30%' }}></div>
                        <div className="absolute inset-0 flex items-center justify-between px-2.5">
                          <div className="flex items-center gap-1.5 z-10">
                            <span className="material-symbols-outlined text-gray-400 text-base">radio_button_unchecked</span>
                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Selasa, 13:00 WIB</span>
                          </div>
                          <span className="text-sm font-bold text-gray-600 z-10 whitespace-nowrap">3 votes</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t border-indigo-100 gap-2">
                      <span className="text-xs text-[#6B7280] whitespace-nowrap">10 votes • 5 jam lagi</span>
                      <button className="text-xs font-bold text-indigo-600 hover:underline whitespace-nowrap">Detail</button>
                    </div>
                  </div>
                </div>

                {/* Message 4 */}
                <div className="bg-white px-3 py-3.5 border-b border-[#F3F4F6] overflow-hidden">
                  <div className="flex gap-2.5 max-w-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      SB
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-[#1F2937]">Siti Budiman</span>
                        <span className="text-xs text-[#9CA3AF]">09:17</span>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed mb-2 break-words">
                        Jangan lupa siapin laporan masing-masing divisi ya!
                      </p>
                      <div className="flex items-center gap-3">
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-base">favorite_border</span>
                          <span className="text-xs">6</span>
                        </button>
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                          <span className="text-xs">Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message 5 - With Mention */}
                <div className="bg-[#F0F9FF] px-3 py-3.5 border-b border-[#E0F2FE] overflow-hidden">
                  <div className="flex gap-2.5 flex-row-reverse max-w-full">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      AK
                    </div>
                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        <span className="text-xs text-[#9CA3AF]">09:45</span>
                        <span className="text-sm font-bold text-[#1F2937]">Anda</span>
                        <span className="material-symbols-outlined text-sm text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>done_all</span>
                      </div>
                      <p className="text-sm text-[#374151] leading-relaxed mb-2 break-words">
                        Oke siap <span className="inline-block bg-[#243D68] text-white px-1.5 py-0.5 rounded text-sm font-semibold">@Siti B</span>, notes sudah dicatat. Sampai jumpa besok!
                      </p>
                      <div className="flex items-center gap-3 justify-end">
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="text-xs">15</span>
                          <span className="material-symbols-outlined text-base">favorite_border</span>
                        </button>
                        <button className="flex items-center gap-1 text-[#6B7280]">
                          <span className="text-xs">2</span>
                          <span className="material-symbols-outlined text-base">chat_bubble_outline</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* End */}
                <div className="flex justify-center py-5 bg-[#F8F9FA]">
                  <span className="text-xs text-[#9CA3AF]">Anda sudah melihat semua pesan</span>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs... */}
          {activeTab === 'overview' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Description & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#243D68]">description</span>
                    Deskripsi Proyek
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-[#6B7280] text-sm leading-relaxed">
                    <li>Membangun aplikasi mobile untuk Ikatan Alumni Universitas Brawijaya (IKA UB).</li>
                    <li>Memperkuat jaringan dan memfasilitasi kolaborasi antar alumni.</li>
                    <li>Menyediakan platform informasi terpusat.</li>
                  </ul>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#243D68]">flag</span>
                    Tujuan Proyek
                  </h3>
                  <ul className="space-y-3 text-[#6B7280] text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                        check_circle
                      </span>
                      <span>Meningkatkan interaksi dan kolaborasi antar alumni.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">
                        check_circle
                      </span>
                      <span>Menyediakan pusat informasi karir dan peluang bisnis.</span>
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
                  <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#243D68]">workspace_premium</span>
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
                  <h3 className="text-base font-bold text-[#333333] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#243D68]">location_on</span>
                    Lokasi / Fokus Kegiatan
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#243D68]">public</span>
                    <p className="text-[#6B7280] text-sm leading-relaxed">Online</p>
                  </div>
                </div>
              </div>

              {/* Team Needs */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-[#333333] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#243D68]">groups</span>
                  Kebutuhan Tim
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] p-5">
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
                  <div className="bg-[#F8F9FA] rounded-xl border border-[#E5E7EB] p-5">
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
            </div>
          )}
          
          {activeTab === 'progress' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Progress Bar */}
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#333333]">Progress Proyek</h3>
                  <span className="text-2xl font-bold text-[#4A90E2]">60%</span>
                </div>
                <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden">
                  <div className="bg-[#4A90E2] h-3 rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-[#6B7280] mt-3">Estimasi selesai: Maret 2026</p>
              </div>

              {/* Milestones */}
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                <h3 className="text-base font-bold text-[#333333] mb-4">Tahapan Proyek</h3>
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
                <h3 className="text-base font-bold text-[#333333] mb-4">Update Terbaru</h3>
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
            </div>
          )}
          
          {activeTab === 'members' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Project-in-Charge */}
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                <h3 className="text-base font-bold text-[#333333] mb-4">Project-in-Charge</h3>
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
                <h3 className="text-base font-bold text-[#333333] mb-4">Tim Inti</h3>
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
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-[#333333]">Volunteer</h3>
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
            </div>
          )}
          
          {activeTab === 'wallet' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Wallet Card */}
              <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-white/80 text-sm font-semibold mb-1">Dompet Proyek</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-black text-white">Rp 35.000.000</span>
                      </div>
                      <span className="text-xs text-white/60 mt-1 block">Total Dana</span>
                    </div>

                    {/* Circular Progress */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="50%"
                          cy="50%"
                          r="36"
                          stroke="rgba(255,255,255,0.2)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50%"
                          cy="50%"
                          r="36"
                          stroke="#FAC06E"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="226.19"
                          strokeDashoffset="67.86"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl md:text-2xl font-black text-[#FAC06E]">70%</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-red-400 text-xl">trending_down</span>
                        <span className="text-white/80 text-xs font-semibold">Dana Terpakai</span>
                      </div>
                      <p className="text-2xl font-black text-white">30%</p>
                      <p className="text-xs text-white/60 mt-1">Rp 10.500.000</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-green-400 text-xl">account_balance_wallet</span>
                        <span className="text-white/80 text-xs font-semibold">Dana Tersedia</span>
                      </div>
                      <p className="text-2xl font-black text-white">70%</p>
                      <p className="text-xs text-white/60 mt-1">Rp 24.500.000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transaction History */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-[#E5E7EB]">
                  <h3 className="text-lg font-black text-[#1F2937]">Riwayat Transaksi</h3>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E5E7EB] overflow-x-auto no-scrollbar">
                  <button 
                    className={`px-4 py-2 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'all' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('all')}
                  >
                    Semua
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'internal' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('internal')}
                  >
                    Dana Internal
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'donation' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('donation')}
                  >
                    Donasi Luar
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'expense' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('expense')}
                  >
                    Pengeluaran
                  </button>
                </div>

                {/* Transaction List */}
                <div className="divide-y divide-[#F3F4F6]">
                  {filteredTransactions.map(transaction => (
                    <div key={transaction.id} className="p-4 hover:bg-[#F8F9FA] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-${transaction.iconColor}-100 rounded-full flex items-center justify-center shrink-0`}>
                          <span className={`material-symbols-outlined text-${transaction.iconColor}-600 text-xl`}>{transaction.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#1F2937] mb-0.5">{transaction.title}</h4>
                          <p className="text-xs text-[#6B7280]">{transaction.date}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-sm font-black ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount > 0 ? '+' : ''}Rp {Math.abs(transaction.amount).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="p-4 border-t border-[#E5E7EB]">
                  <button className="w-full py-3 text-sm font-bold text-[#243D68] hover:bg-[#F8F9FA] rounded-lg transition-colors">
                    Lihat Lebih Banyak
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input */}
        {activeTab === 'discussion' && (
          <div className="fixed bottom-0 left-0 lg:left-64 right-0 bg-white px-3 py-2.5 z-30 pb-5 lg:pb-3 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2 max-w-screen-xl mx-auto">
              <button className="p-2 text-[#6B7280] shrink-0">
                <span className="material-symbols-outlined text-xl -rotate-45">attach_file</span>
              </button>
              <button className="p-2 text-[#6B7280] shrink-0">
                <span className="material-symbols-outlined text-xl">bar_chart</span>
              </button>
              <div className="flex-1 bg-[#F8F9FA] rounded-full px-3.5 py-2 min-h-[40px] flex items-center">
                <input 
                  className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 text-[#243D68] placeholder-[#6B7280]" 
                  placeholder="Tulis pesan..." 
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button className="p-2 bg-[#243D68]/10 text-[#243D68] rounded-full shrink-0">
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}