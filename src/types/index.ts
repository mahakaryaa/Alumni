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
  donorName?: string;
  amount: number;
  isAnonymous: boolean;
  message?: string;
  prayer?: string;
  paymentMethod: string;
  proofUrl?: string;
  status: 'pending' | 'verified' | 'rejected';
  uniqueCode: number;
  createdAt: Date;
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
