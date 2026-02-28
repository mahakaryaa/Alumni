import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Logo } from './Logo';
import type { EventRegistration } from '@/types';

interface MessagesAlumniProps {
  hasJoinedProjects: boolean;
  onBack: () => void;
  onNavigateToProject?: () => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
  onLogout?: () => void;
  activeNav?: string;
  eventRegistrations?: EventRegistration[];
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
  activeNav = 'pesan',
  eventRegistrations = []
}: MessagesAlumniProps) {
  const { language } = useTranslation();
  const [activeTab, setActiveTab] = useState<'pesan' | 'laporan' | 'event'>('pesan');
  const [activeSubTab, setActiveSubTab] = useState<'chats' | 'teams' | 'tasks' | 'voting'>('chats');
  const [searchQuery, setSearchQuery] = useState('');
  const [votedPolls, setVotedPolls] = useState<{ [key: number]: number }>({});

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
    }
  ]);

  const handleVote = (pollId: number, optionId: number) => {
    if (votedPolls[pollId] !== undefined) {
      return;
    }

    setVotedPolls(prev => ({ ...prev, [pollId]: optionId }));
    
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

  // Mock data - Pengumuman
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

  // Mock data - Laporan donasi alumni (jika ada)
  const donations = [
    {
      id: 1,
      refNumber: 'ALM05187621522',
      project: 'Bantuan Pangan Gaza',
      category: 'Kemanusiaan',
      amount: 100000,
      method: 'Transfer Bank',
      date: '15 Februari 2026',
      transferTime: '15 Februari 2026 pukul 14.30',
      status: 'confirmed',
    }
  ];

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
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
                {hasJoinedProjects && tasks.filter(t => t.priority === 'high').length > 0 && (
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
          {/* Tab Navigation */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'pesan' ? 'bg-[#243D68] text-white' : 'bg-[#F8F9FA] text-[#243D68]'
                }`}
                onClick={() => setActiveTab('pesan')}
              >
                Pesan
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'laporan' ? 'bg-[#243D68] text-white' : 'bg-[#F8F9FA] text-[#243D68]'
                }`}
                onClick={() => setActiveTab('laporan')}
              >
                Laporan Donasi
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === 'event' ? 'bg-[#243D68] text-white' : 'bg-[#F8F9FA] text-[#243D68]'
                }`}
                onClick={() => setActiveTab('event')}
              >
                Event
              </button>
            </div>
          </div>

          {/* Tab Pesan Content */}
          {activeTab === 'pesan' && (
            <>
              {!hasJoinedProjects ? (
                /* Pengumuman - Alumni Belum Join Project */
                <div className="space-y-8">
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

                  {/* CTA Card - Join Project */}
                  <div className="bg-gradient-to-r from-[#243D68] to-[#30518B] rounded-2xl p-6 text-white shadow-lg">
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
                /* Alumni yang sudah join project - Collaboration Features */
                <div className="space-y-6">
                  {/* Sub Tab Navigation */}
                  <div className="flex border-b border-[#E5E7EB]">
                    <button
                      onClick={() => setActiveSubTab('voting')}
                      className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                        activeSubTab === 'voting'
                          ? 'text-[#243D68]'
                          : 'text-[#6B7280] hover:text-[#243D68]'
                      }`}
                    >
                      Voting
                      {activeSubTab === 'voting' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveSubTab('tasks')}
                      className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                        activeSubTab === 'tasks'
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
                      {activeSubTab === 'tasks' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveSubTab('chats')}
                      className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                        activeSubTab === 'chats'
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
                      {activeSubTab === 'chats' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveSubTab('teams')}
                      className={`px-4 py-3 font-semibold text-sm transition-colors relative ${
                        activeSubTab === 'teams'
                          ? 'text-[#243D68]'
                          : 'text-[#6B7280] hover:text-[#243D68]'
                      }`}
                    >
                      Teams
                      {activeSubTab === 'teams' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#243D68]"></div>
                      )}
                    </button>
                  </div>

                  {/* Sub Tab Content */}
                  {activeSubTab === 'voting' && (
                    <div className="space-y-4">
                      {pollsData.filter(p => p.status === 'active').map((poll) => {
                        const hasVoted = votedPolls[poll.id] !== undefined;
                        const userSelectedOption = votedPolls[poll.id];
                        
                        return (
                          <div
                            key={poll.id}
                            className="bg-white rounded-xl p-5 border border-[#E5E7EB] hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-start gap-3 mb-4">
                              <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white">how_to_vote</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-[#0E1B33] mb-1">{poll.question}</h4>
                                <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                                  <span>{poll.creator}</span>
                                  <span>•</span>
                                  <span>{poll.project}</span>
                                  <span>•</span>
                                  <span>{poll.createdAt}</span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2 mb-4">
                              {poll.options.map((option) => {
                                const percentage = poll.totalVotes > 0 
                                  ? Math.round((option.votes / poll.totalVotes) * 100)
                                  : 0;
                                const isSelected = hasVoted && userSelectedOption === option.id;

                                return (
                                  <button
                                    key={option.id}
                                    onClick={() => handleVote(poll.id, option.id)}
                                    disabled={hasVoted}
                                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                                      hasVoted
                                        ? isSelected
                                          ? 'border-[#243D68] bg-[#243D68]/5'
                                          : 'border-[#E5E7EB] bg-[#F8F9FA]'
                                        : 'border-[#E5E7EB] hover:border-[#243D68] hover:bg-[#F8F9FA]'
                                    } ${hasVoted ? 'cursor-default' : 'cursor-pointer'}`}
                                  >
                                    <div className="flex items-center justify-between mb-1">
                                      <span className={`text-sm font-medium ${isSelected ? 'text-[#243D68]' : 'text-[#333333]'}`}>
                                        {option.text}
                                      </span>
                                      {hasVoted && (
                                        <span className="text-sm font-bold text-[#243D68]">{percentage}%</span>
                                      )}
                                    </div>
                                    {hasVoted && (
                                      <div className="w-full bg-[#E5E7EB] rounded-full h-1.5">
                                        <div 
                                          className={`h-1.5 rounded-full ${isSelected ? 'bg-[#243D68]' : 'bg-[#6B7280]'}`}
                                          style={{ width: `${percentage}%` }}
                                        ></div>
                                      </div>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#6B7280] pt-3 border-t border-[#E5E7EB]">
                              <span>{poll.totalVotes} votes</span>
                              <span className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                {poll.deadline}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeSubTab === 'tasks' && (
                    <div className="space-y-4">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-[#E5E7EB] hover:border-[#243D68]/20"
                        >
                          <div className={`h-1.5 ${
                            task.priority === 'high' 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : 'bg-gradient-to-r from-amber-400 to-amber-500'
                          }`}></div>
                          
                          <div className="p-5">
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
                            
                            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#243D68] to-[#30518B] text-white py-2.5 px-4 rounded-lg text-sm font-bold hover:shadow-lg transition-all">
                              <span className="material-symbols-outlined text-lg">task_alt</span>
                              <span>Lihat Detail Task</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeSubTab === 'chats' && (
                    <div className="space-y-1">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer border border-[#E5E7EB] hover:border-[#243D68]/20"
                        >
                          <div className="flex items-start gap-3">
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

                  {activeSubTab === 'teams' && (
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
                </div>
              )}
            </>
          )}

          {/* Tab Laporan Donasi Content */}
          {activeTab === 'laporan' && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#333333] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#243D68]">receipt_long</span>
                  Laporan Donasi
                </h3>
              </div>

              {donations.length > 0 ? (
                <>
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
                    {donations.map((donation) => (
                      <div
                        key={donation.id}
                        className="bg-white rounded-xl p-5 border border-[#E5E7EB] hover:shadow-md transition-shadow"
                      >
                        <div className="mb-3">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4CAF50] bg-[#E8F5E9] px-3 py-1.5 rounded-full">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Berhasil
                          </span>
                        </div>

                        <div className="mb-3 pb-3 border-b border-[#E5E7EB]">
                          <p className="text-xs text-[#6B7280] mb-1">Nomor Referensi Donasi</p>
                          <code className="text-sm font-bold text-[#243D68]">{donation.refNumber}</code>
                        </div>

                        <div className="space-y-2">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[#6B7280] text-5xl">receipt_long</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">Belum Ada Donasi</h3>
                  <p className="text-sm text-[#6B7280]">
                    Riwayat donasi Anda akan muncul di sini
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Tab Event Content */}
          {activeTab === 'event' && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#333333] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#243D68]">event</span>
                  Pendaftaran Event
                </h3>
              </div>

              {eventRegistrations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl border border-[#E5E7EB]">
                  <div className="w-24 h-24 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-[#6B7280] text-5xl">event_busy</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#333333] mb-2">Belum Ada Pendaftaran Event</h3>
                  <p className="text-sm text-[#6B7280]">
                    Daftar event yang Anda ikuti akan muncul di sini
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {eventRegistrations.map((event) => {
                    let statusConfig = {
                      icon: 'schedule',
                      text: 'Menunggu Konfirmasi',
                      color: 'text-[#FF9800]',
                      bgColor: 'bg-[#FFF3E0]',
                      borderColor: 'border-[#FF9800]/30'
                    };

                    if (event.status === 'approved') {
                      statusConfig = {
                        icon: 'check_circle',
                        text: 'Terdaftar',
                        color: 'text-[#4CAF50]',
                        bgColor: 'bg-[#E8F5E9]',
                        borderColor: 'border-[#4CAF50]/30'
                      };
                    } else if (event.status === 'rejected') {
                      statusConfig = {
                        icon: 'cancel',
                        text: 'Ditolak',
                        color: 'text-[#F44336]',
                        bgColor: 'bg-[#FFEBEE]',
                        borderColor: 'border-[#F44336]/30'
                      };
                    }

                    return (
                      <div
                        key={event.id}
                        className="bg-white rounded-2xl overflow-hidden border border-[#E5E7EB] hover:shadow-lg transition-shadow"
                      >
                        <div className="bg-gradient-to-r from-[#243D68] to-[#30518B] px-5 py-4 text-white">
                          <h4 className="font-['Archivo_Black'] text-lg uppercase tracking-tight">{event.eventTitle}</h4>
                        </div>

                        <div className="p-5 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${statusConfig.color} ${statusConfig.bgColor} px-4 py-2 rounded-full`}>
                              <span className="material-symbols-outlined text-base">{statusConfig.icon}</span>
                              {statusConfig.text.toUpperCase()}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-[#F8F9FA] rounded-xl p-3">
                              <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-lg">calendar_today</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-[#6B7280]">Tanggal</p>
                                <p className="text-sm font-bold text-[#333333]">{event.eventDate}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 bg-[#F8F9FA] rounded-xl p-3">
                              <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-lg">schedule</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-[#6B7280]">Waktu</p>
                                <p className="text-sm font-bold text-[#333333]">{event.eventTime}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 bg-[#F8F9FA] rounded-xl p-3">
                              <div className="w-10 h-10 bg-[#243D68] rounded-full flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-white text-lg">location_on</span>
                              </div>
                              <div className="flex-1">
                                <p className="text-xs text-[#6B7280]">Lokasi</p>
                                <p className="text-sm font-bold text-[#333333]">{event.eventLocation}</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-[#243D68] to-[#30518B] rounded-xl p-4 text-white">
                            <p className="text-xs opacity-90 mb-1">Kuota Peserta</p>
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-2xl font-['Archivo_Black']">127</span>
                              <span className="text-sm opacity-80">/ 200 orang</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div className="bg-[#FAC06E] h-2 rounded-full" style={{ width: '63.5%' }}></div>
                            </div>
                          </div>

                          {event.status === 'pending' && (
                            <div className="bg-[#FFF3E0] border border-[#FF9800]/30 rounded-xl p-4 flex items-start gap-3">
                              <span className="material-symbols-outlined text-[#FF9800] text-2xl shrink-0">schedule</span>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-[#FF9800] mb-1.5">MENUNGGU KONFIRMASI</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed">
                                  Pendaftaran Anda sedang ditinjau oleh panitia. Anda akan mendapat notifikasi setelah pendaftaran diproses.
                                </p>
                              </div>
                            </div>
                          )}

                          {event.status === 'approved' && (
                            <div className="bg-[#E8F5E9] border border-[#4CAF50]/30 rounded-xl p-4 flex items-start gap-3">
                              <span className="material-symbols-outlined text-[#4CAF50] text-2xl shrink-0">check_circle</span>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-[#4CAF50] mb-1.5">PENDAFTARAN BERHASIL</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed">
                                  Selamat! Pendaftaran Anda telah disetujui. Kami tunggu kehadiran Anda di event {event.eventTitle}.
                                </p>
                              </div>
                            </div>
                          )}

                          {event.status === 'rejected' && (
                            <div className="bg-[#FFEBEE] border border-[#F44336]/30 rounded-xl p-4 flex items-start gap-3">
                              <span className="material-symbols-outlined text-[#F44336] text-2xl shrink-0">cancel</span>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-[#F44336] mb-1.5">PENDAFTARAN DITOLAK</p>
                                <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
                                  Mohon maaf, pendaftaran Anda ditolak. Silakan hubungi panitia untuk informasi lebih lanjut.
                                </p>
                                <button className="text-xs font-bold text-[#243D68] bg-white px-4 py-2 rounded-lg hover:bg-[#F8F9FA] transition-colors border border-[#E5E7EB] uppercase tracking-wide">
                                  Hubungi Panitia
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
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
            {hasJoinedProjects && tasks.filter(t => t.priority === 'high').length > 0 && (
              <span className="absolute top-1.5 right-1/4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            )}
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
