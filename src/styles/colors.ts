/**
 * Centralized Color System
 * 
 * This file contains all color definitions for both light and dark modes.
 * Edit colors here to change them throughout the entire application.
 */

export const colors = {
  // Brand Colors - Core identity colors
  brand: {
    primary: '#433E0E',      // Dark olive - main brand color
    secondary: '#81901D',    // Lighter olive - accent color
    tertiary: '#718010',     // Even lighter olive variation
  },

  // Neutral Colors - Background and text colors
  neutral: {
    light: {
      background: '#EAEAC2',   // Light cream background
      foreground: '#18020C',   // Dark burgundy text
      surface: '#F5F5DC',      // Slightly lighter surface
      border: '#D4D4AA',       // Border color
    },
    dark: {
      background: '#1A1A1A',   // Dark background
      foreground: '#EAEAC2',   // Light cream text
      surface: '#2A2A2A',      // Slightly lighter surface
      border: '#333333',       // Border color
    }
  },

  // Accent Colors - For highlights and special elements
  accent: {
    orange: '#C75434',       // Orange gradient start
    orangeMid: '#E67E22',    // Orange gradient middle
    orangeEnd: '#F39C12',    // Orange gradient end
    success: '#10B981',      // Success green
    warning: '#F59E0B',      // Warning yellow
    error: '#EF4444',        // Error red
  },

  // Interactive States
  interactive: {
    hover: 'rgba(67, 62, 14, 0.1)',     // Hover overlay
    active: 'rgba(67, 62, 14, 0.2)',    // Active state
    focus: 'rgba(129, 144, 29, 0.3)',   // Focus ring
    disabled: 'rgba(67, 62, 14, 0.3)',  // Disabled state
  },

  // Semantic Colors - Context-specific colors
  semantic: {
    light: {
      text: {
        primary: '#18020C',
        secondary: 'rgba(24, 2, 12, 0.8)',
        tertiary: 'rgba(24, 2, 12, 0.6)',
        disabled: 'rgba(24, 2, 12, 0.4)',
      },
      background: {
        primary: '#EAEAC2',
        secondary: '#F5F5DC',
        tertiary: '#FAFAFA',
        overlay: 'rgba(234, 234, 194, 0.9)',
      },
      border: {
        primary: 'rgba(67, 62, 14, 0.2)',
        secondary: 'rgba(67, 62, 14, 0.1)',
        focus: '#81901D',
      }
    },
    dark: {
      text: {
        primary: '#EAEAC2',
        secondary: 'rgba(234, 234, 194, 0.8)',
        tertiary: 'rgba(234, 234, 194, 0.6)',
        disabled: 'rgba(234, 234, 194, 0.4)',
      },
      background: {
        primary: '#1A1A1A',
        secondary: '#2A2A2A',
        tertiary: '#3A3A3A',
        overlay: 'rgba(26, 26, 26, 0.9)',
      },
      border: {
        primary: 'rgba(67, 62, 14, 0.3)',
        secondary: 'rgba(67, 62, 14, 0.2)',
        focus: '#81901D',
      }
    }
  }
} as const;

// Utility function to get theme-specific colors
export const getThemeColors = (isDarkMode: boolean) => ({
  text: isDarkMode ? colors.semantic.dark.text : colors.semantic.light.text,
  background: isDarkMode ? colors.semantic.dark.background : colors.semantic.light.background,
  border: isDarkMode ? colors.semantic.dark.border : colors.semantic.light.border,
  brand: colors.brand,
  accent: colors.accent,
  interactive: colors.interactive,
});

// CSS Variable names for consistency
export const cssVariables = {
  // Brand
  '--color-brand-primary': colors.brand.primary,
  '--color-brand-secondary': colors.brand.secondary,
  '--color-brand-tertiary': colors.brand.tertiary,
  
  // Accents
  '--color-accent-orange': colors.accent.orange,
  '--color-accent-orange-mid': colors.accent.orangeMid,
  '--color-accent-orange-end': colors.accent.orangeEnd,
  '--color-accent-success': colors.accent.success,
  '--color-accent-warning': colors.accent.warning,
  '--color-accent-error': colors.accent.error,
} as const;

export default colors;