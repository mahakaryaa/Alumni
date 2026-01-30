/**
 * Dashboard Overview Component
 * Main dashboard showing statistics and recent activities
 */

import { AdminUser, DashboardStats } from '@/types/admin';
import { getRoleDisplayName } from '@/utils/adminAuth';

interface DashboardOverviewProps {
  currentUser: AdminUser;
  stats: DashboardStats;
}

export function DashboardOverview({ currentUser, stats }: DashboardOverviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create': return 'add_circle';
      case 'update': return 'edit';
      case 'delete': return 'delete';
      case 'view': return 'visibility';
      default: return 'info';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create': return 'text-green-600 bg-green-100';
      case 'update': return 'text-blue-600 bg-blue-100';
      case 'delete': return 'text-red-600 bg-red-100';
      case 'view': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-[#243D68] to-[#30518B] rounded-2xl p-6 text-white shadow-lg">
        <h1 className="font-['Archivo_Black'] text-2xl uppercase mb-2">
          Selamat Datang, {currentUser.name}!
        </h1>
        <p className="text-white/80 text-sm">
          Role: <span className="font-semibold">{getRoleDisplayName(currentUser.role)}</span>
        </p>
        {currentUser.lastLogin && (
          <p className="text-white/60 text-xs mt-2">
            Last Login: {formatDate(currentUser.lastLogin)}
          </p>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Alumni */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-2xl">people</span>
            </div>
          </div>
          <p className="text-[#6B7280] text-sm mb-1">Total Alumni</p>
          <p className="text-3xl font-bold text-[#0E1B33]">{stats.totalAlumni}</p>
        </div>

        {/* Active Alumni */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-2xl">check_circle</span>
            </div>
          </div>
          <p className="text-[#6B7280] text-sm mb-1">Alumni Aktif</p>
          <p className="text-3xl font-bold text-[#0E1B33]">{stats.activeAlumni}</p>
        </div>

        {/* Inactive Alumni */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600 text-2xl">pause_circle</span>
            </div>
          </div>
          <p className="text-[#6B7280] text-sm mb-1">Alumni Tidak Aktif</p>
          <p className="text-3xl font-bold text-[#0E1B33]">{stats.inactiveAlumni}</p>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600 text-2xl">admin_panel_settings</span>
            </div>
          </div>
          <p className="text-[#6B7280] text-sm mb-1">Total Admin</p>
          <p className="text-3xl font-bold text-[#0E1B33]">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alumni by Angkatan */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
          <h3 className="font-bold text-[#0E1B33] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#243D68]">bar_chart</span>
            Alumni per Angkatan
          </h3>
          <div className="space-y-3">
            {stats.alumniByAngkatan.map(item => (
              <div key={item.angkatan}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-[#6B7280]">Angkatan {item.angkatan}</span>
                  <span className="text-sm font-semibold text-[#0E1B33]">{item.count}</span>
                </div>
                <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                  <div
                    className="bg-[#243D68] h-2 rounded-full transition-all"
                    style={{ width: `${(item.count / stats.totalAlumni) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alumni by Jurusan */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
          <h3 className="font-bold text-[#0E1B33] mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#243D68]">pie_chart</span>
            Alumni per Jurusan
          </h3>
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {stats.alumniByJurusan.slice(0, 5).map(item => (
              <div key={item.jurusan} className="flex justify-between items-center p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <span className="text-sm text-[#0E1B33]">{item.jurusan}</span>
                <span className="text-sm font-semibold text-[#243D68] bg-[#F8F9FA] px-2 py-1 rounded">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
        <h3 className="font-bold text-[#0E1B33] mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#243D68]">history</span>
          Aktivitas Terbaru
        </h3>
        <div className="space-y-3">
          {stats.recentActivities.slice(0, 5).map(activity => (
            <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getActionColor(activity.action)}`}>
                <span className="material-symbols-outlined text-lg">
                  {getActionIcon(activity.action)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#0E1B33] font-medium">{activity.description}</p>
                <p className="text-xs text-[#6B7280] mt-1">
                  {activity.userName} • {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
