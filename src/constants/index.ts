/**
 * Application-wide constants
 * Extracted magic numbers and configuration values for better maintainability
 */

// Layout Constants
export const LAYOUT = {
  HEADER_HEIGHT: 73,
  SIDEBAR_WIDTH_DESKTOP: 256, // 64 * 4 = 256px (w-64)
  BOTTOM_NAV_HEIGHT: 64,
  STICKY_TOP_OFFSET: 73,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION = {
  DURATION_FAST: 150,
  DURATION_NORMAL: 300,
  DURATION_SLOW: 500,
  PROGRESS_BAR_DURATION: 500,
} as const;

// Project Status
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PLANNING: 'planning',
} as const;

// User Roles
export const USER_ROLES = {
  GUEST: 'guest',
  ALUMNI: 'alumni',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  USER_ROLE: 'userRole',
  IS_LOGGED_IN: 'isLoggedIn',
} as const;

// Donation Amounts
export const DONATION = {
  MIN_AMOUNT: 10000,
  MAX_AMOUNT: 100000000,
  UNIQUE_CODE_MIN: 100,
  UNIQUE_CODE_MAX: 999,
  ADMIN_FEE: 4500,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
} as const;

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_REGEX: /^[0-9]{10,13}$/,
  MIN_PASSWORD_LENGTH: 6,
} as const;

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login berhasil! Selamat datang di ProjekKita',
  LOGOUT_SUCCESS: 'Logout berhasil! Sampai jumpa lagi',
  DONATION_SUCCESS: 'Terima kasih! Donasi Anda sedang diproses',
  FORM_ERROR: 'Mohon lengkapi semua field yang diperlukan',
  UPLOAD_ERROR: 'Upload gagal. Ukuran file maksimal 5MB',
  NETWORK_ERROR: 'Terjadi kesalahan jaringan. Silakan coba lagi',
} as const;

// API Endpoints (for future backend integration)
export const API_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  PROJECTS: '/api/projects',
  DONATE: '/api/donations',
  STORIES: '/api/stories',
  EVENTS: '/api/events',
} as const;

// Z-Index Layers
export const Z_INDEX = {
  BASE: 1,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOAST: 100,
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
