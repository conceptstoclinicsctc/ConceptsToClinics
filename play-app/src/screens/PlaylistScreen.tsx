import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/types';
import { fetchPlaylistVideos, Video } from '../api/courses';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';
import ExpandableText from '../components/ExpandableText';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'Playlist'>;
  route: RouteProp<AppStackParamList, 'Playlist'>;
};

const PlaylistScreen = ({ navigation, route }: Props) => {
  const { courseId, courseTitle, playlistId, playlistTitle, playlistDescription, thumbnail } = route.params;

  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadVideos = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchPlaylistVideos(courseId, playlistId);
      setVideos(data);
    } catch (err: any) {
      setError('Could not load lecture details. Pull down to retry.');
    }
  }, [courseId, playlistId]);

  useEffect(() => {
    loadVideos().finally(() => setLoading(false));
  }, [loadVideos]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadVideos();
    setRefreshing(false);
  }, [loadVideos]);

  const handleVideoPress = (video: Video) => {
    navigation.navigate('VideoPlayer', {
      courseId,
      playlistId,
      videoId: video.id,
      videoTitle: video.title,
      videoDescription: video.description,
      resumeSeconds: video.watchedSeconds > 0 ? video.watchedSeconds : undefined,
      videoDuration: video.duration,
    });
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
        <ActivityIndicator size="large" color={COLORS.accentBlack} />
        <Text style={styles.loadingText}>Loading lectures…</Text>
      </SafeAreaView>
    );
  }

  const completedCount = videos.filter((v) => v.isCompleted).length;
  const totalCount = videos.length;
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const renderVideoItem = ({ item, index }: { item: Video; index: number }) => {
    const isCompleted = item.isCompleted;

    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() => handleVideoPress(item)}
        activeOpacity={0.88}
      >
        {/* Left Status Circle */}
        <View
          style={[
            styles.statusCircle,
            isCompleted ? styles.statusCompleted : styles.statusPending,
          ]}
        >
          {isCompleted ? (
            <Text style={styles.statusCheck}>✓</Text>
          ) : (
            <Text style={styles.statusPlayIcon}>▶</Text>
          )}
        </View>

        {/* Center Details */}
        <View style={styles.videoInfo}>
          <Text style={styles.videoIndex}>Lecture {index + 1}</Text>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={styles.videoDesc} numberOfLines={1}>
              {item.description}
            </Text>
          ) : null}
        </View>

        {/* Right Duration / Preview Pill */}
        {item.isFreePreview ? (
          <View style={styles.previewPill}>
            <Text style={styles.previewText}>Preview</Text>
          </View>
        ) : item.watchedSeconds ? (
          <View style={styles.durationPill}>
            <Text style={styles.durationText}>
              {formatDuration(item.watchedSeconds)}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* Hero Playlist Header Card (Matching Course Hero Card style) */}
            <View style={styles.heroCard}>
              {/* Course / Playlist Image */}
              <View style={styles.imageWrapper}>
                {thumbnail ? (
                  <Image
                    source={{ uri: thumbnail }}
                    style={styles.courseImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Text style={styles.imagePlaceholderIcon}>📚</Text>
                  </View>
                )}
                {/* Course Title Overlay */}
                <View style={styles.courseTitleOverlay}>
                  <Text style={styles.courseTitleOverlayText} numberOfLines={1}>
                    {courseTitle}
                  </Text>
                </View>
              </View>

              {/* Playlist Title */}
              <Text style={styles.playlistTitleText}>{playlistTitle}</Text>

              {/* Expandable Playlist Description */}
              {playlistDescription ? (
                <View style={styles.descWrapper}>
                  <ExpandableText text={playlistDescription} numberOfLines={2} />
                </View>
              ) : null}

              {/* Progress Container */}
              <View style={styles.heroProgressBox}>
                <View style={styles.progressHeaderRow}>
                  <Text style={styles.progressLabelText}>
                    {completedCount} of {totalCount} Lectures Completed
                  </Text>
                  <Text style={styles.progressPercentText}>{progressPercent}%</Text>
                </View>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${progressPercent}%` as any },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* Section Header */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>Curriculum Lectures</Text>
              <Text style={styles.sectionCountText}>{totalCount} Lessons</Text>
            </View>

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          !error ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🎬</Text>
              <Text style={styles.emptyTitle}>No lectures yet</Text>
              <Text style={styles.emptySubtitle}>
                Your tutor hasn't added any lectures to this section yet.
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.accentBlack]}
            tintColor={COLORS.accentBlack}
          />
        }
        showsVerticalScrollIndicator={false}
      />
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
  listContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },

  // Hero Card (Matching Course Hero Card style)
  heroCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 24,
    ...SHADOWS.card,
  },
  imageWrapper: {
    position: 'relative',
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 14,
  },
  courseImage: {
    width: '100%',
    height: 190,
    borderRadius: RADIUS.lg,
  },
  imagePlaceholder: {
    width: '100%',
    height: 190,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.accentLavenderBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderIcon: {
    fontSize: 52,
  },
  courseTitleOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.76)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
    maxWidth: '85%',
  },
  courseTitleOverlayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  playlistTitleText: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 6,
  },
  descWrapper: {
    marginBottom: 14,
  },
  heroProgressBox: {
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.lg,
    padding: 16,
  },
  progressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabelText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  progressPercentText: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accentBlack,
    borderRadius: RADIUS.pill,
  },

  // Section Header
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  sectionCountText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  // Video Card
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.soft,
  },
  statusCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  statusCompleted: {
    backgroundColor: COLORS.accentEmeraldBg,
  },
  statusPending: {
    backgroundColor: COLORS.accentBlack,
  },
  statusCheck: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.accentEmerald,
  },
  statusPlayIcon: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  videoInfo: {
    flex: 1,
    marginRight: 8,
  },
  videoIndex: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  videoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  videoDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  previewPill: {
    backgroundColor: COLORS.accentLavenderBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  previewText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accentLavender,
  },
  durationPill: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },

  // Empty state
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: COLORS.textSecondary,
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
  },
});

export default PlaylistScreen;
