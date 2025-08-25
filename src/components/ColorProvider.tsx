/**
 * ColorProvider Component
 * 
 * Provides color context to child components and manages theme switching.
 * This component can be used to wrap sections that need consistent color access.
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { useColors } from '@/hooks/useColors';

interface ColorContextType {
  colors: ReturnType<typeof useColors>;
  isDarkMode: boolean;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
  isDarkMode: boolean;
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children, isDarkMode }) => {
  const colors = useColors(isDarkMode);

  return (
    <ColorContext.Provider value={{ colors, isDarkMode }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error('useColorContext must be used within a ColorProvider');
  }
  return context;
};

export default ColorProvider;