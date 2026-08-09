import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/authStore';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'Profile'>;
};

const ProfileScreen = ({ navigation }: Props) => {
  const { email, displayName, clearSession } = useAuthStore();
  const [loggingOut, setLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutPress = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = async () => {
    setShowLogoutModal(false);
    setLoggingOut(true);
    try {
      await clearSession();
    } catch (err) {
      setLoggingOut(false);
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'S';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Avatar & Header Card */}
        <View style={styles.profileHeaderCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{getInitials(displayName)}</Text>
          </View>
          <Text style={styles.nameText}>{displayName || 'Enrolled Student'}</Text>
          <Text style={styles.emailText}>{email || 'student@conceptstoclinics.com'}</Text>

          <View style={styles.activePill}>
            <View style={styles.activeDot} />
            <Text style={styles.activePillText}>Active Student Subscription</Text>
          </View>
        </View>

        {/* Info Group 1: Account Info */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Account Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{displayName || 'N/A'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Registered Email</Text>
            <Text style={styles.infoValue}>{email || 'N/A'}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Device Lock</Text>
            <View style={styles.lockedPill}>
              <Text style={styles.lockedPillText}>🔒 Single Device Enforced</Text>
            </View>
          </View>
        </View>

        {/* Info Group 2: Platform Settings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>App & System</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>App Build</Text>
            <Text style={styles.infoValue}>Concepts Play v1.0.1</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Video Quality</Text>
            <Text style={styles.infoValue}>1080p HD (Vimeo)</Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogoutPress}
          disabled={loggingOut}
          activeOpacity={0.88}
        >
          <Text style={styles.logoutBtnText}>
            {loggingOut ? 'Signing out…' : 'Sign Out of Account'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Polished Custom Sign Out Modal */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setShowLogoutModal(false)}
        >
          <TouchableOpacity style={styles.modalCard} activeOpacity={1}>
            <View style={styles.modalIconWrap}>
              <Text style={styles.modalIcon}>👋</Text>
            </View>

            <Text style={styles.modalTitle}>Sign Out</Text>
            <Text style={styles.modalSubtitle}>
              Are you sure you want to sign out of Concepts Play?
            </Text>

            <View style={styles.modalBtnRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalCancelBtn]}
                onPress={() => setShowLogoutModal(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.modalConfirmBtn]}
                onPress={handleConfirmLogout}
                activeOpacity={0.8}
              >
                <Text style={styles.modalConfirmText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // Profile Header Card
  profileHeaderCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 20,
    ...SHADOWS.card,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accentBlack,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    ...SHADOWS.floatingBtn,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  activePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accentEmeraldBg,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: RADIUS.pill,
    gap: 8,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accentEmerald,
  },
  activePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentEmerald,
  },

  // Section Card
  sectionCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 16,
    ...SHADOWS.soft,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 10,
  },
  lockedPill: {
    backgroundColor: COLORS.accentLavenderBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  lockedPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accentLavender,
  },

  // Logout Button
  logoutBtn: {
    backgroundColor: COLORS.accentBlack,
    borderRadius: RADIUS.pill,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.floatingBtn,
  },
  logoutBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textLight,
  },

  // Modal Dialog Styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  modalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  modalIcon: {
    fontSize: 26,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  modalBtnRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelBtn: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  modalCancelText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  modalConfirmBtn: {
    backgroundColor: COLORS.accentBlack,
  },
  modalConfirmText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textLight,
  },
});

export default ProfileScreen;
