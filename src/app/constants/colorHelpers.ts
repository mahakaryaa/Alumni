/**
 * Color Helper Utilities
 * Helper functions untuk manipulasi dan penggunaan warna
 */

import { COLORS, PRIMARY, ACCENT, NEUTRAL } from './colors';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type ColorValue = string;
export type OpacityValue = number;

// ============================================================================
// OPACITY HELPERS
// ============================================================================

/**
 * Menambahkan opacity ke hex color
 * @param hexColor - Hex color (e.g., "#243D68")
 * @param opacity - Opacity value 0-1 (e.g., 0.5)
 * @returns Hex color dengan opacity (e.g., "#243D6880")
 */
export function withOpacity(hexColor: string, opacity: number): string {
  // Remove # if present
  const hex = hexColor.replace('#', '');
  
  // Validate opacity
  const validOpacity = Math.max(0, Math.min(1, opacity));
  
  // Convert opacity to hex (0-255)
  const alpha = Math.round(validOpacity * 255);
  const alphaHex = alpha.toString(16).padStart(2, '0');
  
  return `#${hex}${alphaHex}`;
}

/**
 * Convert hex to RGB
 * @param hexColor - Hex color (e.g., "#243D68")
 * @returns RGB object { r, g, b }
 */
export function hexToRgb(hexColor: string): { r: number; g: number; b: number } {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Convert hex to RGBA string
 * @param hexColor - Hex color (e.g., "#243D68")
 * @param opacity - Opacity value 0-1 (e.g., 0.5)
 * @returns RGBA string (e.g., "rgba(36, 61, 104, 0.5)")
 */
export function hexToRgba(hexColor: string, opacity: number): string {
  const { r, g, b } = hexToRgb(hexColor);
  const validOpacity = Math.max(0, Math.min(1, opacity));
  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
}

// ============================================================================
// TAILWIND CLASS HELPERS
// ============================================================================

/**
 * Generate Tailwind class dengan arbitrary value
 * @param property - CSS property (e.g., "bg", "text", "border")
 * @param color - Color value
 * @returns Tailwind class string (e.g., "bg-[#243D68]")
 */
export function tw(property: string, color: string): string {
  return `${property}-[${color}]`;
}

/**
 * Generate background color class
 */
export const bgColor = (color: string) => tw('bg', color);

/**
 * Generate text color class
 */
export const textColor = (color: string) => tw('text', color);

/**
 * Generate border color class
 */
export const borderColor = (color: string) => tw('border', color);

// ============================================================================
// GRADIENT HELPERS
// ============================================================================

/**
 * Create linear gradient
 * @param from - Starting color
 * @param to - Ending color
 * @param direction - Gradient direction (default: "to right")
 */
export function linearGradient(
  from: string,
  to: string,
  direction: string = 'to right'
): string {
  return `linear-gradient(${direction}, ${from}, ${to})`;
}

/**
 * Create radial gradient
 * @param from - Inner color
 * @param to - Outer color
 */
export function radialGradient(from: string, to: string): string {
  return `radial-gradient(circle, ${from}, ${to})`;
}

// ============================================================================
// COLOR PRESETS
// ============================================================================

/**
 * Get button colors based on variant
 */
export function getButtonColors(variant: 'primary' | 'secondary' | 'accent' | 'danger') {
  switch (variant) {
    case 'primary':
      return {
        bg: PRIMARY.DEFAULT,
        hover: PRIMARY.HOVER,
        text: NEUTRAL.WHITE,
      };
    case 'secondary':
      return {
        bg: NEUTRAL.WHITE,
        hover: NEUTRAL[100],
        text: PRIMARY.DEFAULT,
        border: PRIMARY.DEFAULT,
      };
    case 'accent':
      return {
        bg: ACCENT.DEFAULT,
        hover: ACCENT[700],
        text: PRIMARY.DEFAULT,
      };
    case 'danger':
      return {
        bg: COLORS.FUNCTIONAL.ERROR.DEFAULT,
        hover: COLORS.FUNCTIONAL.ERROR.DARK,
        text: NEUTRAL.WHITE,
      };
    default:
      return {
        bg: PRIMARY.DEFAULT,
        hover: PRIMARY.HOVER,
        text: NEUTRAL.WHITE,
      };
  }
}

/**
 * Get badge colors based on type
 */
export function getBadgeColors(type: 'open' | 'team' | 'urgent' | 'success') {
  switch (type) {
    case 'open':
      return COLORS.FUNCTIONAL.BADGE.OPEN_VOLUNTEER;
    case 'team':
      return COLORS.FUNCTIONAL.BADGE.PROJECT_TEAM;
    case 'urgent':
      return COLORS.FUNCTIONAL.BADGE.URGENT;
    case 'success':
      return {
        BG: COLORS.FUNCTIONAL.SUCCESS.LIGHT,
        TEXT: COLORS.FUNCTIONAL.SUCCESS.DARK,
      };
    default:
      return {
        BG: PRIMARY[50],
        TEXT: PRIMARY.DEFAULT,
      };
  }
}

/**
 * Get status colors based on state
 */
export function getStatusColors(status: 'success' | 'error' | 'warning' | 'info') {
  switch (status) {
    case 'success':
      return COLORS.FUNCTIONAL.SUCCESS;
    case 'error':
      return COLORS.FUNCTIONAL.ERROR;
    case 'warning':
      return COLORS.FUNCTIONAL.WARNING;
    case 'info':
      return COLORS.FUNCTIONAL.INFO;
    default:
      return COLORS.FUNCTIONAL.INFO;
  }
}

// ============================================================================
// CONTRAST HELPERS
// ============================================================================

/**
 * Calculate relative luminance
 * @param r - Red value (0-255)
 * @param g - Green value (0-255)
 * @param b - Blue value (0-255)
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const channel = c / 255;
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns Contrast ratio (1-21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if color combination meets WCAG AA standard
 * @param backgroundColor - Background hex color
 * @param textColor - Text hex color
 * @param largeText - Is text large (>= 18pt or >= 14pt bold)
 * @returns True if meets standard
 */
export function meetsWCAG_AA(
  backgroundColor: string,
  textColor: string,
  largeText: boolean = false
): boolean {
  const ratio = getContrastRatio(backgroundColor, textColor);
  const requiredRatio = largeText ? 3 : 4.5;
  return ratio >= requiredRatio;
}

/**
 * Get recommended text color for background
 * @param backgroundColor - Background hex color
 * @returns Best text color (black or white)
 */
export function getRecommendedTextColor(backgroundColor: string): string {
  const whiteRatio = getContrastRatio(backgroundColor, NEUTRAL.WHITE);
  const blackRatio = getContrastRatio(backgroundColor, NEUTRAL.BLACK);
  
  return whiteRatio > blackRatio ? NEUTRAL.WHITE : NEUTRAL.BLACK;
}

// ============================================================================
// CSS-IN-JS HELPERS
// ============================================================================

/**
 * Create CSS variables object
 */
export function getCSSVariables() {
  return {
    '--color-primary': PRIMARY.DEFAULT,
    '--color-primary-hover': PRIMARY.HOVER,
    '--color-accent': ACCENT.DEFAULT,
    '--color-background': NEUTRAL.BACKGROUND,
    '--color-text-primary': COLORS.SEMANTIC.TEXT.PRIMARY,
    '--color-text-secondary': COLORS.SEMANTIC.TEXT.SECONDARY,
    '--color-border': COLORS.SEMANTIC.BORDER.DEFAULT,
    '--color-success': COLORS.FUNCTIONAL.SUCCESS.DEFAULT,
    '--color-error': COLORS.FUNCTIONAL.ERROR.DEFAULT,
    '--color-warning': COLORS.FUNCTIONAL.WARNING.DEFAULT,
    '--color-info': COLORS.FUNCTIONAL.INFO.DEFAULT,
  };
}

/**
 * Apply CSS variables to root element
 */
export function applyCSSVariables() {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  const vars = getCSSVariables();
  
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

// ============================================================================
// EXPORT ALL HELPERS
// ============================================================================

export const colorHelpers = {
  withOpacity,
  hexToRgb,
  hexToRgba,
  tw,
  bgColor,
  textColor,
  borderColor,
  linearGradient,
  radialGradient,
  getButtonColors,
  getBadgeColors,
  getStatusColors,
  getContrastRatio,
  meetsWCAG_AA,
  getRecommendedTextColor,
  getCSSVariables,
  applyCSSVariables,
};

export default colorHelpers;
