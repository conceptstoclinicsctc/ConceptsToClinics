import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from 'react-native';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

interface Props {
  visible: boolean;
}

const EmulatorBlockedModal: React.FC<Props> = ({ visible }) => {
  const handleExit = () => {
    BackHandler.exitApp();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleExit}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Text style={styles.iconEmoji}>🛡️</Text>
          </View>

          <Text style={styles.title}>Security Alert</Text>

          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>Virtual Environment Detected</Text>
          </View>

          <Text style={styles.message}>
            For course content copyright protection, privacy, and exam integrity, Concepts To Clinics cannot be run inside PC emulators or virtual machines.
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Please install and launch this app on a physical Android mobile phone or tablet to continue.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.exitBtn}
            onPress={handleExit}
            activeOpacity={0.88}
          >
            <Text style={styles.exitBtnText}>Exit Application</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    ...SHADOWS.soft,
  },
  iconEmoji: {
    fontSize: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  badgeWrap: {
    backgroundColor: COLORS.dangerBg,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.danger,
  },
  message: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 16,
  },
  infoBox: {
    width: '100%',
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '600',
  },
  exitBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.danger,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.floatingBtn,
  },
  exitBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textLight,
  },
});

export default EmulatorBlockedModal;
