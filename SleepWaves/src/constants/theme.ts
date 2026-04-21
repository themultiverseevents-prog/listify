export const Colors = {
  background: '#07090F',
  surface: '#0D1020',
  surfaceLight: '#131629',
  card: '#0F1225',
  primary: '#6C63FF',
  primaryDark: '#5B52E8',
  primaryLight: '#8B85FF',
  accent: '#9B8FFF',
  text: {
    primary: '#FFFFFF',
    secondary: '#A0A8C0',
    muted: '#5A6080',
  },
  border: '#1E2240',
  success: '#4CAF50',
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export const Typography = {
  h1: { fontSize: 32, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2: { fontSize: 24, fontWeight: '600' as const, letterSpacing: -0.3 },
  h3: { fontSize: 20, fontWeight: '600' as const },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 24 },
  caption: { fontSize: 14, fontWeight: '400' as const, lineHeight: 20 },
  small: { fontSize: 12, fontWeight: '400' as const },
} as const;

export const Shadows = {
  purple: {
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;
