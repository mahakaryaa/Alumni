import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Logo } from './Logo';

interface MessagesAlumniProps {
  hasJoinedProjects: boolean; // New prop
  onBack: () => void;
  onNavigateToProject?: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  activeNav?: string;
}

export function MessagesAlumni({ 
  hasJoinedProjects,
  onBack, 
  onNavigateToProject,
  onNavigateHome,
  onNavigateExplore,
  onNavigateMessages,
  onNavigateSettings,
  onLogout,
  activeNav = 'pesan'
}: MessagesAlumniProps) {
  const { language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'chats' | 'teams' | 'tasks' | 'voting'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [votedPolls, setVotedPolls] = useState<{ [key: number]: number }>({}); // Store poll id and selected option id

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Tim Dauroh Online Almaqdisi',
      lastMessage: 'Budi: Jadwal kajian minggu depan sudah fix',
      time: '2 mnt',
      unread: 3,
      avatar: '👥',
      type: 'team',
      online: true
    },
    {
      id: 2,
      name: 'Edukasi @baitulmaqdishub',
      lastMessage: 'Siti: Konten Instagram untuk besok sudah siap',
      time: '15 mnt',
      unread: 1,
      avatar: '👥',
      type: 'team',
      online: true
    },
    {
      id: 3,
      name: 'Budi Hartono',
      lastMessage: 'Oke, nanti saya cek dulu',
      time: '1 jam',
      unread: 0,
      avatar: 'BH',
      type: 'personal',
      online: true
    },
    {
      id: 4,
      name: 'Buku Tentang Baitul Maqdis',
      lastMessage: 'Kamu: Terima kasih feedbacknya!',
      time: '3 jam',
      unread: 0,
      avatar: '📚',
      type: 'team',
      online: false
    },
    {
      id: 5,
      name: 'Siti Aminah',
      lastMessage: 'File presentasinya sudah di-upload',
      time: 'Kemarin',
      unread: 0,
      avatar: 'SA',
      type: 'personal',
      online: false
    }
  ];

  // Mock data for teams
  const teams = [
    {
      id: 1,
      name: 'Dauroh Online Almaqdisi',
      members: 24,
      progress: 75,
      icon: 'play_lesson',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Edukasi @baitulmaqdishub',
      members: 18,
      progress: 60,
      icon: 'campaign',
      color: 'green'
    },
    {
      id: 3,
      name: 'Buku Tentang Baitul Maqdis',
      members: 12,
      progress: 45,
      icon: 'menu_book',
      color: 'purple'
    }
  ];

  // Mock data for tasks
  const tasks = [
    {
      id: 1,
      title: 'Persiapan Materi Kajian Sejarah',
      project: 'Dauroh Online Almaqdisi',
      dueDate: 'Hari ini',
      priority: 'high',
      assignedBy: 'Tim Kurikulum'
    },
    {
      id: 2,
      title: 'Buat Konten Instagram & TikTok',
      project: 'Edukasi @baitulmaqdishub',
      dueDate: 'Besok',
      priority: 'high',
      assignedBy: 'Content Manager'
    },
    {
      id: 3,
      title: 'Review Draft Bab 3',
      project: 'Buku Tentang Baitul Maqdis',
      dueDate: '2 hari lagi',
      priority: 'medium',
      assignedBy: 'Editor'
    }
  ];

  // Mock data for polls
  const [pollsData, setPollsData] = useState([
    {
      id: 1,
      question: 'Waktu live streaming kajian yang paling cocok?',
      creator: 'Budi Hartono',
      project: 'Dauroh Online Almaqdisi',
      createdAt: '2 jam lalu',
      deadline: 'Besok, 17:00',
      status: 'active',
      totalVotes: 15,
      options: [
        { id: 1, text: 'Senin pagi (09:00-11:00)', votes: 5 },
        { id: 2, text: 'Rabu sore (14:00-16:00)', votes: 8 },
        { id: 3, text: 'Jumat sore (15:00-17:00)', votes: 2 }
      ]
    },
    {
      id: 2,
      question: 'Pilih topik diskusi minggu ini:',
      creator: 'Siti Aminah',
      project: 'Edukasi @baitulmaqdishub',
      createdAt: '5 jam lalu',
      deadline: '2 hari lagi',
      status: 'active',
      totalVotes: 23,
      options: [
        { id: 1, text: 'Pengembangan Produk', votes: 12 },
        { id: 2, text: 'Strategi Pemasaran Digital', votes: 7 },
        { id: 3, text: 'Pengembangan Tim & Leadership', votes: 4 }
      ]
    },
    {
      id: 3,
      question: 'Budget prioritas untuk Q2 2026?',
      creator: 'Ahmad Fauzi',
      project: 'Buku Tentang Baitul Maqdis',
      createdAt: 'Kemarin',
      deadline: '3 hari lagi',
      status: 'active',
      totalVotes: 18,
      options: [
        { id: 1, text: 'Infrastruktur & Tools', votes: 9 },
        { id: 2, text: 'Marketing & Branding', votes: 5 },
        { id: 3, text: 'Training & Development', votes: 4 }
      ]
    },
    {
      id: 4,
      question: 'Platform komunikasi utama tim?',
      creator: 'Design Team',
      project: 'General',
      createdAt: '3 hari lalu',
      deadline: 'Sudah ditutup',
      status: 'closed',
      totalVotes: 45,
      options: [
        { id: 1, text: 'Slack', votes: 28 },
        { id: 2, text: 'Discord', votes: 12 },
        { id: 3, text: 'Microsoft Teams', votes: 5 }
      ]
    }
  ]);

  const handleVote = (pollId: number, optionId: number) => {
    // Prevent multiple votes on same poll
    if (votedPolls[pollId] !== undefined) {
      return;
    }

    // Update local vote state immediately
    setVotedPolls(prev => ({ ...prev, [pollId]: optionId }));
    
    // Update poll data immediately
    setPollsData(prev => prev.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          totalVotes: poll.totalVotes + 1,
          options: poll.options.map(option => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes
          }))
        };
      }
      return poll;
    }));
  };

  // Mock data - Pengumuman untuk alumni yang belum join project
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
      title: 'Bergabunglah dalam Project Alumni',
      message: 'Jadilah bagian dari gerakan edukasi Baitul Maqdis! Join project alumni untuk berkontribusi dalam dakwah dan solidaritas untuk Gaza dan Palestina.',
      date: '12 Jan 2026',
      icon: 'groups',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

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
                } w-full relative`}
                onClick={onNavigateMessages}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
                {tasks.filter(t => t.priority === 'high').length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {tasks.filter(t => t.priority === 'high').length}
                  </span>
                )}
              </button>

              <button
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${
                  activeNav === 'settings' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                } w-full`}
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
              onClick={onLogout}
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
        <div className="sticky top-0 z-20 bg-white border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center px-4 md:px-6 lg:px-8 py-4 justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="cursor-pointer hover:bg-[#F8F9FA] rounded-lg p-1.5 transition-colors flex items-center justify-center lg:hidden">
                <span className="material-symbols-outlined text-[#243D68] text-[24px]">arrow_back</span>
              </button>
              <div>
                <h2 className="text-[#0E1B33] text-lg font-bold leading-tight tracking-tight">
                  Pesan
                </h2>
              </div>
            </div>
          </div>

          {/* Tabs - Only show when hasJoinedProjects is true */}
          {hasJoinedProjects && (
            <div className="flex border-b border-[#E5E7EB] px-4 md:px-6 lg:px-8">
              <button
                onClick={() => setActiveTab('voting')}
                className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                  activeTab === 'voting'
                    ? 'text-[#243D68]'
                    : 'text-[#6B7280] hover:text-[#243D68]'
                }`}
              >
                Voting
                {activeTab === 'voting' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                  activeTab === 'tasks'
                    ? 'text-[#243D68]'
                    : 'text-[#6B7280] hover:text-[#243D68]'
                }`}
              >
                Tasks
                {tasks.filter(t => t.priority === 'high').length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {tasks.filter(t => t.priority === 'high').length}
                  </span>
                )}
                {activeTab === 'tasks' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('chats')}
                className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                  activeTab === 'chats'
                    ? 'text-[#243D68]'
                    : 'text-[#6B7280] hover:text-[#243D68]'
                }`}
              >
                Chats
                {conversations.filter(c => c.unread > 0).length > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {conversations.filter(c => c.unread > 0).length}
                  </span>
                )}
                {activeTab === 'chats' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                  activeTab === 'teams'
                    ? 'text-[#243D68]'
                    : 'text-[#6B7280] hover:text-[#243D68]'
                }`}
              >
                Teams
                {activeTab === 'teams' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pb-24 overflow-y-auto">
          {!hasJoinedProjects ? (
            /* Pengumuman - Alumni Belum Join Project */
            <div className="px-4 md:px-6 lg:px-8 py-6 space-y-8 max-w-4xl mx-auto w-full">
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-3xl text-[#243D68]">campaign</span>
                <h3 className="text-xl font-bold text-[#0E1B33]">Pengumuman</h3>
              </div>

              {/* Announcements List */}
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-white rounded-xl p-5 border border-[#E5E7EB] hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className={`shrink-0 w-12 h-12 ${announcement.bgColor} rounded-xl flex items-center justify-center`}>
                        <span className={`material-symbols-outlined ${announcement.color} text-2xl`}>
                          {announcement.icon}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 gap-3">
                          <h4 className="font-bold text-[#0E1B33] text-base">{announcement.title}</h4>
                          <span className="text-xs text-[#6B7280] whitespace-nowrap">
                            {announcement.date}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280] leading-relaxed">{announcement.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Card - Join Project */}
              <div className="bg-gradient-to-r from-[#243D68] to-[#1a2d4d] rounded-2xl p-6 text-white shadow-lg">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-2xl text-[#FAC06E]">groups</span>
                      <h4 className="font-bold text-lg">Bergabung dengan Project Alumni</h4>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed">
                      Buka akses ke fitur kolaborasi lengkap: chat tim, voting, task management, dan berkontribusi untuk Baitul Maqdis & Palestina.
                    </p>
                  </div>
                  <button
                    onClick={onNavigateExplore}
                    className="shrink-0 bg-[#FAC06E] text-[#243D68] font-bold py-3 px-6 rounded-xl hover:bg-[#f5b855] transition-all flex items-center gap-2 shadow-md"
                  >
                    <span className="material-symbols-outlined">explore</span>
                    <span>Explore Project</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Search Bar */}
              <div className="px-4 md:px-6 lg:px-8 pt-4 pb-4 bg-[#F8F9FA]">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] text-xl">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder={`Cari ${activeTab === 'chats' ? 'percakapan' : activeTab === 'teams' ? 'tim' : 'tugas'}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 rounded-lg border border-[#E5E7EB] bg-white text-[#0E1B33] placeholder-[#6B7280] focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] transition-all outline-none text-sm"
                  />
                </div>
              </div>

              {/* Tab Content */}
              <div className="px-4 md:px-6 lg:px-8 pb-6">
                {/* Chats Tab */}
                {activeTab === 'chats' && (
                  <div className="space-y-1">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-[#E5E7EB] hover:border-[#243D68]/20"
                      >
                        <div className="flex items-start gap-3">
                          {/* Avatar */}
                          <div className="relative shrink-0">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                              conv.type === 'team' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-[#FAC06E] text-[#243D68]'
                            }`}>
                              {conv.avatar}
                            </div>
                            {conv.online && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-bold text-[#0E1B33] text-sm truncate">{conv.name}</h3>
                              <span className="text-xs text-[#6B7280] shrink-0">{conv.time}</span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm text-[#6B7280] truncate">{conv.lastMessage}</p>
                              {conv.unread > 0 && (
                                <span className="bg-[#243D68] text-white text-xs font-bold px-2 py-0.5 rounded-full shrink-0">
                                  {conv.unread}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Teams Tab */}
                {activeTab === 'teams' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        onClick={onNavigateToProject}
                        className="bg-white rounded-lg p-5 hover:shadow-lg transition-all cursor-pointer border border-[#E5E7EB] hover:border-[#243D68]/20"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            team.color === 'blue' ? 'bg-blue-100' :
                            team.color === 'green' ? 'bg-green-100' :
                            'bg-purple-100'
                          }`}>
                            <span className={`material-symbols-outlined text-2xl ${
                              team.color === 'blue' ? 'text-blue-600' :
                              team.color === 'green' ? 'text-green-600' :
                              'text-purple-600'
                            }`}>{team.icon}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            team.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            team.color === 'green' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {team.progress}%
                          </span>
                        </div>
                        <h3 className="font-bold text-[#0E1B33] text-base mb-2">{team.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
                          <span className="material-symbols-outlined text-lg">group</span>
                          <span>{team.members} anggota</span>
                        </div>
                        <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all ${
                              team.color === 'blue' ? 'bg-blue-600' :
                              team.color === 'green' ? 'bg-green-600' :
                              'bg-purple-600'
                            }`}
                            style={{ width: `${team.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tasks Tab */}
                {activeTab === 'tasks' && (
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-[#E5E7EB] hover:border-[#243D68]/20"
                      >
                        {/* Priority Indicator Bar */}
                        <div className={`h-1.5 ${
                          task.priority === 'high' 
                            ? 'bg-gradient-to-r from-red-500 to-red-600' 
                            : 'bg-gradient-to-r from-amber-400 to-amber-500'
                        }`}></div>
                        
                        <div className="p-5">
                          {/* Header Section */}
                          <div className="flex items-start justify-between gap-3 mb-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-[#0E1B33] text-base mb-1 leading-tight">{task.title}</h3>
                              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                                <span className="material-symbols-outlined text-sm">folder</span>
                                <span className="font-medium">{task.project}</span>
                              </div>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 shadow-sm ${
                              task.priority === 'high'
                                ? 'bg-red-500 text-white'
                                : 'bg-amber-500 text-white'
                            }`}>
                              {task.priority === 'high' ? 'High' : 'Medium'}
                            </span>
                          </div>
                          
                          {/* Due Date Section */}
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-4 ${
                            task.priority === 'high' 
                              ? 'bg-red-50' 
                              : 'bg-amber-50'
                          }`}>
                            <span className={`material-symbols-outlined text-lg ${
                              task.priority === 'high' 
                                ? 'text-red-600' 
                                : 'text-amber-600'
                            }`}>schedule</span>
                            <span className={`text-sm font-semibold ${
                              task.priority === 'high' 
                                ? 'text-red-700' 
                                : 'text-amber-700'
                            }`}>
                              {task.dueDate}
                            </span>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#243D68] to-[#1a2d4d] text-white py-2.5 px-4 rounded-lg text-sm font-bold hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all">
                              <span className="material-symbols-outlined text-lg">play_circle</span>
                              <span>Kerjakan</span>
                            </button>
                            <button className="px-5 py-2.5 border-2 border-[#243D68] text-[#243D68] rounded-lg text-sm font-bold hover:bg-[#243D68] hover:text-white transition-all">
                              Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Empty state if no tasks */}
                    {tasks.length === 0 && (
                      <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F8F9FA] flex items-center justify-center">
                          <span className="material-symbols-outlined text-5xl text-[#D1D5DB]">task_alt</span>
                        </div>
                        <h3 className="font-bold text-[#0E1B33] text-base mb-1">Tidak Ada Tugas</h3>
                        <p className="text-[#6B7280] text-sm">Semua tugas sudah selesai. Bagus!</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Voting Tab */}
                {activeTab === 'voting' && (
                  <div className="space-y-4">
                    {pollsData.map((poll) => {
                      const hasVoted = votedPolls[poll.id] !== undefined;
                      const isActive = poll.status === 'active';
                      
                      return (
                        <div
                          key={poll.id}
                          className="bg-white rounded-lg p-5 border border-[#E5E7EB]"
                        >
                          {/* Poll Header */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="material-symbols-outlined text-[#243D68] text-lg">
                                  {poll.status === 'active' ? 'poll' : 'check_circle'}
                                </span>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  poll.status === 'active' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {poll.status === 'active' 
                                    ? (language === 'id' ? 'Aktif' : 'Active') 
                                    : (language === 'id' ? 'Ditutup' : 'Closed')}
                                </span>
                              </div>
                              <h3 className="font-bold text-[#0E1B33] text-base mb-2">{poll.question}</h3>
                              <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                                <div className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-sm">person</span>
                                  <span>{poll.creator}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="material-symbols-outlined text-sm">folder</span>
                                  <span>{poll.project}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Poll Stats */}
                          <div className="flex items-center gap-4 mb-4 pb-3 border-b border-[#E5E7EB]">
                            <div className="flex items-center gap-1 text-sm">
                              <span className="material-symbols-outlined text-[#6B7280] text-lg">how_to_vote</span>
                              <span className="text-[#0E1B33] font-semibold">{poll.totalVotes}</span>
                              <span className="text-[#6B7280]">suara</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <span className="material-symbols-outlined text-[#6B7280] text-lg">schedule</span>
                              <span className="text-[#6B7280]">{poll.deadline}</span>
                            </div>
                          </div>

                          {/* Poll Options */}
                          <div className="space-y-3">
                            {poll.options.map((option) => {
                              const percentage = poll.totalVotes > 0 
                                ? Math.round((option.votes / poll.totalVotes) * 100) 
                                : 0;
                              const isSelected = votedPolls[poll.id] === option.id;

                              return (
                                <div key={option.id} className="space-y-2">
                                  {/* Option Button/Display */}
                                  {!hasVoted && isActive ? (
                                    // Voting mode - clickable button
                                    <button
                                      onClick={() => handleVote(poll.id, option.id)}
                                      className="w-full text-left px-4 py-3 rounded-lg border-2 border-[#E5E7EB] bg-white hover:border-[#243D68] hover:bg-[#F8F9FA] transition-all group"
                                    >
                                      <div className="flex items-center justify-between">
                                        <span className="font-semibold text-[#0E1B33] text-sm group-hover:text-[#243D68]">
                                          {option.text}
                                        </span>
                                        <span className="material-symbols-outlined text-[#6B7280] group-hover:text-[#243D68]">
                                          radio_button_unchecked
                                        </span>
                                      </div>
                                    </button>
                                  ) : (
                                    // Results mode - show results
                                    <div className={`px-4 py-3 rounded-lg ${
                                      isSelected 
                                        ? 'bg-[#243D68]/5 border-2 border-[#243D68]' 
                                        : 'bg-[#F8F9FA] border-2 border-transparent'
                                    }`}>
                                      <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                          <span className={`font-semibold text-sm ${
                                            isSelected ? 'text-[#243D68]' : 'text-[#0E1B33]'
                                          }`}>
                                            {option.text}
                                          </span>
                                          {isSelected && (
                                            <span className="material-symbols-outlined text-[#243D68] text-lg">
                                              check_circle
                                            </span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-bold text-[#243D68]">
                                            {percentage}%
                                          </span>
                                          <span className="text-xs text-[#6B7280]">
                                            ({option.votes} suara)
                                          </span>
                                        </div>
                                      </div>
                                      {/* Progress Bar */}
                                      <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                                        <div 
                                          className={`h-2 rounded-full transition-all duration-500 ${
                                            isSelected ? 'bg-[#243D68]' : 'bg-[#FAC06E]'
                                          }`}
                                          style={{ width: `${percentage}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Submit Info */}
                          {!hasVoted && isActive && (
                            <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                              <p className="text-xs text-[#6B7280] text-center">
                                Klik salah satu pilihan untuk memberikan suara
                              </p>
                            </div>
                          )}

                          {/* Already Voted Info */}
                          {hasVoted && isActive && (
                            <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                              <div className="flex items-center justify-center gap-2 text-green-600">
                                <span className="material-symbols-outlined text-lg">check_circle</span>
                                <p className="text-xs font-semibold">Suara Anda telah tercatat</p>
                              </div>
                            </div>
                          )}

                          {/* Poll Closed Info */}
                          {!isActive && (
                            <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
                              <div className="flex items-center justify-center gap-2 text-[#6B7280]">
                                <span className="material-symbols-outlined text-lg">lock</span>
                                <p className="text-xs font-semibold">
                                  {language === 'id' ? 'Polling ini sudah ditutup' : 'This poll is closed'}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Empty state if no polls */}
                    {pollsData.length === 0 && (
                      <div className="text-center py-12">
                        <span className="material-symbols-outlined text-6xl text-[#E5E7EB] mb-3">poll</span>
                        <p className="text-[#6B7280] text-sm">Tidak ada polling saat ini</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}