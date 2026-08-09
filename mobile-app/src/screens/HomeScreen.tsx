import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Image,
  ScrollView,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { AppStackParamList } from '../navigation/types';
import { fetchEnrolledCourses, Course } from '../api/courses';
import { useAuthStore } from '../store/authStore';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'Home'>;
};

type FilterType = 'all' | 'in_progress' | 'completed';

const HomeScreen = ({ navigation }: Props) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [exploreExpanded, setExploreExpanded] = useState(false);

  const { displayName } = useAuthStore();

  const loadCourses = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchEnrolledCourses();
      setCourses(data);
    } catch (err: any) {
      setError('Could not load courses. Pull down to retry.');
    }
  }, []);

  useEffect(() => {
    loadCourses().finally(() => setLoading(false));
  }, [loadCourses]);

  useEffect(() => {
    SecureStore.getItemAsync('exploreExpandedPref')
      .then((val) => {
        if (val !== null) {
          setExploreExpanded(val === 'true');
        }
      })
      .catch(() => {});
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCourses();
    }, [loadCourses])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadCourses();
    setRefreshing(false);
  }, [loadCourses]);

  const toggleExplore = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExploreExpanded((prev) => {
      const next = !prev;
      SecureStore.setItemAsync('exploreExpandedPref', String(next)).catch(() => {});
      return next;
    });
  };

  const handleCoursePress = (course: Course) => {
    navigation.navigate('Course', {
      courseId: course.id,
      courseTitle: course.title,
      courseDescription: course.description,
      thumbnail: course.thumbnail,
      totalVideos: course.totalVideos,
      isEnrolled: course.isEnrolled !== false,
    });
  };

  const firstName = displayName?.split(' ')[0] ?? 'Student';

  // Section splitting
  const myCourses = courses.filter((c) => c.isEnrolled !== false);
  const exploreCourses = courses.filter((c) => c.isEnrolled === false);

  // Filter calculation for enrolled courses
  const inProgressCount = myCourses.filter((c) => (c.progressPercent ?? 0) < 100).length;
  const completedCount = myCourses.filter((c) => (c.progressPercent ?? 0) >= 100).length;

  const filteredMyCourses = myCourses.filter((c) => {
    const pct = c.progressPercent ?? 0;
    if (activeFilter === 'in_progress') return pct < 100;
    if (activeFilter === 'completed') return pct >= 100;
    return true;
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
        <ActivityIndicator size="large" color={COLORS.accentBlack} />
        <Text style={styles.loadingText}>Loading courses…</Text>
      </SafeAreaView>
    );
  }

  // Full-size vertical card for enrolled courses
  const renderEnrolledCourseCard = (item: Course) => {
    const progress = Math.min(100, Math.round(item.progressPercent ?? 0));
    const isComplete = progress >= 100;

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.cardContainer}
        onPress={() => handleCoursePress(item)}
        activeOpacity={0.92}
      >
        <View style={styles.card}>
          {/* Thumbnail Container */}
          <View style={styles.thumbnailWrapper}>
            {item.thumbnail && !imageErrors[item.id] ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.thumbnail}
                resizeMode="cover"
                onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
              />
            ) : (
              <View style={styles.thumbnailPlaceholder}>
                <Text style={styles.placeholderEmoji}>📚</Text>
              </View>
            )}

            {/* Top Right Badge */}
            <View style={styles.topBadge}>
              <Text style={styles.topBadgeText}>{item.totalVideos} Videos</Text>
            </View>

            {/* Floating Action Badge */}
            <View style={styles.fabBtn}>
              <Text style={styles.fabIcon}>▶</Text>
            </View>
          </View>

          {/* Card Body */}
          <View style={styles.cardBody}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.courseTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>

            {item.description ? (
              <Text style={styles.courseDescription} numberOfLines={2}>
                {item.description}
              </Text>
            ) : null}

            <View style={styles.progressContainer}>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress}%` as any },
                    isComplete && { backgroundColor: COLORS.accentEmerald },
                  ]}
                />
              </View>
              <View style={styles.progressFooter}>
                <Text style={styles.statText}>
                  {item.completedVideos ?? 0} of {item.totalVideos} completed
                </Text>
                <Text
                  style={[
                    styles.progressPercentText,
                    isComplete && { color: COLORS.accentEmerald, fontWeight: '700' },
                  ]}
                >
                  {progress}%
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Compact horizontal card for locked explore courses
  const renderLockedCourseCard = (item: Course) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.lockedCardContainer}
        onPress={() => handleCoursePress(item)}
        activeOpacity={0.9}
      >
        <View style={styles.lockedCard}>
          {/* Compact Left Thumbnail */}
          <View style={styles.lockedThumbnailWrapper}>
            {item.thumbnail && !imageErrors[item.id] ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.lockedThumbnail}
                resizeMode="cover"
                onError={() => setImageErrors((prev) => ({ ...prev, [item.id]: true }))}
              />
            ) : (
              <View style={styles.lockedThumbnailPlaceholder}>
                <Text style={{ fontSize: 26 }}>📚</Text>
              </View>
            )}
          </View>

          {/* Compact Right Content */}
          <View style={styles.lockedCardBody}>
            <View style={styles.lockedTitleRow}>
              <Text style={styles.lockedCourseTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.compactVideoBadge}>
                <Text style={styles.compactVideoBadgeText}>{item.totalVideos} Videos</Text>
              </View>
            </View>

            {item.description ? (
              <Text style={styles.lockedCourseDesc} numberOfLines={1}>
                {item.description}
              </Text>
            ) : null}

            <View style={styles.compactLockedCta}>
              <Text style={styles.compactLockedCtaText}>🔒 Contact Instructor to Enroll</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.accentBlack]}
            tintColor={COLORS.accentBlack}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header Bar */}
        <View style={styles.headerWrapper}>
          <View style={styles.topNavRow}>
            <View>
              <Text style={styles.titleText}>Courses</Text>
              <Text style={styles.welcomeSubtitle}>Welcome back, {firstName}!</Text>
            </View>

            <TouchableOpacity
              style={styles.avatarBtn}
              onPress={() => navigation.navigate('Profile')}
              activeOpacity={0.8}
            >
              <Text style={styles.avatarText}>
                {firstName[0]?.toUpperCase() ?? 'S'}
              </Text>
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>

        {/* SECTION 1: MY COURSES */}
        <View style={styles.sectionHeaderWrapper}>
          <Text style={styles.sectionTitle}>My Courses</Text>
          <Text style={styles.sectionBadgeText}>{myCourses.length} Enrolled</Text>
        </View>

        {/* Filter Pills for My Courses */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollView}
        >
          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'all' && styles.filterPillActive]}
            onPress={() => setActiveFilter('all')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === 'all' && styles.filterPillTextActive]}>
              All
            </Text>
            <View style={[styles.badgeCounter, activeFilter === 'all' && styles.badgeCounterActive]}>
              <Text style={[styles.badgeCounterText, activeFilter === 'all' && styles.badgeCounterTextActive]}>
                {myCourses.length}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'in_progress' && styles.filterPillActive]}
            onPress={() => setActiveFilter('in_progress')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === 'in_progress' && styles.filterPillTextActive]}>
              In Progress
            </Text>
            <View style={[styles.badgeCounter, activeFilter === 'in_progress' && styles.badgeCounterActive]}>
              <Text style={[styles.badgeCounterText, activeFilter === 'in_progress' && styles.badgeCounterTextActive]}>
                {inProgressCount}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, activeFilter === 'completed' && styles.filterPillActive]}
            onPress={() => setActiveFilter('completed')}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterPillText, activeFilter === 'completed' && styles.filterPillTextActive]}>
              Completed
            </Text>
            <View style={[styles.badgeCounter, activeFilter === 'completed' && styles.badgeCounterActive]}>
              <Text style={[styles.badgeCounterText, activeFilter === 'completed' && styles.badgeCounterTextActive]}>
                {completedCount}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {filteredMyCourses.length > 0 ? (
          filteredMyCourses.map(renderEnrolledCourseCard)
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No enrolled courses in this filter</Text>
          </View>
        )}

        {/* SECTION 2: EXPLORE MORE COURSES (COLLAPSIBLE) */}
        {exploreCourses.length > 0 && (
          <View style={styles.exploreSectionWrapper}>
            <TouchableOpacity
              style={styles.exploreHeaderRow}
              onPress={toggleExplore}
              activeOpacity={0.7}
            >
              <View style={styles.exploreHeaderTitleRow}>
                <Text style={styles.sectionTitle}>Explore More Courses</Text>
                <View style={styles.exploreBadgeCounter}>
                  <Text style={styles.exploreBadgeCounterText}>
                    {exploreCourses.length} Available
                  </Text>
                </View>
              </View>
              <View style={styles.chevronBox}>
                <Text style={styles.chevronIcon}>{exploreExpanded ? '▲' : '▼'}</Text>
              </View>
            </TouchableOpacity>

            {exploreExpanded && (
              <View style={styles.exploreContentList}>
                {exploreCourses.map(renderLockedCourseCard)}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.accentBlack,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.soft,
  },
  avatarText: {
    color: COLORS.textLight,
    fontWeight: '800',
    fontSize: 16,
  },
  sectionHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  sectionBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  filterScrollView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 10,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  filterPillActive: {
    backgroundColor: COLORS.accentBlack,
    borderColor: COLORS.accentBlack,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  filterPillTextActive: {
    color: COLORS.textLight,
  },
  badgeCounter: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 7,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeCounterActive: {
    backgroundColor: '#334155',
  },
  badgeCounterText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  badgeCounterTextActive: {
    color: COLORS.textLight,
  },
  errorBox: {
    backgroundColor: COLORS.dangerBg,
    borderRadius: RADIUS.md,
    padding: 12,
    marginTop: 16,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    fontWeight: '500',
  },
  cardContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 12,
    ...SHADOWS.card,
  },
  thumbnailWrapper: {
    width: '100%',
    height: 200,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.accentLavenderBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderEmoji: {
    fontSize: 54,
  },
  topBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  topBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  fabBtn: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.accentBlack,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.floatingBtn,
  },
  fabIcon: {
    color: COLORS.textLight,
    fontSize: 14,
    marginLeft: 2,
  },
  cardBody: {
    paddingHorizontal: 8,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  courseDescription: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accentLavender,
    borderRadius: RADIUS.pill,
  },
  progressFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },

  // ── Explore Collapsible & Locked Card Styles ──
  exploreSectionWrapper: {
    marginTop: 16,
  },
  exploreHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 8,
  },
  exploreHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  exploreBadgeCounter: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  exploreBadgeCounterText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  chevronBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronIcon: {
    fontSize: 10,
    color: COLORS.textSecondary,
    fontWeight: '900',
  },
  exploreContentList: {
    marginTop: 4,
  },
  lockedCardContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  lockedCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  lockedThumbnailWrapper: {
    width: 90,
    height: 80,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0',
  },
  lockedThumbnail: {
    width: '100%',
    height: '100%',
  },
  lockedThumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.accentLavenderBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedCardBody: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  lockedTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  lockedCourseTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textPrimary,
    flex: 1,
    letterSpacing: -0.2,
  },
  compactVideoBadge: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
  },
  compactVideoBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  lockedCourseDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: 6,
  },
  compactLockedCta: {
    backgroundColor: COLORS.accentLavenderBg,
    borderRadius: RADIUS.sm,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  compactLockedCtaText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.accentLavender,
  },
});

export default HomeScreen;
