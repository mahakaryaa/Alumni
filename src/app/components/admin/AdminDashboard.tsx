/**
 * Admin Dashboard - Main Component
 * Entry point for admin panel with role-based routing
 */

import { useState, useEffect } from 'react';
import { AdminUser } from '@/types/admin';
import { getCurrentAdminUser, clearAdminSession } from '@/utils/adminAuth';
import { mockDashboardStats, mockAlumni, mockAdminUsers, mockActivityLogs, getFilteredAlumni, getFilteredUsers } from '@/data/mockAdminData';
import { showToast } from '@/utils/toast';
import { AdminSidebar } from './AdminSidebar';
import { DashboardOverview } from './DashboardOverview';
import { AlumniManagement } from './AlumniManagement';
import { UserManagement } from './UserManagement';
import { ActivityLog } from './ActivityLog';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load current admin user
    const user = getCurrentAdminUser();
    if (!user) {
      showToast.error('Sesi tidak valid. Silakan login kembali');
      onBack();
      return;
    }
    setCurrentUser(user);
    setIsLoading(false);
  }, [onBack]);

  const handleLogout = () => {
    clearAdminSession();
    showToast.success('Logout berhasil');
    onBack();
  };

  const handleRefresh = () => {
    // In real app, this would reload data from API
    showToast.success('Data berhasil direfresh');
  };

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#243D68] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }

  // Get filtered data based on user role
  const filteredAlumni = getFilteredAlumni(currentUser.id, currentUser.role);
  const filteredUsers = getFilteredUsers(currentUser.id, currentUser.role);

  // Calculate stats based on filtered data
  const stats = {
    ...mockDashboardStats,
    totalAlumni: filteredAlumni.length,
    activeAlumni: filteredAlumni.filter(a => a.status === 'active').length,
    inactiveAlumni: filteredAlumni.filter(a => a.status === 'inactive').length,
    totalUsers: currentUser.role === 'superadmin' ? mockAdminUsers.length : filteredUsers.length,
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <AdminSidebar
        currentUser={currentUser}
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white px-6 md:px-8 py-4 border-b border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="overflow-hidden">
              <h1 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
                Admin Panel
              </h1>
              <p className="text-sm text-[#6B7280] overflow-hidden text-ellipsis whitespace-nowrap">AlMaqdisi Project Management System</p>
            </div>
            
            {/* Mobile Menu Toggle (if needed) */}
            <button className="lg:hidden p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[#243D68]">menu</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          {activeMenu === 'dashboard' && (
            <DashboardOverview currentUser={currentUser} stats={stats} />
          )}
          
          {activeMenu === 'alumni' && (
            <AlumniManagement
              currentUser={currentUser}
              alumniList={filteredAlumni}
              onRefresh={handleRefresh}
            />
          )}
          
          {activeMenu === 'users' && (
            <UserManagement
              currentUser={currentUser}
              userList={filteredUsers}
              onRefresh={handleRefresh}
            />
          )}
          
          {activeMenu === 'activity' && (
            <ActivityLog
              currentUser={currentUser}
              activities={mockActivityLogs}
            />
          )}
        </div>
      </div>
    </div>
  );
}