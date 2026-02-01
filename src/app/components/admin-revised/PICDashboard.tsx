/**
 * PIC Dashboard Component (REVISED)
 * Main dashboard for Project In Charge
 */

import { AdminUser } from '@/types/admin-revised';
import { PICDashboardStats } from '@/types/admin-revised';
import { formatCurrency, formatRelativeTime } from '@/utils/adminPermissions';
import { getActivityLogsByProject } from '@/data/mockAdminDataRevised';

interface PICDashboardProps {
  currentUser: AdminUser;
  stats: PICDashboardStats;
  onNavigate: (page: string) => void;
}

export function PICDashboard({ currentUser, stats, onNavigate }: PICDashboardProps) {
  const recentActivities = stats.projectId ? getActivityLogsByProject(stats.projectId).slice(0, 5) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
          Dashboard Project
        </h1>
        <p className="text-[#6B7280]">
          {stats.projectTitle}
        </p>
      </div>

      {/* Pending Requests Alert */}
      {stats.pendingRequests > 0 && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-yellow-600">notification_important</span>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-yellow-900 mb-1">
                {stats.pendingRequests} Pengajuan Menunggu Persetujuan
              </h3>
              <p className="text-sm text-yellow-800 mb-3">
                Ada alumni yang ingin bergabung dengan project Anda. Segera review dan berikan keputusan.
              </p>
              <button
                onClick={() => onNavigate('pending-requests')}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-semibold hover:bg-yellow-700 transition-colors"
              >
                Review Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Members Stat */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600 text-2xl">group</span>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
              {stats.memberPercentage}%
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[#6B7280] mb-1">Total Member</h3>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">
            {stats.currentMembers} / {stats.targetMembers}
          </p>
          <p className="text-xs text-[#6B7280]">
            {stats.targetMembers - stats.currentMembers} lagi untuk target
          </p>
          <div className="mt-4 bg-[#F8F9FA] rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-500"
              style={{ width: `${stats.memberPercentage}%` }}
            />
          </div>
        </div>

        {/* Dana Total Stat */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600 text-2xl">payments</span>
            </div>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full">
              {stats.danaPercentage}%
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[#6B7280] mb-1">Total Dana</h3>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">
            {formatCurrency(stats.totalDana)}
          </p>
          <p className="text-xs text-[#6B7280]">
            Target: {formatCurrency(stats.targetDana)}
          </p>
          <div className="mt-4 bg-[#F8F9FA] rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-600 h-full transition-all duration-500"
              style={{ width: `${stats.danaPercentage}%` }}
            />
          </div>
        </div>

        {/* Progress Stat */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600 text-2xl">trending_up</span>
            </div>
            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
              {stats.progressPercentage}%
            </span>
          </div>
          <h3 className="text-sm font-semibold text-[#6B7280] mb-1">Progress Project</h3>
          <p className="text-2xl font-bold text-[#0E1B33] mb-1">
            {stats.milestonesCompleted} / {stats.totalMilestones}
          </p>
          <p className="text-xs text-[#6B7280]">Milestones completed</p>
          <div className="mt-4 bg-[#F8F9FA] rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-600 h-full transition-all duration-500"
              style={{ width: `${stats.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Dana Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Dana Umum */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-blue-100 text-sm mb-1">Dana Umum (Donatur Publik)</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.danaUmum)}</p>
            </div>
            <button
              onClick={() => onNavigate('finance')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
            >
              Update
            </button>
          </div>
          <p className="text-sm text-blue-100">
            {Math.round((stats.danaUmum / stats.targetDana) * 100)}% dari target total
          </p>
        </div>

        {/* Dana Internal */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-1">Dana Internal (Iuran Member)</p>
              <p className="text-3xl font-bold">{formatCurrency(stats.danaInternal)}</p>
            </div>
            <button
              onClick={() => onNavigate('finance')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
            >
              Update
            </button>
          </div>
          <p className="text-sm text-green-100">
            {stats.currentMembers} member @ {formatCurrency(stats.danaInternal / Math.max(stats.currentMembers, 1))}
          </p>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-[#243D68]">forum</span>
            <span className="text-sm font-semibold text-[#6B7280]">Diskusi</span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33]">{stats.discussionMessages}</p>
          <p className="text-xs text-[#6B7280]">pesan terakhir 2 jam lalu</p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-[#243D68]">poll</span>
            <span className="text-sm font-semibold text-[#6B7280]">Polling Aktif</span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33]">{stats.activePolls}</p>
          <p className="text-xs text-[#6B7280]">
            {stats.pollParticipation}% participation rate
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-[#243D68]">wallet</span>
            <span className="text-sm font-semibold text-[#6B7280]">Sisa Dana</span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33]">
            {formatCurrency(stats.danaRemaining)}
          </p>
          <p className="text-xs text-[#6B7280]">
            Terpakai: {formatCurrency(stats.danaUsed)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <h2 className="font-semibold text-[#0E1B33] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => onNavigate('pending-requests')}
            className="flex flex-col items-center gap-2 p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#243D68] hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-[#F8F9FA] group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[#243D68]">how_to_reg</span>
            </div>
            <span className="text-sm font-semibold text-[#0E1B33] text-center">
              Review Pengajuan
            </span>
            {stats.pendingRequests > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                {stats.pendingRequests}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('finance')}
            className="flex flex-col items-center gap-2 p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#243D68] hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-[#F8F9FA] group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[#243D68]">account_balance_wallet</span>
            </div>
            <span className="text-sm font-semibold text-[#0E1B33] text-center">Update Dana</span>
          </button>

          <button
            onClick={() => onNavigate('polling')}
            className="flex flex-col items-center gap-2 p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#243D68] hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-[#F8F9FA] group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[#243D68]">poll</span>
            </div>
            <span className="text-sm font-semibold text-[#0E1B33] text-center">Buat Polling</span>
          </button>

          <button
            onClick={() => onNavigate('content')}
            className="flex flex-col items-center gap-2 p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#243D68] hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-[#F8F9FA] group-hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[#243D68]">post_add</span>
            </div>
            <span className="text-sm font-semibold text-[#0E1B33] text-center">Post Update</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-[#0E1B33]">Aktivitas Terbaru</h2>
          <button
            onClick={() => onNavigate('activity-log')}
            className="text-sm text-[#243D68] hover:underline font-semibold"
          >
            Lihat Semua
          </button>
        </div>
        
        {recentActivities.length > 0 ? (
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-[#F8F9FA] rounded-lg transition-colors">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="material-symbols-outlined text-blue-600 text-sm">
                    {activity.action === 'update_dana_umum' ? 'payments' :
                     activity.action === 'create_poll' ? 'poll' :
                     activity.action === 'post_update' ? 'post_add' :
                     'check_circle'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#0E1B33]">{activity.description}</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[#6B7280]">
            <span className="material-symbols-outlined text-4xl mb-2 opacity-50">inbox</span>
            <p className="text-sm">Belum ada aktivitas</p>
          </div>
        )}
      </div>
    </div>
  );
}
