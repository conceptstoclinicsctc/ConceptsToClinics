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
import { AuthStackParamList } from '../navigation/types';
import { registerStudent } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Register'>;
};

const RegisterScreen = ({ navigation }: Props) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setSession } = useAuthStore();

  const handleRegister = async () => {
    setError(null);
    const trimmedName = displayName.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword || !trimmedCode) {
      setError('Please fill in all fields including your Signup Code.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }

    setLoading(true);
    try {
      const result = await registerStudent({
        email: trimmedEmail,
        password,
        displayName: trimmedName,
        signupCode: trimmedCode,
      });

      await setSession({
        uid: result.uid,
        email: result.email,
        displayName: result.displayName,
        studentId: result.studentId,
        sessionToken: result.sessionToken,
      });
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.error;
      if (msg) {
        setError(msg);
      } else if (err?.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (err?.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Registration failed. Please check your details and try again.');
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
          {/* Header Branding */}
          <View style={styles.header}>
            <Text style={styles.appName}>Create Account</Text>
            <Text style={styles.tagline}>Enter your Signup Code from your tutor</Text>
          </View>

          {/* White Surface Card */}
          <View style={styles.card}>
            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Dr. Sarah Johnson"
                placeholderTextColor={COLORS.textMuted}
                value={displayName}
                onChangeText={setDisplayName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="sarah@example.com"
                placeholderTextColor={COLORS.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={COLORS.textMuted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Signup Code</Text>
                <View style={styles.codeBadge}>
                  <Text style={styles.codeBadgeText}>Provided by Tutor</Text>
                </View>
              </View>
              <TextInput
                style={[styles.input, styles.codeInput]}
                placeholder="e.g. EA9T-LUAV"
                placeholderTextColor={COLORS.textMuted}
                value={code}
                onChangeText={setCode}
                autoCapitalize="characters"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={styles.registerBtn}
              onPress={handleRegister}
              disabled={loading}
              activeOpacity={0.88}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.textLight} />
              ) : (
                <Text style={styles.registerBtnText}>Complete Registration</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Link to Login */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already registered?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}> Sign In</Text>
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  codeBadge: {
    backgroundColor: COLORS.accentLavenderBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  codeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.accentLavender,
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
  codeInput: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  registerBtn: {
    backgroundColor: COLORS.accentBlack,
    borderRadius: RADIUS.pill,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    ...SHADOWS.floatingBtn,
  },
  registerBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textLight,
  },

  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  footerLink: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
});

export default RegisterScreen;
