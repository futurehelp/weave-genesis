// app/styles/colors.ts
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent1: string;
  accent2: string;
  background: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  card: string;
  border: string;
  input: string;
}

// Solana-inspired color palette - simplified version
export const colors: ColorPalette = {
  // Primary colors
  primary: '#14F195', // Solana green
  secondary: '#9945FF', // Solana purple
  
  // Supporting colors
  accent1: '#03E1FF', // Bright cyan
  accent2: '#DC1FFF', // Bright magenta
  
  // Basic UI colors - simplified to strings instead of objects
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  
  // Status colors
  success: '#14F195',
  warning: '#FFA800',
  error: '#FF3B3B',
  info: '#03E1FF',
  
  // UI Element colors
  card: '#1E1E1E',
  border: '#333333',
  input: '#2C2C2C',
};