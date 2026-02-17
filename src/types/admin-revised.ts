/**
 * Admin Panel Types (REVISED)
 * PIC = Project In Charge (Pengelola Proyek)
 */

export type AdminRole = 'pic' | 'moderator' | 'superadmin';
export type JoinRequestStatus = 'pending' | 'approved' | 'rejected';
export type CommitmentDuration = '1_month' | '3_months' | '6_months' | '1_year' | 'ongoing';
export type MemberStatus = 'active' | 'inactive' | 'suspended';
export type TransactionType = 'donation' | 'expense';
export type ExpenseCategory = 'operational' | 'distribution' | 'marketing' | 'admin' | 'equipment' | 'other';
export type ActivityType = 
  | 'member_joined' 
  | 'member_left' 
  | 'transaction_added' 
  | 'update_posted' 
  | 'poll_created'
  | 'milestone_achieved'
  | 'request_approved'
  | 'request_rejected';
export type ActivityAction = 
  | 'approve_request'
  | 'reject_request'
  | 'kick_member'
  | 'add_donation'
  | 'add_expense'
  | 'post_update'
  | 'create_poll'
  | 'assign_task'
  | 'complete_task'
  | 'update_project';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskCategory = 'operational' | 'distribution' | 'marketing' | 'admin' | 'other';

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
  projectId?: string; // ID of project that PIC manages
}

// Project Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'pendidikan' | 'kesehatan' | 'lingkungan' | 'kemanusiaan';
  hashtags: string[];
  shortDescription: string;
  fullDescription: string;
  bannerImage: string;
  picId: string; // Current PIC managing this project
  targetMembers: number;
  currentMembers: number;
  targetDana: number;
  danaUmum: number; // Dana dari donatur publik
  danaInternal: number; // Dana dari iuran member
  status: 'draft' | 'open_volunteer' | 'running' | 'completed' | 'archived';
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  moderatorId?: string; // Moderator yang supervise project ini
}

// Join Request Types
export interface JoinRequest {
  id: string;
  projectId: string;
  alumniId: string;
  alumniName: string;
  alumniEmail: string;
  alumniPhoto?: string;
  alumniAngkatan: string;
  alumniJurusan: string;
  alumniPekerjaan?: string;
  alumniPerusahaan?: string;
  alumniKota?: string;
  commitment: CommitmentDuration;
  interestedPosition?: string; // Posisi yang diminati
  reason: string; // Alasan bergabung
  status: JoinRequestStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string; // PIC ID who reviewed
  reviewNote?: string; // Pesan dari PIC (approve/reject)
  rejectionReason?: string; // Alasan reject
  resubmitAllowedAt?: string; // Kapan boleh submit ulang (jika reject)
  // Alumni history
  previousProjects?: {
    projectName: string;
    duration: string;
    rating: number;
    completedTasks: number;
  }[];
}

// Project Member Types
export interface ProjectMember {
  id: string;
  projectId: string;
  alumniId: string;
  alumniName: string;
  alumniEmail: string;
  alumniPhoto?: string;
  alumniAngkatan: string;
  alumniJurusan: string;
  alumniPekerjaan?: string;
  commitment: CommitmentDuration;
  commitmentStartDate: string;
  commitmentEndDate: string;
  joinedAt: string;
  status: MemberStatus;
  // Contribution metrics
  tasksCompleted: number;
  discussionParticipation: number;
  pollsVoted: number;
  rating: number; // 1-5
  tags?: string[];
  kickedAt?: string;
  kickReason?: string;
}

// Finance Types
export type TransactionSource = 'donasi_online' | 'transfer_bank' | 'cash' | 'ewallet' | 'member_payment';

export interface FinanceTransaction {
  id: string;
  projectId: string;
  type: TransactionType;
  amount: number;
  source?: TransactionSource;
  donorName?: string; // For dana umum
  memberName?: string; // For dana internal
  category?: ExpenseCategory; // For expense
  description: string;
  date: string;
  proofUrl?: string; // URL bukti transfer/nota
  notes?: string;
  createdBy: string; // PIC ID
  createdAt: string;
}

// Poll Types
export type PollStatus = 'draft' | 'active' | 'closed';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  voters: string[]; // Member names (if not anonymous)
}

export interface Poll {
  id: string;
  projectId: string;
  question: string;
  description?: string;
  title?: string; // Alias for question for backward compatibility
  type?: 'single_choice' | 'multiple_choice';
  options: PollOption[];
  allowMultiple?: boolean; // Alternative to type
  deadline: string;
  status: PollStatus;
  isAnonymous: boolean;
  showRealtimeResults?: boolean;
  isRequired?: boolean;
  createdBy: string; // PIC ID
  createdByName?: string;
  createdAt: string;
  closedAt?: string;
  totalVotes: number;
  totalVoters?: number;
  participationRate?: number; // percentage
}

export interface PollVote {
  id: string;
  pollId: string;
  memberId: string;
  optionIds: string[]; // Array for multiple choice
  votedAt: string;
}

// Progress Update Types
export type UpdateType = 'progress' | 'announcement' | 'milestone' | 'meeting_reminder';

export interface ProgressUpdate {
  id: string;
  projectId: string;
  type: UpdateType;
  title: string;
  content: string; // Rich text / markdown
  mediaUrls?: string[]; // Photos/videos
  createdBy: string; // PIC ID
  createdAt: string;
  notifyMembers: boolean;
  commentsCount: number;
  likesCount: number;
}

// Gallery Types
export interface GalleryItem {
  id: string;
  projectId: string;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  tags?: string[];
  uploadedBy: string; // PIC ID
  uploadedAt: string;
  showOnHomepage: boolean;
}

// Delegation Types
export interface PICDelegation {
  id: string;
  projectId: string;
  fromPicId: string;
  fromPicName: string;
  toPicId: string; // Member ID yang jadi PIC baru
  toPicName: string;
  reason: string;
  messageToNewPic: string;
  handoverChecklist: {
    documents: boolean;
    contacts: boolean;
    whatsappAccess: boolean;
    financialReports: boolean;
    accountPassword: boolean;
  };
  delegatedAt: string;
  status: 'completed';
}

// Delegated Task Types
export interface DelegatedTask {
  id: string;
  projectId: string;
  title: string;
  description: string;
  assignedTo: string; // Member ID
  assignedToName: string;
  assignedBy: string; // PIC ID
  assignedByName: string;
  priority: TaskPriority;
  category: TaskCategory;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  completedAt?: string;
  notes?: string;
}

// Activity Log Types (Revised)
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: AdminRole;
  action: ActivityAction;
  targetType: 'join_request' | 'member' | 'finance' | 'content' | 'poll' | 'delegation' | 'system';
  targetId?: string;
  description: string;
  projectId?: string;
  timestamp: string;
  ipAddress?: string;
}

// Dashboard Stats (Revised for PIC)
export interface PICDashboardStats {
  projectId: string;
  projectTitle: string;
  projectStatus: Project['status'];
  // Members
  currentMembers: number;
  targetMembers: number;
  memberPercentage: number;
  pendingRequests: number;
  // Finance
  danaUmum: number;
  danaInternal: number;
  totalDana: number;
  targetDana: number;
  danaPercentage: number;
  danaUsed: number;
  danaRemaining: number;
  // Engagement
  discussionMessages: number;
  activePolls: number;
  pollParticipation: number;
  // Progress
  progressPercentage: number;
  milestonesCompleted: number;
  totalMilestones: number;
}

export interface ModeratorDashboardStats {
  totalProjects: number;
  activeProjects: number;
  inactiveProjects: number;
  totalPICs: number;
  activePICs: number;
  totalMembers: number;
  totalDana: number;
  pendingReviews: number;
  monthlyGrowth: number;
}

export interface SuperadminDashboardStats {
  totalProjects: number;
  totalMembers: number;
  totalDana: number;
  totalAdmins: number;
  superadminCount: number;
  moderatorCount: number;
  picCount: number;
  totalAlumni: number;
  totalDonors: number;
}

// Donation & Financial Types (For Superadmin Financial Dashboard)
export type DonationStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type DonorType = 'alumni' | 'non_alumni' | 'anonymous';
export type PaymentMethod = 'bank_transfer' | 'ewallet' | 'credit_card' | 'cash';

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  donorType: DonorType;
  projectId: string;
  projectTitle: string;
  amount: number;
  paymentMethod: PaymentMethod;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  status: DonationStatus;
  proofUrl?: string; // URL bukti transfer
  notes?: string;
  message?: string; // Pesan dari donatur
  isAnonymous: boolean;
  submittedAt: string;
  verifiedAt?: string;
  verifiedBy?: string; // Superadmin ID
  verificationNote?: string;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectWallet {
  id: string;
  projectId: string;
  projectTitle: string;
  balance: number; // Saldo terkini
  totalIncome: number; // Total donasi masuk (approved)
  totalExpense: number; // Total pengeluaran
  totalPending: number; // Donasi pending approval
  totalRejected: number; // Donasi rejected
  lastTransactionAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WalletTransaction {
  id: string;
  walletId: string;
  projectId: string;
  type: 'income' | 'expense' | 'withdrawal';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  source: string; // Donor name or expense category
  description: string;
  reference?: string; // Donation ID or Expense ID
  createdBy?: string; // Admin ID
  createdByName?: string;
  createdAt: string;
}

export interface WithdrawalRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  picId: string;
  picName: string;
  amount: number;
  purpose: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string; // Superadmin ID
  reviewerName?: string;
  reviewNote?: string;
  rejectionReason?: string;
}

export interface FinancialDashboardStats {
  // Global Statistics
  totalDonationsAllTime: number;
  totalDonationsPending: number;
  totalDonationsRejected: number;
  totalWalletBalance: number;
  totalDonationsThisMonth: number;
  totalDonationsLastMonth: number;
  growthPercentage: number;
  
  // Donors
  totalDonors: number;
  totalAlumniDonors: number;
  totalNonAlumniDonors: number;
  
  // Projects
  totalActiveProjects: number;
  averageDonationPerProject: number;
  
  // Pending Actions
  pendingPayments: number;
  pendingWithdrawals: number;
}

export interface TopProjectByDonation {
  projectId: string;
  projectTitle: string;
  projectCategory: string;
  totalDonations: number;
  donorCount: number;
  averageDonation: number;
  lastDonationAt: string;
}

export interface MonthlyDonationTrend {
  month: string;
  year: number;
  totalDonations: number;
  donationCount: number;
  averageDonation: number;
}

// Permission Matrix
export interface RolePermissions {
  // Member Management
  canApproveJoinRequest: boolean;
  canRejectJoinRequest: boolean;
  canViewMembers: boolean;
  canKickMember: boolean;
  canBroadcastMessage: boolean;
  
  // Finance
  canUpdateDanaUmum: boolean;
  canUpdateDanaInternal: boolean;
  canAddExpense: boolean;
  canApproveWithdrawal: boolean;
  canViewFinance: boolean;
  
  // Content
  canEditOverview: boolean;
  canPostUpdate: boolean;
  canUploadGallery: boolean;
  canModerateDiscussion: boolean;
  
  // Polling
  canCreatePoll: boolean;
  canClosePoll: boolean;
  
  // Delegation
  canDelegatePIC: boolean;
  
  // Project Management
  canCreateProject: boolean;
  canDeleteProject: boolean;
  canPublishProject: boolean;
  canReassignPIC: boolean;
  
  // User Management
  canViewUsers: boolean;
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canChangeRole: boolean;
  
  // System
  canViewActivityLog: boolean;
  canAccessSystemSettings: boolean;
  canExportData: boolean;
}