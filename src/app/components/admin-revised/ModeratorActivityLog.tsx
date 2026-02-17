/**
 * Moderator Activity Log Component
 * View all system activities across projects
 */

import { useState } from 'react';
import { AdminUser } from '@/types/admin-revised';

interface ModeratorActivityLogProps {
  currentUser: AdminUser;
}

export function ModeratorActivityLog({ currentUser }: ModeratorActivityLogProps) {
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [selectedAction, setSelectedAction] = useState<string>('all');

  const projects = [
    { id: 1, name: 'Qurban untuk Anak Yatim Gaza' },
    { id: 2, name: 'Pendidikan Guru Tahfidz Al Quran' },
    { id: 3, name: 'Bantuan Medis Rumah Sakit Gaza' },
  ];

  const allActivities = [
    {
      id: '1',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      action: 'create_content',
      actionLabel: 'Konten Baru',
      user: 'Fatimah Azzahra',
      userRole: 'PIC',
      description: 'Membuat konten baru: "Distribusi Daging Qurban Sudah Dimulai"',
      timestamp: '2025-02-10T14:30:00',
      timeAgo: '5 menit yang lalu',
      icon: 'article',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: '2',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      action: 'member_join',
      actionLabel: 'Member Bergabung',
      user: 'Ahmad Fadillah',
      userRole: 'Alumni',
      description: 'Member baru bergabung ke project dengan komitmen 3 bulan',
      timestamp: '2025-02-10T14:15:00',
      timeAgo: '20 menit yang lalu',
      icon: 'person_add',
      color: 'text-green-600 bg-green-50',
    },
    {
      id: '3',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      action: 'donation',
      actionLabel: 'Donasi Masuk',
      user: 'Siti Aminah',
      userRole: 'Donatur',
      description: 'Donasi sebesar Rp 3.000.000 untuk program tahfidz',
      timestamp: '2025-02-10T13:45:00',
      timeAgo: '50 menit yang lalu',
      icon: 'volunteer_activism',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: '4',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      action: 'transaction',
      actionLabel: 'Transaksi Keuangan',
      user: 'Zahra Amalia',
      userRole: 'PIC',
      description: 'Pengeluaran Rp 8.000.000 untuk pembelian alat medis portable',
      timestamp: '2025-02-10T11:20:00',
      timeAgo: '3 jam yang lalu',
      icon: 'account_balance_wallet',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      id: '5',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      action: 'member_request',
      actionLabel: 'Pengajuan Member',
      user: 'Reza Pratama',
      userRole: 'Alumni',
      description: 'Mengajukan untuk bergabung ke project (Status: Pending)',
      timestamp: '2025-02-10T10:00:00',
      timeAgo: '4 jam yang lalu',
      icon: 'how_to_reg',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      id: '6',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      action: 'update_content',
      actionLabel: 'Update Konten',
      user: 'Hasan Ibrahim',
      userRole: 'PIC',
      description: 'Mengupdate konten: "Workshop Metode Tahfidz Modern"',
      timestamp: '2025-02-10T09:15:00',
      timeAgo: '5 jam yang lalu',
      icon: 'edit',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      id: '7',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      action: 'donation',
      actionLabel: 'Donasi Masuk',
      user: 'PT Maju Bersama',
      userRole: 'Donatur Korporat',
      description: 'Donasi urgent sebesar Rp 10.000.000 untuk peralatan medis',
      timestamp: '2025-02-09T16:30:00',
      timeAgo: '22 jam yang lalu',
      icon: 'volunteer_activism',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      id: '8',
      projectId: 1,
      projectName: 'Qurban untuk Anak Yatim Gaza',
      action: 'polling_created',
      actionLabel: 'Polling Dibuat',
      user: 'Fatimah Azzahra',
      userRole: 'PIC',
      description: 'Membuat polling: "Pilih Jenis Hewan Qurban untuk Periode Berikutnya"',
      timestamp: '2025-02-09T14:20:00',
      timeAgo: '1 hari yang lalu',
      icon: 'poll',
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      id: '9',
      projectId: 2,
      projectName: 'Pendidikan Guru Tahfidz Al Quran',
      action: 'member_approved',
      actionLabel: 'Member Disetujui',
      user: 'Hasan Ibrahim',
      userRole: 'PIC',
      description: 'Menyetujui pengajuan member: Rizki Abdullah',
      timestamp: '2025-02-09T11:00:00',
      timeAgo: '1 hari yang lalu',
      icon: 'check_circle',
      color: 'text-green-600 bg-green-50',
    },
    {
      id: '10',
      projectId: 3,
      projectName: 'Bantuan Medis Rumah Sakit Gaza',
      action: 'transaction',
      actionLabel: 'Transaksi Keuangan',
      user: 'Zahra Amalia',
      userRole: 'PIC',
      description: 'Pengeluaran Rp 5.000.000 untuk distribusi obat-obatan',
      timestamp: '2025-02-09T09:45:00',
      timeAgo: '1 hari yang lalu',
      icon: 'account_balance_wallet',
      color: 'text-orange-600 bg-orange-50',
    },
  ];

  const filteredActivities = allActivities.filter(a => {
    if (selectedProject !== 'all' && a.projectId !== selectedProject) return false;
    if (selectedAction !== 'all' && a.action !== selectedAction) return false;
    return true;
  });

  const actionTypes = [
    { value: 'all', label: 'Semua Aktivitas' },
    { value: 'create_content', label: 'Konten Baru' },
    { value: 'update_content', label: 'Update Konten' },
    { value: 'member_join', label: 'Member Bergabung' },
    { value: 'member_request', label: 'Pengajuan Member' },
    { value: 'member_approved', label: 'Member Disetujui' },
    { value: 'donation', label: 'Donasi' },
    { value: 'transaction', label: 'Transaksi' },
    { value: 'polling_created', label: 'Polling Dibuat' },
  ];

  const stats = {
    totalActivities: allActivities.length,
    today: allActivities.filter(a => a.timeAgo.includes('menit') || a.timeAgo.includes('jam')).length,
    thisWeek: allActivities.length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-orange-600 text-2xl">history</span>
          </div>
          <div>
            <h2 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
              Activity Log
            </h2>
            <p className="text-sm text-[#6B7280]">Track semua aktivitas di sistem</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">history</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Total Aktivitas</span>
          </div>
          <p className="text-2xl font-bold text-[#0E1B33]">{stats.totalActivities}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">today</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Hari Ini</span>
          </div>
          <p className="text-2xl font-bold text-green-600">{stats.today}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">date_range</span>
            </div>
            <span className="text-sm font-semibold text-[#6B7280]">Minggu Ini</span>
          </div>
          <p className="text-2xl font-bold text-purple-600">{stats.thisWeek}</p>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white rounded-xl border border-[#E5E7EB]">
        {/* Filter Bar */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Filter Project
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem'
                }}
              >
                <option value="all">Semua Project</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-[#0E1B33] mb-2">
                Tipe Aktivitas
              </label>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="w-full pl-4 pr-12 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none appearance-none bg-white"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 1rem center',
                  backgroundSize: '1.5rem'
                }}
              >
                {actionTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="divide-y divide-[#E5E7EB] max-h-[700px] overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#6B7280] text-3xl">history</span>
              </div>
              <p className="text-[#6B7280]">Tidak ada aktivitas ditemukan</p>
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <div key={activity.id} className="p-6 hover:bg-[#F8F9FA] transition-colors">
                <div className="flex gap-4">
                  {/* Timeline Indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                      <span className="material-symbols-outlined text-xl">
                        {activity.icon}
                      </span>
                    </div>
                    {index < filteredActivities.length - 1 && (
                      <div className="w-0.5 h-full bg-[#E5E7EB] mt-2"></div>
                    )}
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${activity.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                            {activity.actionLabel}
                          </span>
                        </div>
                        <p className="font-semibold text-[#0E1B33] mb-1">
                          {activity.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
                          <span className="font-medium text-[#243D68]">{activity.user}</span>
                          <span>•</span>
                          <span>{activity.userRole}</span>
                          <span>•</span>
                          <span className="text-xs">{activity.projectName}</span>
                        </div>
                      </div>
                      <span className="text-xs text-[#9CA3AF] whitespace-nowrap ml-4">
                        {activity.timeAgo}
                      </span>
                    </div>

                    {/* Timestamp */}
                    <p className="text-xs text-[#9CA3AF] mt-2">
                      {new Date(activity.timestamp).toLocaleString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredActivities.length > 0 && (
          <div className="p-4 border-t border-[#E5E7EB] text-center">
            <button className="text-sm font-semibold text-[#243D68] hover:text-[#1a2d4d] transition-colors">
              Load More Activities
            </button>
          </div>
        )}
      </div>
    </div>
  );
}