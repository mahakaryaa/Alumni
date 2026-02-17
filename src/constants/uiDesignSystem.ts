/**
 * 🎨 AlMaqdisi Project - UI Design System Constants
 * 
 * Standardized spacing, sizing, and styling utilities
 * for consistent UI implementation across the application.
 * 
 * @version 1.0.0
 * @author Senior Frontend UI Engineer AI Agent
 * @date 2026-02-17
 */

/**
 * ========================================
 * 📏 SPACING SCALE
 * ========================================
 * Base unit: 4px (0.25rem)
 * 
 * Usage: Use these constants for padding, margin, and gap
 */
export const SPACING = {
  // Tailwind Class -> Actual Value
  xs: '0.5rem',   // 8px  - p-2, gap-2
  sm: '0.75rem',  // 12px - p-3, gap-3
  md: '1rem',     // 16px - p-4, gap-4 (MOST COMMON)
  lg: '1.25rem',  // 20px - p-5, gap-5
  xl: '1.5rem',   // 24px - p-6, gap-6 (PRIMARY)
  '2xl': '2rem',  // 32px - p-8, gap-8
  '3xl': '2.5rem', // 40px - p-10, gap-10 (Dropdown right padding)
} as const;

/**
 * ========================================
 * 🎨 COLOR PALETTE
 * ========================================
 */
export const COLORS = {
  // Primary Colors
  primary: {
    DEFAULT: '#243D68',
    dark: '#1a2d4d',
    light: '#2B4468',
  },
  
  // Accent Colors
  accent: {
    DEFAULT: '#FAC06E',
    dark: '#e8b05e',
    light: '#FCD89A',
  },
  
  // Background Colors
  background: {
    DEFAULT: '#F8F9FA',
    white: '#FFFFFF',
    dark: '#0E1B33',
  },
  
  // Neutral Colors
  neutral: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#0E1B33',
  },
  
  // Semantic Colors
  success: {
    DEFAULT: '#4CAF50',
    light: '#E8F5E9',
    dark: '#047857',
  },
  
  error: {
    DEFAULT: '#EF4444',
    light: '#FEE2E2',
    dark: '#DC2626',
  },
  
  warning: {
    DEFAULT: '#F59E0B',
    light: '#FEF3C7',
    dark: '#D97706',
  },
  
  info: {
    DEFAULT: '#3B82F6',
    light: '#DBEAFE',
    dark: '#2563EB',
  },
} as const;

/**
 * ========================================
 * 📐 BORDER RADIUS
 * ========================================
 */
export const RADIUS = {
  sm: '0.375rem',   // 6px  - rounded-sm
  DEFAULT: '0.5rem', // 8px  - rounded-lg
  md: '0.5rem',      // 8px  - rounded-lg
  lg: '0.75rem',     // 12px - rounded-xl (INPUTS, MODALS)
  xl: '1rem',        // 16px - rounded-2xl
  '2xl': '1.5rem',   // 24px - rounded-3xl
  full: '9999px',    // rounded-full (BADGES, PILLS)
} as const;

/**
 * ========================================
 * 📝 INPUT FIELD STYLES
 * ========================================
 */
export const INPUT_STYLES = {
  // Base Input Field
  base: [
    'w-full',
    'px-4 py-3', // 16px horizontal, 12px vertical
    'border-2 border-[#E5E7EB]',
    'rounded-xl',
    'focus:border-[#243D68]',
    'focus:outline-none',
    'transition-colors',
  ].join(' '),
  
  // Textarea
  textarea: [
    'w-full',
    'px-4 py-3',
    'border-2 border-[#E5E7EB]',
    'rounded-xl',
    'focus:border-[#243D68]',
    'focus:outline-none',
    'resize-none',
    'transition-colors',
  ].join(' '),
  
  // Select/Dropdown
  select: [
    'w-full',
    'pl-4 pr-12', // Left: 16px, Right: 48px (for icon with more breathing room)
    'py-2',       // 8px vertical
    'border border-[#E5E7EB]',
    'rounded-lg',
    'focus:border-[#243D68]',
    'focus:outline-none',
    'appearance-none',
    'bg-white',
    'transition-colors',
  ].join(' '),
  
  // Dropdown Icon Style
  selectIconStyle: {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%236B7280' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center', // 16px from right edge (improved spacing)
    backgroundSize: '1.5rem', // 24px icon
  },
} as const;

/**
 * ========================================
 * 🔘 BUTTON STYLES
 * ========================================
 */
export const BUTTON_STYLES = {
  // Primary Button
  primary: [
    'px-6 py-3', // 24px horizontal, 12px vertical
    'bg-[#243D68]',
    'text-white',
    'rounded-xl',
    'font-bold',
    'hover:bg-[#1a2d4d]',
    'active:scale-[0.98]',
    'transition-all',
    'duration-200',
    'shadow-sm',
    'hover:shadow-md',
  ].join(' '),
  
  // Secondary Button
  secondary: [
    'px-6 py-3',
    'border-2 border-[#E5E7EB]',
    'text-[#6B7280]',
    'rounded-xl',
    'font-semibold',
    'hover:bg-[#F8F9FA]',
    'active:scale-[0.98]',
    'transition-all',
    'duration-200',
  ].join(' '),
  
  // Outline Button
  outline: [
    'px-6 py-3',
    'border-2 border-[#243D68]',
    'text-[#243D68]',
    'rounded-xl',
    'font-semibold',
    'hover:bg-[#243D68]',
    'hover:text-white',
    'active:scale-[0.98]',
    'transition-all',
    'duration-200',
  ].join(' '),
  
  // Small Button (Categories, Tags)
  small: [
    'px-4 py-2', // 16px horizontal, 8px vertical
    'rounded-full',
    'text-sm',
    'font-semibold',
    'transition-all',
    'duration-200',
    'shadow-sm',
    'active:scale-95',
  ].join(' '),
  
  // Icon Button
  icon: [
    'p-2', // 8px all sides (40x40px minimum touch target)
    'hover:bg-[#F8F9FA]',
    'rounded-lg',
    'transition-colors',
    'duration-200',
    'flex',
    'items-center',
    'justify-center',
  ].join(' '),
} as const;

/**
 * ========================================
 * 📦 CONTAINER STYLES
 * ========================================
 */
export const CONTAINER_STYLES = {
  // Card
  card: [
    'bg-white',
    'rounded-xl',
    'p-6', // 24px padding
    'border border-[#E5E7EB]',
    'shadow-sm',
    'hover:shadow-md',
    'transition-shadow',
    'duration-200',
  ].join(' '),
  
  // Modal Overlay
  modalOverlay: [
    'fixed inset-0',
    'bg-black/60',
    'flex items-center justify-center',
    'z-50',
    'p-4', // 16px padding for mobile
    'backdrop-blur-sm',
  ].join(' '),
  
  // Modal Container
  modalContainer: [
    'bg-white',
    'rounded-2xl',
    'max-w-2xl',
    'w-full',
    'max-h-[90vh]',
    'overflow-y-auto',
    'shadow-2xl',
  ].join(' '),
  
  // Modal Header
  modalHeader: [
    'sticky top-0',
    'bg-gradient-to-r from-[#243D68] to-[#2B4468]',
    'px-6 py-4', // 24px horizontal, 16px vertical
    'rounded-t-2xl',
    'flex items-center justify-between',
    'z-10',
  ].join(' '),
  
  // Modal Body
  modalBody: [
    'p-6', // 24px padding all sides
    'space-y-4', // 16px vertical spacing between elements
    'max-h-[70vh]',
    'overflow-y-auto',
  ].join(' '),
  
  // Modal Footer
  modalFooter: [
    'sticky bottom-0',
    'bg-white',
    'px-6 py-4', // 24px horizontal, 16px vertical
    'border-t border-[#E5E7EB]',
    'rounded-b-2xl',
    'flex gap-3',
    'z-10',
  ].join(' '),
  
  // Section Container
  section: [
    'bg-white',
    'rounded-xl',
    'p-6',
    'border border-[#E5E7EB]',
    'space-y-6', // 24px spacing between subsections
  ].join(' '),
} as const;

/**
 * ========================================
 * 🏷️ BADGE STYLES
 * ========================================
 */
export const BADGE_STYLES = {
  // Small Badge
  small: [
    'text-xs',
    'font-bold',
    'px-2.5 py-1', // 10px horizontal, 4px vertical
    'rounded-full',
    'uppercase',
    'tracking-wide',
  ].join(' '),
  
  // Medium Badge
  medium: [
    'text-xs',
    'font-semibold',
    'px-3 py-1.5', // 12px horizontal, 6px vertical
    'rounded-full',
    'border',
  ].join(' '),
  
  // Status Badge (with color variants)
  status: (variant: 'success' | 'warning' | 'error' | 'info') => {
    const colors = {
      success: 'bg-green-50 text-green-600 border-green-200',
      warning: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      error: 'bg-red-50 text-red-600 border-red-200',
      info: 'bg-blue-50 text-blue-600 border-blue-200',
    };
    
    return [
      'text-xs',
      'font-semibold',
      'px-3 py-1.5',
      'rounded-full',
      'border',
      colors[variant],
    ].join(' ');
  },
} as const;

/**
 * ========================================
 * 🧭 NAVIGATION STYLES
 * ========================================
 */
export const NAV_STYLES = {
  // Sidebar Nav Item
  sidebarItem: [
    'flex items-center gap-3',
    'px-4 py-3.5', // 16px horizontal, 14px vertical
    'rounded-xl',
    'font-medium',
    'transition-all',
    'duration-200',
    'w-full',
  ].join(' '),
  
  // Bottom Nav Item
  bottomNavItem: [
    'flex flex-col items-center justify-center',
    'flex-1',
    'gap-1', // 4px gap between icon and text
    'py-2', // 8px vertical
    'transition-colors',
    'duration-200',
  ].join(' '),
  
  // Mobile Nav Item
  mobileNavItem: [
    'flex flex-col items-center',
    'gap-1',
    'px-4 py-2', // 16px horizontal, 8px vertical
    'transition-colors',
    'duration-200',
  ].join(' '),
} as const;

/**
 * ========================================
 * 📱 RESPONSIVE BREAKPOINTS
 * ========================================
 */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * ========================================
 * 🎭 ANIMATION DURATIONS
 * ========================================
 */
export const DURATION = {
  fast: '150ms',
  DEFAULT: '200ms',
  slow: '300ms',
  slower: '500ms',
} as const;

/**
 * ========================================
 * 📊 Z-INDEX LAYERS
 * ========================================
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

/**
 * ========================================
 * 📐 COMMON MEASUREMENTS
 * ========================================
 */
export const MEASUREMENTS = {
  // Touch Targets (WCAG 2.1 AA)
  minTouchTarget: '44px', // Minimum interactive element size
  
  // Input Heights
  inputHeight: '44px', // px-4 py-3
  selectHeight: '40px', // pl-4 pr-10 py-2
  
  // Icon Sizes
  iconSm: '16px',
  iconMd: '20px',
  iconLg: '24px',
  iconXl: '32px',
  
  // Avatar Sizes
  avatarSm: '32px',
  avatarMd: '40px',
  avatarLg: '48px',
  avatarXl: '64px',
} as const;

/**
 * ========================================
 * 🎨 USAGE EXAMPLES
 * ========================================
 */

/**
 * Example 1: Input Field
 * 
 * ```tsx
 * <input
 *   type="text"
 *   className={INPUT_STYLES.base}
 *   placeholder="Enter your name"
 * />
 * ```
 */

/**
 * Example 2: Dropdown with Icon
 * 
 * ```tsx
 * <select
 *   className={INPUT_STYLES.select}
 *   style={INPUT_STYLES.selectIconStyle}
 * >
 *   <option>Select option</option>
 * </select>
 * ```
 */

/**
 * Example 3: Primary Button
 * 
 * ```tsx
 * <button className={BUTTON_STYLES.primary}>
 *   Submit
 * </button>
 * ```
 */

/**
 * Example 4: Card Container
 * 
 * ```tsx
 * <div className={CONTAINER_STYLES.card}>
 *   <h3>Card Title</h3>
 *   <p>Card content...</p>
 * </div>
 * ```
 */

/**
 * Example 5: Modal Structure
 * 
 * ```tsx
 * <div className={CONTAINER_STYLES.modalOverlay}>
 *   <div className={CONTAINER_STYLES.modalContainer}>
 *     <div className={CONTAINER_STYLES.modalHeader}>
 *       <h3>Modal Title</h3>
 *     </div>
 *     <div className={CONTAINER_STYLES.modalBody}>
 *       <p>Modal content...</p>
 *     </div>
 *     <div className={CONTAINER_STYLES.modalFooter}>
 *       <button>Cancel</button>
 *       <button>Confirm</button>
 *     </div>
 *   </div>
 * </div>
 * ```
 */

/**
 * ========================================
 * 📋 QUICK REFERENCE
 * ========================================
 * 
 * Most Common Combinations:
 * 
 * ✅ Input Field:        px-4 py-3
 * ✅ Select Dropdown:    pl-4 pr-12 py-2 (UPDATED: more icon spacing!)
 * ✅ Textarea:           px-4 py-3
 * ✅ Primary Button:     px-6 py-3
 * ✅ Small Button:       px-4 py-2
 * ✅ Icon Button:        p-2
 * ✅ Card:               p-6
 * ✅ Modal Header/Footer: px-6 py-4
 * ✅ Modal Body:         p-6
 * ✅ Section Spacing:    space-y-6 or gap-6
 * ✅ Badge Small:        px-2.5 py-1
 * ✅ Badge Medium:       px-3 py-1.5
 * 
 * Icon in Dropdown:
 * - backgroundPosition: 'right 1rem center' (16px from edge - IMPROVED!)
 * - backgroundSize: '1.5rem' (24px)
 * - pr-12 (48px right padding - NO MORE MEPET!)
 * 
 * ========================================
 */

export default {
  SPACING,
  COLORS,
  RADIUS,
  INPUT_STYLES,
  BUTTON_STYLES,
  CONTAINER_STYLES,
  BADGE_STYLES,
  NAV_STYLES,
  BREAKPOINTS,
  DURATION,
  Z_INDEX,
  MEASUREMENTS,
};
