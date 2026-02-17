/**
 * Admin Panel Main Component (REVISED)
 * Entry point for admin panel with PIC focus
 */

import { useState, useEffect } from 'react';
import { AdminUser } from '@/types/admin-revised';
import { AdminSidebarRevised } from './AdminSidebarRevised';
import { AdminLoginRevised } from './AdminLoginRevised';
import { PICDashboard } from './PICDashboard';
import { ProjectFinance } from './ProjectFinance';
import { ContentManagement } from './ContentManagement';
import { PollingManagement } from './PollingManagement';
import { PICDelegation } from './PICDelegation';
import { ActivityLog } from './ActivityLog';
import { ModeratorDashboard } from './ModeratorDashboard';
import { ModeratorFinance } from './ModeratorFinance';
import { ModeratorContent } from './ModeratorContent';
import { ModeratorActivityLog } from './ModeratorActivityLog';
import { AlumniDataManagement } from './AlumniDataManagement';
import { SuperadminFinancialDashboard } from './SuperadminFinancialDashboard';
import { DonationVerification } from './DonationVerification';
import { WalletManagement } from './WalletManagement';
import { showToast } from '@/utils/toast';
import { getProjectByPIC, calculateDashboardStats } from '@/data/mockAdminDataRevised';
import { getCurrentAdminUser, clearAdminSession } from '@/utils/adminAuthRevised';

interface AdminPanelRevisedProps {
  onBack: () => void;
}

type ActivePage = 
  | 'dashboard'
  | 'financial-dashboard'
  | 'donation-verification'
  | 'wallet-management'
  | 'alumni-data'
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const handleNavigate = (page: string) => {
    setActivePage(page as ActivePage);
    setIsMobileSidebarOpen(false); // Close sidebar after navigation on mobile
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

  // For moderator and superadmin - get overview of all projects
  const allProjects = currentUser.role !== 'pic' 
    ? [1, 2, 3] // Mock: All project IDs for moderator/superadmin
    : [];
  
  const moderatorStats = currentUser.role === 'moderator' || currentUser.role === 'superadmin'
    ? {
        totalProjects: 3,
        activeMembers: 42,
        pendingRequests: 7,
        totalDonations: 125000000,
        recentActivities: 15,
      }
    : null;

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <AdminSidebarRevised
        currentUser={currentUser}
        activePage={activePage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
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
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[#243D68]">menu</span>
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 md:p-8">
          {/* Dashboard */}
          {activePage === 'dashboard' && currentUser.role === 'pic' && stats && (
            <PICDashboard
              currentUser={currentUser}
              stats={stats}
              onNavigate={handleNavigate}
            />
          )}

          {activePage === 'dashboard' && (currentUser.role === 'moderator' || currentUser.role === 'superadmin') && (
            <ModeratorDashboard
              currentUser={currentUser}
              onNavigate={handleNavigate}
            />
          )}

          {/* Finance */}
          {activePage === 'finance' && currentUser.role === 'pic' && project && (
            <ProjectFinance
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'finance' && (currentUser.role === 'moderator' || currentUser.role === 'superadmin') && (
            <ModeratorFinance
              currentUser={currentUser}
            />
          )}

          {/* Content */}
          {activePage === 'content' && currentUser.role === 'pic' && project && (
            <ContentManagement
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'content' && (currentUser.role === 'moderator' || currentUser.role === 'superadmin') && (
            <ModeratorContent
              currentUser={currentUser}
            />
          )}

          {/* Activity Log */}
          {activePage === 'activity-log' && currentUser.role === 'pic' && project && (
            <ActivityLog
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'activity-log' && (currentUser.role === 'moderator' || currentUser.role === 'superadmin') && (
            <ModeratorActivityLog
              currentUser={currentUser}
            />
          )}

          {/* PIC Only Pages */}
          {activePage === 'polling' && project && (
            <PollingManagement
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {activePage === 'delegation' && project && (
            <PICDelegation
              currentUser={currentUser}
              projectId={project.id}
            />
          )}

          {/* Alumni Data Management */}
          {activePage === 'alumni-data' && (
            <AlumniDataManagement
              currentUser={currentUser}
            />
          )}

          {/* Financial Dashboard (Superadmin Only) */}
          {activePage === 'financial-dashboard' && currentUser.role === 'superadmin' && (
            <SuperadminFinancialDashboard />
          )}

          {/* Donation Verification (Superadmin Only) */}
          {activePage === 'donation-verification' && currentUser.role === 'superadmin' && (
            <DonationVerification currentUser={currentUser} />
          )}

          {/* Wallet Management (Superadmin Only) */}
          {activePage === 'wallet-management' && currentUser.role === 'superadmin' && (
            <WalletManagement currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
}