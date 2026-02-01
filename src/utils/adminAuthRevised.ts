/**
 * Admin Authentication & Session Management (REVISED)
 */

import { AdminUser } from '@/types/admin-revised';
import { mockAdminUsers } from '@/data/mockAdminDataRevised';

const ADMIN_SESSION_KEY = 'almaqdisi_admin_session';

interface AdminSession {
  userId: string;
  role: AdminUser['role'];
  projectId?: string;
  loginAt: string;
  expiresAt: string;
}

/**
 * Login admin user
 */
export function loginAdmin(email: string, password: string): AdminUser | null {
  // Mock authentication - in production, this would call API
  const user = mockAdminUsers.find(u => u.email === email && u.status === 'active');
  
  if (!user) {
    return null;
  }

  // Mock password check - in production, check hashed password
  // For demo, accept any password or specific test passwords
  const validPasswords: Record<string, string> = {
    'ahmad.zaki@almaqdisi.org': 'superadmin123',
    'siti.nurhaliza@almaqdisi.org': 'moderator123',
    'budi.santoso@almaqdisi.org': 'moderator123',
    'fatimah.azzahra@almaqdisi.org': 'pic123',
    'muhammad.ridwan@almaqdisi.org': 'pic123',
    'aminah.hasan@almaqdisi.org': 'pic123',
  };

  if (validPasswords[email] !== password) {
    return null;
  }

  // Create session
  const session: AdminSession = {
    userId: user.id,
    role: user.role,
    projectId: user.projectId,
    loginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8 hours
  };

  // Save session to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  }

  // Update last login
  user.lastLogin = new Date().toISOString();

  return user;
}

/**
 * Get current admin user from session
 */
export function getCurrentAdminUser(): AdminUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const sessionStr = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!sessionStr) {
    return null;
  }

  try {
    const session: AdminSession = JSON.parse(sessionStr);

    // Check if session expired
    if (new Date(session.expiresAt) < new Date()) {
      clearAdminSession();
      return null;
    }

    // Get user data
    const user = mockAdminUsers.find(u => u.id === session.userId);
    if (!user || user.status !== 'active') {
      clearAdminSession();
      return null;
    }

    return user;
  } catch {
    clearAdminSession();
    return null;
  }
}

/**
 * Clear admin session (logout)
 */
export function clearAdminSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ADMIN_SESSION_KEY);
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getCurrentAdminUser() !== null;
}

/**
 * Check if user has specific role
 */
export function hasRole(role: AdminUser['role'] | AdminUser['role'][]): boolean {
  const user = getCurrentAdminUser();
  if (!user) return false;

  if (Array.isArray(role)) {
    return role.includes(user.role);
  }

  return user.role === role;
}

/**
 * Extend session (refresh expiry)
 */
export function extendSession(): void {
  if (typeof window === 'undefined') return;

  const sessionStr = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!sessionStr) return;

  try {
    const session: AdminSession = JSON.parse(sessionStr);
    session.expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  } catch {
    // Ignore errors
  }
}
