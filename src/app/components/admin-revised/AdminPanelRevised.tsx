/**
 * Admin Panel Main Component (REVISED)
 * Entry point for admin panel with PIC focus
 */

import { useState, useEffect } from 'react';
import { AdminUser } from '@/types/admin-revised';
import { AdminSidebarRevised } from './AdminSidebarRevised';
import { AdminLoginRevised } from './AdminLoginRevised';
import { PICDashboard } from './PICDashboard';
import { PendingRequests } from './PendingRequests';
import { MemberManagement } from './MemberManagement';
import { ProjectFinance } from './ProjectFinance';
import { ContentManagement } from './ContentManagement';
import { PollingManagement } from './PollingManagement';
import { showToast } from '@/utils/toast';
import { getProjectByPIC, calculateDashboardStats } from '@/data/mockAdminDataRevised';
import { getCurrentAdminUser, clearAdminSession } from '@/utils/adminAuth';

interface AdminPanelRevisedProps {
  onBack: () => void;
}

type ActivePage = 
  | 'dashboard'
  | 'pending-requests'
  | 'members'
  | 'finance'
  | 'content'
  | 'polling'
  | 'delegation'
  | 'activity-log';

export function AdminPanelRevised({ onBack }: AdminPanelRevisedProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const user = getCurrentAdminUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    const user = getCurrentAdminUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setActivePage('dashboard');
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    showToast.success('Logout berhasil');
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActivePage('dashboard');
    onBack();
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9FA]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#243D68] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading...</p>
        </div>
      </div>
    );
  }

  // Login screen
  if (!isLoggedIn || !currentUser) {
    return <AdminLoginRevised onLoginSuccess={handleLoginSuccess} onBack={onBack} />;
  }

  // Get project and stats for PIC
  const project = currentUser.role === 'pic' && currentUser.projectId 
    ? getProjectByPIC(currentUser.id)
    : null;

  const stats = project 
    ? calculateDashboardStats(project.id)
    : null;

  // PIC must have a project
  if (currentUser.role === 'pic' && !project) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-red-600 text-3xl">error</span>
          </div>
          <h2 className="font-semibold text-xl text-[#0E1B33] mb-2">Project Tidak Ditemukan</h2>
          <p className="text-[#6B7280] mb-6">
            Anda belum ditugaskan ke project manapun. Silakan hubungi Moderator atau Superadmin.
          </p>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-[#243D68] text-white rounded-lg hover:bg-[#1a2d4d] transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <AdminSidebarRevised
        currentUser={currentUser}
        activePage={activePage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white px-6 md:px-8 py-4 border-b border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-['Archivo_Black'] text-xl uppercase text-[#0E1B33]">
                {currentUser.role === 'pic' ? 'Project Management' : 'Admin Panel'}
              </h1>
              <p className="text-sm text-[#6B7280]">
                {currentUser.name} • {currentUser.role === 'pic' ? 'Project In Charge' : currentUser.role}
              </p>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors">
              <span className="material-symbols-outlined text-[#243D68]">menu</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 md:p-8">
          {activePage === 'dashboard' && stats && (
            <PICDashboard
              currentUser={currentUser}
              stats={stats}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'pending-requests' && project && (
            <PendingRequests
              currentUser={currentUser}
              projectId={project.id}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'members' && project && (
            <MemberManagement
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'finance' && project && (
            <ProjectFinance
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'polling' && project && (
            <PollingManagement
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'content' && project && (
            <ContentManagement
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {/* Placeholder for other pages */}
          {activePage === 'delegation' && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-[#6B7280] mb-4">construction</span>
              <h2 className="font-semibold text-xl text-[#0E1B33] mb-2">Coming Soon</h2>
              <p className="text-[#6B7280]">Delegation page is under construction</p>
            </div>
          )}

          {activePage === 'activity-log' && (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-6xl text-[#6B7280] mb-4">construction</span>
              <h2 className="font-semibold text-xl text-[#0E1B33] mb-2">Coming Soon</h2>
              <p className="text-[#6B7280]">Activity Log page is under construction</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}