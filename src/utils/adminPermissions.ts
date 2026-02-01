/**
 * Role Permissions & Access Control (REVISED)
 */

import { AdminUser, RolePermissions } from '@/types/admin-revised';

/**
 * Get permissions for a specific role
 */
export function getRolePermissions(role: AdminUser['role']): RolePermissions {
  switch (role) {
    case 'pic':
      return {
        // Member Management
        canApproveJoinRequest: true,
        canRejectJoinRequest: true,
        canViewMembers: true,
        canKickMember: true,
        canBroadcastMessage: true,
        
        // Finance
        canUpdateDanaUmum: true,
        canUpdateDanaInternal: true,
        canAddExpense: true,
        canApproveWithdrawal: false,
        canViewFinance: true,
        
        // Content
        canEditOverview: true,
        canPostUpdate: true,
        canUploadGallery: true,
        canModerateDiscussion: true,
        
        // Polling
        canCreatePoll: true,
        canClosePoll: true,
        
        // Delegation
        canDelegatePIC: true,
        
        // Project Management
        canCreateProject: false,
        canDeleteProject: false,
        canPublishProject: false,
        canReassignPIC: false,
        
        // User Management
        canViewUsers: false,
        canCreateUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canChangeRole: false,
        
        // System
        canViewActivityLog: true,
        canAccessSystemSettings: false,
        canExportData: true,
      };

    case 'moderator':
      return {
        // Member Management
        canApproveJoinRequest: true,
        canRejectJoinRequest: true,
        canViewMembers: true,
        canKickMember: true,
        canBroadcastMessage: true,
        
        // Finance
        canUpdateDanaUmum: true,
        canUpdateDanaInternal: true,
        canAddExpense: true,
        canApproveWithdrawal: true,
        canViewFinance: true,
        
        // Content
        canEditOverview: true,
        canPostUpdate: true,
        canUploadGallery: true,
        canModerateDiscussion: true,
        
        // Polling
        canCreatePoll: true,
        canClosePoll: true,
        
        // Delegation
        canDelegatePIC: false, // Can't force delegate, only PIC can resign
        
        // Project Management
        canCreateProject: true,
        canDeleteProject: false, // Can only deactivate
        canPublishProject: false,
        canReassignPIC: true,
        
        // User Management
        canViewUsers: true, // Only PICs they manage
        canCreateUsers: true, // Only create PICs
        canEditUsers: true, // Only PICs they manage
        canDeleteUsers: false,
        canChangeRole: false,
        
        // System
        canViewActivityLog: true,
        canAccessSystemSettings: false,
        canExportData: true,
      };

    case 'superadmin':
      return {
        // Full access to everything
        canApproveJoinRequest: true,
        canRejectJoinRequest: true,
        canViewMembers: true,
        canKickMember: true,
        canBroadcastMessage: true,
        canUpdateDanaUmum: true,
        canUpdateDanaInternal: true,
        canAddExpense: true,
        canApproveWithdrawal: true,
        canViewFinance: true,
        canEditOverview: true,
        canPostUpdate: true,
        canUploadGallery: true,
        canModerateDiscussion: true,
        canCreatePoll: true,
        canClosePoll: true,
        canDelegatePIC: true,
        canCreateProject: true,
        canDeleteProject: true,
        canPublishProject: true,
        canReassignPIC: true,
        canViewUsers: true,
        canCreateUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
        canChangeRole: true,
        canViewActivityLog: true,
        canAccessSystemSettings: true,
        canExportData: true,
      };

    default:
      // No permissions
      return {
        canApproveJoinRequest: false,
        canRejectJoinRequest: false,
        canViewMembers: false,
        canKickMember: false,
        canBroadcastMessage: false,
        canUpdateDanaUmum: false,
        canUpdateDanaInternal: false,
        canAddExpense: false,
        canApproveWithdrawal: false,
        canViewFinance: false,
        canEditOverview: false,
        canPostUpdate: false,
        canUploadGallery: false,
        canModerateDiscussion: false,
        canCreatePoll: false,
        canClosePoll: false,
        canDelegatePIC: false,
        canCreateProject: false,
        canDeleteProject: false,
        canPublishProject: false,
        canReassignPIC: false,
        canViewUsers: false,
        canCreateUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canChangeRole: false,
        canViewActivityLog: false,
        canAccessSystemSettings: false,
        canExportData: false,
      };
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  user: AdminUser,
  permission: keyof RolePermissions
): boolean {
  const permissions = getRolePermissions(user.role);
  return permissions[permission];
}

/**
 * Check if PIC can access specific project
 */
export function canAccessProject(user: AdminUser, projectId: string): boolean {
  if (user.role === 'superadmin') return true;
  
  if (user.role === 'pic') {
    return user.projectId === projectId;
  }
  
  // Moderator can access projects they supervise
  // This would check in real app, for now return true
  return true;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: AdminUser['role']): string {
  const names: Record<AdminUser['role'], string> = {
    pic: 'Project In Charge',
    moderator: 'Moderator',
    superadmin: 'Superadmin',
  };
  return names[role];
}

/**
 * Get role badge color
 */
export function getRoleBadgeColor(role: AdminUser['role']): string {
  const colors: Record<AdminUser['role'], string> = {
    pic: 'bg-blue-100 text-blue-800',
    moderator: 'bg-purple-100 text-purple-800',
    superadmin: 'bg-red-100 text-red-800',
  };
  return colors[role];
}

/**
 * Get commitment duration display
 */
export function getCommitmentDisplay(commitment: string): string {
  const displays: Record<string, string> = {
    '1_month': '1 Bulan',
    '3_months': '3 Bulan',
    '6_months': '6 Bulan',
    '1_year': '1 Tahun',
    'permanent': 'Permanent',
  };
  return displays[commitment] || commitment;
}

/**
 * Calculate commitment end date
 */
export function calculateCommitmentEndDate(startDate: string, commitment: string): string {
  const start = new Date(startDate);
  const months: Record<string, number> = {
    '1_month': 1,
    '3_months': 3,
    '6_months': 6,
    '1_year': 12,
    'permanent': 120, // 10 years for "permanent"
  };
  
  const monthsToAdd = months[commitment] || 12;
  start.setMonth(start.getMonth() + monthsToAdd);
  
  return start.toISOString();
}

/**
 * Format currency (IDR)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date
 */
export function formatDate(dateStr: string, format: 'short' | 'long' = 'short'): string {
  const date = new Date(dateStr);
  
  if (format === 'short') {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format relative time (e.g., "2 hari lalu")
 */
export function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return 'Baru saja';
  if (diffMinutes < 60) return `${diffMinutes} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
  return `${Math.floor(diffDays / 365)} tahun lalu`;
}

/**
 * Get status badge color
 */
export function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-orange-100 text-orange-800',
    draft: 'bg-gray-100 text-gray-800',
    open_volunteer: 'bg-blue-100 text-blue-800',
    running: 'bg-green-100 text-green-800',
    completed: 'bg-purple-100 text-purple-800',
    archived: 'bg-gray-100 text-gray-800',
    closed: 'bg-gray-100 text-gray-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get rating stars
 */
export function getRatingStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  let stars = '⭐'.repeat(fullStars);
  if (hasHalfStar) stars += '⭐';
  
  return stars;
}
