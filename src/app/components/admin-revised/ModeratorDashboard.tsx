/**
 * Moderator Dashboard Component
 * Overview dashboard for Moderator role
 */

import { AdminUser } from '@/types/admin-revised';

interface ModeratorDashboardProps {
  currentUser: AdminUser;
  onNavigate: (page: string) => void;
}

interface ModeratorStats {
  totalProjects: number;
  activeMembers: number;
  pendingRequests: number;
  totalDonations: number;
  recentActivities: number;
}

export function ModeratorDashboard({ currentUser, onNavigate }: ModeratorDashboardProps) {
  // Mock stats for moderator
  const stats: ModeratorStats = {
    totalProjects: 3,
    activeMembers: 42,
    pendingRequests: 7,
    totalDonations: 125000000,
    recentActivities: 15,
  };

  const recentActivities = [
    {
      id: '1',
      action: 'Konten baru dipublish',
      user: 'Fatimah Azzahra (PIC)',
      project: 'Qurban untuk Anak Yatim Gaza',
      time: '5 menit yang lalu',
      icon: 'article',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: '2',
      action: 'Member baru bergabung',
      user: 'Ahmad Fadillah',
      project: 'Qurban untuk Anak Yatim Gaza',
      time: '15 menit yang lalu',
      icon: 'person_add',
      color: 'text-green-600 bg-green-50',
    },
    {
      id: '3',
      action: 'Donasi masuk',
      user: 'Siti Aminah',
      project: 'Pendidikan Guru Tahfidz Al Quran',
      time: '1 jam yang lalu',
      icon: 'volunteer_activism',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: '4',
      action: 'Transaksi keuangan',
      user: 'Hasan Ibrahim (PIC)',
      project: 'Bantuan Medis Rumah Sakit Gaza',
      time: '2 jam yang lalu',
      icon: 'account_balance_wallet',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      id: '5',
      action: 'Member request pending',
      user: 'Reza Pratama',
      project: 'Qurban untuk Anak Yatim Gaza',
      time: '3 jam yang lalu',
      icon: 'how_to_reg',
      color: 'text-yellow-600 bg-yellow-50',
    },
  ];

  const projectOverview = [
    {
      id: 1,
      name: 'Qurban untuk Anak Yatim Gaza',
      pic: 'Fatimah Azzahra',
      members: 18,
      donations: 45000000,
      status: 'active',
      progress: 75,
    },
    {
      id: 2,
      name: 'Pendidikan Guru Tahfidz Al Quran',
      pic: 'Hasan Ibrahim',
      members: 12,
      donations: 32000000,
      status: 'active',
      progress: 55,
    },
    {
      id: 3,
      name: 'Bantuan Medis Rumah Sakit Gaza',
      pic: 'Zahra Amalia',
      members: 12,
      donations: 48000000,
      status: 'active',
      progress: 80,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#243D68] to-[#1a2d4d] rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-3xl">shield_person</span>
          <h2 className="font-['Archivo_Black'] text-2xl uppercase">Moderator Dashboard</h2>
        </div>
        <p className="text-white/80 mb-4">
          Selamat datang, {currentUser.name}! Monitor dan kelola semua aktivitas project.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onNavigate('alumni-data')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 text-sm font-semibold"
          >
            Data Alumni
          </button>
          <button
            onClick={() => onNavigate('content')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 text-sm font-semibold"
          >
            Konten Project
          </button>
          <button
            onClick={() => onNavigate('activity-log')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 text-sm font-semibold"
          >
            Activity Log
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-2xl">folder_open</span>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">{stats.totalProjects}</p>
          <p className="text-sm text-[#6B7280]">Total Project</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-2xl">group</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">{stats.activeMembers}</p>
          <p className="text-sm text-[#6B7280]">Active Members</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600 text-2xl">volunteer_activism</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">
            Rp {(stats.totalDonations / 1000000).toFixed(0)}jt
          </p>
          <p className="text-sm text-[#6B7280]">Total Donasi</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600 text-2xl">history</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">{stats.recentActivities}</p>
          <p className="text-sm text-[#6B7280]">Aktivitas Terbaru</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Overview */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB]">
          <div className="p-6 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#0E1B33]">Project Overview</h3>
                <p className="text-sm text-[#6B7280]">Monitor semua project yang berjalan</p>
              </div>
              <button className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <span className="material-symbols-outlined text-[#6B7280]">more_vert</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-[#E5E7EB]">
            {projectOverview.map((project) => (
              <div key={project.id} className="p-6 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0E1B33] mb-1">{project.name}</h4>
                    <p className="text-sm text-[#6B7280]">
                      PIC: {project.pic} • {project.members} members
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#6B7280]">Progress</span>
                    <span className="font-semibold text-[#0E1B33]">{project.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#243D68] to-[#FAC06E] rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="material-symbols-outlined text-purple-600 text-lg">
                      volunteer_activism
                    </span>
                    <span className="font-semibold text-[#0E1B33]">
                      Rp {(project.donations / 1000000).toFixed(0)}jt
                    </span>
                  </div>
                  <button
                    onClick={() => onNavigate('finance')}
                    className="text-sm font-semibold text-[#243D68] hover:text-[#1a2d4d] transition-colors"
                  >
                    Lihat Detail →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-[#E5E7EB]">
          <div className="p-6 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#0E1B33]">Aktivitas Terbaru</h3>
                <p className="text-sm text-[#6B7280]">Real-time updates</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#E5E7EB] max-h-[600px] overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <span className="material-symbols-outlined text-lg">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#0E1B33] mb-1">
                      {activity.action}
                    </p>
                    <p className="text-xs text-[#6B7280] mb-1 truncate">
                      {activity.user} • {activity.project}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#E5E7EB]">
            <button
              onClick={() => onNavigate('activity-log')}
              className="w-full text-center text-sm font-semibold text-[#243D68] hover:text-[#1a2d4d] transition-colors"
            >
              Lihat Semua Aktivitas →
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate('alumni-data')}
          className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#243D68] hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-blue-600 text-2xl">
              school
            </span>
          </div>
          <h3 className="font-bold text-[#0E1B33] mb-2">Data Alumni</h3>
          <p className="text-sm text-[#6B7280]">Kelola database dan informasi alumni</p>
        </button>

        <button
          onClick={() => onNavigate('content')}
          className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#243D68] hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-purple-600 text-2xl">article</span>
          </div>
          <h3 className="font-bold text-[#0E1B33] mb-2">Konten Project</h3>
          <p className="text-sm text-[#6B7280]">Kelola dan moderasi konten yang dipublish</p>
        </button>

        <button
          onClick={() => onNavigate('activity-log')}
          className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB] hover:border-[#243D68] hover:shadow-md transition-all group text-left"
        >
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-orange-600 text-2xl">history</span>
          </div>
          <h3 className="font-bold text-[#0E1B33] mb-2">Activity Log</h3>
          <p className="text-sm text-[#6B7280]">Track semua aktivitas di sistem</p>
        </button>
      </div>
    </div>
  );
}