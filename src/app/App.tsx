import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import type { Donation, JoinRequest, Notification, Withdrawal, EventRegistration } from '@/types';
import type { ProjectWallet, WalletTransaction } from '@/types/admin-revised';

// Translation system
import { getTranslation, type Language } from '@/translations';
import { LanguageContext } from '@/hooks/useTranslation';

// Component imports
import { Login } from './components/Login';
import { ProjectDetailAlumni } from './components/ProjectDetailAlumni';
import { ProjectDetail } from './components/ProjectDetail';
import { ExploreProject } from './components/ExploreProject';
import { AlumniStoryDetail } from './components/AlumniStoryDetail';
import { EventDetail } from './components/EventDetail';
import { MessagesAlumni } from './components/MessagesAlumni';
import { MessagePage } from './components/MessagePage';
import { SettingsPage } from './components/SettingsPage';
import { DonationPage } from './components/DonationPage';
import { AdminLoginRevised } from './components/admin-revised/AdminLoginRevised';
import { AdminPanelRevised } from './components/admin-revised/AdminPanelRevised';
import { MyDonations } from './components/MyDonations';
import { MyJoinRequests } from './components/MyJoinRequests';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Logo } from './components/Logo';
import { LoginWidget } from './components/LoginWidget';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { NotificationCenter } from './components/NotificationCenter';
import { QuoteSection } from './components/QuoteSection';
import { CampaignProvider } from '@/context/CampaignContext';
import { CampaignDashboard } from '@/components/campaign/CampaignDashboard';
import { CampaignList } from '@/components/campaign/CampaignList';
import { CampaignDetail } from '@/components/campaign/CampaignDetail';

// Import mock data for initial wallet state
import { mockProjectWallets } from '@/data/mockFinancialData';

// Import images (using unsplash - updated for better reliability)
const heroImage = 'https://images.unsplash.com/photo-1594970483994-d1dc35c12b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbCUyMGFxc2ElMjBtb3NxdWUlMjBqZXJ1c2FsZW0lMjBkb21lfGVufDF8fHx8MTc3MTM3OTMzNnww&ixlib=rb-4.1.0&q=80&w=1080';

// LocalStorage keys
const STORAGE_KEYS = {
  USER_ROLE: 'almaqdisi_user_role',
};

// Toast messages
const toastMessages = {
  logout: {
    success: () => console.log('Logout berhasil'),
  },
};

function AppContent() {
  const [activeNav, setActiveNav] = useState('home');
  const [currentView, setCurrentView] = useState<'home' | 'project-detail' | 'explore' | 'alumni-story' | 'login' | 'event-detail' | 'messages' | 'settings' | 'donation' | 'admin-panel-revised' | 'admin-login-revised' | 'my-donations' | 'my-join-requests' | 'notification-center' | 'campaigns' | 'admin-campaigns' | 'campaign-detail'>('home');
  const [exploreInitialTab, setExploreInitialTab] = useState<'open' | 'galeri' | 'campaign'>('open');
  const [projectDetailInitialTab, setProjectDetailInitialTab] = useState<'overview' | 'progress' | 'members' | 'discussion' | 'wallet'>('overview');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  
  // User role with localStorage persistence
  const [userRole, setUserRole] = useState<'donatur' | 'alumni' | 'alumni-guest' | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    return saved as 'donatur' | 'alumni' | 'alumni-guest' | null;
  });

  // Login widget state
  const [showLoginWidget, setShowLoginWidget] = useState(false);

  // Notification count - dynamic dari notifications state (dihitung saat render)

  // Category filter state
  const [activeCategory, setActiveCategory] = useState<'semua' | 'pendidikan' | 'lingkungan' | 'kesehatan'>('semua');

  // Advanced Filter Modal State
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    status: [] as string[], // 'aktif', 'mendesak', 'selesai'
    location: [] as string[], // 'gaza', 'palestine', 'indonesia', 'global'
    minAmount: '',
    maxAmount: '',
    projectType: [] as string[], // 'open', 'donation', 'campaign'
  });

  // Mock user joined projects state (untuk demo)
  // Set ke true jika alumni sudah pernah join project, false jika belum
  const [hasJoinedProjects, setHasJoinedProjects] = useState(true); // Default: true untuk demo joined state

  // ==============================
  // FASE 1 & 2: GLOBAL STATE MANAGEMENT
  // State untuk tracking donations, join requests, notifications, withdrawals, wallets
  // ==============================
  
  // Donations state - Semua donation yang di-submit
  const [donations, setDonations] = useState<Donation[]>([]);
  
  // Join Requests state - Semua join request dari alumni
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  
  // Notifications state - Semua notifikasi untuk users
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Withdrawals state - Semua withdrawal request dari PIC
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  
  // FASE 2: Project Wallets state - Initialize dari mock data
  const [projectWallets, setProjectWallets] = useState<ProjectWallet[]>(mockProjectWallets);
  
  // FASE 2: Wallet Transactions state
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);

  // FASE 2C: Event Registrations state
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);

  // Language state - persisted in localStorage
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('almaqdisi_language');
    return (saved as Language) || 'id';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('almaqdisi_language', language);
  }, [language]);

  // Close filter modal on ESC key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showFilterModal) {
        setShowFilterModal(false);
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [showFilterModal]);

  // Get translations for current language
  const t = getTranslation(language);

  // ==============================
  // FASE 1: HANDLERS FOR STATE UPDATES
  // ==============================

  // Handler: Donation submitted dari DonationPage
  const handleDonationSubmitted = (donation: Donation) => {
    setDonations(prev => [...prev, donation]);
    
    // Create notification untuk donatur
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: donation.donorId || 'anonymous',
      type: 'donation_approved',
      title: 'Donasi Berhasil Dikirim',
      message: `Donasi Anda untuk ${donation.projectTitle} sebesar Rp ${donation.amount.toLocaleString('id-ID')} sedang dalam proses verifikasi.`,
      link: `/donations/${donation.id}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // FASE 2: Handler - Donation approved/rejected dengan Wallet Update
  const handleDonationStatusUpdate = (
    donationId: string, 
    status: 'approved' | 'rejected', 
    reason?: string,
    verifiedBy?: string
  ) => {
    // Update donation status
    setDonations(prev => 
      prev.map(d => 
        d.id === donationId 
          ? { 
              ...d, 
              status, 
              verifiedAt: new Date().toISOString(),
              verifiedBy,
              rejectionReason: reason 
            }
          : d
      )
    );

    // Get donation info
    const donation = donations.find(d => d.id === donationId);
    if (!donation) return;

    // FASE 2: Update Project Wallet jika approved
    if (status === 'approved') {
      setProjectWallets(prev => 
        prev.map(wallet => {
          if (wallet.projectId === donation.projectId) {
            const newBalance = wallet.balance + donation.amount;
            const newTotalIncome = wallet.totalIncome + donation.amount;
            const newTotalPending = wallet.totalPending - donation.amount;

            // Create wallet transaction record
            const transaction: WalletTransaction = {
              id: `wtrans-${Date.now()}-${donationId}`,
              walletId: wallet.id,
              projectId: wallet.projectId,
              type: 'income',
              amount: donation.amount,
              balanceBefore: wallet.balance,
              balanceAfter: newBalance,
              source: donation.donorName || (donation.isAnonymous ? 'Hamba Allah' : 'Donatur Anonim'),
              description: donation.message || `Donasi untuk ${wallet.projectTitle}`,
              reference: donationId,
              createdBy: verifiedBy,
              createdByName: 'Superadmin',
              createdAt: new Date().toISOString()
            };
            
            // Add transaction to wallet transactions
            setWalletTransactions(prevTrans => [...prevTrans, transaction]);

            return {
              ...wallet,
              balance: newBalance,
              totalIncome: newTotalIncome,
              totalPending: Math.max(0, newTotalPending),
              lastTransactionAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
          }
          return wallet;
        })
      );
    }

    // Create notification untuk donatur
    const notification: Notification = {
      id: `notif-${Date.now()}-${donationId}`,
      userId: donation.donorId || 'anonymous',
      type: status === 'approved' ? 'donation_approved' : 'donation_rejected',
      title: status === 'approved' ? 'Donasi Disetujui! 🎉' : 'Donasi Ditolak',
      message: status === 'approved' 
        ? `Donasi Anda untuk ${donation.projectTitle} sebesar Rp ${donation.amount.toLocaleString('id-ID')} telah diverifikasi dan disetujui!`
        : `Donasi Anda untuk ${donation.projectTitle} ditolak. Alasan: ${reason}`,
      link: `/donations/${donationId}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Join Request submitted dari ProjectDetailAlumni
  const handleJoinRequestSubmitted = (joinRequest: JoinRequest) => {
    setJoinRequests(prev => [...prev, joinRequest]);
    
    // Create notification
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: joinRequest.alumniId,
      type: 'join_approved',
      title: 'Permintaan Bergabung Dikirim',
      message: `Permintaan Anda untuk bergabung ke ${joinRequest.projectTitle} sedang dalam peninjauan.`,
      link: `/projects/${joinRequest.projectId}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // FASE 2B: Handler - Join Request approved/rejected dengan Automatic Role Assignment
  const handleJoinRequestStatusUpdate = (
    requestId: string,
    status: 'approved' | 'rejected',
    reason?: string,
    reviewedBy?: string,
    reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin',
    approvalMessage?: string
  ) => {
    setJoinRequests(prev =>
      prev.map(r =>
        r.id === requestId
          ? {
              ...r,
              status,
              reviewedAt: new Date().toISOString(),
              reviewedBy,
              reviewedByRole,
              approvalMessage,
              rejectionReason: reason,
              rejectionAllowResubmit: status === 'rejected',
              // FASE 2B: Automatic Role Assignment saat approved
              assignedRole: status === 'approved' ? ('member' as const) : undefined
            }
          : r
      )
    );

    // Create notification
    const request = joinRequests.find(r => r.id === requestId);
    if (request) {
      const notification: Notification = {
        id: `notif-${Date.now()}-${requestId}`,
        userId: request.alumniId,
        type: status === 'approved' ? 'join_approved' : 'join_rejected',
        title: status === 'approved' ? 'Permintaan Disetujui! 🎉' : 'Permintaan Ditolak',
        message: status === 'approved'
          ? `Selamat! Anda telah diterima sebagai member ${request.projectTitle}. ${approvalMessage || 'Selamat bergabung dan berkontribusi!'}`
          : `Permintaan Anda untuk bergabung ke ${request.projectTitle} ditolak. ${reason ? `Alasan: ${reason}. ` : ''}Anda dapat mengajukan kembali setelah 30 hari.`,
        link: `/projects/${request.projectId}`,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  // Handler: Withdrawal submitted dari PIC
  const handleWithdrawalSubmitted = (withdrawal: Withdrawal) => {
    setWithdrawals(prev => [...prev, withdrawal]);
    
    // Create notification untuk PIC
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      userId: withdrawal.picId,
      type: 'withdrawal_approved',
      title: 'Permintaan Penarikan Dikirim',
      message: `Permintaan penarikan dana sebesar Rp ${withdrawal.amount.toLocaleString('id-ID')} untuk ${withdrawal.projectTitle} sedang dalam peninjauan Moderator.`,
      link: `/admin/withdrawals/${withdrawal.id}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Withdrawal approved dari Moderator atau Superadmin
  const handleWithdrawalApproved = (
    withdrawalId: string,
    note?: string,
    approvedBy?: string
  ) => {
    const withdrawal = withdrawals.find(w => w.id === withdrawalId);
    if (!withdrawal) return;

    setWithdrawals(prev =>
      prev.map(w =>
        w.id === withdrawalId
          ? {
              ...w,
              status: 'approved' as const,
              processedAt: new Date().toISOString(),
              processedBy: approvedBy,
              approvalNote: note
            }
          : w
      )
    );

    // Determine if this is moderator or superadmin approval
    const isSuperadminApproval = approvedBy?.includes('Superadmin');
    
    // Create notification untuk PIC
    const notification: Notification = {
      id: `notif-${Date.now()}-${withdrawalId}`,
      userId: withdrawal.picId,
      type: 'withdrawal_approved',
      title: isSuperadminApproval ? 'Penarikan Dana Disetujui! 🎉' : 'Menunggu Approval Superadmin',
      message: isSuperadminApproval
        ? `Permintaan penarikan dana sebesar Rp ${withdrawal.amount.toLocaleString('id-ID')} untuk ${withdrawal.projectTitle} telah disetujui Superadmin. Dana akan segera diproses.`
        : `Permintaan penarikan dana Anda telah disetujui Moderator dan sedang menunggu approval final dari Superadmin.`,
      link: `/admin/withdrawals/${withdrawalId}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Withdrawal rejected dari Moderator atau Superadmin
  const handleWithdrawalRejected = (
    withdrawalId: string,
    reason: string,
    rejectedBy?: string
  ) => {
    const withdrawal = withdrawals.find(w => w.id === withdrawalId);
    if (!withdrawal) return;

    setWithdrawals(prev =>
      prev.map(w =>
        w.id === withdrawalId
          ? {
              ...w,
              status: 'rejected' as const,
              processedAt: new Date().toISOString(),
              processedBy: rejectedBy,
              rejectionReason: reason
            }
          : w
      )
    );

    // Create notification untuk PIC
    const notification: Notification = {
      id: `notif-${Date.now()}-${withdrawalId}`,
      userId: withdrawal.picId,
      type: 'withdrawal_rejected',
      title: 'Permintaan Penarikan Ditolak',
      message: `Permintaan penarikan dana sebesar Rp ${withdrawal.amount.toLocaleString('id-ID')} untuk ${withdrawal.projectTitle} ditolak. Alasan: ${reason}`,
      link: `/admin/withdrawals/${withdrawalId}`,
      isRead: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [...prev, notification]);
  };

  // ==============================
  // FASE 2C: EVENT REGISTRATION HANDLERS
  // ==============================

  // Handler: Event Registration submitted dari EventDetail
  const handleEventRegistrationSubmitted = (registration: EventRegistration) => {
    setEventRegistrations(prev => [...prev, registration]);
    const notification: Notification = {
      id: `notif-event-${Date.now()}`,
      userId: registration.alumniId,
      type: 'event_registration_submitted',
      title: 'Pendaftaran Event Dikirim',
      message: `Pendaftaran Anda untuk event "${registration.eventTitle}" sedang dalam peninjauan panitia.`,
      link: `/events/${registration.eventId}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Event Registration status update dari Admin
  const handleEventRegistrationStatusUpdate = (
    registrationId: string,
    status: 'approved' | 'rejected',
    reason?: string,
    reviewedBy?: string,
    reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin',
    approvalMessage?: string
  ) => {
    setEventRegistrations(prev =>
      prev.map(r =>
        r.id === registrationId
          ? {
              ...r,
              status,
              reviewedAt: new Date().toISOString(),
              reviewedBy,
              reviewedByRole,
              approvalMessage,
              rejectionReason: reason,
            }
          : r
      )
    );

    const registration = eventRegistrations.find(r => r.id === registrationId);
    if (registration) {
      const notification: Notification = {
        id: `notif-event-${Date.now()}-${registrationId}`,
        userId: registration.alumniId,
        type: status === 'approved' ? 'event_approved' : 'event_rejected',
        title: status === 'approved' ? `Pendaftaran Event Disetujui! 🎉` : 'Pendaftaran Event Ditolak',
        message: status === 'approved'
          ? `Selamat! Pendaftaran Anda untuk event "${registration.eventTitle}" telah disetujui.${approvalMessage ? ` ${approvalMessage}` : ''} Tanggal: ${registration.eventDate}, ${registration.eventTime}.`
          : `Pendaftaran Anda untuk event "${registration.eventTitle}" ditolak. Alasan: ${reason}`,
        link: `/events/${registration.eventId}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  // ==============================
  // FASE 3: CONTENT & TASK NOTIFICATION HANDLERS
  // ==============================

  // Handler: PIC publish content update → notify all members
  const handleContentPublished = (
    projectId: string,
    projectTitle: string,
    updateTitle: string,
    updateType: string,
    createdByName: string
  ) => {
    const typeLabels: Record<string, string> = {
      progress: 'Progress Update',
      announcement: 'Pengumuman',
      milestone: 'Milestone Baru',
      meeting_reminder: 'Reminder Meeting',
    };
    const notification: Notification = {
      id: `notif-content-${Date.now()}`,
      userId: 'current-user-id', // Dalam produksi: broadcast ke semua member project
      type: 'progress_update',
      title: `${typeLabels[updateType] || 'Update Baru'}: ${updateTitle}`,
      message: `${createdByName} baru saja mempublish update baru di project "${projectTitle}". Klik untuk melihat detailnya.`,
      link: `/projects/${projectId}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: PIC assigns task → notify alumni member
  const handleTaskAssigned = (
    taskId: string,
    assignedToId: string,
    assignedToName: string,
    taskTitle: string,
    projectId: string,
    projectTitle: string,
    dueDate: string,
    priority: string
  ) => {
    const priorityLabel: Record<string, string> = {
      low: 'Low', medium: 'Medium', high: 'High', urgent: '🚨 URGENT',
    };
    const notification: Notification = {
      id: `notif-task-${Date.now()}-${taskId}`,
      userId: assignedToId,
      type: 'task_assigned',
      title: `Task Baru Ditugaskan: ${taskTitle}`,
      message: `Anda mendapat task baru "${taskTitle}" di project "${projectTitle}". Priority: ${priorityLabel[priority] || priority}. Deadline: ${new Date(dueDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
      link: `/projects/${projectId}/tasks/${taskId}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Task status updated (completed) → notify PIC
  const handleTaskStatusUpdated = (
    taskId: string,
    newStatus: string,
    taskTitle: string,
    assignedByName: string,
    projectId: string
  ) => {
    if (newStatus === 'completed') {
      const notification: Notification = {
        id: `notif-task-done-${Date.now()}-${taskId}`,
        userId: 'pic-user-id', // Dalam produksi: kirim ke PIC project
        type: 'task_completed',
        title: `Task Selesai: ${taskTitle}`,
        message: `Task "${taskTitle}" telah diselesaikan. Periksa hasilnya dan tandai sebagai verified jika sudah memenuhi syarat.`,
        link: `/admin/projects/${projectId}/tasks/${taskId}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  // ==============================
  // FASE 3A: CONTENT REMOVAL FLOW
  // ==============================

  // Handler: Moderator removes content → notify PIC
  const handleContentRemoved = (
    contentId: string,
    contentTitle: string,
    projectId: string,
    projectTitle: string,
    picId: string,
    _picName: string,
    removalReason: string,
    removedBy: string
  ) => {
    const notification: Notification = {
      id: `notif-content-removed-${Date.now()}-${contentId}`,
      userId: picId,
      type: 'content_removed',
      title: 'Konten Dihapus oleh Moderator',
      message: `Konten "${contentTitle}" dari project "${projectTitle}" telah dihapus oleh Moderator (${removedBy}). Alasan: ${removalReason}. Jika keberatan, silakan hubungi Moderator atau Superadmin.`,
      link: `/admin/projects/${projectId}/content`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // ==============================
  // FASE 3B: PROJECT CLOSURE FLOW
  // ==============================

  // Handler: PIC requests project closure
  const handleProjectCloseRequested = (
    projectId: string,
    projectTitle: string,
    _reason: string,
    _finalReport: string,
    _picName: string
  ) => {
    const notification: Notification = {
      id: `notif-closure-req-${Date.now()}-${projectId}`,
      userId: 'current-pic-id',
      type: 'project_closed',
      title: 'Permintaan Penutupan Dikirim',
      message: `Permintaan penutupan project "${projectTitle}" telah dikirim ke Superadmin. Anda akan mendapat notifikasi setelah permintaan diproses (1-3 hari kerja).`,
      link: `/admin/projects/${projectId}/closure`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Superadmin approves project closure → notify PIC + all members
  const handleProjectClosureApproved = (
    projectId: string,
    projectTitle: string,
    _approvedBy: string,
    note?: string
  ) => {
    const notifPIC: Notification = {
      id: `notif-closure-approved-${Date.now()}-${projectId}`,
      userId: 'current-pic-id',
      type: 'project_closure_approved',
      title: `Project "${projectTitle}" Resmi Ditutup ✅`,
      message: `Permintaan penutupan telah disetujui oleh Superadmin. ${note ? `Catatan: ${note}` : ''} Seluruh member project akan segera dinotifikasi.`,
      link: `/projects/${projectId}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    const notifMembers: Notification = {
      id: `notif-closure-members-${Date.now()}-${projectId}`,
      userId: 'all-members',
      type: 'project_closed',
      title: `Project "${projectTitle}" Telah Ditutup`,
      message: `Project "${projectTitle}" telah resmi ditutup setelah berhasil menyelesaikan semua target. Terima kasih atas kontribusi dan keikhlasan kalian! Semoga Allah menerima amal ibadah kita.`,
      link: `/projects/${projectId}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notifPIC, notifMembers]);
  };

  // Handler: Superadmin rejects project closure → notify PIC
  const handleProjectClosureRejected = (
    projectId: string,
    projectTitle: string,
    reason: string,
    _rejectedBy: string
  ) => {
    const notification: Notification = {
      id: `notif-closure-rejected-${Date.now()}-${projectId}`,
      userId: 'current-pic-id',
      type: 'project_closure_rejected',
      title: 'Permintaan Penutupan Ditolak',
      message: `Permintaan penutupan project "${projectTitle}" ditolak oleh Superadmin. Alasan: ${reason}. Silakan perbaiki dan ajukan kembali setelah memenuhi syarat.`,
      link: `/admin/projects/${projectId}/closure`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // ==============================
  // FASE 3C: ALUMNI VERIFICATION FLOW
  // ==============================

  // Handler: Moderator adds new alumni → welcome notification
  const handleAlumniAdded = (
    alumniId: string,
    alumniName: string,
    _alumniEmail: string,
    addedBy: string
  ) => {
    const notification: Notification = {
      id: `notif-alumni-verified-${Date.now()}-${alumniId}`,
      userId: alumniId,
      type: 'alumni_verified',
      title: 'Selamat Datang di AlMaqdisi Project! 🎉',
      message: `Akun alumni atas nama "${alumniName}" telah berhasil dibuat oleh tim Admin (${addedBy}). Sekarang Anda dapat login dan mulai berkontribusi untuk kemanusiaan Baitul Maqdis dan Gaza.`,
      link: `/`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Mark notification as read
  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  };

  // Handler: Mark all notifications as read
  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Handler: Clear all notifications
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // ==============================
  // FASE 4: POLLING NOTIFICATION HANDLERS
  // ==============================

  // Handler: PIC creates new poll → notify all members
  const handlePollCreated = (
    pollId: string,
    pollQuestion: string,
    projectId: string,
    projectTitle: string,
    deadline: string,
    createdByName: string
  ) => {
    const notification: Notification = {
      id: `notif-poll-created-${Date.now()}-${pollId}`,
      userId: 'all-members', // Dalam produksi: broadcast ke semua member project
      type: 'poll_created',
      title: `📊 Polling Baru: ${pollQuestion}`,
      message: `${createdByName} membuat polling baru di project \"${projectTitle}\". Jangan lupa berikan suara Anda! Deadline: ${new Date(deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
      link: `/projects/${projectId}/voting`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: PIC closes poll → notify all members
  const handlePollClosed = (
    pollId: string,
    pollQuestion: string,
    projectId: string,
    projectTitle: string,
    totalVoters: number,
    closedByName: string
  ) => {
    const notification: Notification = {
      id: `notif-poll-closed-${Date.now()}-${pollId}`,
      userId: 'all-members', // Dalam produksi: broadcast ke semua member project
      type: 'poll_closed',
      title: `Polling Ditutup: ${pollQuestion}`,
      message: `Polling \"${pollQuestion}\" di project \"${projectTitle}\" telah ditutup oleh ${closedByName}. Total ${totalVoters} member telah memberikan suara. Lihat hasil lengkapnya!`,
      link: `/projects/${projectId}/voting`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // Handler: Poll deadline reminder (1 hari sebelum deadline)
  const handlePollDeadlineReminder = (
    pollId: string,
    pollQuestion: string,
    projectId: string,
    projectTitle: string,
    deadline: string
  ) => {
    const notification: Notification = {
      id: `notif-poll-reminder-${Date.now()}-${pollId}`,
      userId: 'all-members-who-havent-voted', // Dalam produksi: filter member yang belum vote
      type: 'poll_reminder',
      title: `⏰ Reminder: Polling Akan Ditutup Besok`,
      message: `Polling \"${pollQuestion}\" di project \"${projectTitle}\" akan ditutup besok (${new Date(deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}). Segera berikan suara Anda!`,
      link: `/projects/${projectId}/voting`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, notification]);
  };

  // ==============================
  // FASE 4: PAYMENT TIMER AUTO-EXPIRY HANDLER
  // ==============================

  // Handler: Donation expired after 24 hours
  const handleDonationExpired = (donationId: string) => {
    setDonations(prev =>
      prev.map(d =>
        d.id === donationId && d.status === 'pending'
          ? { 
              ...d, 
              status: 'expired',
              rejectionReason: 'Batas waktu pembayaran telah habis (24 jam). Silakan submit donasi baru jika ingin melanjutkan.'
            }
          : d
      )
    );

    // Notify donatur if they have an account
    const donation = donations.find(d => d.id === donationId);
    if (donation && donation.donorName) {
      const notification: Notification = {
        id: `notif-donation-expired-${Date.now()}-${donationId}`,
        userId: donation.donorName, // Dalam produksi: gunakan donorId
        type: 'donation_expired',
        title: 'Donasi Kadaluarsa',
        message: `Donasi Anda senilai Rp ${donation.amount.toLocaleString('id-ID')} untuk ${donation.projectTitle} telah kadaluarsa karena belum ada konfirmasi pembayaran dalam 24 jam. Silakan submit donasi baru jika ingin melanjutkan.`,
        link: `/my-donations`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      setNotifications(prev => [...prev, notification]);
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    setCurrentView('home');
    setActiveNav('home');
    toastMessages.logout.success();
  };

  // Login handler with persistence
  const handleLogin = (role: 'donatur' | 'alumni' | 'alumni-guest') => {
    setUserRole(role);
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    setCurrentView('home');
    setActiveNav('home');
  };

  if (currentView === 'login') {
    return <Login onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} onLoginSuccess={handleLogin} />;
  }

  if (currentView === 'project-detail') {
    // Show different detail page based on user role
    if (userRole === 'alumni') {
      return <ProjectDetailAlumni 
        hasJoinedProjects={hasJoinedProjects}
        onBack={() => {
          setCurrentView('home');
          setActiveNav('home');
        }} 
        initialTab={projectDetailInitialTab}
        onNavigateHome={() => {
          setCurrentView('home');
          setActiveNav('home');
        }}
        onNavigateExplore={() => {
          setCurrentView('explore');
          setActiveNav('explore');
        }}
        onNavigateMessages={() => {
          setCurrentView('messages');
          setActiveNav('pesan');
        }}
        onNavigateSettings={() => {
          setCurrentView('settings');
          setActiveNav('settings');
        }}
        onLogout={handleLogout}
        activeNav={activeNav}
        onJoinRequestSubmitted={handleJoinRequestSubmitted}
      />;
    }
    
    return <ProjectDetail onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} initialTab={projectDetailInitialTab} />;
  }

  if (currentView === 'explore') {
    return <ExploreProject 
      key={exploreInitialTab} // Force re-render when initial tab changes
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }} 
      initialTab={exploreInitialTab} 
      onNavigateToDetail={() => setCurrentView('project-detail')}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
        setExploreInitialTab('open');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      onCampaignClick={(id) => {
        setSelectedCampaignId(id);
        setCurrentView('campaign-detail');
      }}
      currentUserId="user-1"
      activeNav={activeNav}
      userRole={userRole}
    />;
  }

  if (currentView === 'alumni-story') {
    return <AlumniStoryDetail onBack={() => {
      setCurrentView('home');
      setActiveNav('home');
    }} />;
  }

  if (currentView === 'event-detail') {
    return <EventDetail 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      userRole={userRole}
      onEventRegistrationSubmitted={handleEventRegistrationSubmitted}
    />;
  }

  // FASE 3: Notification Center
  if (currentView === 'notification-center') {
    return <NotificationCenter
      notifications={notifications}
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onMarkAsRead={handleMarkNotificationAsRead}
      onMarkAllAsRead={handleMarkAllNotificationsAsRead}
      onClearAll={handleClearAllNotifications}
      onNavigateHome={() => { setCurrentView('home'); setActiveNav('home'); }}
      onNavigateExplore={() => { setCurrentView('explore'); setActiveNav('explore'); }}
      onNavigateMessages={() => { setCurrentView('messages'); setActiveNav('pesan'); }}
      onNavigateSettings={() => { setCurrentView('settings'); setActiveNav('settings'); }}
      onNavigateMyDonations={() => setCurrentView('my-donations')}
      onNavigateMyJoinRequests={() => setCurrentView('my-join-requests')}
      onNavigateEventDetail={() => { setCurrentView('event-detail'); }}
      activeNav={activeNav}
    />;
  }

  if (currentView === 'messages') {
    // Show different messages page based on user role
    if (userRole === 'alumni') {
      return <MessagesAlumni 
        hasJoinedProjects={hasJoinedProjects}
        onBack={() => {
          setCurrentView('home');
          setActiveNav('home');
        }}
        onNavigateToProject={() => {
          setProjectDetailInitialTab('overview');
          setCurrentView('project-detail');
        }}
        onNavigateHome={() => {
          setCurrentView('home');
          setActiveNav('home');
        }}
        onNavigateExplore={() => {
          setCurrentView('explore');
          setActiveNav('explore');
        }}
        onNavigateMessages={() => {
          setCurrentView('messages');
          setActiveNav('pesan');
        }}
        onNavigateSettings={() => {
          setCurrentView('settings');
          setActiveNav('settings');
        }}
        onLogout={handleLogout}
        activeNav={activeNav}
      />;
    }
    
    return <MessagePage 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  if (currentView === 'settings') {
    return <SettingsPage 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      onLogout={handleLogout}
      onNavigateMyDonations={() => {
        setCurrentView('my-donations');
      }}
      onNavigateMyJoinRequests={() => {
        setCurrentView('my-join-requests');
      }}
      activeNav={activeNav}
      userRole={userRole}
      language={language}
      onLanguageChange={setLanguage}
    />;
  }

  if (currentView === 'donation') {
    return <DonationPage 
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      projectTitle="Rekonstruksi Masjid Al-Aqsa"
      projectCategory="Pembangunan"
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
      onDonationSubmitted={handleDonationSubmitted}
    />;
  }

  // Admin Panel Routes
  if (currentView === 'admin-login-revised') {
    return <AdminLoginRevised 
      onLoginSuccess={() => {
        setCurrentView('admin-panel-revised');
      }}
      onBack={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
    />;
  }

  if (currentView === 'admin-panel-revised') {
    return <AdminPanelRevised 
      onLogout={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      donations={donations}
      joinRequests={joinRequests}
      notifications={notifications}
      withdrawals={withdrawals}
      projectWallets={projectWallets}
      walletTransactions={walletTransactions}
      onDonationStatusUpdate={handleDonationStatusUpdate}
      onJoinRequestStatusUpdate={handleJoinRequestStatusUpdate}
      onWithdrawalSubmitted={handleWithdrawalSubmitted}
      onWithdrawalApproved={handleWithdrawalApproved}
      onWithdrawalRejected={handleWithdrawalRejected}
      eventRegistrations={eventRegistrations}
      onEventRegistrationStatusUpdate={handleEventRegistrationStatusUpdate}
      onContentPublished={handleContentPublished}
      onTaskAssigned={handleTaskAssigned}
      onTaskStatusUpdated={handleTaskStatusUpdated}
      onContentRemoved={handleContentRemoved}
      onProjectCloseRequested={handleProjectCloseRequested}
      onProjectClosureApproved={handleProjectClosureApproved}
      onProjectClosureRejected={handleProjectClosureRejected}
      onAlumniAdded={handleAlumniAdded}
      onPollCreated={handlePollCreated}
      onPollClosed={handlePollClosed}
      onPollDeadlineReminder={handlePollDeadlineReminder}
    />;
  }

  // My Donations View
  if (currentView === 'my-donations') {
    return <MyDonations 
      donations={donations.filter(d => d.donorId === 'current-user-id')} // Filter by current user
      onBack={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      onViewDetail={(donation) => {
        // TODO: Navigate to donation detail
        console.log('View donation detail:', donation);
      }}
      onResubmit={(donation) => {
        // FASE 3D: Update donation status back to pending after resubmit
        setDonations(prev =>
          prev.map(d =>
            d.id === donation.id
              ? { ...d, status: 'pending' as const, rejectionReason: undefined, verifiedAt: undefined }
              : d
          )
        );
        // Notify user
        const notification: Notification = {
          id: `notif-resubmit-${Date.now()}-${donation.id}`,
          userId: donation.donorId || 'current-user-id',
          type: 'donation_approved',
          title: 'Bukti Transfer Dikirim Ulang',
          message: `Bukti transfer baru untuk donasi ${donation.projectTitle} telah dikirim ulang. Kami akan memverifikasi dalam 1×24 jam kerja.`,
          link: `/donations/${donation.id}`,
          isRead: false,
          createdAt: new Date().toISOString(),
        };
        setNotifications(prev => [...prev, notification]);
      }}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  // My Join Requests View
  if (currentView === 'my-join-requests') {
    return <MyJoinRequests 
      requests={joinRequests.filter(r => r.alumniId === 'current-user-id')} // Filter by current user
      onBack={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      onViewProject={(projectId) => {
        setCurrentView('project-detail');
        setActiveNav('home');
      }}
      onCancelRequest={(requestId) => {
        // TODO: Implement cancel logic
        setJoinRequests(prev => prev.filter(r => r.id !== requestId));
      }}
      onResubmit={(request) => {
        // TODO: Implement resubmit logic
        console.log('Resubmit request:', request);
      }}
      onNavigateHome={() => {
        setCurrentView('home');
        setActiveNav('home');
      }}
      onNavigateExplore={() => {
        setCurrentView('explore');
        setActiveNav('explore');
      }}
      onNavigateMessages={() => {
        setCurrentView('messages');
        setActiveNav('pesan');
      }}
      onNavigateSettings={() => {
        setCurrentView('settings');
        setActiveNav('settings');
      }}
      activeNav={activeNav}
    />;
  }

  if (currentView === 'campaign-detail' && selectedCampaignId) {
    return (
      <CampaignDetail 
        campaignId={selectedCampaignId}
        userRole="alumni" // Assuming user is alumni for now, or use userRole variable
        currentUserId="user-1"
        onBack={() => {
          if (activeNav === 'campaigns') {
            setCurrentView('explore');
            setExploreInitialTab('campaign');
          } else {
            // Default back behavior
            setCurrentView('explore');
            // If we came from explore, we ideally want to preserve the tab.
            // Since we don't track tab state in App, we'll default to 'open' or current 'exploreInitialTab' value.
            // If the user navigated via sidebar "Campaigns", exploreInitialTab is 'campaign'.
            // If via sidebar "Explore", exploreInitialTab is 'open'.
            // If they switched tabs inside Explore, exploreInitialTab is stale.
            // But this is acceptable for now.
          }
          setSelectedCampaignId(null);
        }}
      />
    );
  }

  /* 
  if (currentView === 'campaigns') {
    // Deprecated view - redirected to Explore
    return null; 
  }
  */

  if (currentView === 'admin-campaigns') {
    return <CampaignDashboard currentUserId="admin-1" />;
  }

  return (
      <ErrorBoundary>
      <Toaster position="top-center" richColors closeButton />
      <div className="flex min-h-screen relative bg-[#F8F9FA] overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2B4468] border-r border-[#2B4468] fixed h-screen top-0 left-0 z-50 flex flex-col hidden lg:flex shadow-sm">
        {/* Decorative Background Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5">
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Logo */}
          <div className="p-5">
            <Logo />
          </div>

          {/* Menu Navigation */}
          <nav className="flex-1 px-5 pt-8">
            <div className="space-y-2">
              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'home'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('home');
                  setCurrentView('home');
                }}
              >
                <span className="material-symbols-outlined text-xl">home</span>
                <span className="tracking-wide text-sm font-semibold">Home</span>
              </a>

              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'explore'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
              >
                <span className="material-symbols-outlined text-xl">explore</span>
                <span className="tracking-wide text-sm">Explore</span>
              </a>

              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'pesan'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('pesan');
                  setCurrentView('messages');
                }}
              >
                <span className="material-symbols-outlined text-xl">chat_bubble</span>
                <span className="tracking-wide text-sm">Pesan</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </a>

              <a
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all w-full ${
                  activeNav === 'settings'
                    ? 'text-white bg-white/10 shadow-sm'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
                href="#"
                onClick={() => {
                  setActiveNav('settings');
                  setCurrentView('settings');
                }}
              >
                <span className="material-symbols-outlined text-xl">settings</span>
                <span className="tracking-wide text-sm">Settings</span>
              </a>
            </div>
          </nav>
          
          {/* Admin Panel Button */}
          <div className="px-5 pb-2">
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all w-full text-[#FAC06E] hover:bg-white/5 border border-[#FAC06E]/30 hover:border-[#FAC06E]"
              onClick={() => {
                setCurrentView('admin-login-revised');
                setActiveNav('admin');
              }}
            >
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
              <span className="tracking-wide text-sm font-semibold">Admin Panel</span>
            </button>
          </div>

          {/* Logout Button */}
          <div className="p-5 pb-6">
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all w-full text-white/60 hover:bg-white/5 hover:text-white"
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined text-xl">logout</span>
              <span className="tracking-wide text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 w-full pb-10 lg:pb-10 pb-20">
        {/* Header - Mobile Only */}
        {currentView === 'home' && (
        <header className="bg-white/90 sticky top-0 z-30 px-3 py-3.5 flex items-center justify-between backdrop-blur-sm md:hidden border-b border-[#E5E7EB] shadow-sm overflow-hidden">
          <Logo className="scale-[0.8] origin-left flex-shrink-0" />
          
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <button 
              onClick={() => setCurrentView('notification-center')}
              className="text-[#6B7280] hover:text-[#243D68] transition-colors relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F8F9FA] flex-shrink-0"
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold px-0.5">
                  {notifications.filter(n => !n.isRead).length > 9 ? '9+' : notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </button>
            
            {userRole === null && (
              <button
                onClick={() => setShowLoginWidget(true)}
                className="bg-gradient-to-r from-[#243D68] to-[#30518B] text-white font-bold py-2.5 px-4 rounded-lg text-sm hover:shadow-lg transition shadow-md uppercase tracking-wide whitespace-nowrap flex-shrink-0"
              >
                Login
              </button>
            )}
          </div>
        </header>
        )}

        {currentView === 'campaigns' ? (
          <CampaignList 
            currentUserId="user-1" 
            onCampaignClick={(id) => {
              setSelectedCampaignId(id);
              setCurrentView('campaign-detail');
            }}
            onBack={() => {
              setCurrentView('home');
              setActiveNav('home');
            }}
          />
        ) : (
          <div className="px-6 lg:px-10 max-w-7xl mx-auto space-y-10">
          {/* Hero Section */}
          <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 lg:p-16 mt-6">
            {/* Notification & Login - Top Right */}
            <div className="absolute top-4 right-4 md:top-6 md:right-6 lg:top-8 lg:right-8 flex items-center gap-2 md:gap-4 z-30">
              <button 
                className="hidden md:block text-[#61728F] hover:text-[#243D68] transition-colors relative"
                onClick={() => setCurrentView('notification-center')}
              >
                <span className="material-symbols-outlined text-2xl">notifications</span>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[9px] font-bold px-0.5">
                    {notifications.filter(n => !n.isRead).length > 9 ? '9+' : notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
              
              {userRole === null && (
                <button
                  className="hidden md:block bg-[#243D68] text-white font-semibold py-2.5 px-6 rounded-[12px] text-sm hover:bg-[#183A74] transition shadow-md"
                  onClick={() => setShowLoginWidget(true)}
                >
                  {t.home.login}
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 items-center relative z-10">
              {/* Left Content */}
              <div className="space-y-6 max-w-xl">
                
                <h1 className="text-4xl lg:text-6xl font-['Archivo_Black'] text-[#0E1B33] leading-[0.95] uppercase tracking-tighter">
                  {t.hero.title}
                </h1>
                
                <p className="text-[#61728F] text-base lg:text-lg leading-relaxed font-light">
                  {t.hero.description} <span className="font-bold text-[#243D68]">{t.hero.aqsaBaitulMaqdis}</span>
                </p>

                {/* CTA Buttons */}
                <div className="hidden md:flex flex-wrap items-center gap-4 pt-2">
                  <button 
                    onClick={() => {
                      setActiveNav('explore');
                      setCurrentView('explore');
                      setExploreInitialTab('open');
                    }}
                    className="bg-[#183A74] text-white font-bold uppercase tracking-widest px-8 py-3.5 rounded-lg hover:bg-[#243D68] transition-all duration-300 flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(250,192,110,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    <span className="material-symbols-outlined text-xl">explore</span>
                    <span>{t.hero.exploreProjectBtn}</span>
                  </button>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative flex items-center justify-center">
                {/* Animated pulsing circles - solid ripple effect */}
                <div className="absolute w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-[#FAC06E]/30 animate-ripple"></div>
                <div className="absolute w-64 h-64 md:w-[22rem] md:h-[22rem] lg:w-[26rem] lg:h-[26rem] rounded-full bg-[#FAC06E]/20 animate-ripple"></div>
                <div className="absolute w-72 h-72 md:w-[26rem] md:h-[26rem] lg:w-[30rem] lg:h-[30rem] rounded-full bg-[#FAC06E]/30 animate-ripple"></div>
                
                {/* Large Circle Background - replaced with Al-Aqsa image */}
                <ImageWithFallback
                  src={heroImage}
                  alt="Masjid Al-Aqsa Complex"
                  className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover opacity-90 relative z-10"
                />
              </div>
            </div>

            {/* Subtle Background Decoration */}
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-[#FAC06E]/20 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-16 h-16 border-4 border-[#243D68]/10 rounded-full"></div>
          </section>

          {/* Categories */}
          <section>
            <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
              <button 
                onClick={() => setActiveCategory('semua')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap shadow-md transition-transform active:scale-95 ${
                  activeCategory === 'semua'
                    ? 'bg-[#243D68] text-white border border-[#243D68]'
                    : 'bg-white border border-[#D6DCE8] text-[#61728F] hover:border-[#243D68] hover:text-[#243D68]'
                }`}
              >\n                <span className="material-symbols-outlined text-[20px]">star</span> {t.categories.all}
              </button>
              <button 
                onClick={() => setActiveCategory('pendidikan')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  activeCategory === 'pendidikan'
                    ? 'bg-[#243D68] text-white border border-[#243D68] shadow-md'
                    : 'bg-white border border-[#D6DCE8] text-[#61728F] hover:border-[#243D68] hover:text-[#243D68]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">school</span> {t.categories.education}
              </button>
              <button 
                onClick={() => setActiveCategory('lingkungan')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  activeCategory === 'lingkungan'
                    ? 'bg-[#243D68] text-white border border-[#243D68] shadow-md'
                    : 'bg-white border border-[#D6DCE8] text-[#61728F] hover:border-[#243D68] hover:text-[#243D68]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">eco</span> {t.categories.environment}
              </button>
              <button 
                onClick={() => setActiveCategory('kesehatan')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  activeCategory === 'kesehatan'
                    ? 'bg-[#243D68] text-white border border-[#243D68] shadow-md'
                    : 'bg-white border border-[#D6DCE8] text-[#61728F] hover:border-[#243D68] hover:text-[#243D68]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">health_and_safety</span>{' '}
                {t.categories.health}
              </button>
            </div>
          </section>

          {/* Featured Projects */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#0E1B33]">
                {activeCategory === 'semua' && t.home.exploreProjects}
                {activeCategory === 'pendidikan' && t.home.educationProjects}
                {activeCategory === 'lingkungan' && t.home.environmentProjects}
                {activeCategory === 'kesehatan' && t.home.healthProjects}
              </h2>
              <button 
                onClick={() => {
                  setActiveNav('explore');
                  setCurrentView('explore');
                  setExploreInitialTab('open');
                }}
                className="text-[#243D68] font-semibold text-sm hover:underline whitespace-nowrap"
              >
                {t.home.viewAll}
              </button>
            </div>
            
            {/* Category Info Badge */}
            {activeCategory !== 'semua' && (
              <div className="mb-4 flex items-center justify-between p-3 bg-[#FAC06E]/10 border border-[#FAC06E]/30 rounded-lg animate-in fade-in duration-300">
                <span className="text-sm text-[#0E1B33]">
                  {language === 'id' 
                    ? `Menampilkan proyek kategori ` 
                    : `Showing projects in category `}
                  <span className="font-semibold capitalize">{activeCategory}</span>
                </span>
                <button 
                  onClick={() => setActiveCategory('semua')}
                  className="text-xs text-[#243D68] hover:underline font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                  {language === 'id' ? 'Reset' : 'Reset'}
                </button>
              </div>
            )}
            
            <div className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
              <div className="snap-center shrink-0 w-[300px] lg:w-[360px] bg-white border border-[#D6DCE8] rounded-[16px] p-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-[12px]">
                  <img
                    alt="Bantuan Pangan Gaza"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1637826397913-68af81f4d14a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlc3RpbmUlMjBmb29kJTIwYWlkJTIwaHVtYW5pdGFyaWFufGVufDF8fHx8MTc2OTY1MjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[rgb(10,71,16)] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Open Volunteer
                  </span>
                </div>
                <div className="space-y-3">
                  <span className="text-[#243D68] text-xs font-semibold">#BantuanKemanusiaan</span>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] leading-snug">
                    Bantuan Pangan Gaza
                  </h3>
                  <p className="text-[#61728F] text-sm line-clamp-2">
                    Mari bantu saudara kita di Gaza dengan menyalurkan paket sembako untuk 1000 keluarga!
                  </p>
                  <button
                    onClick={() => {
                      setProjectDetailInitialTab('overview'); // Reset to overview tab
                      setCurrentView('project-detail');
                    }}
                    className="w-full bg-[#243D68] text-white font-semibold rounded-[12px] hover:bg-[#183A74] transition-colors py-3 px-6"
                  >
                    {t.home.viewProject}
                  </button>
                </div>
              </div>
              <div className="snap-center shrink-0 w-[300px] lg:w-[360px] bg-white border border-[#D6DCE8] rounded-[16px] p-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative mb-4 overflow-hidden rounded-[12px]">
                  <img
                    alt="Sekolah Online Anak Gaza"
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                    src="https://images.unsplash.com/photo-1661860890799-ae6cac7c71b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwYXJhYmljJTIwZWR1Y2F0aW9ufGVufDF8fHx8MTc2OTY1MjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  />
                  <span className="absolute top-3 right-3 bg-[#C9F7ED] text-[#047857] text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Open Volunteer
                  </span>
                </div>
                <div className="space-y-3">
                  <span className="text-[#243D68] text-xs font-semibold">#PendidikanPalestina</span>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] leading-snug">
                    Sekolah Online Anak Gaza
                  </h3>
                  <p className="text-[#61728F] text-sm line-clamp-2">
                    Buka pintu masa depan pendidikan untuk anak-anak Gaza yang terdampak konflik.
                  </p>
                  <button
                    onClick={() => {
                      setProjectDetailInitialTab('overview'); // Reset to overview tab
                      setCurrentView('project-detail');
                    }}
                    className="w-full mt-2 bg-[#243D68] text-white font-semibold py-3 rounded-[12px] hover:bg-[#183A74] transition-colors"
                  >
                    {t.home.viewProject}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <QuoteSection />

          {/* Alumni Stories */}
          <section>
            <div className="mb-6">
              <h2 className="text-[20px] font-semibold text-[#0E1B33]">{t.home.inspiringStories}</h2>
              <p className="text-[#61728F] mt-1 text-sm">
                {t.home.inspiringStoriesDesc}
              </p>
            </div>
            <div className="flex overflow-x-auto gap-5 pb-4 hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 1"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1547567919-07728e7d2dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB3b21hbiUyMGhpamabiJTIwcHJvZmVzc2lvbmFsJTIwdGVhY2hlcnxlbnwxfHx8fDE3Njk2NTIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Rina & Virtual Tour Sejarah Masjid Al-Aqsa
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#EdukasiAlAqsa</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 2"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1769636929231-3cd7f853d038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBmb3JtYWwlMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTEyMTAzMXww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Budi mengajar Bahasa Arab untuk Solidaritas Palestina
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#BahasaArabAlQuds</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 3"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1647187977218-12de72a8830d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB3b21hbiUyMGhpamabiJTIwYWN0aXZpc3QlMjB2b2x1bnRlZXJ8ZW58MXx8fHwxNzcxMTIxMDMyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Siti & Kampanye Digital Free Palestine
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#FreePalestine</span>
              </div>
              <div
                onClick={() => setCurrentView('alumni-story')}
                className="snap-center shrink-0 w-[200px] bg-white rounded-[16px] p-4 border border-[#D6DCE8] shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <img
                  alt="Story 4"
                  className="w-full aspect-[4/5] object-cover rounded-[12px] mb-3"
                  src="https://images.unsplash.com/photo-1645066928295-2506defde470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBkb2N0b3IlMjBtZWRpY2FsJTIwZm9ybWFsfGVufDF8fHx8MTc3MTEyMTAzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <h3 className="font-semibold text-[#0E1B33] text-sm leading-snug">
                  Andi menggalang Dana Medis untuk Korban Gaza
                </h3>
                <span className="block mt-2 text-xs text-[#61728F] font-medium">#MedisGaza</span>
              </div>
            </div>
          </section>

          {/* Your Projects */}
          <section>
            <h2 className="text-[20px] font-semibold text-[#0E1B33] mb-6">{t.home.yourProjects}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => {
                  setExploreInitialTab('open');
                  setCurrentView('explore');
                  setActiveNav('explore');
                }}
                className="bg-white rounded-[16px] border border-[#D6DCE8] p-4 flex gap-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-md transition-shadow cursor-pointer group"
              >
                <img
                  alt="Cleanup"
                  className="w-24 h-24 rounded-[12px] object-cover shrink-0 group-hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1758204054488-51024ea2e94c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdhdGVyJTIwaHVtYW5pdGFyaWFuJTIwYWlkfGVufDF8fHx8MTc2OTY1MjEyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <div className="flex flex-col justify-center">
                  <div className="mb-1">
                    <span className="bg-[#C9F7ED] text-[#047857] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Open Volunteer
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] mb-1 group-hover:text-[#243D68] transition-colors">
                    Bantuan Air Bersih Gaza
                  </h3>
                  <p className="text-sm text-[#61728F] line-clamp-2">
                    Suplai air bersih untuk keluarga-keluarga di Gaza yang kesulitan akses air.
                  </p>
                </div>
              </div>
              <div
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setCurrentView('explore');
                  setActiveNav('explore');
                }}
                className="bg-white rounded-[16px] border border-[#D6DCE8] p-4 flex gap-4 shadow-[0_8px_24px_rgba(22,36,63,0.08)] hover:shadow-md transition-shadow cursor-pointer group"
              >
                <img
                  alt="Mentoring"
                  className="w-24 h-24 rounded-[12px] object-cover shrink-0 group-hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1643214410415-de1976ad74ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnBoYW4lMjBjaGlsZHJlbiUyMGNhcmUlMjBzdXBwb3J0fGVufDF8fHx8MTc2OTY1MjEyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                />
                <div className="flex flex-col justify-center">
                  <div className="mb-1">
                    <span className="bg-[#D9EDF8] text-[#243D68] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                      Project Tim
                    </span>
                  </div>
                  <h3 className="text-[18px] font-semibold text-[#0E1B33] mb-1 group-hover:text-[#243D68] transition-colors">
                    Rehabilitasi Yatim Palestina
                  </h3>
                  <p className="text-sm text-[#61728F] line-clamp-2">
                    Program pendampingan untuk anak-anak yatim Palestina yang kehilangan keluarga.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Gallery */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-[20px] font-semibold text-[#0E1B33]">Galeri Project</h2>
              <button 
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="hidden lg:block text-[#243D68] font-semibold text-sm hover:underline"
              >
                {t.home.viewAll}
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 1"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1761862062324-e0b9dc024433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJjaGl0ZWN0dXJlJTIwZG9tZSUyMG1vc3F1ZXxlbnwxfHx8fDE3Njk2NTIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 2"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1761542928838-86d8a44d5c8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmFiaWMlMjBib29rcyUyMGxpYnJhcnklMjBlZHVjYXRpb258ZW58MXx8fHwxNzY5NjUyMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 3"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1662104128135-7bd873b2befd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwYXJ0JTIwcGF0dGVybnxlbnwxfHx8fDE3Njk2NTIxMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
              <button
                onClick={() => {
                  setExploreInitialTab('galeri');
                  setActiveNav('explore');
                  setCurrentView('explore');
                }}
                className="overflow-hidden rounded-[16px] cursor-pointer"
              >
                <img
                  alt="Gallery 4"
                  className="w-full aspect-square object-cover rounded-[16px] shadow-sm hover:scale-105 transition-transform"
                  src="https://images.unsplash.com/photo-1760072986110-01cd779ddec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3NxdWUlMjBwcmF5ZXIlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzY5NjUyMTMxfDA&ixlib=rb-4.1.0&q=80&w=1080"
                />
              </button>
            </div>
            <button
              onClick={() => {
                setExploreInitialTab('galeri');
                setActiveNav('explore');
                setCurrentView('explore');
              }}
              className="w-full mt-6 py-3 border border-[#D6DCE8] text-[#243D68] font-semibold rounded-[12px] bg-white hover:bg-[#E5E8EC] lg:hidden transition-colors"
            >
              {t.home.viewAll}
            </button>
          </section>

          {/* Event Banner */}
          <section>
            <h2 className="text-[20px] font-semibold text-[#0E1B33] mb-6">
              {language === 'id' ? 'Kegiatan Offline Terbaru' : 'Latest Offline Activities'}
            </h2>
            <div className="relative w-full aspect-[16/9] md:aspect-[2.35/1] rounded-[16px] overflow-hidden shadow-[0_8px_24px_rgba(22,36,63,0.08)] group cursor-pointer">
              <img
                alt="Event Banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8SmFgeNYy36LFLNB19PYMFgDizekyt5iqu3G9c8CI4dsJxfM2gKR6YaCcPuDHRcipHwNf8dIZq29QeGMnQbTFtTjUtsj92TMZxF-Y7hbiPa8osv6hM-cDDpPFosc9mEL19N4fHcpohxJ6xOFA4jlqkHloXCGm4LK1lvslhIj5mxQyjeFIcW9-fu2qiPU94mbDJy8Hzt5fp-Un1Pro5GIilncogrJ_gEj6CbmbQ7xO497w_ibP1U614Bkz5F7pbozz0F1goS1GKtjh"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 lg:p-10 flex flex-col justify-end">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                  <div>
                    <h3 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                      Workshop Alumni di Surabaya!
                    </h3>
                    <p className="text-white/90 text-sm md:text-base flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span> 12 November
                      2025
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentView('event-detail')}
                    className="bg-[#FAC06E] text-[#16243F] text-sm font-bold py-2.5 px-6 rounded-full hover:bg-white transition-colors shadow-lg self-start md:self-auto"
                  >
                    {language === 'id' ? 'Lihat Detail' : 'View Details'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D6DCE8] lg:hidden z-50 safe-area-bottom">
        <div className="flex items-center justify-around h-16 px-2">
          <button
            onClick={() => {
              setActiveNav('home');
              setCurrentView('home');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'home' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'home' ? 'filled' : ''}`}>
              home
            </span>
            <span className="text-xs font-medium">{t.nav.home}</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('explore');
              setCurrentView('explore');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'explore' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'explore' ? 'filled' : ''}`}>
              explore
            </span>
            <span className="text-xs font-medium">{t.nav.explore}</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('pesan');
              setCurrentView('messages');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors relative ${
              activeNav === 'pesan' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'pesan' ? 'filled' : ''}`}>
              chat_bubble
            </span>
            <span className="text-xs font-medium">{t.nav.messages}</span>
            <span className="absolute top-1.5 right-1/4 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <button
            onClick={() => {
              setActiveNav('settings');
              setCurrentView('settings');
            }}
            className={`flex flex-col items-center justify-center flex-1 gap-1 py-2 transition-colors ${
              activeNav === 'settings' ? 'text-[#243D68]' : 'text-[#61728F]'
            }`}
          >
            <span className={`material-symbols-outlined text-2xl ${activeNav === 'settings' ? 'filled' : ''}`}>
              settings
            </span>
            <span className="text-xs font-medium">{t.nav.settings}</span>
          </button>
        </div>
      </nav>

      {/* Advanced Filter Modal */}
      {showFilterModal && (
        <div 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFilterModal(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#243D68] text-2xl">tune</span>
                <h3 className="text-xl font-bold text-[#0E1B33]">
                  {language === 'id' ? 'Filter Lanjutan' : 'Advanced Filters'}
                </h3>
              </div>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[#6B7280]">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Status Filter */}
                <div>
                  <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                    {language === 'id' ? 'Status Project' : 'Project Status'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['aktif', 'mendesak', 'selesai'].map((status) => {
                      const isSelected = advancedFilters.status.includes(status);
                      return (
                        <button
                          key={status}
                          onClick={() => {
                            setAdvancedFilters(prev => ({
                              ...prev,
                              status: isSelected
                                ? prev.status.filter(s => s !== status)
                                : [...prev.status, status]
                            }));
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#243D68] text-white shadow-md'
                              : 'bg-[#F8F9FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                          }`}
                        >
                          {status === 'aktif' && (language === 'id' ? '✓ Aktif' : '✓ Active')}
                          {status === 'mendesak' && (language === 'id' ? '⚡ Mendesak' : '⚡ Urgent')}
                          {status === 'selesai' && (language === 'id' ? '✔ Selesai' : '✔ Completed')}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                    {language === 'id' ? 'Lokasi' : 'Location'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['gaza', 'palestine', 'indonesia', 'global'].map((location) => {
                      const isSelected = advancedFilters.location.includes(location);
                      const locationLabel = {
                        gaza: 'Gaza',
                        palestine: language === 'id' ? 'Palestina' : 'Palestine',
                        indonesia: 'Indonesia',
                        global: 'Global'
                      };
                      return (
                        <button
                          key={location}
                          onClick={() => {
                            setAdvancedFilters(prev => ({
                              ...prev,
                              location: isSelected
                                ? prev.location.filter(l => l !== location)
                                : [...prev.location, location]
                            }));
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isSelected
                              ? 'bg-[#FAC06E] text-[#243D68] shadow-md'
                              : 'bg-[#F8F9FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                          }`}
                        >
                          📍 {locationLabel[location]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Type Filter */}
                <div>
                  <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                    {language === 'id' ? 'Tipe Project' : 'Project Type'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['open', 'donation', 'campaign'].map((type) => {
                      const isSelected = advancedFilters.projectType.includes(type);
                      const typeLabel = {
                        open: 'Open Volunteer',
                        donation: language === 'id' ? 'Donasi' : 'Donation',
                        campaign: language === 'id' ? 'Kampanye' : 'Campaign'
                      };
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            setAdvancedFilters(prev => ({
                              ...prev,
                              projectType: isSelected
                                ? prev.projectType.filter(t => t !== type)
                                : [...prev.projectType, type]
                            }));
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isSelected
                              ? 'bg-green-500 text-white shadow-md'
                              : 'bg-[#F8F9FA] text-[#6B7280] hover:bg-[#E5E7EB]'
                          }`}
                        >
                          {typeLabel[type]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amount Range Filter */}
                <div>
                  <label className="block text-sm font-bold text-[#0E1B33] mb-3">
                    {language === 'id' ? 'Rentang Target Donasi (Rp)' : 'Donation Target Range (Rp)'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-2">
                        {language === 'id' ? 'Minimum' : 'Minimum'}
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={advancedFilters.minAmount}
                        onChange={(e) => {
                          setAdvancedFilters(prev => ({
                            ...prev,
                            minAmount: e.target.value
                          }));
                        }}
                        className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B7280] mb-2">
                        {language === 'id' ? 'Maksimum' : 'Maximum'}
                      </label>
                      <input
                        type="number"
                        placeholder="999999999"
                        value={advancedFilters.maxAmount}
                        onChange={(e) => {
                          setAdvancedFilters(prev => ({
                            ...prev,
                            maxAmount: e.target.value
                          }));
                        }}
                        className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#243D68] focus:border-[#243D68] outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(advancedFilters.status.length > 0 ||
                  advancedFilters.location.length > 0 ||
                  advancedFilters.projectType.length > 0 ||
                  advancedFilters.minAmount ||
                  advancedFilters.maxAmount) && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">info</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-blue-900 mb-1">
                          {language === 'id' ? 'Filter Aktif' : 'Active Filters'}
                        </p>
                        <p className="text-xs text-blue-700">
                          {advancedFilters.status.length > 0 && `${advancedFilters.status.length} status, `}
                          {advancedFilters.location.length > 0 && `${advancedFilters.location.length} lokasi, `}
                          {advancedFilters.projectType.length > 0 && `${advancedFilters.projectType.length} tipe`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center gap-3 p-6 border-t border-[#E5E7EB]">
              <button
                onClick={() => {
                  setAdvancedFilters({
                    status: [],
                    location: [],
                    minAmount: '',
                    maxAmount: '',
                    projectType: [],
                  });
                }}
                className="flex-1 py-3 px-4 border-2 border-[#E5E7EB] text-[#6B7280] font-bold rounded-xl hover:bg-[#F8F9FA] transition-colors"
              >
                {language === 'id' ? 'Reset Semua' : 'Reset All'}
              </button>
              <button
                onClick={() => {
                  setShowFilterModal(false);
                  // Here you would apply the filters to your project list
                  console.log('Applying filters:', advancedFilters);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-[#243D68] to-[#1a2d4d] text-white font-bold rounded-xl hover:shadow-lg transition-all"
              >
                {language === 'id' ? 'Terapkan Filter' : 'Apply Filters'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
          100% {
            transform: scale(0.8);
            opacity: 0.6;
          }
        }
        
        .animate-ripple {
          animation: ripple 3s ease-in-out infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes zoom-in-95 {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .zoom-in-95 {
          animation: zoom-in-95 0.2s ease-out;
        }
      `}</style>
      </div>

      {/* Login Widget */}
      {showLoginWidget && (
        <LoginWidget
          onClose={() => setShowLoginWidget(false)}
          onLoginSuccess={(role) => {
            handleLogin(role);
            setShowLoginWidget(false);
          }}
          onRegisterClick={() => {
            setShowLoginWidget(false);
            setCurrentView('login');
          }}
        />
      )}
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <CampaignProvider>
      <AppContent />
    </CampaignProvider>
  );
}