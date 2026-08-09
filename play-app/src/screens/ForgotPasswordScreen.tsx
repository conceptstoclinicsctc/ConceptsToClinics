import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { AuthStackParamList } from '../navigation/types';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendResetLink = async () => {
    setError(null);
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !trimmedEmail.includes('@')) {
      setError('Please enter a valid registered email address');
      return;
    }

    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(trimmedEmail);
      setSuccess(true);
    } catch (err: any) {
      if (
        err?.code === 'auth/user-not-found' ||
        err?.code === 'auth/invalid-email'
      ) {
        setError('Please enter a valid registered email address');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.appName}>Reset Password</Text>
            <Text style={styles.tagline}>
              Enter your email to receive a password reset link
            </Text>
          </View>

          {/* Card Container */}
          <View style={styles.card}>
            {success ? (
              <View style={styles.successContainer}>
                <View style={styles.successIconCircle}>
                  <Text style={styles.successEmoji}>📧</Text>
                </View>
                <Text style={styles.successTitle}>Check Your Email</Text>
                <Text style={styles.successText}>
                  If an account exists for this email, a password reset link has been sent. Check your inbox and spam folder.
                </Text>
              </View>
            ) : (
              <>
                {error && (
                  <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email Address</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="student@example.com"
                    placeholderTextColor={COLORS.textMuted}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleSendResetLink}
                  disabled={loading}
                  activeOpacity={0.88}
                >
                  {loading ? (
                    <ActivityIndicator color={COLORS.textLight} />
                  ) : (
                    <Text style={styles.submitBtnText}>Send Reset Link</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </View>

          {/* Footer Link to Login */}
          <View style={styles.footerRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>← Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '500',
    textAlign: 'center',
  },

  // Card
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  errorBox: {
    backgroundColor: COLORS.dangerBg,
    borderRadius: RADIUS.md,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '500',
  },

  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.inputBg,
    borderRadius: RADIUS.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
  },

  submitBtn: {
    backgroundColor: COLORS.accentBlack,
    borderRadius: RADIUS.pill,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.floatingBtn,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textLight,
  },

  // Success view
  successContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accentTealBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successEmoji: {
    fontSize: 28,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  successText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.accentTeal,
  },
});

export default ForgotPasswordScreen;
