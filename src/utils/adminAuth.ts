/**
 * Admin Authentication & Authorization Utilities
 */

import { AdminRole, AdminUser, RolePermissions } from '@/types/admin';

// Storage key for admin session
export const ADMIN_STORAGE_KEY = 'adminUser';

/**
 * Get current admin user from localStorage
 */
export function getCurrentAdminUser(): AdminUser | null {
  try {
    const stored = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Set current admin user to localStorage
 */
export function setCurrentAdminUser(user: AdminUser): void {
  localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(user));
}

/**
 * Clear admin session
 */
export function clearAdminSession(): void {
  localStorage.removeItem(ADMIN_STORAGE_KEY);
}

/**
 * Get permissions for a specific role
 */
export function getRolePermissions(role: AdminRole): RolePermissions {
  switch (role) {
    case 'superadmin':
      return {
        canViewAllAlumni: true,
        canEditAllAlumni: true,
        canDeleteAlumni: true,
        canCreateAlumni: true,
        canViewAllUsers: true,
        canEditUsers: true,
        canDeleteUsers: true,
        canCreateUsers: true,
        canViewActivityLog: true,
        canExportData: true,
      };
    
    case 'moderator':
      return {
        canViewAllAlumni: true, // Can view alumni from PICs they manage
        canEditAllAlumni: true, // Can edit alumni from PICs they manage
        canDeleteAlumni: false,
        canCreateAlumni: true,
        canViewAllUsers: true, // Can view PICs they manage
        canEditUsers: false,
        canDeleteUsers: false,
        canCreateUsers: false,
        canViewActivityLog: true,
        canExportData: true,
      };
    
    case 'pic':
      return {
        canViewAllAlumni: false, // Can only view their own alumni
        canEditAllAlumni: false, // Can only edit their own alumni
        canDeleteAlumni: false,
        canCreateAlumni: true,
        canViewAllUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canCreateUsers: false,
        canViewActivityLog: false,
        canExportData: true,
      };
    
    default:
      return {
        canViewAllAlumni: false,
        canEditAllAlumni: false,
        canDeleteAlumni: false,
        canCreateAlumni: false,
        canViewAllUsers: false,
        canEditUsers: false,
        canDeleteUsers: false,
        canCreateUsers: false,
        canViewActivityLog: false,
        canExportData: false,
      };
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  user: AdminUser | null,
  permission: keyof RolePermissions
): boolean {
  if (!user) return false;
  const permissions = getRolePermissions(user.role);
  return permissions[permission];
}

/**
 * Check if user can access specific alumni data
 */
export function canAccessAlumni(
  user: AdminUser | null,
  alumniPicId: string
): boolean {
  if (!user) return false;
  
  // Superadmin can access all
  if (user.role === 'superadmin') return true;
  
  // Moderator can access alumni from PICs they manage
  if (user.role === 'moderator') {
    // This would need to check if the PIC is managed by this moderator
    // For now, we'll return true for all moderators
    return true;
  }
  
  // PIC can only access their own alumni
  if (user.role === 'pic') {
    return user.id === alumniPicId;
  }
  
  return false;
}

/**
 * Check if user can manage another user
 */
export function canManageUser(
  currentUser: AdminUser | null,
  targetUser: AdminUser
): boolean {
  if (!currentUser) return false;
  
  // Superadmin can manage all users
  if (currentUser.role === 'superadmin') return true;
  
  // Moderator can manage PICs they supervise
  if (currentUser.role === 'moderator') {
    return targetUser.role === 'pic' && targetUser.managedBy === currentUser.id;
  }
  
  // PIC cannot manage other users
  return false;
}

/**
 * Get role display name
 */
export function getRoleDisplayName(role: AdminRole): string {
  const roleNames = {
    pic: 'PIC',
    moderator: 'Moderator',
    superadmin: 'Super Admin',
  };
  return roleNames[role] || role;
}

/**
 * Get role badge color
 */
export function getRoleBadgeColor(role: AdminRole): string {
  const colors = {
    pic: 'bg-blue-100 text-blue-800',
    moderator: 'bg-purple-100 text-purple-800',
    superadmin: 'bg-red-100 text-red-800',
  };
  return colors[role] || 'bg-gray-100 text-gray-800';
}
