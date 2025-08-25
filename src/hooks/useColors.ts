/**
 * useColors Hook
 * 
 * Provides easy access to theme-aware colors throughout the application.
 * Automatically switches between light and dark mode colors.
 */

import { useMemo } from 'react';
import { colors, getThemeColors } from '@/styles/colors';

export const useColors = (isDarkMode: boolean) => {
  return useMemo(() => {
    const themeColors = getThemeColors(isDarkMode);
    
    return {
      // Direct access to theme colors
      ...themeColors,
      
      // Convenience getters for common patterns
      primary: themeColors.text.primary,
      secondary: themeColors.text.secondary,
      bg: themeColors.background.primary,
      bgSecondary: themeColors.background.secondary,
      borderColor: themeColors.border.primary,
      
      // Brand colors (theme-independent)
      brandPrimary: colors.brand.primary,
      brandSecondary: colors.brand.secondary,
      brandTertiary: colors.brand.tertiary,
      
      // Accent colors (theme-independent)
      accentOrange: colors.accent.orange,
      accentOrangeMid: colors.accent.orangeMid,
      accentOrangeEnd: colors.accent.orangeEnd,
      
      // Gradient strings for easy use
      gradients: {
        orange: `linear-gradient(to right, ${colors.accent.orange}, ${colors.accent.orangeMid}, ${colors.accent.orangeEnd})`,
        brand: `linear-gradient(to right, ${colors.brand.primary}, ${colors.brand.secondary})`,
        brandExtended: `linear-gradient(to right, ${colors.brand.primary}, ${colors.brand.secondary}, ${colors.brand.tertiary})`,
      },
      
      // Utility functions
      withOpacity: (color: string, opacity: number) => {
        // Convert hex to rgba
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      },
    };
  }, [isDarkMode]);
};

export default useColors;