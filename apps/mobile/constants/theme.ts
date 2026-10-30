export const Colors = {
  // Biophilic Canvas & Surfaces
  canvasBase: '#F1FCF5',
  canvasGradientStart: '#EAF6F0',
  canvasGradientMid: '#F2F8F7',
  canvasGradientEnd: '#EEF3F9',

  // Glassmorphic Surfaces
  glassSurface: 'rgba(255, 255, 255, 0.78)',
  glassSurfaceElevated: 'rgba(255, 255, 255, 0.90)',
  glassSurfaceSubtle: 'rgba(255, 255, 255, 0.58)',
  glassBorder: 'rgba(255, 255, 255, 0.92)',
  glassBorderSubtle: 'rgba(255, 255, 255, 0.60)',

  // Primary: Ethereal Sage (Restorative & Grounding)
  primary: '#3A6759',
  primaryContainer: '#6C9A8B',
  primaryLight: '#E2EDE8',
  primaryFixed: '#BCEDDC',
  onPrimary: '#FFFFFF',

  // Secondary: Muted Sky Teal (Observational & Clinical)
  secondary: '#3B6475',
  secondaryContainer: '#7CA5B8',
  secondaryLight: '#E6EEF4',
  secondaryFixed: '#BFE9FD',
  onSecondary: '#FFFFFF',

  // Tertiary: Champagne Amber (Warm Celebration & Goals)
  tertiary: '#805203',
  tertiaryContainer: '#E3A857',
  tertiaryLight: '#FDF5E8',
  tertiaryFixed: '#FFDDB5',
  onTertiary: '#FFFFFF',

  // Medical Alert & Emergency (Serene Rose Glass)
  emergencyBg: 'rgba(254, 226, 226, 0.80)',
  emergencyBorder: 'rgba(252, 165, 165, 0.65)',
  emergencyText: '#B91C1C',
  emergencyPill: '#FEE2E2',

  // Neutrals (Soft Mineral Slate - never harsh #000)
  textPrimary: '#141E1A',
  textSecondary: '#404945',
  textTertiary: '#717975',
  borderLight: '#DAE5DF',

  // Ambient Glow Orbs
  orbEmerald: 'rgba(167, 243, 208, 0.35)',
  orbSky: 'rgba(186, 230, 253, 0.32)',
  orbAmber: 'rgba(254, 243, 199, 0.38)',
  orbTeal: 'rgba(204, 251, 241, 0.35)',
};

export const Shadows = {
  glass: {
    shadowColor: '#1F2687',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 3,
  },
  glassElevated: {
    shadowColor: '#1F2687',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.09,
    shadowRadius: 32,
    elevation: 6,
  },
  glowPrimary: {
    shadowColor: '#3A6759',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 4,
  },
  glowAmber: {
    shadowColor: '#E3A857',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 16,
    elevation: 4,
  },
};
