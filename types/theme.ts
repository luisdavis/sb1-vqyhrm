export interface ThemeColors {
  background: string;
  foreground: string;
  card: {
    DEFAULT: string;
    foreground: string;
  };
  popover: {
    DEFAULT: string;
    foreground: string;
  };
  primary: {
    DEFAULT: string;
    foreground: string;
  };
  secondary: {
    DEFAULT: string;
    foreground: string;
  };
  muted: {
    DEFAULT: string;
    foreground: string;
  };
  accent: {
    DEFAULT: string;
    foreground: string;
  };
  destructive: {
    DEFAULT: string;
    foreground: string;
  };
  border: string;
  input: string;
  ring: string;
  chart: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
  };
}

export interface ThemeConfig {
  name: string;
  colors: ThemeColors;
}