// app/styles/ThemeProvider.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { colors, ColorPalette } from './colors';

// Define spacing type
export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// Define typography type
export interface Typography {
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    base: number;
    lg: number;
    xl: number;
    '2xl': number;
    '3xl': number;
    '4xl': number;
  };
  fontWeight: {
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
  };
}

// Define shadow type
export interface Shadow {
  shadowColor: string;
  shadowOffset: {
    width: number;
    height: number;
  };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  sm: Shadow;
  md: Shadow;
  lg: Shadow;
}

// Define theme type
export interface Theme {
  colors: ColorPalette;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  isDark: boolean;
}

// Define theme context type
export interface ThemeContextType {
  theme: Theme;
  themeMode: string;
  setTheme: (mode: string) => void;
}

// Simplified spacing
const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Simplified typography
const typography: Typography = {
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Simplified shadows
const shadows: {
  dark: Shadows;
  light: Shadows;
} = {
  dark: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
      elevation: 8,
    },
  },
  light: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 8,
    },
  },
};

// Create Theme Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string;
}

// Theme provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = 'dark'
}) => {
  const deviceColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(initialTheme);
  
  // Generate the active theme values
  const getThemeValues = (mode: string): Theme => {
    // Light theme colors
    const lightColors: ColorPalette = {
      ...colors,
      background: '#FFFFFF',
      text: '#121212',
      card: '#F5F5F5',
      border: '#E0E0E0',
    };
    
    const baseTheme: Theme = {
      colors: mode === 'dark' ? colors : lightColors,
      typography,
      spacing,
      shadows: mode === 'dark' ? shadows.dark : shadows.light,
      isDark: mode === 'dark',
    };

    return baseTheme;
  };
  
  const [activeTheme, setActiveTheme] = useState<Theme>(getThemeValues(themeMode));
  
  // Update theme based on device settings if set to 'auto'
  useEffect(() => {
    if (themeMode === 'auto') {
      setActiveTheme(getThemeValues(deviceColorScheme === 'dark' ? 'dark' : 'light'));
    }
  }, [deviceColorScheme, themeMode]);
  
  // Update active theme when theme mode changes
  useEffect(() => {
    setActiveTheme(getThemeValues(themeMode === 'auto' ? (deviceColorScheme || 'dark') : themeMode));
  }, [themeMode, deviceColorScheme]);
  
  // Change theme function
  const changeTheme = (newTheme: string) => {
    setThemeMode(newTheme);
  };
  
  // Theme context value
  const themeContext: ThemeContextType = {
    theme: activeTheme,
    themeMode,
    setTheme: changeTheme,
  };
  
  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};