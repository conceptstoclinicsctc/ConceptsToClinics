import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useAuthStore } from '../store/authStore';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { COLORS } from '../constants/theme';
import { fetchVersionConfig } from '../api/config';
import type { VersionConfig } from '../api/config';
import UpdateRequiredModal from '../components/UpdateRequiredModal';

const isVersionOutdated = (installed: string, required: string): boolean => {
  const cParts = installed.split('.').map((n) => parseInt(n, 10) || 0);
  const rParts = required.split('.').map((n) => parseInt(n, 10) || 0);

  for (let i = 0; i < Math.max(cParts.length, rParts.length); i++) {
    const c = cParts[i] || 0;
    const r = rParts[i] || 0;
    if (c < r) return true;
    if (c > r) return false;
  }
  return false;
};

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [updateRequired, setUpdateRequired] = useState(false);
  const [versionConfig, setVersionConfig] = useState<VersionConfig | null>(null);

  const { isAuthenticated, isLocked, loadSession } = useAuthStore();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [_, versionCfg] = await Promise.all([
          loadSession(),
          fetchVersionConfig().catch(() => null),
        ]);

        if (versionCfg) {
          const currentVersion = Constants.expoConfig?.version ?? '1.0.0';
          if (isVersionOutdated(currentVersion, versionCfg.minRequiredVersion)) {
            setVersionConfig(versionCfg);
            setUpdateRequired(true);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" color={COLORS.accentBlack} />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        {isAuthenticated && !isLocked ? <AppStack /> : <AuthStack />}
      </NavigationContainer>

      {/* Non-Dismissible Fullscreen Update Hard Gate */}
      {versionConfig && (
        <UpdateRequiredModal
          visible={updateRequired}
          minRequiredVersion={versionConfig.minRequiredVersion}
          downloadUrl={versionConfig.downloadUrl}
          message={versionConfig.message}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RootNavigator;
