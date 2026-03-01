import { useState } from 'react';
import { toast } from 'sonner';
import { HandHeart, UserPlus, HeartHandshake } from 'lucide-react';
import { Logo } from './Logo';
import { useTranslation } from '@/hooks/useTranslation';
import type { JoinRequest } from '@/types';

export interface AvailablePosition {
  id: string;
  title: string;
  slots: number;
}

interface ProjectDetailAlumniProps {
  hasJoinedProjects?: boolean; // NEW: Indicate if alumni has joined any projects
  projectImageUrl?: string; // Project cover image
  projectTitle?: string; // NEW: Project title for display
  projectCategory?: string; // NEW: Project category
  projectId?: string; // NEW: Project ID for join request
  availablePositions?: AvailablePosition[]; // NEW: Available positions for the project
  projectType?: 'open-volunteer' | 'galeri-with-funding' | 'galeri-documentation' | 'campaign'; // NEW: Explicit project type
  isFunding?: boolean; // NEW: Flag for whether project accepts donations
  isVolunteerOpen?: boolean; // NEW: Flag for whether project accepts volunteers
  onBack: () => void;
  initialTab?: 'overview' | 'progress' | 'team' | 'wallet';
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  activeNav?: string;
  onJoinRequestSubmitted?: (joinRequest: JoinRequest) => void; // NEW: Handler for join request submission
  isBookmarked?: boolean; // NEW: Bookmark state from parent
  onBookmark?: (projectId: string, bookmarked: boolean) => void; // NEW: Bookmark handler
}

export function ProjectDetailAlumni({ 
  hasJoinedProjects = false, // NEW: Default false
  projectImageUrl,
  projectTitle = 'Pengembangan Aplikasi AlumniConnect', // NEW: Default value
  projectCategory = 'Pendidikan', // NEW: Default value
  projectId = 'default-project-id', // NEW: Default value
  availablePositions = [],
  projectType = 'open-volunteer', // NEW: Default open-volunteer
  isFunding = false, // NEW: Default no funding
  isVolunteerOpen = true, // NEW: Default volunteer open
  onBack, 
  initialTab = 'overview',
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  onLogout,
  activeNav = 'home',
  onJoinRequestSubmitted,
  isBookmarked: initialBookmarked = false,
  onBookmark
}: ProjectDetailAlumniProps) {
  const { language, t } = useTranslation();

  // DEBUG: Log props yang diterima
  console.log('📄 [ProjectDetailAlumni] Component rendered with props:', {
    projectId,
    projectTitle,
    projectCategory,
    projectType,
    isFunding,
    isVolunteerOpen,
    hasJoinedProjects
  });

  // Bookmark state
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);

  const handleToggleBookmark = () => {
    const newVal = !isBookmarked;
    setIsBookmarked(newVal);
    onBookmark?.(projectId, newVal);
    toast.success(newVal 
      ? (language === 'id' ? 'Project disimpan ke bookmark' : 'Project saved to bookmarks')
      : (language === 'id' ? 'Bookmark dihapus' : 'Bookmark removed'), {
      description: newVal 
        ? (language === 'id' ? `"${projectTitle}" berhasil ditambahkan ke daftar bookmark Anda.` : `"${projectTitle}" has been added to your bookmarks.`)
        : (language === 'id' ? `"${projectTitle}" dihapus dari daftar bookmark Anda.` : `"${projectTitle}" has been removed from your bookmarks.`),
    });
  };

  // Project membership state - true jika user sudah diterima PIC ke project
  // Initialize with hasJoinedProjects prop for demo purposes
  const [isProjectMember, setIsProjectMember] = useState(hasJoinedProjects);
  
  // Join project application states
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'none' | 'pending' | 'approved'>('none');
  const [selectedPosition, setSelectedPosition] = useState(''); // NEW: Selected position
  const [commitmentDuration, setCommitmentDuration] = useState('3-months'); // Changed default to 3-months
  const [customDuration, setCustomDuration] = useState('');
  const [joinReason, setJoinReason] = useState('');
  
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'team' | 'wallet' | 'discussion'>(initialTab);
  const [showSearch, setShowSearch] = useState(false);
  const [message, setMessage] = useState('');
  const [expandedMessages, setExpandedMessages] = useState<number[]>([]);
  const [walletFilter, setWalletFilter] = useState<'all' | 'internal' | 'donation' | 'expense'>('all');

  // Campaign-specific tab state
  const [activeCampaignTab, setActiveCampaignTab] = useState<'overview' | 'deadline' | 'alumni-apply' | 'anggaran'>('overview');
  
  // Voting states
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [selectedVote, setSelectedVote] = useState<'senin' | 'selasa' | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteResults, setVoteResults] = useState({
    senin: 7,
    selasa: 3
  });

  const toggleExpand = (id: number) => {
    if (expandedMessages.includes(id)) {
      setExpandedMessages(expandedMessages.filter(msgId => msgId !== id));
    } else {
      setExpandedMessages([...expandedMessages, id]);
    }
  };

  const handleVoteSubmit = () => {
    if (selectedVote) {
      // Update vote count
      setVoteResults(prev => ({
        ...prev,
        [selectedVote]: prev[selectedVote] + 1
      }));
      setHasVoted(true);
      setShowVotingModal(false);
    }
  };

  const handleJoinSubmit = () => {
    console.log('���� Join Submit Started');
    console.log('Selected Position:', selectedPosition);
    console.log('Commitment Duration:', commitmentDuration);
    console.log('Join Reason:', joinReason);
    console.log('Available Positions:', availablePositions);
    
    // Validations
    if (!selectedPosition) {
      toast.error(t.projectDetailDonatur.selectPosition);
      return;
    }
    if (!joinReason.trim()) {
      toast.error(t.projectDetailDonatur.reasonToJoin);
      return;
    }
    if (commitmentDuration === 'custom' && !customDuration.trim()) {
      toast.error(language === 'id' ? 'Mohon isi durasi komitmen custom' : 'Please fill in custom commitment duration');
      return;
    }
    
    // Format commitment duration for display
    let durationDisplay = '';
    switch (commitmentDuration) {
      case '1-month':
        durationDisplay = '1 Bulan';
        break;
      case '3-months':
        durationDisplay = '3 Bulan';
        break;
      case '6-months':
        durationDisplay = '6 Bulan';
        break;
      case '1-year':
        durationDisplay = '1 Tahun';
        break;
      case 'custom':
        durationDisplay = customDuration;
        break;
    }

    // Find selected position details
    const position = availablePositions.find(p => p.id === selectedPosition);
    
    console.log('Found Position:', position);
    
    // Create join request object
    const joinRequest: JoinRequest = {
      id: `join-${Date.now()}`,
      projectId: projectId, // Dynamic from props
      projectTitle: projectTitle, // Dynamic from props
      alumniId: 'current-user-id', // In real app, get from auth context
      alumniName: 'John Doe Alumni', // In real app, get from auth context
      alumniEmail: 'alumni@example.com', // In real app, get from auth context
      reason: joinReason,
      commitment: commitmentDuration,
      commitmentDuration: durationDisplay,
      interestedPosition: position?.title || '',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    console.log('📤 Join Request Object:', joinRequest);

    // Submit application
    setApplicationStatus('pending');
    setShowJoinModal(false);
    
    // Call parent handler if provided
    if (onJoinRequestSubmitted) {
      console.log('✅ Calling onJoinRequestSubmitted handler');
      onJoinRequestSubmitted(joinRequest);
    } else {
      console.warn('⚠️ No onJoinRequestSubmitted handler provided');
    }
    
    // Reset form
    setSelectedPosition('');
    setJoinReason('');
    setCommitmentDuration('3-months');
    setCustomDuration('');
    
    toast.success(t.projectDetailDonatur.applicationSent, {
      description: t.projectDetailDonatur.applicationPendingDesc,
      duration: 4000,
    });
    
    console.log('✅ Join Submit Completed');
  };

  const handleApproveApplication = () => {
    // Simulate PIC approval
    setApplicationStatus('approved');
    setIsProjectMember(true);
    setActiveTab('discussion');
    toast.success(language === 'id' ? 'Selamat! Anda diterima di project ini' : 'Congratulations! You have been accepted to this project', {
      description: language === 'id' ? 'Akses penuh ke Diskusi dan Wallet sudah tersedia' : 'Full access to Discussion and Wallet is now available',
      duration: 4000,
    });
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
            <Logo />
          </div>
          
          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'home'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                onClick={onNavigateHome || onBack}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm">{t.nav.home}</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'explore'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                onClick={onNavigateExplore}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">{t.nav.explore}</span>
              </button>

              <button 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full relative ${
                  activeNav === 'pesan' || activeNav === 'messages'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                onClick={onNavigateMessages}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">{t.nav.messages}</span>
                <span className="absolute top-3 left-11 w-2 h-2 bg-red-500 rounded-full border border-[#2B4468]"></span>
              </button>

              <button 
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'settings'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                onClick={onNavigateSettings}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">{t.nav.settings}</span>
              </button>
            </div>
          </nav>

          {/* Logout */}
          <div className="p-5 pb-6">
            <button
              onClick={onLogout || onBack}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">{t.nav.logout}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen overflow-x-hidden max-w-full pb-24 lg:pb-28">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-6 lg:px-8 py-4 justify-between border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-start">
            <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
            </button>
          </div>
          <h2 className="text-[#0E1B33] text-base md:text-lg font-bold leading-tight tracking-tight flex-1 text-center uppercase px-2">
            {t.projectDetailDonatur.projectDetail}
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
          <div className="px-0 md:px-6 lg:px-8 pt-6 pb-4">
            <div
              className="w-full flex flex-col justify-end overflow-hidden rounded-none md:rounded-2xl min-h-[180px] p-4 relative shadow-none md:shadow-lg"
            >
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: projectImageUrl ? `url(${projectImageUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              {/* Bookmark Button */}
              <button
                onClick={handleToggleBookmark}
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-lg active:scale-95"
                aria-label={isBookmarked ? 'Hapus bookmark' : 'Tambah bookmark'}
              >
                <span
                  className="material-symbols-outlined text-2xl transition-colors duration-200"
                  style={{
                    fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                    color: isBookmarked ? '#FAC06E' : '#243D68',
                  }}
                >
                  bookmark
                </span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="px-4 md:px-6 lg:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-xl md:text-2xl lg:text-3xl font-['Archivo_Black'] leading-tight uppercase">
              {projectTitle}
            </h1>
          </div>

          {/* Tabs */}
          <div className="sticky top-[73px] z-10 bg-white border-b border-[#E5E7EB] shadow-sm overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-start min-w-full px-2 md:px-6 lg:px-8">
              {projectType === 'campaign' ? (
                // ===== CAMPAIGN TABS =====
                ([
                  { key: 'overview' as const, label: 'Overview' },
                  { key: 'deadline' as const, label: 'Deadline' },
                  { key: 'alumni-apply' as const, label: language === 'id' ? 'Jumlah Alumni Apply' : 'Alumni Applications' },
                  { key: 'anggaran' as const, label: language === 'id' ? 'Kebutuhan Anggaran' : 'Budget Needs' },
                ] as { key: 'overview' | 'deadline' | 'alumni-apply' | 'anggaran'; label: string }[]).map((tab) => (
                  <button
                    key={tab.key}
                    className={`text-center font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${ activeCampaignTab === tab.key ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]' } text-[15px] px-[18px] py-[12px]`}
                    onClick={() => setActiveCampaignTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))
              ) : (
                // ===== NON-CAMPAIGN TABS =====
                (projectType === 'galeri-with-funding' || projectType === 'galeri-documentation' ? [
                  { key: 'overview' as const, label: 'Overview' },
                  { key: 'progress' as const, label: 'Progress' },
                  { key: 'team' as const, label: 'Team' },
                ] : [
                  { key: 'overview' as const, label: 'Overview' },
                  { key: 'progress' as const, label: 'Progress' },
                  { key: 'team' as const, label: 'Team' },
                  { key: 'wallet' as const, label: 'Wallet' },
                ]).map((tab) => (
                  <button
                    key={tab.key}
                    className={`text-center font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${ activeTab === tab.key ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]' } text-[15px] px-[18px] py-[12px]`}
                    onClick={() => setActiveTab(tab.key as any)}
                  >
                    {tab.label}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ===== CAMPAIGN TAB CONTENT ===== */}
          {projectType === 'campaign' && (
            <>
              {/* CAMPAIGN: Tab Overview */}
              {activeCampaignTab === 'overview' && (
                <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
                  {/* Campaign Description */}
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">campaign</span>
                      Tentang Campaign
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">
                      Campaign ini bertujuan mengumpulkan dana dan dukungan nyata bagi saudara-saudara kita di Gaza yang membutuhkan bantuan pangan mendesak. Setiap kontribusi Anda akan disalurkan langsung melalui mitra terpercaya di lapangan.
                    </p>
                  </div>

                  {/* Campaign Goals */}
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">flag</span>
                      Tujuan Campaign
                    </h3>
                    <ul className="space-y-3 text-[#6B7280] text-sm leading-relaxed">
                      {[
                        'Mengumpulkan dana untuk 1.000 paket sembako bagi keluarga terdampak.',
                        'Menggalang partisipasi alumni lintas angkatan untuk aksi nyata.',
                        'Menyalurkan bantuan secara transparan dan terverifikasi.',
                        'Membangun solidaritas alumni dalam isu kemanusiaan global.',
                      ].map((goal, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-[#4CAF50] text-lg mt-0.5">check_circle</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Campaign Progress */}
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#243D68] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">trending_up</span>
                      {language === 'id' ? 'Progress Penggalangan Dana' : 'Fundraising Progress'}
                    </h3>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#6B7280]">{t.projectDetailDonatur.collected}</span>
                      <div className="text-right">
                        <span className="text-xl font-black text-[#243D68]">Rp 75.000.000</span>
                        <span className="text-sm text-[#6B7280] ml-1">/ Rp 150.000.000</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden mb-2">
                      <div className="bg-gradient-to-r from-[#243D68] to-[#FAC06E] h-3 rounded-full transition-all duration-700" style={{ width: '50%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#6B7280]">50% tercapai</span>
                      <span className="text-xs font-semibold text-[#FAC06E] bg-[#FFF9F0] px-2 py-0.5 rounded-full border border-[#FAC06E]/20">
                        Rp 75.000.000 lagi
                      </span>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">shield_person</span>
                      Penyelenggara Campaign
                    </h3>
                    <div className="flex items-center gap-4">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-14 w-14 shrink-0 ring-2 ring-[#FAC06E]/30"
                        style={{
                          backgroundImage: 'url("https://images.unsplash.com/photo-1651596082255-bcb4993cee27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtdXNsaW0lMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjI1MDcyNnww&ixlib=rb-4.1.0&q=80&w=400")',
                        }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-[11px] text-[#FAC06E] font-semibold uppercase tracking-wider mb-0.5">Koordinator Campaign</p>
                        <p className="text-base font-semibold text-[#0E1B33]">Ahmad Zulfikar</p>
                        <p className="text-sm text-[#6B7280]">Hubungan Internasional '14</p>
                      </div>
                      <span className="material-symbols-outlined text-[#4A90E2] text-xl">verified</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CAMPAIGN: Tab Deadline */}
              {activeCampaignTab === 'deadline' && (
                <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
                  {/* Countdown Banner */}
                  <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    <div className="relative z-10 text-center">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="material-symbols-outlined text-[#FAC06E] text-2xl">schedule</span>
                        <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">{language === 'id' ? 'Sisa Waktu Campaign' : 'Campaign Time Remaining'}</p>
                      </div>
                      <div className="flex items-center justify-center gap-3 mt-2">
                        {[
                          { value: '14', label: 'Hari' },
                          { value: '08', label: 'Jam' },
                          { value: '32', label: 'Menit' },
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="bg-white/15 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[64px]">
                              <span className="text-3xl font-black text-white">{item.value}</span>
                            </div>
                            <span className="text-xs text-white/60 mt-1.5 font-medium">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tanggal Mulai */}
                  <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#4CAF50] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">event_available</span>
                      Tanggal Mulai Campaign
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#E8F5E9] rounded-xl flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#4CAF50] uppercase tracking-wider">Feb</span>
                        <span className="text-xl font-black text-[#2E7D32]">15</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#0E1B33] text-base">Sabtu, 15 Februari 2026</p>
                        <p className="text-sm text-[#6B7280] mt-0.5">Pukul 08.00 WIB</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="w-2 h-2 rounded-full bg-[#4CAF50] inline-block"></span>
                          <span className="text-xs font-semibold text-[#4CAF50]">Campaign Sedang Berjalan</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tanggal Berakhir */}
                  <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#EF5350] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">event_busy</span>
                      Tanggal Berakhir Campaign
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#FFF3F3] rounded-xl flex flex-col items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#EF5350] uppercase tracking-wider">Mar</span>
                        <span className="text-xl font-black text-[#C62828]">15</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-[#0E1B33] text-base">Minggu, 15 Maret 2026</p>
                        <p className="text-sm text-[#6B7280] mt-0.5">Pukul 23.59 WIB</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="w-2 h-2 rounded-full bg-[#EF5350] inline-block"></span>
                          <span className="text-xs font-semibold text-[#EF5350]">14 hari lagi</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline Visual */}
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#243D68] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">timeline</span>
                      Durasi Campaign
                    </h3>
                    <div className="relative">
                      {/* Timeline bar */}
                      <div className="flex items-center gap-0 mb-3">
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-[#4CAF50] border-2 border-white shadow-md z-10"></div>
                        </div>
                        <div className="flex-1 h-2 bg-[#E5E7EB] rounded-full overflow-hidden mx-1">
                          <div className="h-2 bg-gradient-to-r from-[#4CAF50] to-[#FAC06E] rounded-full" style={{ width: '50%' }}></div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-[#EF5350] border-2 border-white shadow-md z-10"></div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs font-semibold text-[#4CAF50]">15 Feb 2026</span>
                        <span className="text-xs font-semibold text-[#6B7280]">50% berlalu</span>
                        <span className="text-xs font-semibold text-[#EF5350]">15 Mar 2026</span>
                      </div>
                      <p className="text-xs text-center text-[#6B7280] mt-2">Total durasi campaign: <span className="font-semibold text-[#243D68]">28 hari</span></p>
                    </div>
                  </div>
                </div>
              )}

              {/* CAMPAIGN: Tab Jumlah Alumni Apply */}
              {activeCampaignTab === 'alumni-apply' && (
                <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
                  {/* Total Counter Card */}
                  <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    </div>
                    <div className="relative z-10 text-center">
                      <span className="material-symbols-outlined text-[#FAC06E] text-4xl mb-2">group</span>
                      <p className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-1">Total Alumni yang Sudah Apply</p>
                      <p className="text-6xl font-black text-white mt-2">142</p>
                      <p className="text-white/60 text-sm mt-2">alumni telah mendaftar</p>
                      <div className="flex items-center justify-center gap-1.5 mt-3">
                        <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse inline-block"></span>
                        <span className="text-xs font-semibold text-[#4CAF50]">+12 alumni baru hari ini</span>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown by Status */}
                  <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">bar_chart</span>
                      Breakdown Status Alumni
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Diterima & Aktif', count: 89, total: 142, color: '#4CAF50', bgColor: '#E8F5E9', icon: 'check_circle' },
                        { label: 'Menunggu Review', count: 38, total: 142, color: '#FAC06E', bgColor: '#FFF9F0', icon: 'pending' },
                        { label: 'Ditolak', count: 15, total: 142, color: '#EF5350', bgColor: '#FFF3F3', icon: 'cancel' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: item.bgColor }}>
                            <span className="material-symbols-outlined text-lg" style={{ color: item.color }}>{item.icon}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-[#333333]">{item.label}</span>
                              <span className="text-sm font-black" style={{ color: item.color }}>{item.count} orang</span>
                            </div>
                            <div className="w-full bg-[#F3F4F6] rounded-full h-2 overflow-hidden">
                              <div
                                className="h-2 rounded-full transition-all duration-700"
                                style={{ width: `${(item.count / item.total) * 100}%`, backgroundColor: item.color }}
                              ></div>
                            </div>
                            <span className="text-xs text-[#6B7280] mt-0.5 block">{Math.round((item.count / item.total) * 100)}% dari total</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Breakdown by Angkatan */}
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#243D68] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">school</span>
                      Distribusi per Angkatan
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { angkatan: "'15", count: 28 },
                        { angkatan: "'16", count: 34 },
                        { angkatan: "'17", count: 22 },
                        { angkatan: "'18", count: 19 },
                        { angkatan: "'19", count: 25 },
                        { angkatan: "Lainnya", count: 14 },
                      ].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-3.5 border border-[#E5E7EB] text-center">
                          <p className="text-xs text-[#6B7280] font-medium mb-1">Angkatan {item.angkatan}</p>
                          <p className="text-2xl font-black text-[#243D68]">{item.count}</p>
                          <p className="text-xs text-[#6B7280]">alumni</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Applicants */}
                  <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                        <span className="material-symbols-outlined text-white">person_add</span>
                        Apply Terbaru
                      </h3>
                      <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2.5 py-1 rounded-full">5 terbaru</span>
                    </div>
                    <div className="space-y-0">
                      {[
                        { name: 'Siti Aminah', angkatan: "'17", time: '2 jam lalu', color: 'from-rose-400 to-pink-500' },
                        { name: 'Rizky Pratama', angkatan: "'18", time: '4 jam lalu', color: 'from-blue-400 to-indigo-500' },
                        { name: 'Dewi Lestari', angkatan: "'16", time: '6 jam lalu', color: 'from-emerald-400 to-teal-500' },
                        { name: 'Hasan Abdullah', angkatan: "'15", time: '8 jam lalu', color: 'from-amber-400 to-orange-500' },
                        { name: 'Nurul Hidayah', angkatan: "'19", time: '1 hari lalu', color: 'from-purple-400 to-purple-600' },
                      ].map((applicant, idx, arr) => (
                        <div key={idx} className={`flex items-center gap-3 py-3 ${idx < arr.length - 1 ? 'border-b border-[#F3F4F6]' : ''}`}>
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${applicant.color} flex items-center justify-center shrink-0`}>
                            <span className="text-white text-xs font-bold">{applicant.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0E1B33] truncate">{applicant.name}</p>
                            <p className="text-xs text-[#6B7280]">Angkatan {applicant.angkatan}</p>
                          </div>
                          <span className="text-xs text-[#6B7280] whitespace-nowrap">{applicant.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CAMPAIGN: Tab Kebutuhan Anggaran */}
              {activeCampaignTab === 'anggaran' && (
                <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
                  {/* Target Dana Card */}
                  <div className="bg-gradient-to-br from-[#243D68] to-[#1a2d4d] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div>
                          <p className="text-white/70 text-sm font-semibold mb-1">Target Dana Campaign</p>
                          <p className="text-4xl font-black text-white">Rp 150.000.000</p>
                          <p className="text-xs text-white/50 mt-1">Target yang perlu dicapai</p>
                        </div>
                        {/* Circular Progress */}
                        <div className="relative w-20 h-20 shrink-0">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="36" stroke="rgba(255,255,255,0.15)" strokeWidth="8" fill="none" />
                            <circle
                              cx="50%" cy="50%" r="36"
                              stroke="#FAC06E" strokeWidth="8" fill="none"
                              strokeDasharray="226.19"
                              strokeDashoffset="113.1"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl font-black text-[#FAC06E]">50%</span>
                          </div>
                        </div>
                      </div>
                      {/* Stats Row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-green-400 text-lg">volunteer_activism</span>
                            <span className="text-white/70 text-xs font-semibold">{t.projectDetailDonatur.collected}</span>
                          </div>
                          <p className="text-lg font-black text-white">Rp 75.000.000</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-[#FAC06E] text-lg">savings</span>
                            <span className="text-white/70 text-xs font-semibold">Sisa Target</span>
                          </div>
                          <p className="text-lg font-black text-white">Rp 75.000.000</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown Kebutuhan Dana */}
                  <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                      <span className="material-symbols-outlined text-white">receipt_long</span>
                      Breakdown Kebutuhan Dana
                    </h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Paket Sembako (1.000 paket)', amount: 100000000, percent: 67, color: '#243D68', icon: 'inventory_2' },
                        { label: 'Biaya Logistik & Pengiriman', amount: 25000000, percent: 17, color: '#4A90E2', icon: 'local_shipping' },
                        { label: 'Koordinasi Lapangan & SDM', amount: 15000000, percent: 10, color: '#FAC06E', icon: 'groups' },
                        { label: 'Dokumentasi & Pelaporan', amount: 7500000, percent: 5, color: '#4CAF50', icon: 'camera_alt' },
                        { label: 'Biaya Operasional Admin', amount: 2500000, percent: 2, color: '#9E9E9E', icon: 'admin_panel_settings' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB]">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                            <span className="material-symbols-outlined text-lg" style={{ color: item.color }}>{item.icon}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-semibold text-[#333333] truncate pr-2">{item.label}</span>
                              <span className="text-xs font-bold whitespace-nowrap" style={{ color: item.color }}>{item.percent}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex-1 bg-[#E5E7EB] rounded-full h-1.5 overflow-hidden mr-3">
                                <div
                                  className="h-1.5 rounded-full transition-all duration-700"
                                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                                ></div>
                              </div>
                              <span className="text-xs text-[#6B7280] whitespace-nowrap font-medium">
                                Rp {(item.amount / 1000000).toFixed(0)} jt
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total */}
                    <div className="mt-4 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                      <span className="text-sm font-bold text-[#333333]">Total Kebutuhan Dana</span>
                      <span className="text-base font-black text-[#243D68]">Rp 150.000.000</span>
                    </div>
                  </div>

                  {/* Dana Stats Summary */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Donatur', value: '247', icon: 'people', color: '#243D68', bgColor: '#E8EDF5' },
                      { label: 'Rata-rata Donasi', value: 'Rp 304 rb', icon: 'trending_up', color: '#4CAF50', bgColor: '#E8F5E9' },
                      { label: 'Donasi Terbesar', value: 'Rp 5 jt', icon: 'workspace_premium', color: '#FAC06E', bgColor: '#FFF9F0' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white rounded-xl p-3.5 border border-[#E5E7EB] shadow-sm text-center">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: stat.bgColor }}>
                          <span className="material-symbols-outlined text-lg" style={{ color: stat.color }}>{stat.icon}</span>
                        </div>
                        <p className="text-sm font-black text-[#0E1B33]">{stat.value}</p>
                        <p className="text-xs text-[#6B7280] mt-0.5">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* ===== VOLUNTEER TAB CONTENT (DO NOT MODIFY) ===== */}
          {projectType !== 'campaign' && (
            <>
          {/* Other tabs... */}
          {activeTab === 'overview' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Financial Progress Bar - Only for Galeri Projects */}
              {(projectType === 'galeri-with-funding' || projectType === 'galeri-documentation') && (
                <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-[#243D68] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#243D68]">account_balance_wallet</span>
                      Kebutuhan Keuangan
                    </h3>
                    <span className="text-xs font-semibold text-white bg-[#243D68] px-2.5 py-1 rounded-full">
                      {projectType === 'galeri-with-funding' ? '67%' : '0%'}
                    </span>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-3.5 overflow-hidden mb-3">
                    <div 
                      className="h-3.5 rounded-full transition-all duration-700 bg-gradient-to-r from-[#243D68] to-[#3a5a8f]" 
                      style={{ width: projectType === 'galeri-with-funding' ? '67%' : '0%' }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-[#6B7280]">{t.projectDetailDonatur.collected}: </span>
                      <span className="font-bold text-[#243D68]">
                        {projectType === 'galeri-with-funding' ? 'Rp 33.500.000' : 'Rp 0'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#6B7280]">Target: </span>
                      <span className="font-bold text-[#333333]">
                        {projectType === 'galeri-with-funding' ? 'Rp 50.000.000' : 'Rp 0'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-3 text-xs text-[#6B7280]">
                    <span className="material-symbols-outlined text-sm">people</span>
                    <span>{projectType === 'galeri-with-funding' ? '24 Donatur' : '0 Donatur'}</span>
                    <span className="mx-1">•</span>
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    <span>{projectType === 'galeri-with-funding' ? '18 hari tersisa' : '-'}</span>
                  </div>
                </div>
              )}

              {/* Description & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm">
                    <span className="material-symbols-outlined text-white">description</span>
                    {t.projectDetailDonatur.projectDescription}
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-[#6B7280] text-sm leading-relaxed">
                    <li>Membangun aplikasi mobile untuk Ikatan Alumni Universitas Brawijaya (IKA UB).</li>
                    <li>Memperkuat jaringan dan memfasilitasi kolaborasi antar alumni.</li>
                    <li>Menyediakan platform informasi terpusat.</li>
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

              {/* Social Media & Website */}
              <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                  <span className="material-symbols-outlined text-white">link</span>
                  Sosial Media & Website
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Instagram */}
                  <a 
                    href="https://instagram.com/alumniconnect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4 hover:border-[#243D68] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280] font-medium">Instagram</p>
                      <p className="text-sm font-semibold text-[#243D68] truncate group-hover:text-[#1a2e52]">@alumniconnect</p>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">arrow_outward</span>
                  </a>

                  {/* Twitter/X */}
                  <a 
                    href="https://twitter.com/alumniconnect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4 hover:border-[#243D68] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">tag</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280] font-medium">Twitter / X</p>
                      <p className="text-sm font-semibold text-[#243D68] truncate group-hover:text-[#1a2e52]">@alumniconnect</p>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">arrow_outward</span>
                  </a>

                  {/* Facebook */}
                  <a 
                    href="https://facebook.com/alumniconnect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4 hover:border-[#243D68] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">thumb_up</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280] font-medium">Facebook</p>
                      <p className="text-sm font-semibold text-[#243D68] truncate group-hover:text-[#1a2e52]">AlumniConnect Official</p>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">arrow_outward</span>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/company/alumniconnect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4 hover:border-[#243D68] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0A66C2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">work</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280] font-medium">LinkedIn</p>
                      <p className="text-sm font-semibold text-[#243D68] truncate group-hover:text-[#1a2e52]">AlumniConnect</p>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">arrow_outward</span>
                  </a>

                  {/* YouTube (Optional) */}
                  <a 
                    href="https://youtube.com/@alumniconnect" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4 hover:border-[#243D68] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#FF0000] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">play_arrow</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280] font-medium">YouTube</p>
                      <p className="text-sm font-semibold text-[#243D68] truncate group-hover:text-[#1a2e52]">AlumniConnect Channel</p>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">arrow_outward</span>
                  </a>

                  {/* Website */}
                  <a 
                    href="https://alumniconnect.id" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white rounded-xl border border-[#E5E7EB] p-4 hover:border-[#243D68] hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#243D68] rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-white text-xl">language</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#6B7280] font-medium">Website</p>
                      <p className="text-sm font-semibold text-[#243D68] truncate group-hover:text-[#1a2e52]">alumniconnect.id</p>
                    </div>
                    <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">arrow_outward</span>
                  </a>
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

            </div>
          )}
          
          {activeTab === 'progress' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
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
            </div>
          )}
          
          {activeTab === 'team' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Project-in-Charge */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm w-fit">
                  <span className="material-symbols-outlined text-white">shield_person</span>
                  Project-in-Charge
                </h3>
                <div className="flex items-center gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 shrink-0 ring-3 ring-[#FAC06E]/30"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1651596082255-bcb4993cee27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtdXNsaW0lMjBtYW4lMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjI1MDcyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral")',
                    }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-[11px] text-[#FAC06E] font-semibold uppercase tracking-wider mb-0.5">Project-in-Charge</p>
                    <p className="text-base font-semibold text-[#0E1B33]">Ahmad Zulfikar</p>
                    <p className="text-sm text-[#6B7280]">Hubungan Internasional '14</p>
                  </div>
                  <span className="material-symbols-outlined text-[#4A90E2] text-xl">verified</span>
                </div>
              </div>

              {/* Tim Inti */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 bg-[#243D68] rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">groups</span>
                    {language === 'id' ? 'Tim Inti' : 'Core Team'}
                  </h3>
                  <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2.5 py-1 rounded-full font-medium">3 orang</span>
                </div>
                <div className="space-y-0">
                  {[
                    { name: 'Siti Aminah', major: "Desain Komunikasi Visual '17", role: 'UI/UX Designer', color: 'from-rose-400 to-pink-500' },
                    { name: 'Agus Setiawan', major: "Teknik Informatika '16", role: 'Mobile Developer', color: 'from-blue-400 to-indigo-500' },
                    { name: 'Fatimah Zahra', major: "Sastra Arab '18", role: 'Content Writer', color: 'from-emerald-400 to-teal-500' },
                  ].map((member, idx, arr) => (
                    <div key={idx} className={`flex items-center gap-4 py-3.5 ${idx < arr.length - 1 ? 'border-b border-[#F3F4F6]' : ''}`}>
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center shrink-0 shadow-sm`}>
                        <span className="text-white text-sm font-bold">{member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[#0E1B33] truncate">{member.name}</p>
                        <p className="text-xs text-[#6B7280] truncate">{member.major}</p>
                      </div>
                      <span className="text-xs font-semibold text-[#243D68] bg-[#E8EDF5] px-2.5 py-1 rounded-full whitespace-nowrap">{member.role}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volunteer */}
              <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2 bg-emerald-600 rounded-lg px-3 py-2 shadow-sm w-fit">
                    <span className="material-symbols-outlined text-white">volunteer_activism</span>
                    Volunteer
                  </h3>
                  <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2.5 py-1 rounded-full font-medium">8 orang</span>
                </div>
                <div className="space-y-0">
                  {[
                    { name: 'Rizky Pratama', role: 'Fotografer', color: 'from-purple-400 to-purple-600' },
                    { name: 'Dewi Lestari', role: 'Desain Grafis', color: 'from-amber-400 to-orange-500' },
                    { name: 'Hasan Abdullah', role: 'Videografer', color: 'from-cyan-400 to-blue-500' },
                    { name: 'Nurul Hidayah', role: 'Social Media', color: 'from-pink-400 to-rose-500' },
                    { name: 'Farhan Wijaya', role: 'Logistik', color: 'from-green-400 to-emerald-500' },
                  ].map((vol, idx, arr) => (
                    <div key={idx} className={`flex items-center gap-4 py-3 ${idx < arr.length - 1 ? 'border-b border-[#F3F4F6]' : ''}`}>
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${vol.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-xs font-bold">{vol.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#333333] truncate">{vol.name}</p>
                      </div>
                      <span className="text-xs text-[#6B7280] bg-[#F3F4F6] px-2.5 py-1 rounded-full whitespace-nowrap">{vol.role}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3 pt-3 border-t border-[#E5E7EB] mt-1">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">+3</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#6B7280]">dan 3 volunteer lainnya</span>
                  </div>
                </div>
              </div>


            </div>
          )}
          
          {activeTab === 'wallet' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Show info banner if not a project member */}
              {!isProjectMember ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <div className="bg-[#FFF9F0] border border-[#FAC06E]/30 rounded-xl p-6 max-w-lg w-full shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full border-2 border-[#FAC06E] flex items-center justify-center">
                          <span className="material-symbols-outlined text-[#FAC06E] text-lg">info</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[#243D68] font-bold text-base mb-2">
                          {language === 'id' ? 'Bergabung untuk Akses Penuh' : 'Join for Full Access'}
                        </h4>
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                          {language === 'id' 
                            ? <>Klik tombol <span className="font-semibold text-[#243D68]">"Join Project"</span> di bawah untuk mengajukan diri bergabung. Setelah diterima oleh PIC, Anda akan mendapatkan akses ke fitur <span className="font-semibold text-[#243D68]">Diskusi</span> dan <span className="font-semibold text-[#243D68]">Wallet</span> untuk berkolaborasi dengan tim.</>
                            : <>Click the <span className="font-semibold text-[#243D68]">"Join Project"</span> button below to apply. Once accepted by the PIC, you will get access to <span className="font-semibold text-[#243D68]">Discussion</span> and <span className="font-semibold text-[#243D68]">Wallet</span> features to collaborate with the team.</>}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
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
                      <h3 className="text-white/80 text-sm font-semibold mb-1">{language === 'id' ? 'Dompet Proyek' : 'Project Wallet'}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl md:text-4xl font-black text-white">Rp 35.000.000</span>
                      </div>
                      <span className="text-xs text-white/60 mt-1 block">{language === 'id' ? 'Total Dana' : 'Total Funds'}</span>
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
                  <h3 className="text-lg font-black text-[#1F2937]">{language === 'id' ? 'Riwayat Transaksi' : 'Transaction History'}</h3>
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
                    {language === 'id' ? 'Semua' : 'All'}
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'internal' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('internal')}
                  >
                    {language === 'id' ? 'Dana Internal' : 'Internal Funds'}
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'donation' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('donation')}
                  >
                    {language === 'id' ? 'Donasi Luar' : 'External Donations'}
                  </button>
                  <button 
                    className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap transition-colors ${
                      walletFilter === 'expense' 
                        ? 'bg-[#243D68] text-white' 
                        : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
                    }`}
                    onClick={() => setWalletFilter('expense')}
                  >
                    {language === 'id' ? 'Pengeluaran' : 'Expenses'}
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
                </>
              )}
            </div>
          )}
            </>
          )}
        </div>
      </div>

      {/* Voting Modal */}
      {showVotingModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#243D68] to-[#2B4468] px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FAC06E] rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#243D68] text-xl">how_to_vote</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">Vote Waktu Meeting</h3>
                    <p className="text-xs text-white/80">Pilih waktu yang paling cocok</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowVotingModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <span className="material-symbols-outlined text-white text-xl">close</span>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {hasVoted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0E1B33] mb-2">Vote Berhasil!</h4>
                  <p className="text-sm text-[#6B7280] mb-6">
                    Terima kasih atas partisipasi Anda. Hasil akan diumumkan setelah voting ditutup.
                  </p>
                  <div className="space-y-3">
                    <div className={`p-4 rounded-xl border-2 ${selectedVote === 'senin' ? 'bg-indigo-50 border-indigo-500' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined ${selectedVote === 'senin' ? 'text-indigo-600' : 'text-gray-400'}`}>
                            {selectedVote === 'senin' ? 'check_circle' : 'schedule'}
                          </span>
                          <span className={`font-bold ${selectedVote === 'senin' ? 'text-indigo-900' : 'text-gray-700'}`}>
                            Senin, 10:00 WIB
                          </span>
                        </div>
                        <span className={`text-sm font-black ${selectedVote === 'senin' ? 'text-indigo-600' : 'text-gray-500'}`}>
                          {voteResults.senin} votes
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${selectedVote === 'senin' ? 'bg-indigo-500' : 'bg-gray-400'}`}
                          style={{ width: `${(voteResults.senin / (voteResults.senin + voteResults.selasa)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl border-2 ${selectedVote === 'selasa' ? 'bg-indigo-50 border-indigo-500' : 'bg-gray-50 border-gray-200'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`material-symbols-outlined ${selectedVote === 'selasa' ? 'text-indigo-600' : 'text-gray-400'}`}>
                            {selectedVote === 'selasa' ? 'check_circle' : 'schedule'}
                          </span>
                          <span className={`font-bold ${selectedVote === 'selasa' ? 'text-indigo-900' : 'text-gray-700'}`}>
                            Selasa, 13:00 WIB
                          </span>
                        </div>
                        <span className={`text-sm font-black ${selectedVote === 'selasa' ? 'text-indigo-600' : 'text-gray-500'}`}>
                          {voteResults.selasa} votes
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${selectedVote === 'selasa' ? 'bg-indigo-500' : 'bg-gray-400'}`}
                          style={{ width: `${(voteResults.selasa / (voteResults.senin + voteResults.selasa)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowVotingModal(false)}
                    className="w-full mt-6 bg-[#243D68] text-white py-3 rounded-xl font-bold hover:bg-[#1a2f54] transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-[#6B7280]">Pilih Waktu Meeting</span>
                      <div className="flex items-center gap-1 text-orange-600 text-xs font-bold bg-orange-100 px-2 py-1 rounded-full">
                        <span className="material-symbols-outlined text-xs">schedule</span>
                        <span>5 jam lagi</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => setSelectedVote('senin')}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedVote === 'senin'
                            ? 'bg-indigo-50 border-indigo-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-2xl ${
                              selectedVote === 'senin' ? 'text-indigo-600' : 'text-gray-400'
                            }`}>
                              {selectedVote === 'senin' ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <div>
                              <p className={`font-bold ${selectedVote === 'senin' ? 'text-indigo-900' : 'text-[#0E1B33]'}`}>
                                Senin, 10:00 WIB
                              </p>
                              <p className="text-xs text-[#6B7280]">Morning session</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-black ${selectedVote === 'senin' ? 'text-indigo-600' : 'text-gray-500'}`}>
                              {voteResults.senin} votes
                            </p>
                            <p className="text-xs text-[#6B7280]">
                              {Math.round((voteResults.senin / (voteResults.senin + voteResults.selasa)) * 100)}%
                            </p>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedVote('selasa')}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedVote === 'selasa'
                            ? 'bg-indigo-50 border-indigo-500 shadow-md'
                            : 'bg-white border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className={`material-symbols-outlined text-2xl ${
                              selectedVote === 'selasa' ? 'text-indigo-600' : 'text-gray-400'
                            }`}>
                              {selectedVote === 'selasa' ? 'check_circle' : 'radio_button_unchecked'}
                            </span>
                            <div>
                              <p className={`font-bold ${selectedVote === 'selasa' ? 'text-indigo-900' : 'text-[#0E1B33]'}`}>
                                Selasa, 13:00 WIB
                              </p>
                              <p className="text-xs text-[#6B7280]">Afternoon session</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-sm font-black ${selectedVote === 'selasa' ? 'text-indigo-600' : 'text-gray-500'}`}>
                              {voteResults.selasa} votes
                            </p>
                            <p className="text-xs text-[#6B7280]">
                              {Math.round((voteResults.selasa / (voteResults.senin + voteResults.selasa)) * 100)}%
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowVotingModal(false);
                        setSelectedVote(null);
                      }}
                      className="flex-1 py-3 rounded-xl font-bold text-[#6B7280] bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleVoteSubmit}
                      disabled={!selectedVote}
                      className={`flex-1 py-3 rounded-xl font-bold text-white transition-all ${
                        selectedVote
                          ? 'bg-gradient-to-r from-[#243D68] to-[#2B4468] hover:shadow-lg'
                          : 'bg-gray-300 cursor-not-allowed'
                      }`}
                    >
                      Submit Vote
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===== BOTTOM CTA SECTION ===== */}
      {/* CTA Logic 100% berbasis data (type, isFunding, isVolunteerOpen):
          - open-volunteer: hanya "Join Project" (jika isVolunteerOpen=true)
          - galeri-with-funding: hanya "Donasi Project" (jika isFunding=true)
          - galeri-documentation: tanpa CTA (read-only)
          - campaign: "Donasi Project" + "Join Project" (jika isFunding=true && isVolunteerOpen=true)
      */}
      
      {/* CASE 1: Open Volunteer - Only Join CTA */}
      {projectType === 'open-volunteer' && isVolunteerOpen && !isProjectMember && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-[#E5E7EB] px-4 md:px-6 lg:px-8 py-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="max-w-4xl mx-auto">
            {applicationStatus === 'none' ? (
              <button 
                onClick={() => setShowJoinModal(true)}
                className="w-full flex items-center justify-center gap-3 rounded-full h-14 bg-[#243D68] text-white text-base font-bold tracking-widest shadow-[0px_6px_0px_0px_#FAC06E] hover:shadow-[0px_8px_0px_0px_#FAC06E] hover:-translate-y-0.5 active:shadow-[0px_2px_0px_0px_#FAC06E] active:translate-y-1 transition-all uppercase"
              >
                <UserPlus className="w-6 h-6" />
                <span>Join Project</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#FFF9F0] border-2 border-[#FAC06E] rounded-xl">
                  <div className="w-10 h-10 bg-[#FAC06E] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68] text-xl">pending</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#243D68]">{language === 'id' ? 'Pengajuan Tertunda' : 'Application Pending'}</p>
                    <p className="text-xs text-[#6B7280]">{t.projectDetailDonatur.applicationPendingDesc}</p>
                  </div>
                </div>
                {/* Debug button - simulate PIC approval (remove in production) */}
                <button
                  onClick={handleApproveApplication}
                  className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
                  title="Simulasi: Approve oleh PIC"
                >
                  ✓ Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CASE 2: Galeri with Funding - Only Donation CTA */}
      {projectType === 'galeri-with-funding' && isFunding && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-[#E5E7EB] px-4 md:px-6 lg:px-8 py-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="max-w-4xl mx-auto">
            <button 
              className="w-full flex items-center justify-center gap-3 rounded-full h-14 bg-[#FAC06E] text-[#243D68] text-base font-bold tracking-widest shadow-[0px_6px_0px_0px_#243D68] hover:shadow-[0px_8px_0px_0px_#243D68] hover:-translate-y-0.5 active:shadow-[0px_2px_0px_0px_#243D68] active:translate-y-1 transition-all uppercase"
            >
              <HandHeart className="w-6 h-6" />
              <span>{language === 'id' ? 'Donasi Project' : 'Donate to Project'}</span>
            </button>
          </div>
        </div>
      )}

      {/* CASE 3: Campaign - Dual CTA (Donation + Join) */}
      {projectType === 'campaign' && (isFunding || isVolunteerOpen) && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-[#E5E7EB] px-4 md:px-6 lg:px-8 py-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="max-w-4xl mx-auto">
            {!isProjectMember && applicationStatus === 'none' ? (
              <div className="flex flex-row gap-3 sm:gap-6">
                {/* Donation Button - Stacked Text */}
                {isFunding && (
                  <button 
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-4 rounded-2xl min-h-[60px] sm:min-h-[68px] bg-[#FAC06E] text-[#243D68] shadow-[0px_4px_0px_0px_#FBECC5] sm:shadow-[0px_6px_0px_0px_#FBECC5] hover:shadow-[0px_6px_0px_0px_#FBECC5] hover:-translate-y-0.5 active:shadow-[0px_2px_0px_0px_#FBECC5] active:translate-y-1 transition-all group"
                  >
                    <HandHeart className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.5px] group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col items-start leading-none gap-0.5">
                      <span className="text-xs sm:text-sm font-extrabold tracking-wide">{language === 'id' ? 'Donasi' : 'Donate'}</span>
                      <span className="text-xs sm:text-sm font-extrabold tracking-wide">Project</span>
                    </div>
                  </button>
                )}
                
                {/* Join Project Button - Single Line */}
                {isVolunteerOpen && (
                  <button 
                    onClick={() => setShowJoinModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 sm:gap-3 rounded-2xl min-h-[60px] sm:min-h-[68px] bg-[#243D68] text-white shadow-[0px_4px_0px_0px_#4A6085] sm:shadow-[0px_6px_0px_0px_#4A6085] hover:shadow-[0px_6px_0px_0px_#4A6085] hover:-translate-y-0.5 active:shadow-[0px_2px_0px_0px_#4A6085] active:translate-y-1 transition-all group"
                  >
                    <UserPlus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5px] group-hover:scale-110 transition-transform" />
                    <span className="text-sm sm:text-lg font-bold tracking-wide">Join Project</span>
                  </button>
                )}
              </div>
            ) : applicationStatus === 'pending' && isVolunteerOpen ? (
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#FFF9F0] border-2 border-[#FAC06E] rounded-xl">
                  <div className="w-10 h-10 bg-[#FAC06E] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68] text-xl">pending</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#243D68]">{language === 'id' ? 'Pengajuan Tertunda' : 'Application Pending'}</p>
                    <p className="text-xs text-[#6B7280]">{t.projectDetailDonatur.applicationPendingDesc}</p>
                  </div>
                </div>
                <button
                  onClick={handleApproveApplication}
                  className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-sm transition-colors whitespace-nowrap"
                  title="Simulasi: Approve oleh PIC"
                >
                  ✓ Approve
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* CASE 4: Galeri Documentation - No CTA (read-only) */}
      {/* projectType === 'galeri-documentation' → No CTA rendered */}

      {/* Modal: Join Project Form */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={() => setShowJoinModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-5 flex items-center justify-between z-10 rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-[#0E1B33]">{language === 'id' ? 'Ajukan Bergabung' : 'Apply to Join'}</h3>
                <p className="text-xs text-[#6B7280] mt-1">{language === 'id' ? 'Isi form komitmen untuk bergabung dengan project' : 'Fill in the commitment form to join the project'}</p>
              </div>
              <button onClick={() => setShowJoinModal(false)} className="p-1 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Available Position Dropdown */}
              <div>
                <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                  {language === 'id' ? 'Pilih Posisi' : 'Select Position'} <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68] text-sm bg-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                  }}
                >
                  <option value="">{language === 'id' ? '-- Pilih Posisi yang Diminati --' : '-- Select Preferred Position --'}</option>
                  {availablePositions.map((position) => (
                    <option key={position.id} value={position.id}>
                      {position.title} ({position.slots} {position.slots === 1 ? 'posisi' : 'posisi'} tersedia)
                    </option>
                  ))}
                </select>
                {availablePositions.length === 0 && (
                  <p className="text-xs text-[#6B7280] mt-2">
                    Tidak ada posisi tersedia saat ini
                  </p>
                )}
              </div>

              {/* Commitment Duration */}
              <div>
                <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                  {t.projectDetailDonatur.commitmentDuration} <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="duration"
                      value="1-month"
                      checked={commitmentDuration === '1-month'}
                      onChange={(e) => setCommitmentDuration(e.target.value)}
                      className="w-4 h-4 text-[#243D68] focus:ring-[#243D68]"
                    />
                    <span className="text-sm font-medium text-[#0E1B33]">{t.projectDetailDonatur.month1}</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="duration"
                      value="3-months"
                      checked={commitmentDuration === '3-months'}
                      onChange={(e) => setCommitmentDuration(e.target.value)}
                      className="w-4 h-4 text-[#243D68] focus:ring-[#243D68]"
                    />
                    <span className="text-sm font-medium text-[#0E1B33]">{t.projectDetailDonatur.months3}</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="duration"
                      value="6-months"
                      checked={commitmentDuration === '6-months'}
                      onChange={(e) => setCommitmentDuration(e.target.value)}
                      className="w-4 h-4 text-[#243D68] focus:ring-[#243D68]"
                    />
                    <span className="text-sm font-medium text-[#0E1B33]">{t.projectDetailDonatur.months6}</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="duration"
                      value="1-year"
                      checked={commitmentDuration === '1-year'}
                      onChange={(e) => setCommitmentDuration(e.target.value)}
                      className="w-4 h-4 text-[#243D68] focus:ring-[#243D68]"
                    />
                    <span className="text-sm font-medium text-[#0E1B33]">{t.projectDetailDonatur.year1}</span>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-[#E5E7EB] rounded-xl hover:bg-[#F8F9FA] cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="duration"
                      value="custom"
                      checked={commitmentDuration === 'custom'}
                      onChange={(e) => setCommitmentDuration(e.target.value)}
                      className="w-4 h-4 text-[#243D68] focus:ring-[#243D68]"
                    />
                    <span className="text-sm font-medium text-[#0E1B33]">Custom</span>
                  </label>
                  
                  {commitmentDuration === 'custom' && (
                    <input
                      type="text"
                      value={customDuration}
                      onChange={(e) => setCustomDuration(e.target.value)}
                      placeholder="Contoh: 6 bulan, 2 tahun, dll"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68] text-sm ml-7"
                    />
                  )}
                </div>
              </div>

              {/* Reason to Join */}
              <div>
                <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                  {language === 'id' ? 'Alasan Ingin Bergabung' : 'Reason to Join'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={joinReason}
                  onChange={(e) => setJoinReason(e.target.value)}
                  placeholder="Jelaskan mengapa Anda tertarik bergabung dengan project ini, skill yang bisa Anda kontribusikan, dan ekspektasi Anda..."
                  rows={5}
                  className="w-full px-4 py-3 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#243D68]/20 focus:border-[#243D68] text-sm resize-none"
                />
              </div>

              {/* Info Box */}
              <div className="bg-[#FFF9F0] border border-[#FAC06E]/30 rounded-xl p-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-[#FAC06E] flex-shrink-0">info</span>
                  <div>
                    <p className="text-xs font-semibold text-[#243D68] mb-1">{language === 'id' ? 'Catatan Penting' : 'Important Note'}</p>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      {language === 'id' ? 'Pengajuan Anda akan direview oleh PIC project. Setelah disetujui, Anda akan mendapatkan akses penuh ke fitur Diskusi dan Wallet untuk berkolaborasi dengan tim.' : 'Your application will be reviewed by the project PIC. Once approved, you will get full access to Discussion and Wallet features to collaborate with the team.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="flex-1 px-4 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-xl font-semibold hover:bg-[#F8F9FA] transition-colors"
                >
                  {language === 'id' ? 'Batal' : 'Cancel'}
                </button>
                <button
                  onClick={handleJoinSubmit}
                  className="flex-1 px-4 py-3 bg-[#243D68] text-white rounded-xl font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  {t.projectDetailDonatur.submitApplication}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}