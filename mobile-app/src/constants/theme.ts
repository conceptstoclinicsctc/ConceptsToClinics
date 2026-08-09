export const COLORS = {
  // ── Main backgrounds (Updated with pale blue) ──────────────────
  bg: '#E6F2F8', // Refined palette: Main pale blue background
  cardBg: '#FFFFFF', // Refined palette: Card background
  cardBgElevated: '#FFFFFF',

  // ── Text (Updated for new palette contrast) ──────────────────
  textPrimary: '#1A3B5E', // Refined palette: Headings (Navy)
  textSecondary: '#5A6E82', // Refined palette: Body text/Status
  textMuted: '#5A6E82', // Refined palette: Description/0% completed text
  textLight: '#FFFFFF', // Clear white text

  // ── Brand Colors (CTC Logo) ──────────────────────────────────
  // Primary Interactive Accent: Teal
  accentBlack: '#2D939F', // Swapped: Teal accent for selected tabs, buttons, play icons, progress bars
  accentBlackHover: '#257B85',
  // Secondary Accent: Navy
  accentTeal: '#1A3B5E', // Swapped: Deep navy for secondary text links & badges
  accentTealBg: '#D8E9F1',
  // Legacy aliases kept for backward compat
  accentEmerald: '#1A3B5E',
  accentEmeraldBg: '#D8E9F1',
  accentLavender: '#254670',
  accentLavenderBg: '#D8E9F1',
  accentPink: '#1A3B5E',
  accentPinkBg: '#D8E9F1',

  // ── Specific Interactive Elements ─────────────────────────────
  unselectedPill: '#FFFFFF', // Clear white unselected tabs
  avatarBg: '#254670', // Specific deep navy for avatar circle
  shadowColor: '#D8E9F1', // Subtle shadow color
  progressBar: '#2D939F', // Swapped: Teal progress bar fill

  // ── Neutral borders & inputs ──────────────────────────────────
  border: '#D8E9F1',
  borderLight: '#F1F5F9',
  inputBg: '#F3F4F6',
  inputBorder: '#E5E7EB',

  // ── Statuses ──────────────────────────────────────────────────
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  success: '#1A3B5E',
  successBg: '#E0F4F6',
};


export const SHADOWS = {
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 3,
  },
  card: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  floatingBtn: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const RADIUS = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 999,
};
