import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

interface Props {
  visible: boolean;
  minRequiredVersion: string;
  downloadUrl: string;
  message?: string;
}

const UpdateRequiredModal: React.FC<Props> = ({
  visible,
  minRequiredVersion,
  downloadUrl,
  message,
}) => {
  const handleUpdate = async () => {
    try {
      if (downloadUrl) {
        await Linking.openURL(downloadUrl);
      } else {
        Alert.alert('Update', 'Please download the latest version from your tutor.');
      }
    } catch {
      Alert.alert('Update Link Error', 'Could not open the update link. Please contact your tutor.');
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        // Non-dismissible hard gate!
      }}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.iconWrap}>
            <Text style={styles.iconEmoji}>🚀</Text>
          </View>

          <Text style={styles.title}>Update Required</Text>

          <View style={styles.badgeWrap}>
            <Text style={styles.badgeText}>v{minRequiredVersion} Required</Text>
          </View>

          <Text style={styles.message}>
            {message ||
              'A required update for Concepts To Clinics is available with important security and performance improvements. Please update to continue using the app.'}
          </Text>

          <TouchableOpacity
            style={styles.updateBtn}
            onPress={handleUpdate}
            activeOpacity={0.88}
          >
            <Text style={styles.updateBtnText}>Update App Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.soft,
  },
  iconEmoji: {
    fontSize: 32,
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
    backgroundColor: COLORS.accentLavenderBg,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.accentLavender,
  },
  message: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },
  updateBtn: {
    width: '100%',
    height: 52,
    backgroundColor: COLORS.accentBlack,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.floatingBtn,
  },
  updateBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textLight,
  },
});

export default UpdateRequiredModal;
