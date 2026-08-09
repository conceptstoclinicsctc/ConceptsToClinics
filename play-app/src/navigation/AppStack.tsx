import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, View } from 'react-native';
import { AppStackParamList } from './types';
import { COLORS } from '../constants/theme';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CourseScreen from '../screens/CourseScreen';
import PlaylistScreen from '../screens/PlaylistScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator<AppStackParamList>();

/**
 * AppStack — shown when the student is authenticated.
 * Neumorphic Light Cream Header Theme
 */
const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.bg,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: '800',
          fontSize: 18,
          color: COLORS.textPrimary,
        },
        cardStyle: { backgroundColor: COLORS.bg },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false, // HomeScreen renders custom Neumorphic top nav bar
        }}
      />
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={({ route }) => ({
          title: route.params.courseTitle || 'Course Lectures',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Playlist"
        component={PlaylistScreen}
        options={({ route }) => ({
          title: route.params.playlistTitle || 'Playlist',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={({ route }) => ({
          title: route.params.videoTitle || 'Lecture Player',
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Student Profile',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
