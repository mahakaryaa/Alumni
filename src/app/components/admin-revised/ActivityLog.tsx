/**
 * Activity Log Component
 * View all activities and actions in the project
 */

import { useState } from 'react';
import { AdminUser, ActivityLog as ActivityLogType } from '@/types/admin-revised';
import { getActivityLogsByProject } from '@/data/mockAdminDataRevised';

interface ActivityLogProps {
  currentUser: AdminUser;
  projectId: string;
}

export function ActivityLog({ currentUser, projectId }: ActivityLogProps) {
  const [logs] = useState<ActivityLogType[]>(getActivityLogsByProject(projectId));
  const [filterAction, setFilterAction] = useState<string>('all');

  const filteredLogs = logs.filter((log) => {
    if (filterAction === 'all') return true;
    return log.action === filterAction;
  });

  const getActionIcon = (action: ActivityLogType['action']) => {
    const icons: Record<ActivityLogType['action'], string> = {
      approve_request: 'check_circle',
      reject_request: 'cancel',
      kick_member: 'block',
      add_donation: 'arrow_downward',
      add_expense: 'arrow_upward',
      post_update: 'campaign',
      create_poll: 'poll',
      assign_task: 'task_alt',
      complete_task: 'task',
      update_project: 'edit',
    };
    return icons[action] || 'info';
  };

  const getActionColor = (action: ActivityLogType['action']) => {
    const colors: Record<ActivityLogType['action'], string> = {
      approve_request: 'bg-green-100 text-green-800',
      reject_request: 'bg-red-100 text-red-800',
      kick_member: 'bg-red-100 text-red-800',
      add_donation: 'bg-green-100 text-green-800',
      add_expense: 'bg-orange-100 text-orange-800',
      post_update: 'bg-blue-100 text-blue-800',
      create_poll: 'bg-purple-100 text-purple-800',
      assign_task: 'bg-blue-100 text-blue-800',
      complete_task: 'bg-green-100 text-green-800',
      update_project: 'bg-yellow-100 text-yellow-800',
    };
    return colors[action] || 'bg-gray-100 text-gray-800';
  };

  const getActionLabel = (action: ActivityLogType['action']) => {
    const labels: Record<ActivityLogType['action'], string> = {
      approve_request: 'Approved Request',
      reject_request: 'Rejected Request',
      kick_member: 'Kicked Member',
      add_donation: 'Added Donation',
      add_expense: 'Added Expense',
      post_update: 'Posted Update',
      create_poll: 'Created Poll',
      assign_task: 'Assigned Task',
      complete_task: 'Completed Task',
      update_project: 'Updated Project',
    };
    return labels[action] || action;
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Group logs by date
  const groupedLogs = filteredLogs.reduce((acc, log) => {
    const date = new Date(log.timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {} as Record<string, ActivityLogType[]>);

  const uniqueActions = Array.from(new Set(logs.map((log) => log.action)));

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33] mb-2">
          Activity Log
        </h1>
        <p className="text-[#6B7280]">Riwayat semua aktivitas dan aksi di project</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-600">history</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">{logs.length}</p>
              <p className="text-sm text-[#6B7280]">Total Activities</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">
                {logs.filter((l) => l.action === 'approve_request').length}
              </p>
              <p className="text-sm text-[#6B7280]">Approvals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-purple-600">campaign</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">
                {logs.filter((l) => l.action === 'post_update').length}
              </p>
              <p className="text-sm text-[#6B7280]">Updates Posted</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border-2 border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-orange-600">task</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0E1B33]">
                {logs.filter((l) => l.action === 'assign_task').length}
              </p>
              <p className="text-sm text-[#6B7280]">Tasks Assigned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl p-4 border-2 border-[#E5E7EB] mb-6">
        <label className="block text-sm font-semibold text-[#0E1B33] mb-2">Filter by Action</label>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border-2 border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none"
        >
          <option value="all">Semua Aktivitas ({logs.length})</option>
          {uniqueActions.map((action) => (
            <option key={action} value={action}>
              {getActionLabel(action)} ({logs.filter((l) => l.action === action).length})
            </option>
          ))}
        </select>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-6">
        {Object.keys(groupedLogs).length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border-2 border-[#E5E7EB]">
            <div className="w-20 h-20 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-[#6B7280]">history</span>
            </div>
            <h3 className="font-semibold text-xl text-[#0E1B33] mb-2">Tidak Ada Aktivitas</h3>
            <p className="text-[#6B7280]">Belum ada aktivitas yang sesuai dengan filter</p>
          </div>
        ) : (
          Object.entries(groupedLogs).map(([date, dateLogs]) => (
            <div key={date}>
              {/* Date Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#E5E7EB]"></div>
                <span className="px-4 py-2 bg-[#F8F9FA] rounded-full text-sm font-semibold text-[#6B7280]">
                  {date}
                </span>
                <div className="flex-1 h-px bg-[#E5E7EB]"></div>
              </div>

              {/* Logs for this date */}
              <div className="space-y-3">
                {dateLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white rounded-xl border-2 border-[#E5E7EB] p-5 hover:border-[#243D68] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActionColor(log.action)}`}>
                        <span className="material-symbols-outlined text-lg">
                          {getActionIcon(log.action)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                                {getActionLabel(log.action)}
                              </span>
                            </div>
                            <p className="text-[#0E1B33] font-medium">{log.description}</p>
                          </div>
                          <span className="text-xs text-[#6B7280] whitespace-nowrap ml-4">
                            {formatRelativeTime(log.timestamp)}
                          </span>
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">person</span>
                            {log.userName}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">badge</span>
                            {log.userRole === 'pic' ? 'Project In Charge' : log.userRole}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">schedule</span>
                            {new Date(log.timestamp).toLocaleTimeString('id-ID', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Export Button */}
      <div className="mt-8 p-6 bg-white rounded-xl border-2 border-[#E5E7EB]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[#0E1B33] mb-1">Export Activity Log</h3>
            <p className="text-sm text-[#6B7280]">Download riwayat aktivitas dalam format CSV</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[#243D68] text-white rounded-lg font-semibold hover:bg-[#1a2d4d] transition-colors">
            <span className="material-symbols-outlined">download</span>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}
