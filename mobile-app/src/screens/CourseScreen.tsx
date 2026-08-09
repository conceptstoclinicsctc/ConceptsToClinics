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
  Linking,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/types';
import { fetchCoursePlaylists, Playlist } from '../api/courses';
import { TUTOR_WHATSAPP_NUMBER } from '../constants/api';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';
import ExpandableText from '../components/ExpandableText';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'Course'>;
  route: RouteProp<AppStackParamList, 'Course'>;
};

const CourseScreen = ({ navigation, route }: Props) => {
  const { courseId, courseTitle, courseDescription, thumbnail, totalVideos, isEnrolled } = route.params;
  const enrolled = isEnrolled !== false;

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(enrolled);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPlaylists = useCallback(async () => {
    if (!enrolled) {
      setLoading(false);
      return;
    }
    try {
      setError(null);
      const data = await fetchCoursePlaylists(courseId);
      setPlaylists(data);
    } catch (err: any) {
      setError('Could not load course sections. Pull down to retry.');
    }
  }, [courseId, enrolled]);

  useEffect(() => {
    if (enrolled) {
      loadPlaylists().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [loadPlaylists, enrolled]);

  const onRefresh = useCallback(async () => {
    if (!enrolled) return;
    setRefreshing(true);
    await loadPlaylists();
    setRefreshing(false);
  }, [loadPlaylists, enrolled]);

  const handlePlaylistPress = (playlist: Playlist) => {
    navigation.navigate('Playlist', {
      courseId,
      courseTitle,
      playlistId: playlist.id,
      playlistTitle: playlist.title,
      playlistDescription: playlist.description,
      thumbnail: playlist.thumbnail || thumbnail,
      totalVideos: playlist.totalVideos,
    });
  };

  const handleContactInstructor = async () => {
    const message = `Hi, I'm interested in enrolling in ${courseTitle}. Can you help me get access?`;
    const whatsappUrl = `https://wa.me/${TUTOR_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    try {
      await Linking.openURL(whatsappUrl);
    } catch {
      Alert.alert(
        'Contact Instructor',
        `Please contact your tutor directly on WhatsApp at ${TUTOR_WHATSAPP_NUMBER}`
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
        <ActivityIndicator size="large" color={COLORS.accentBlack} />
        <Text style={styles.loadingText}>Loading course details…</Text>
      </SafeAreaView>
    );
  }

  const completedCount = playlists.reduce((acc, p) => acc + (p.completedVideos ?? 0), 0);
  const totalCount = playlists.reduce((acc, p) => acc + (p.totalVideos ?? 0), 0);
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const renderPlaylistItem = ({ item, index }: { item: Playlist; index: number }) => {
    const isComplete = item.completedVideos > 0 && item.completedVideos === item.totalVideos;
    const hasProgress = (item.progressPercent ?? 0) > 0 && !isComplete;

    return (
      <TouchableOpacity
        style={styles.videoCard}
        onPress={() => handlePlaylistPress(item)}
        activeOpacity={0.88}
      >
        {item.thumbnail ? (
          <Image
            source={{ uri: item.thumbnail }}
            style={styles.playlistThumbnail}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[
              styles.statusCircle,
              isComplete ? styles.statusCompleted : styles.statusPending,
            ]}
          >
            {isComplete ? (
              <Text style={styles.statusCheck}>✓</Text>
            ) : (
              <Text style={styles.statusPlayIcon}>▶</Text>
            )}
          </View>
        )}

        <View style={styles.videoInfo}>
          <Text style={styles.videoIndex}>Section {index + 1}</Text>
          <Text style={styles.videoTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={styles.videoDesc} numberOfLines={1}>
              {item.description}
            </Text>
          ) : null}
          <View style={styles.metaRow}>
            <Text style={styles.videoCountText}>
              {item.totalVideos} lecture{item.totalVideos !== 1 ? 's' : ''}
            </Text>
            {hasProgress && (
              <Text style={styles.progressHint}>
                {' '}· {Math.round(item.progressPercent)}% done
              </Text>
            )}
            {isComplete && (
              <Text style={styles.completedHint}> · Completed ✓</Text>
            )}
          </View>
          {(hasProgress || isComplete) && (
            <View style={styles.miniProgressTrack}>
              <View
                style={[
                  styles.miniProgressFill,
                  isComplete && styles.miniProgressFillComplete,
                  { width: `${item.progressPercent}%` as any },
                ]}
              />
            </View>
          )}
        </View>

        <Text style={styles.arrowText}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />

      <FlatList
        data={enrolled ? playlists : []}
        keyExtractor={(item) => item.id}
        renderItem={renderPlaylistItem}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            {/* ── Single Hero Card: Image + Description + Progress ── */}
            <View style={styles.heroCard}>
              {/* Course Image */}
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
                {/* Locked overlay badge */}
                {!enrolled && (
                  <View style={styles.lockedOverlay}>
                    <Text style={styles.lockedOverlayText}>🔒 Course Locked</Text>
                  </View>
                )}
              </View>

              {/* Description — fully hidden until Show More is tapped */}
              {courseDescription ? (
                <View style={styles.descWrapper}>
                  <ExpandableText text={courseDescription} startCollapsed />
                </View>
              ) : null}

              {/* Progress / Locked box */}
              {enrolled ? (
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
              ) : (
                <View style={styles.lockedInfoBox}>
                  <Text style={styles.lockedCountText}>
                    📹 Contains {totalVideos ?? 'multiple'} Video Lectures
                  </Text>
                  <Text style={styles.lockedNoticeText}>
                    You are not currently enrolled in this course. Contact your tutor to unlock access.
                  </Text>
                  <TouchableOpacity
                    style={styles.whatsappBtn}
                    onPress={handleContactInstructor}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.whatsappBtnText}>💬 Contact Instructor on WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {enrolled && (
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Course Sections</Text>
                <Text style={styles.sectionCountText}>{playlists.length} Sections</Text>
              </View>
            )}

            {error && (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          enrolled && !error ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📚</Text>
              <Text style={styles.emptyTitle}>No sections yet</Text>
              <Text style={styles.emptySubtitle}>
                Your tutor hasn't added any sections to this course yet.
              </Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        refreshControl={
          enrolled ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[COLORS.accentBlack]}
              tintColor={COLORS.accentBlack}
            />
          ) : undefined
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
  // ── Hero Card (single card: image inside with padding + content)
  heroCard: {
    borderRadius: RADIUS.xl,
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    padding: 16,
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
  lockedOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.72)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.pill,
  },
  lockedOverlayText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  descWrapper: {
    marginBottom: 12,
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
  lockedInfoBox: {
    backgroundColor: COLORS.bg,
    borderRadius: RADIUS.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  lockedCountText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  lockedNoticeText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
    marginBottom: 16,
  },
  whatsappBtn: {
    backgroundColor: '#25D366',
    borderRadius: RADIUS.pill,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.floatingBtn,
  },
  whatsappBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
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
  playlistThumbnail: {
    width: 80,
    height: 52,
    borderRadius: RADIUS.md,
    backgroundColor: '#E2E8F0',
    marginRight: 14,
  },
  statusCircle: {
    width: 80,
    height: 52,
    borderRadius: RADIUS.md,
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
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  videoCountText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  progressHint: {
    fontSize: 12,
    color: COLORS.accentLavender,
    fontWeight: '600',
  },
  completedHint: {
    fontSize: 12,
    color: COLORS.accentEmerald,
    fontWeight: '600',
  },
  miniProgressTrack: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
    marginTop: 6,
  },
  miniProgressFill: {
    height: '100%',
    backgroundColor: COLORS.accentLavender,
    borderRadius: RADIUS.pill,
  },
  miniProgressFillComplete: {
    backgroundColor: COLORS.accentEmerald,
  },
  arrowText: {
    fontSize: 22,
    color: COLORS.textMuted,
    fontWeight: '300',
  },
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

export default CourseScreen;
