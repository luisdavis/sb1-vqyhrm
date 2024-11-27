import { type ThemeConfig } from '@/types/theme';

export const themes: Record<string, ThemeConfig> = {
  dark: {
    name: 'Dark',
    colors: {
      background: '#000000',
      foreground: '#FFFFFF',
      card: {
        DEFAULT: '#18181B',
        foreground: '#FFFFFF',
      },
      popover: {
        DEFAULT: '#18181B',
        foreground: '#FFFFFF',
      },
      primary: {
        DEFAULT: '#FFFFFF',
        foreground: '#000000',
      },
      secondary: {
        DEFAULT: '#27272A',
        foreground: '#FFFFFF',
      },
      muted: {
        DEFAULT: '#27272A',
        foreground: '#A1A1AA',
      },
      accent: {
        DEFAULT: '#27272A',
        foreground: '#FFFFFF',
      },
      destructive: {
        DEFAULT: '#991B1B',
        foreground: '#FFFFFF',
      },
      border: '#27272A',
      input: '#27272A',
      ring: '#D4D4D8',
      chart: {
        1: '#3B82F6',
        2: '#10B981',
        3: '#F59E0B',
        4: '#EF4444',
        5: '#8B5CF6',
      },
    },
  },
  light: {
    name: 'Light',
    colors: {
      background: '#FFFFFF',
      foreground: '#09090B',
      card: {
        DEFAULT: '#FFFFFF',
        foreground: '#09090B',
      },
      popover: {
        DEFAULT: '#FFFFFF',
        foreground: '#09090B',
      },
      primary: {
        DEFAULT: '#18181B',
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#F4F4F5',
        foreground: '#18181B',
      },
      muted: {
        DEFAULT: '#F4F4F5',
        foreground: '#71717A',
      },
      accent: {
        DEFAULT: '#F4F4F5',
        foreground: '#18181B',
      },
      destructive: {
        DEFAULT: '#EF4444',
        foreground: '#FFFFFF',
      },
      border: '#E4E4E7',
      input: '#E4E4E7',
      ring: '#18181B',
      chart: {
        1: '#2563EB',
        2: '#059669',
        3: '#D97706',
        4: '#DC2626',
        5: '#7C3AED',
      },
    },
  },
  blue: {
    name: 'Blue',
    colors: {
      background: '#0C1222',
      foreground: '#FFFFFF',
      card: {
        DEFAULT: '#1A2333',
        foreground: '#FFFFFF',
      },
      popover: {
        DEFAULT: '#1A2333',
        foreground: '#FFFFFF',
      },
      primary: {
        DEFAULT: '#3B82F6',
        foreground: '#FFFFFF',
      },
      secondary: {
        DEFAULT: '#1E293B',
        foreground: '#FFFFFF',
      },
      muted: {
        DEFAULT: '#1E293B',
        foreground: '#94A3B8',
      },
      accent: {
        DEFAULT: '#1E293B',
        foreground: '#FFFFFF',
      },
      destructive: {
        DEFAULT: '#991B1B',
        foreground: '#FFFFFF',
      },
      border: '#1E293B',
      input: '#1E293B',
      ring: '#3B82F6',
      chart: {
        1: '#3B82F6',
        2: '#10B981',
        3: '#F59E0B',
        4: '#EF4444',
        5: '#8B5CF6',
      },
    },
  },
};