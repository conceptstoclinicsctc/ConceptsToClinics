import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/authStore';
import { Alert } from 'react-native';
import { TUTOR_WHATSAPP_NUMBER } from '../constants/api';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'AccountLocked'>;
};

const AccountLockedScreen = ({ navigation }: Props) => {
  const { lockReason, clearSession } = useAuthStore();

  const handleReturnToLogin = async () => {
    await clearSession();
    navigation.replace('Login');
  };

  const handleContactSupport = async () => {
    const message = "Hi Tutor, my account is locked. Can you please assist me with unlocking my account?";
    const whatsappUrl = `https://wa.me/${TUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(whatsappUrl);
    } catch {
      Alert.alert(
        'Contact Support',
        `Please contact your tutor directly on WhatsApp at +${TUTOR_WHATSAPP_NUMBER}`
      );
    }
  };

  const getReasonText = () => {
    if (lockReason === 'DEVICE_MISMATCH_LOCKED') {
      return 'Your account was accessed from an unauthorized device. To protect video content, your account has been temporarily locked.';
    }
    return 'Your account has been locked by an administrator or security policy. Please contact your tutor for assistance.';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <View style={styles.content}>
        {/* Warning Icon Badge */}
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>🔒</Text>
        </View>

        <Text style={styles.title}>Account Access Suspended</Text>
        <Text style={styles.subtitle}>Security Device Enforcement Active</Text>

        {/* Reason Card */}
        <View style={styles.reasonCard}>
          <View style={styles.reasonHeader}>
            <View style={styles.warningDot} />
            <Text style={styles.reasonTitle}>Lock Reason</Text>
          </View>
          <Text style={styles.reasonText}>{getReasonText()}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.supportBtn}
            onPress={handleContactSupport}
            activeOpacity={0.88}
          >
            <Text style={styles.supportBtnText}>Contact Tutor Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleReturnToLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginBtnText}>Return to Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    ...SHADOWS.soft,
  },
  iconEmoji: {
    fontSize: 36,
  },

  title: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
  },

  // Reason Card
  reasonCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    width: '100%',
    marginBottom: 32,
    ...SHADOWS.card,
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  warningDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.danger,
  },
  reasonTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  reasonText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  // Actions
  actionContainer: {
    width: '100%',
    gap: 12,
  },
  supportBtn: {
    backgroundColor: COLORS.accentBlack,
    borderRadius: RADIUS.pill,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.floatingBtn,
  },
  supportBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textLight,
  },
  loginBtn: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.pill,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});

export default AccountLockedScreen;
