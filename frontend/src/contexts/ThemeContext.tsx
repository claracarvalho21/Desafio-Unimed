import { createContext } from 'react';

export interface ThemeContextType {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);