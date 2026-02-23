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
import { PendingRequests } from './PendingRequests';
import { ActivityLog } from './ActivityLog';
import { CampaignDashboard } from '@/components/campaign/CampaignDashboard';
import { ModeratorDashboard } from './ModeratorDashboard';
import { ModeratorFinance } from './ModeratorFinance';
import { ModeratorContent } from './ModeratorContent';
import { ModeratorActivityLog } from './ModeratorActivityLog';
import { AlumniDataManagement } from './AlumniDataManagement';
import { SuperadminFinancialDashboard } from './SuperadminFinancialDashboard';
import { DonationVerification } from './DonationVerification';
import { WalletManagement } from './WalletManagement';
import { WithdrawalRequest } from './WithdrawalRequest';
import { WithdrawalApproval } from './WithdrawalApproval';
import { EventRegistrationApproval } from './EventRegistrationApproval';
import { ProjectClosureManagement } from './ProjectClosureManagement';
import { showToast } from '@/utils/toast';
import { getProjectByPIC, calculateDashboardStats } from '@/data/mockAdminDataRevised';
import { getCurrentAdminUser, clearAdminSession } from '@/utils/adminAuthRevised';
import type { Donation, JoinRequest, Notification, Withdrawal, EventRegistration } from '@/types';
import type { ProjectWallet, WalletTransaction } from '@/types/admin-revised';

interface AdminPanelRevisedProps {
  onBack?: () => void;
  onLogout?: () => void;
  // FASE 1 & 2: Props untuk global state management
  donations?: Donation[];
  joinRequests?: JoinRequest[];
  notifications?: Notification[];
  withdrawals?: Withdrawal[];
  projectWallets?: ProjectWallet[];
  walletTransactions?: WalletTransaction[];
  onDonationStatusUpdate?: (donationId: string, status: 'approved' | 'rejected', reason?: string, verifiedBy?: string) => void;
  onJoinRequestStatusUpdate?: (
    requestId: string, 
    status: 'approved' | 'rejected', 
    reason?: string, 
    reviewedBy?: string, 
    reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin',
    approvalMessage?: string
  ) => void;
  onWithdrawalSubmitted?: (withdrawal: Withdrawal) => void;
  onWithdrawalApproved?: (withdrawalId: string, note?: string, approvedBy?: string) => void;
  onWithdrawalRejected?: (withdrawalId: string, reason: string, rejectedBy?: string) => void;
  // FASE 2C: Event Registration
  eventRegistrations?: EventRegistration[];
  onEventRegistrationStatusUpdate?: (
    registrationId: string,
    status: 'approved' | 'rejected',
    reason?: string,
    reviewedBy?: string,
    reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin',
    approvalMessage?: string
  ) => void;
  // FASE 3: Content & Task notifications
  onContentPublished?: (projectId: string, projectTitle: string, updateTitle: string, updateType: string, createdByName: string) => void;
  onTaskAssigned?: (taskId: string, assignedToId: string, assignedToName: string, taskTitle: string, projectId: string, projectTitle: string, dueDate: string, priority: string) => void;
  onTaskStatusUpdated?: (taskId: string, newStatus: string, taskTitle: string, assignedByName: string, projectId: string) => void;
  // FASE 3A: Content Removal Notification
  onContentRemoved?: (contentId: string, contentTitle: string, projectId: string, projectTitle: string, picId: string, picName: string, removalReason: string, removedBy: string) => void;
  // FASE 3B: Project Closure Flow
  onProjectCloseRequested?: (projectId: string, projectTitle: string, reason: string, finalReport: string, picName: string) => void;
  onProjectClosureApproved?: (projectId: string, projectTitle: string, approvedBy: string, note?: string) => void;
  onProjectClosureRejected?: (projectId: string, projectTitle: string, reason: string, rejectedBy: string) => void;
  // FASE 3C: Alumni Verification
  onAlumniAdded?: (alumniId: string, alumniName: string, alumniEmail: string, addedBy: string) => void;
  // FASE 4: Polling Notifications
  onPollCreated?: (pollId: string, pollQuestion: string, projectId: string, projectTitle: string, deadline: string, createdByName: string) => void;
  onPollClosed?: (pollId: string, pollQuestion: string, projectId: string, projectTitle: string, totalVoters: number, closedByName: string) => void;
  onPollDeadlineReminder?: (pollId: string, pollQuestion: string, projectId: string, projectTitle: string, deadline: string) => void;
}

type ActivePage = 
  | 'dashboard'
  | 'campaign-management'
  | 'financial-dashboard'
  | 'donation-verification'
  | 'wallet-management'
  | 'alumni-data'
  | 'finance'
  | 'withdrawal-request'
  | 'withdrawal-approval'
  | 'pending-requests'
  | 'event-registration-approval'
  | 'project-closure'
  | 'content'
  | 'polling'
  | 'delegation'
  | 'activity-log';

export function AdminPanelRevised({ 
  onBack, 
  onLogout,
  donations = [],
  joinRequests = [],
  notifications = [],
  withdrawals = [],
  projectWallets = [],
  walletTransactions = [],
  onDonationStatusUpdate,
  onJoinRequestStatusUpdate,
  onWithdrawalSubmitted,
  onWithdrawalApproved,
  onWithdrawalRejected,
  eventRegistrations = [],
  onEventRegistrationStatusUpdate,
  onContentPublished,
  onTaskAssigned,
  onTaskStatusUpdated,
  onContentRemoved,
  onProjectCloseRequested,
  onProjectClosureApproved,
  onProjectClosureRejected,
  onAlumniAdded,
  onPollCreated,
  onPollClosed,
  onPollDeadlineReminder,
}: AdminPanelRevisedProps) {
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
    
    // Call onLogout if provided, otherwise call onBack
    if (onLogout) {
      onLogout();
    } else if (onBack) {
      onBack();
    }
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

          {/* Campaign Management */}
          {activePage === 'campaign-management' && (
            <CampaignDashboard currentUserId={currentUser.id} />
          )}

          {/* Finance */}
          {activePage === 'finance' && currentUser.role === 'pic' && project && (
            <ProjectFinance
              currentUser={currentUser}
              projectId={project.id}
              onNavigateToWithdrawal={() => setActivePage('withdrawal-request')}
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
              onContentPublished={onContentPublished}
            />
          )}

          {activePage === 'content' && (currentUser.role === 'moderator' || currentUser.role === 'superadmin') && (
            <ModeratorContent
              currentUser={currentUser}
              onContentRemoved={onContentRemoved}
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
              projectTitle={project.title}
              onPollCreated={onPollCreated}
              onPollClosed={onPollClosed}
              onPollDeadlineReminder={onPollDeadlineReminder}
            />
          )}

          {activePage === 'delegation' && project && (
            <PICDelegation
              currentUser={currentUser}
              projectId={project.id}
              onTaskAssigned={onTaskAssigned}
              onTaskStatusUpdated={onTaskStatusUpdated}
            />
          )}

          {/* Alumni Data Management */}
          {activePage === 'alumni-data' && (
            <AlumniDataManagement
              currentUser={currentUser}
              onAlumniAdded={onAlumniAdded}
            />
          )}

          {/* Financial Dashboard (Superadmin Only) */}
          {activePage === 'financial-dashboard' && currentUser.role === 'superadmin' && (
            <SuperadminFinancialDashboard />
          )}

          {/* FASE 2: Donation Verification (Superadmin Only) */}
          {activePage === 'donation-verification' && currentUser.role === 'superadmin' && (
            <DonationVerification 
              currentUser={currentUser} 
              donations={donations}
              onApprove={(donationId, verificationNote, verifiedBy) => {
                onDonationStatusUpdate?.(donationId, 'approved', verificationNote, verifiedBy);
              }}
              onReject={(donationId, reason, verifiedBy) => {
                onDonationStatusUpdate?.(donationId, 'rejected', reason, verifiedBy);
              }}
            />
          )}

          {/* FASE 2: Wallet Management (Superadmin Only) */}
          {activePage === 'wallet-management' && currentUser.role === 'superadmin' && (
            <WalletManagement 
              currentUser={currentUser}
              projectWallets={projectWallets}
              walletTransactions={walletTransactions}
            />
          )}

          {/* Withdrawal Request (PIC Only) */}
          {activePage === 'withdrawal-request' && currentUser.role === 'pic' && project && (
            <WithdrawalRequest
              onBack={() => setActivePage('finance')}
              picId={currentUser.id}
              picName={currentUser.name}
              projectId={project.id}
              projectTitle={project.title}
              availableBalance={stats?.totalBalance || 0}
              onWithdrawalSubmit={(withdrawal) => {
                onWithdrawalSubmitted?.(withdrawal);
                showToast.success('Permintaan penarikan berhasil dikirim');
              }}
            />
          )}

          {/* Withdrawal Approval (Moderator & Superadmin) */}
          {activePage === 'withdrawal-approval' && (currentUser.role === 'moderator' || currentUser.role === 'superadmin') && (
            <WithdrawalApproval
              role={currentUser.role}
              withdrawals={withdrawals}
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
              onApprove={(withdrawalId, note) => {
                onWithdrawalApproved?.(withdrawalId, note, `${currentUser.role}: ${currentUser.name}`);
              }}
              onReject={(withdrawalId, reason) => {
                onWithdrawalRejected?.(withdrawalId, reason, `${currentUser.role}: ${currentUser.name}`);
              }}
            />
          )}

          {/* Pending Join Requests (PIC, Moderator, Superadmin) */}
          {activePage === 'pending-requests' && (
            <PendingRequests
              currentUser={currentUser}
              projectId={currentUser.role === 'pic' && project ? project.id : undefined}
              onNavigate={handleNavigate}
              joinRequests={joinRequests}
              onApprove={(requestId, approvalMessage) => {
                // Pass reviewer info and approval message
                onJoinRequestStatusUpdate?.(
                  requestId, 
                  'approved', 
                  undefined, 
                  currentUser.email,
                  currentUser.role === 'pic' ? 'PIC' : currentUser.role === 'moderator' ? 'Moderator' : 'Superadmin',
                  approvalMessage
                );
              }}
              onReject={(requestId, reason) => {
                // Pass reviewer info and rejection reason
                onJoinRequestStatusUpdate?.(
                  requestId, 
                  'rejected', 
                  reason, 
                  currentUser.email,
                  currentUser.role === 'pic' ? 'PIC' : currentUser.role === 'moderator' ? 'Moderator' : 'Superadmin'
                );
              }}
            />
          )}

          {/* FASE 2C: Event Registration Approval */}
          {activePage === 'event-registration-approval' && (
            <EventRegistrationApproval
              registrations={eventRegistrations}
              onApprove={(registrationId, message, reviewedBy, reviewedByRole) => {
                onEventRegistrationStatusUpdate?.(
                  registrationId,
                  'approved',
                  undefined,
                  reviewedBy,
                  reviewedByRole === 'PIC' ? 'PIC' : reviewedByRole === 'Moderator' ? 'Moderator' : 'Superadmin',
                  message
                );
              }}
              onReject={(registrationId, reason, reviewedBy, reviewedByRole) => {
                onEventRegistrationStatusUpdate?.(
                  registrationId,
                  'rejected',
                  reason,
                  reviewedBy,
                  reviewedByRole === 'PIC' ? 'PIC' : reviewedByRole === 'Moderator' ? 'Moderator' : 'Superadmin'
                );
              }}
              currentAdminName={currentUser.name}
              currentAdminRole={currentUser.role}
            />
          )}

          {/* FASE 3B: Project Closure Flow */}
          {activePage === 'project-closure' && (
            <ProjectClosureManagement
              currentUser={currentUser}
              projectId={project?.id}
              projectTitle={project?.title}
              onProjectCloseRequested={onProjectCloseRequested}
              onProjectClosureApproved={onProjectClosureApproved}
              onProjectClosureRejected={onProjectClosureRejected}
            />
          )}
        </div>
      </div>
    </div>
  );
}