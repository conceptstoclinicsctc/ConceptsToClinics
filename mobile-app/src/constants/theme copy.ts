export const COLORS = {
  // Main backgrounds (Cream / Off-white — unchanged)
  bg: '#F8F7F4',
  cardBg: '#FFFFFF',
  cardBgElevated: '#FFFFFF',

  // High contrast text — unchanged
  textPrimary: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textLight: '#F8FAFC',

  // ── Brand Colors (CTC Logo) ──────────────────────────────────
  // Primary: Deep Navy
  accentBlack: '#062458',
  accentBlackHover: '#0A3575',
  // Secondary: Teal
  accentTeal: '#007584',
  accentTealBg: '#E0F4F6',
  // Legacy aliases kept for backward compat
  accentEmerald: '#007584',
  accentEmeraldBg: '#E0F4F6',
  accentLavender: '#062458',
  accentLavenderBg: '#E8EEF8',
  accentPink: '#007584',
  accentPinkBg: '#E0F4F6',

  // Neutral borders & inputs — unchanged
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  inputBg: '#F3F4F6',
  inputBorder: '#E5E7EB',

  // Statuses
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  success: '#007584',
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
