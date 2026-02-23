/**
 * Shared TypeScript types and interfaces
 * Centralized type definitions for better type safety
 */

import { USER_ROLES, PROJECT_STATUS } from '@/constants';

/**
 * User related types
 */
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
}

/**
 * Project related types
 */
export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  status: ProjectStatus;
  progress: number;
  targetAmount?: number;
  currentAmount?: number;
  volunteers: number;
  daysLeft?: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  role: string;
  joinedAt: Date;
}

/**
 * Story related types
 */
export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  authorAvatar?: string;
  readTime: number;
  publishedAt: Date;
}

/**
 * Event related types
 */
export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  date: Date;
  time: string;
  capacity?: number;
  registeredCount?: number;
  category: string;
  createdAt: Date;
}

/**
 * Donation related types
 */
export interface Donation {
  id: string;
  projectId: string;
  projectTitle: string;
  donorId?: string;
  donorName?: string;
  amount: number;
  isAnonymous: boolean;
  message?: string;
  prayer?: string;
  paymentMethod: string;
  proofUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  referenceNumber: string;
  uniqueCode: number;
  submittedAt: string;
  verifiedAt?: string;
  rejectionReason?: string;
  verifiedBy?: string;
  createdAt: Date;
}

/**
 * Join Request related types
 */
export interface JoinRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  alumniId: string;
  alumniName: string;
  alumniEmail?: string;
  alumniPhoto?: string;
  alumniAngkatan?: string;
  alumniJurusan?: string;
  alumniPekerjaan?: string;
  alumniPerusahaan?: string;
  alumniKota?: string;
  reason: string;
  commitment?: string; // e.g., '3m', '6m', '1y'
  commitmentDuration: string; // Display text, e.g., "3 Bulan"
  interestedPosition?: string;
  previousProjects?: Array<{
    projectName: string;
    duration: string;
    completedTasks: number;
    rating: number;
  }>;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin';
  approvalMessage?: string; // Welcome message from reviewer
  rejectionReason?: string;
  rejectionAllowResubmit?: boolean;
  assignedRole?: 'member' | 'contributor'; // Auto-assigned role after approval
}

/**
 * Withdrawal related types
 */
export interface Withdrawal {
  id: string;
  projectId: string;
  projectTitle: string;
  picId: string;
  picName: string;
  amount: number;
  reason: string;
  bankAccount: string;
  bankName: string;
  accountHolder: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  processedBy?: string;
  approvalNote?: string;
  rejectionReason?: string;
}

/**
 * Notification related types
 */
export type NotificationType = 
  | 'donation_approved' 
  | 'donation_rejected' 
  | 'join_approved' 
  | 'join_rejected' 
  | 'progress_update' 
  | 'task_assigned'
  | 'task_completed'
  | 'withdrawal_approved' 
  | 'withdrawal_rejected'
  | 'content_removed'
  | 'event_registration_submitted'
  | 'event_approved'
  | 'event_rejected'
  | 'event_reminder'
  | 'event_cancelled'
  | 'project_closed'
  | 'project_closure_approved'
  | 'project_closure_rejected'
  | 'alumni_verified';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

/**
 * Message related types
 */
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
  updatedAt: Date;
}

/**
 * Discussion related types
 */
export interface Discussion {
  id: string;
  projectId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  type: 'announcement' | 'update' | 'question' | 'poll';
  likes: number;
  comments: number;
  hasLiked?: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  discussionId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  createdAt: Date;
}

/**
 * Navigation related types
 */
export interface NavigationProps {
  activeNav?: string;
  onNavigateHome?: () => void;
  onNavigateExplore?: () => void;
  onNavigateMessages?: () => void;
  onNavigateSettings?: () => void;
}

/**
 * Common component props
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PageProps extends NavigationProps {
  onBack?: () => void;
}

/**
 * Form related types
 */
export interface FormFieldProps {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
}

/**
 * API Response types
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

/**
 * Utility types
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Event Registration related types
 */
export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  alumniId: string;
  alumniName: string;
  alumniEmail: string;
  alumniPhone?: string;
  alumniPhoto?: string;
  alumniAngkatan?: string;
  alumniKota?: string;
  motivation: string;
  hasAttendedBefore?: boolean;
  dietaryRestrictions?: string;
  emergencyContact?: string;
  emergencyContactPhone?: string;
  status: 'pending' | 'approved' | 'rejected' | 'attended' | 'cancelled';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewedByRole?: 'PIC' | 'Moderator' | 'Superadmin';
  approvalMessage?: string;
  rejectionReason?: string;
  attendedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
}

/**
 * Content Update (Progress Update) Notification types
 */
export interface ContentUpdateNotification {
  id: string;
  projectId: string;
  projectTitle: string;
  updateTitle: string;
  updateType: 'progress' | 'announcement' | 'milestone' | 'meeting_reminder';
  createdBy: string;
  createdByName: string;
  createdAt: string;
}

/**
 * Task Assignment types
 */
export interface TaskAssignment {
  id: string;
  taskId: string;
  taskTitle: string;
  taskDescription?: string;
  projectId: string;
  projectTitle: string;
  assignedTo: string;
  assignedToName: string;
  assignedBy: string;
  assignedByName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate: string;
  category: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  completedAt?: string;
}

/**
 * Project Closure Request types
 */
export interface ProjectClosureRequest {
  id: string;
  projectId: string;
  projectTitle: string;
  picId: string;
  picName: string;
  reason: string;
  finalReport: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: string;
  processedAt?: string;
  processedBy?: string;
  approvalNote?: string;
  rejectionReason?: string;
}