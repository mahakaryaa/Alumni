/**
 * Activity Log Component
 * View all system activities with filters
 */

import { useState } from 'react';
import { AdminUser, ActivityLog as ActivityLogType } from '@/types/admin';
import { hasPermission, getRoleDisplayName, getRoleBadgeColor } from '@/utils/adminAuth';
import { AccessDenied } from './AccessDenied';

interface ActivityLogProps {
  currentUser: AdminUser;
  activities: ActivityLogType[];
}

export function ActivityLog({ currentUser, activities }: ActivityLogProps) {
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Check permission
  if (!hasPermission(currentUser, 'canViewActivityLog')) {
    return <AccessDenied message="Anda tidak memiliki akses untuk melihat activity log" />;
  }

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !activity.userName.toLowerCase().includes(query) &&
        !activity.description.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Action filter
    if (filterAction !== 'all' && activity.action !== filterAction) return false;

    // Type filter
    if (filterType !== 'all' && activity.targetType !== filterType) return false;

    return true;
  });

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

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      create: 'Create',
      update: 'Update',
      delete: 'Delete',
      view: 'View',
    };
    return labels[action] || action;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-['Archivo_Black'] text-2xl uppercase text-[#0E1B33]">
          Activity Log
        </h2>
        <p className="text-[#6B7280] text-sm mt-1">
          Riwayat aktivitas sistem
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-[#E5E7EB] shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Cari Aktivitas</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#6B7280]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="User atau deskripsi..."
                className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
              />
            </div>
          </div>

          {/* Action Filter */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Action</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
            >
              <option value="all">Semua Action</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="view">View</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="text-sm text-[#6B7280] mb-2 block">Target Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:border-[#243D68] focus:outline-none text-sm"
            >
              <option value="all">Semua Type</option>
              <option value="alumni">Alumni</option>
              <option value="user">User</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-[#6B7280]">
        Menampilkan <span className="font-semibold text-[#0E1B33]">{filteredActivities.length}</span> dari{' '}
        <span className="font-semibold text-[#0E1B33]">{activities.length}</span> aktivitas
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-sm">
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-12 text-[#6B7280]">
              Tidak ada aktivitas yang ditemukan
            </div>
          ) : (
            filteredActivities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActionColor(activity.action)}`}>
                    <span className="material-symbols-outlined text-lg">
                      {getActionIcon(activity.action)}
                    </span>
                  </div>
                  {index < filteredActivities.length - 1 && (
                    <div className="w-0.5 flex-1 bg-[#E5E7EB] my-2"></div>
                  )}
                </div>

                {/* Activity Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#0E1B33]">{activity.userName}</span>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getRoleBadgeColor(activity.userRole)}`}>
                          {getRoleDisplayName(activity.userRole)}
                        </span>
                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getActionColor(activity.action)}`}>
                          {getActionLabel(activity.action)}
                        </span>
                      </div>
                      <p className="text-sm text-[#0E1B33]">{activity.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-[#6B7280] mt-2">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      <span>{formatDate(activity.timestamp)}</span>
                    </div>
                    {activity.ipAddress && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">computer</span>
                        <span>{activity.ipAddress}</span>
                      </div>
                    )}
                    {activity.targetType && (
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">label</span>
                        <span className="capitalize">{activity.targetType}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
