import { useState } from 'react';
import { toast } from 'sonner';
import { Logo } from './Logo';
import type { JoinRequest } from '@/types';

export interface AvailablePosition {
  id: string;
  title: string;
  slots: number;
}

interface ProjectDetailAlumniProps {
  hasJoinedProjects?: boolean; // NEW: Indicate if alumni has joined any projects
  projectImageUrl?: string; // Project cover image
  availablePositions?: AvailablePosition[]; // NEW: Available positions for the project
  onBack: () => void;
  initialTab?: 'overview' | 'progress' | 'team' | 'wallet';
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  activeNav?: string;
  onJoinRequestSubmitted?: (joinRequest: JoinRequest) => void; // NEW: Handler for join request submission
}

export function ProjectDetailAlumni({ 
  hasJoinedProjects = false, // NEW: Default false
  projectImageUrl,
  availablePositions = [],
  onBack, 
  initialTab = 'overview',
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  onLogout,
  activeNav = 'home',
  onJoinRequestSubmitted
}: ProjectDetailAlumniProps) {
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
    console.log('🚀 Join Submit Started');
    console.log('Selected Position:', selectedPosition);
    console.log('Commitment Duration:', commitmentDuration);
    console.log('Join Reason:', joinReason);
    console.log('Available Positions:', availablePositions);
    
    // Validations
    if (!selectedPosition) {
      toast.error('Pilih posisi yang ingin Anda apply');
      return;
    }
    if (!joinReason.trim()) {
      toast.error('Alasan bergabung harus diisi');
      return;
    }
    if (commitmentDuration === 'custom' && !customDuration.trim()) {
      toast.error('Mohon isi durasi komitmen custom');
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
      projectId: 'current-project-id', // In real app, get from project data
      projectTitle: 'Bantuan Pangan Gaza', // In real app, get from project data
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
    
    toast.success('Pengajuan berhasil dikirim!', {
      description: 'Menunggu persetujuan dari PIC project',
      duration: 4000,
    });
    
    console.log('✅ Join Submit Completed');
  };

  const handleApproveApplication = () => {
    // Simulate PIC approval
    setApplicationStatus('approved');
    setIsProjectMember(true);
    setActiveTab('discussion');
    toast.success('Selamat! Anda diterima di project ini', {
      description: 'Akses penuh ke Diskusi dan Wallet sudah tersedia',
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
                <span className="tracking-wide text-sm">Home</span>
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
                <span className="tracking-wide text-sm">Explore</span>
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
                <span className="tracking-wide text-sm">Pesan</span>
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
                <span className="tracking-wide text-sm">Settings</span>
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
              <span className="tracking-wide text-sm">Logout</span>
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
              className="w-full flex flex-col justify-end overflow-hidden rounded-2xl min-h-[180px] p-4 relative shadow-lg"
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
            </div>
          </div>

          {/* Title */}
          <div className="px-4 md:px-6 lg:px-8 pb-4">
            <h1 className="text-[#333333] tracking-normal text-xl md:text-2xl lg:text-3xl font-['Archivo_Black'] leading-tight uppercase">
              Pengembangan Aplikasi AlumniConnect
            </h1>
          </div>

          {/* Tabs */}
          <div className="sticky top-[73px] z-10 bg-white border-b border-[#E5E7EB] shadow-sm overflow-x-auto scrollbar-hide">
            <div className="flex items-center justify-start min-w-full px-2 md:px-6 lg:px-8">
              {([
                { key: 'overview' as const, label: 'Overview' },
                { key: 'progress' as const, label: 'Progress' },
                { key: 'team' as const, label: 'Team' },
                { key: 'wallet' as const, label: 'Wallet' },
              ]).map((tab) => (
                <button
                  key={tab.key}
                  className={`text-center font-semibold transition-colors whitespace-nowrap flex-shrink-0 ${ activeTab === tab.key ? 'text-[#243D68] border-b-2 border-[#243D68]' : 'text-[#6B7280] hover:text-[#333333]' } text-[15px] px-[18px] py-[12px]`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Other tabs... */}
          {activeTab === 'overview' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
              {/* Description & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#F8F9FA] rounded-xl p-5 border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 bg-[#FAC06E] rounded-lg px-3 py-2 shadow-sm">
                    <span className="material-symbols-outlined text-white">description</span>
                    Deskripsi Proyek
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

            </div>
          )}
          
          {activeTab === 'progress' && (
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-6">
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
                    Tim Inti
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

              {/* Posisi Tersedia */}
              {availablePositions.length > 0 && (
                <div className="bg-[#FFF9F0] rounded-xl p-5 border border-[#FAC06E]/20 shadow-sm">
                  <h3 className="text-sm font-bold text-[#243D68] mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#FAC06E]">work</span>
                    Posisi Masih Tersedia
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availablePositions.map((pos) => (
                      <div key={pos.id} className="flex items-center justify-between bg-white rounded-lg px-3.5 py-2.5 border border-[#FAC06E]/15">
                        <span className="text-sm text-[#333333] font-medium">{pos.title}</span>
                        <span className="text-xs text-[#FAC06E] font-bold bg-[#FFF3E0] px-2 py-0.5 rounded-full">{pos.slots} slot</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                          Bergabung untuk Akses Penuh
                        </h4>
                        <p className="text-[#6B7280] text-sm leading-relaxed">
                          Klik tombol <span className="font-semibold text-[#243D68]">"Join Project"</span> di bawah untuk mengajukan diri bergabung. Setelah diterima oleh PIC, Anda akan mendapatkan akses ke fitur <span className="font-semibold text-[#243D68]">Diskusi</span> dan <span className="font-semibold text-[#243D68]">Wallet</span> untuk berkolaborasi dengan tim.
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
                </>
              )}
            </div>
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

      {/* Fixed Join Project Button - Only visible if user is not a project member */}
      {!isProjectMember && (
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-[#E5E7EB] px-4 md:px-6 lg:px-8 py-4 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
          <div className="max-w-4xl mx-auto">
            {applicationStatus === 'none' ? (
              <button 
                onClick={() => setShowJoinModal(true)}
                className="w-full flex items-center justify-center gap-3 rounded-xl h-14 bg-gradient-to-r from-[#243D68] to-[#30518B] text-white text-base font-bold leading-normal tracking-widest shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] hover:shadow-[8px_8px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase"
              >
                <span className="material-symbols-outlined text-2xl">group_add</span>
                <span>Join Project</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#FFF9F0] border-2 border-[#FAC06E] rounded-xl">
                  <div className="w-10 h-10 bg-[#FAC06E] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#243D68] text-xl">pending</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#243D68]">Pengajuan Tertunda</p>
                    <p className="text-xs text-[#6B7280]">Menunggu persetujuan dari PIC</p>
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

      {/* Modal: Join Project Form */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={() => setShowJoinModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-5 flex items-center justify-between z-10 rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-[#0E1B33]">Ajukan Bergabung</h3>
                <p className="text-xs text-[#6B7280] mt-1">Isi form komitmen untuk bergabung dengan project</p>
              </div>
              <button onClick={() => setShowJoinModal(false)} className="p-1 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Available Position Dropdown */}
              <div>
                <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                  Pilih Posisi <span className="text-red-500">*</span>
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
                  <option value="">-- Pilih Posisi yang Diminati --</option>
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
                  Durasi Komitmen <span className="text-red-500">*</span>
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
                    <span className="text-sm font-medium text-[#0E1B33]">1 Bulan</span>
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
                    <span className="text-sm font-medium text-[#0E1B33]">3 Bulan</span>
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
                    <span className="text-sm font-medium text-[#0E1B33]">6 Bulan</span>
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
                    <span className="text-sm font-medium text-[#0E1B33]">1 Tahun</span>
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
                  Alasan Ingin Bergabung <span className="text-red-500">*</span>
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
                    <p className="text-xs font-semibold text-[#243D68] mb-1">Catatan Penting</p>
                    <p className="text-xs text-[#6B7280] leading-relaxed">
                      Pengajuan Anda akan direview oleh PIC project. Setelah disetujui, Anda akan mendapatkan akses penuh ke fitur Diskusi dan Wallet untuk berkolaborasi dengan tim.
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
                  Batal
                </button>
                <button
                  onClick={handleJoinSubmit}
                  className="flex-1 px-4 py-3 bg-[#243D68] text-white rounded-xl font-semibold hover:bg-[#1a2d4d] transition-colors"
                >
                  Kirim Pengajuan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}