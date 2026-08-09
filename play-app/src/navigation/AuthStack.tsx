import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import AccountLockedScreen from '../screens/AccountLockedScreen';

const Stack = createStackNavigator<AuthStackParamList>();

/**
 * AuthStack — shown when the student is not authenticated.
 */
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.bg },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen
        name="AccountLocked"
        component={AccountLockedScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
