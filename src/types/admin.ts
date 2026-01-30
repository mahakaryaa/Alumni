/**
 * Admin Panel Types
 */

export type AdminRole = 'pic' | 'moderator' | 'superadmin';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  photo?: string;
  createdAt: string;
  lastLogin?: string;
  status: 'active' | 'inactive';
  managedBy?: string; // ID of moderator who manages this PIC
}

export interface Alumni {
  id: string;
  name: string;
  email: string;
  phone: string;
  angkatan: string;
  jurusan: string;
  pekerjaan?: string;
  perusahaan?: string;
  kota?: string;
  provinsi?: string;
  notes?: string;
  picId: string; // ID of PIC responsible for this alumni
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive';
  tags?: string[];
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: AdminRole;
  action: string;
  targetType: 'alumni' | 'user' | 'system';
  targetId?: string;
  description: string;
  timestamp: string;
  ipAddress?: string;
}

export interface DashboardStats {
  totalAlumni: number;
  activeAlumni: number;
  inactiveAlumni: number;
  totalUsers: number;
  recentActivities: ActivityLog[];
  alumniByAngkatan: {
    angkatan: string;
    count: number;
  }[];
  alumniByJurusan: {
    jurusan: string;
    count: number;
  }[];
}

export interface RolePermissions {
  canViewAllAlumni: boolean;
  canEditAllAlumni: boolean;
  canDeleteAlumni: boolean;
  canCreateAlumni: boolean;
  canViewAllUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canCreateUsers: boolean;
  canViewActivityLog: boolean;
  canExportData: boolean;
}
