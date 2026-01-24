/**
 * ProjekKita - Official Color Palette
 * 
 * Standardized color system aligned with brand identity.
 * Always import and use these constants instead of hardcoding colors.
 * 
 * Brand Colors:
 * - Primary: #243D68 (Navy Blue)
 * - Accent: #FAC06E (Golden Yellow)
 * - Background: #F8F9FA (Off White)
 */

// ============================================================================
// PRIMARY COLORS (Navy Blue)
// ============================================================================
export const PRIMARY = {
  // Main primary color
  DEFAULT: '#243D68',
  
  // Lighter variants
  50: '#EEF1F6',
  100: '#D6DCE8',
  200: '#B4BFDB',
  300: '#91A2CE',
  
  // Base and darker variants
  400: '#5A70A0',
  500: '#243D68', // Same as DEFAULT
  600: '#1F3458',
  700: '#1A2D4D',
  800: '#152642',
  900: '#0E1B33', // Darkest for text
  
  // Sidebar variant
  SIDEBAR: '#2B4468',
  
  // Hover states
  HOVER: '#183A74',
  HOVER_DARK: '#1a2d4d',
} as const;

// ============================================================================
// ACCENT COLORS (Golden Yellow)
// ============================================================================
export const ACCENT = {
  // Main accent color
  DEFAULT: '#FAC06E',
  
  // Lighter variants
  50: '#FFF8ED',
  100: '#FEF0D6',
  200: '#FDE3B3',
  300: '#FCD490',
  
  // Base and darker variants
  400: '#FBD07F',
  500: '#FAC06E', // Same as DEFAULT
  600: '#F9B05D',
  700: '#F29F3F',
  800: '#E88F21',
  900: '#C67510',
} as const;

// ============================================================================
// NEUTRAL COLORS (Grays & Background)
// ============================================================================
export const NEUTRAL = {
  // Whites & Off-whites
  WHITE: '#FFFFFF',
  BACKGROUND: '#F8F9FA',
  
  // Light grays (for borders, dividers)
  50: '#FAFBFC',
  100: '#F8F9FA',
  200: '#E5E8EC',
  300: '#E5E7EB',
  400: '#D6DCE8',
  500: '#D1D5DB',
  
  // Medium grays (for disabled, subtle text)
  600: '#919EB2',
  700: '#6B7280',
  800: '#61728F',
  
  // Dark grays (for body text, headings)
  900: '#333333',
  950: '#1F2937',
  BLACK: '#0E1B33',
} as const;

// ============================================================================
// FUNCTIONAL COLORS (Semantic States)
// ============================================================================
export const FUNCTIONAL = {
  // Success (using softer green aligned with brand)
  SUCCESS: {
    DEFAULT: '#10B981',
    LIGHT: '#D1FAE5',
    DARK: '#047857',
    TEXT: '#065F46',
  },
  
  // Error / Danger (red for critical actions)
  ERROR: {
    DEFAULT: '#EF4444',
    LIGHT: '#FEE2E2',
    DARK: '#DC2626',
    TEXT: '#991B1B',
  },
  
  // Warning (using accent-aligned orange/amber)
  WARNING: {
    DEFAULT: '#F59E0B',
    LIGHT: '#FEF3C7',
    DARK: '#D97706',
    TEXT: '#92400E',
  },
  
  // Info (using primary-aligned blue)
  INFO: {
    DEFAULT: '#3B82F6',
    LIGHT: '#DBEAFE',
    DARK: '#1D4ED8',
    TEXT: '#1E40AF',
  },
  
  // Online status (soft green)
  ONLINE: '#10B981',
  
  // Badge variants (aligned with brand)
  BADGE: {
    OPEN_VOLUNTEER: {
      BG: '#D1FAE5',
      TEXT: '#047857',
    },
    PROJECT_TEAM: {
      BG: '#D9EDF8',
      TEXT: '#243D68', // Using primary
    },
    URGENT: {
      BG: '#FEE2E2',
      TEXT: '#991B1B',
    },
  },
} as const;

// ============================================================================
// SEMANTIC COLORS (By Usage Context)
// ============================================================================
export const SEMANTIC = {
  // Text colors
  TEXT: {
    PRIMARY: NEUTRAL.BLACK, // #0E1B33
    SECONDARY: NEUTRAL[700], // #6B7280
    TERTIARY: NEUTRAL[600], // #919EB2
    DISABLED: NEUTRAL[500], // #D1D5DB
    INVERSE: NEUTRAL.WHITE,
    HEADING: NEUTRAL.BLACK,
    BODY: NEUTRAL[900], // #333333
  },
  
  // Background colors
  BG: {
    PRIMARY: NEUTRAL.WHITE,
    SECONDARY: NEUTRAL.BACKGROUND, // #F8F9FA
    TERTIARY: NEUTRAL[200], // #E5E8EC
    HOVER: NEUTRAL[100],
    ACTIVE: PRIMARY[50],
    SIDEBAR: PRIMARY.SIDEBAR, // #2B4468
  },
  
  // Border colors
  BORDER: {
    DEFAULT: NEUTRAL[400], // #D6DCE8
    LIGHT: NEUTRAL[300], // #E5E7EB
    DARK: NEUTRAL[500],
    FOCUS: PRIMARY.DEFAULT, // #243D68
    HOVER: PRIMARY[300],
  },
  
  // Interactive elements
  INTERACTIVE: {
    DEFAULT: PRIMARY.DEFAULT,
    HOVER: PRIMARY.HOVER,
    ACTIVE: PRIMARY[800],
    DISABLED: NEUTRAL[400],
  },
  
  // Links
  LINK: {
    DEFAULT: PRIMARY.DEFAULT,
    HOVER: PRIMARY.HOVER,
    VISITED: PRIMARY[700],
  },
} as const;

// ============================================================================
// TEAM/PROJECT COLORS (Replace Tailwind blue/green/purple)
// ============================================================================
export const TEAM = {
  // Team 1 - Primary based (replaces blue)
  BLUE: {
    BG: PRIMARY[50], // Light blue → Light primary
    TEXT: PRIMARY.DEFAULT,
    ICON: PRIMARY[600],
    PROGRESS: PRIMARY.DEFAULT,
  },
  
  // Team 2 - Success based (replaces green)
  GREEN: {
    BG: FUNCTIONAL.SUCCESS.LIGHT,
    TEXT: FUNCTIONAL.SUCCESS.DARK,
    ICON: FUNCTIONAL.SUCCESS.DEFAULT,
    PROGRESS: FUNCTIONAL.SUCCESS.DEFAULT,
  },
  
  // Team 3 - Accent based (replaces purple)
  ACCENT: {
    BG: ACCENT[50],
    TEXT: ACCENT[800],
    ICON: ACCENT[700],
    PROGRESS: ACCENT.DEFAULT,
  },
} as const;

// ============================================================================
// PRIORITY COLORS (For tasks/urgency)
// ============================================================================
export const PRIORITY = {
  HIGH: {
    BG: FUNCTIONAL.ERROR.DEFAULT,
    TEXT: NEUTRAL.WHITE,
    GRADIENT_FROM: '#EF4444',
    GRADIENT_TO: '#DC2626',
    LIGHT_BG: FUNCTIONAL.ERROR.LIGHT,
    LIGHT_TEXT: FUNCTIONAL.ERROR.TEXT,
  },
  
  MEDIUM: {
    BG: FUNCTIONAL.WARNING.DEFAULT,
    TEXT: NEUTRAL.WHITE,
    GRADIENT_FROM: '#F59E0B',
    GRADIENT_TO: '#D97706',
    LIGHT_BG: FUNCTIONAL.WARNING.LIGHT,
    LIGHT_TEXT: FUNCTIONAL.WARNING.TEXT,
  },
  
  LOW: {
    BG: PRIMARY.DEFAULT,
    TEXT: NEUTRAL.WHITE,
    GRADIENT_FROM: PRIMARY.DEFAULT,
    GRADIENT_TO: PRIMARY[700],
    LIGHT_BG: PRIMARY[50],
    LIGHT_TEXT: PRIMARY.DEFAULT,
  },
} as const;

// ============================================================================
// VOTING/POLL COLORS (Replace indigo)
// ============================================================================
export const VOTING = {
  SELECTED: {
    BG: PRIMARY[50],
    BORDER: PRIMARY.DEFAULT,
    PROGRESS: PRIMARY.DEFAULT,
    TEXT: PRIMARY.DEFAULT,
  },
  UNSELECTED: {
    BG: NEUTRAL.WHITE,
    BORDER: NEUTRAL[300],
    PROGRESS: ACCENT.DEFAULT,
    TEXT: NEUTRAL[700],
  },
  ACTIVE: {
    BG: FUNCTIONAL.SUCCESS.LIGHT,
    TEXT: FUNCTIONAL.SUCCESS.DARK,
  },
  CLOSED: {
    BG: NEUTRAL[200],
    TEXT: NEUTRAL[700],
  },
} as const;

// ============================================================================
// GRADIENT PRESETS
// ============================================================================
export const GRADIENTS = {
  PRIMARY: `linear-gradient(to right, ${PRIMARY.DEFAULT}, ${PRIMARY.HOVER_DARK})`,
  PRIMARY_HOVER: `linear-gradient(to right, ${PRIMARY.HOVER}, ${PRIMARY[800]})`,
  ACCENT: `linear-gradient(to right, ${ACCENT.DEFAULT}, ${ACCENT[700]})`,
  HERO_BUTTON: `linear-gradient(to right, ${PRIMARY.HOVER}, ${PRIMARY.DEFAULT})`,
} as const;

// ============================================================================
// SHADOW PRESETS (Using brand colors)
// ============================================================================
export const SHADOWS = {
  SM: '0 1px 2px 0 rgba(36, 61, 104, 0.05)',
  DEFAULT: '0 1px 3px 0 rgba(36, 61, 104, 0.1), 0 1px 2px -1px rgba(36, 61, 104, 0.1)',
  MD: '0 4px 6px -1px rgba(36, 61, 104, 0.1), 0 2px 4px -2px rgba(36, 61, 104, 0.1)',
  LG: '0 10px 15px -3px rgba(36, 61, 104, 0.1), 0 4px 6px -4px rgba(36, 61, 104, 0.1)',
  XL: '0 20px 25px -5px rgba(36, 61, 104, 0.1), 0 8px 10px -6px rgba(36, 61, 104, 0.1)',
  CARD: '0 8px 24px rgba(22, 36, 63, 0.08)',
  BUTTON: '6px 6px 0px 0px rgba(250, 192, 110, 1)',
} as const;

// ============================================================================
// OPACITY VARIANTS (For overlays, disabled states)
// ============================================================================
export const OPACITY = {
  DISABLED: 0.5,
  HOVER: 0.8,
  OVERLAY: 0.6,
  BACKDROP: 0.9,
} as const;

// ============================================================================
// EXPORT ALL AS DEFAULT
// ============================================================================
export const COLORS = {
  PRIMARY,
  ACCENT,
  NEUTRAL,
  FUNCTIONAL,
  SEMANTIC,
  TEAM,
  PRIORITY,
  VOTING,
  GRADIENTS,
  SHADOWS,
  OPACITY,
} as const;

export default COLORS;
