import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  StatusBar,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { usePreventScreenCapture } from 'expo-screen-capture';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../navigation/types';
import { fetchVideoStream, StreamResult } from '../api/courses';
import { updateProgress } from '../api/progress';
import { COLORS, SHADOWS, RADIUS } from '../constants/theme';
import { useAuthStore } from '../store/authStore';
import ExpandableText from '../components/ExpandableText';

type Props = {
  navigation: StackNavigationProp<AppStackParamList, 'VideoPlayer'>;
  route: RouteProp<AppStackParamList, 'VideoPlayer'>;
};

// ── FIXED: Now uses Bunny's actual Player.js API instead of guessing at raw postMessage shapes ──
const BUNNY_BRIDGE_JS = `
(function() {
  function initPlayer() {
    var iframe = document.getElementById('bunny-player');
    if (!iframe || typeof playerjs === 'undefined') {
      setTimeout(initPlayer, 200);
      return;
    }

    var player = new playerjs.Player(iframe);

    player.on('ready', function() {
      player.on('timeupdate', function(data) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'timeupdate',
          seconds: (data && data.seconds) || 0,
          duration: (data && data.duration) || 0
        }));
      });

      player.on('pause', function() {
        player.getCurrentTime(function(seconds) {
          player.getDuration(function(duration) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'pause',
              seconds: seconds || 0,
              duration: duration || 0
            }));
          });
        });
      });

      player.on('ended', function() {
        player.getCurrentTime(function(seconds) {
          player.getDuration(function(duration) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'ended',
              seconds: seconds || 0,
              duration: duration || 0
            }));
          });
        });
      });
    });
  }

  initPlayer();

  // ── Fullscreen handler: forward web fullscreen events to React Native for screen rotation ──
  function notifyFullscreenState() {
    var isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement);
    
    // Ensure watermark #wm is inside the fullscreen container so it stays visible
    var wm = document.getElementById('wm');
    var container = document.getElementById('player-container');
    var fsElem = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
    if (wm && fsElem && fsElem !== wm && !fsElem.contains(wm)) {
      try {
        fsElem.appendChild(wm);
      } catch(e) {}
    } else if (wm && !isFS && container && !container.contains(wm)) {
      try {
        container.appendChild(wm);
      } catch(e) {}
    }

    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'fullscreen',
      isFullscreen: isFS
    }));
  }

  document.addEventListener('fullscreenchange', notifyFullscreenState, true);
  document.addEventListener('webkitfullscreenchange', notifyFullscreenState, true);
  document.addEventListener('mozfullscreenchange', notifyFullscreenState, true);

  // Listen to postMessage from Bunny iframe if it sends custom fullscreen events
  window.addEventListener('message', function(e) {
    try {
      var data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
      if (data) {
        if (data.event === 'fullscreen' || data.type === 'fullscreen') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'fullscreen',
            isFullscreen: !!(data.value || data.isFullscreen)
          }));
        } else if (data.event === 'enterfullscreen') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'fullscreen',
            isFullscreen: true
          }));
        } else if (data.event === 'exitfullscreen') {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'fullscreen',
            isFullscreen: false
          }));
        }
      }
    } catch(err) {}
  }, false);
})();
true;
`;

const BLOCK_CONTEXT_MENU_JS = `
(function() {
  function disableMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  document.addEventListener('contextmenu', disableMenu, true);
  window.addEventListener('contextmenu', disableMenu, true);
  document.addEventListener('selectstart', disableMenu, true);
})();
true;
`;

const VideoPlayerScreen = ({ navigation, route }: Props) => {
  const { videoId, courseId, playlistId, videoTitle, videoDescription, resumeSeconds, videoDuration } = route.params;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const insets = useSafeAreaInsets();

  const { displayName, studentId } = useAuthStore();

  const [streamData, setStreamData] = useState<StreamResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const watchedSecondsRef = useRef<number>(resumeSeconds ?? 0);
  const totalSecondsRef = useRef<number>(videoDuration ?? 0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastReportedRef = useRef<number>(0);

  // Screen capture prevention (FLAG_SECURE)
  usePreventScreenCapture();

  // Screen Orientation Management: Unlock for video screen, restore to portrait on unmount
  useEffect(() => {
    ScreenOrientation.unlockAsync();
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // Dynamic Header: Hide top stack header in landscape, smaller header title in portrait
  useEffect(() => {
    navigation.setOptions({
      headerShown: !isLandscape,
      title: videoTitle,
      headerTitleStyle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.textPrimary,
      },
    });
  }, [isLandscape, navigation, videoTitle]);

  const loadStream = useCallback(async () => {
    try {
      const data = await fetchVideoStream(videoId, courseId, playlistId);
      setStreamData(data);
      setError(null);
    } catch (err: any) {
      console.error('loadStream error:', err?.response?.data || err?.message);
      const code = err?.response?.data?.code;
      const msg = err?.response?.data?.message;
      if (code === 'NOT_ENROLLED') {
        setError('You are not enrolled in this course.');
      } else if (code === 'SUBSCRIPTION_EXPIRED') {
        setError('Your subscription has expired. Please contact your tutor.');
      } else if (msg) {
        setError(msg);
      } else {
        setError('Could not load video. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [videoId, courseId, playlistId]);

  useEffect(() => {
    loadStream();
  }, [loadStream]);

  const sendProgress = useCallback(async () => {
    const watched = watchedSecondsRef.current;
    const total = totalSecondsRef.current;

    if (watched <= 0) return;
    if (watched <= lastReportedRef.current && total > 0 && Math.abs(watched - lastReportedRef.current) < 5) return;

    lastReportedRef.current = watched;
    try {
      await updateProgress({
        videoId,
        courseId,
        playlistId,
        watchedSeconds: watched,
        totalSeconds: total > 0 ? total : Math.max(watched, 1),
      });
    } catch {
      // Silently ignore
    }
  }, [videoId, courseId, playlistId]);

  useEffect(() => {
    progressIntervalRef.current = setInterval(() => {
      sendProgress();
    }, 15000);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      sendProgress();
    };
  }, [sendProgress]);

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      sendProgress();
      return false;
    });
    return () => sub.remove();
  }, [sendProgress]);

  const handleWebViewMessage = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const msg = JSON.parse(event.nativeEvent.data);
        const secs = Math.floor(msg.seconds || 0);
        const dur = Math.floor(msg.duration || 0);

        if (msg.type === 'timeupdate') {
          if (secs > 0) {
            watchedSecondsRef.current = Math.max(watchedSecondsRef.current, secs);
          }
          if (dur > 0) {
            totalSecondsRef.current = dur;
          }
        } else if (msg.type === 'pause' || msg.type === 'ended') {
          if (secs > 0) {
            watchedSecondsRef.current = Math.max(watchedSecondsRef.current, secs);
          }
          if (dur > 0) {
            totalSecondsRef.current = dur;
          }
          sendProgress();
        } else if (msg.type === 'fullscreen') {
          if (msg.isFullscreen) {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
          } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
            setTimeout(() => {
              ScreenOrientation.unlockAsync();
            }, 1000);
          }
        }
      } catch {
        // Ignore non-JSON
      }
    },
    [sendProgress]
  );

  const toggleFullscreen = useCallback(() => {
    if (isLandscape) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setTimeout(() => {
        ScreenOrientation.unlockAsync();
      }, 1000);
    } else {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
  }, [isLandscape]);

  const buildHtml = (embedUrl: string, name: string, sid: string) => {
    const sep = embedUrl.includes('?') ? '&' : '?';
    const noAutoplayUrl = `${embedUrl}${sep}autoplay=false`;

    const urlWithResume = resumeSeconds
      ? `${noAutoplayUrl}&t=${resumeSeconds}`
      : noAutoplayUrl;

    // Escape for safe HTML injection
    const safeName = name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const safeSid  = sid.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const watermarkText = `${safeName} \u2022 ${safeSid}`;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <script type="text/javascript" src="https://assets.mediadelivery.net/playerjs/playerjs-latest.min.js"></script>
  <style>
    * {
      margin: 0; padding: 0; box-sizing: border-box;
      -webkit-touch-callout: none !important;
      -webkit-user-select: none !important;
      user-select: none !important;
    }
    html, body {
      width: 100%; height: 100%;
      background: #000; overflow: hidden;
      -webkit-touch-callout: none !important;
      -webkit-user-select: none !important;
    }
    .container { position: relative; width: 100%; height: 100vh; }
    iframe {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      border: none;
      -webkit-touch-callout: none !important;
    }
    /* ── Floating watermark — lives inside WebView so it survives native fullscreen ── */
    #wm {
      position: fixed;
      z-index: 2147483647;
      pointer-events: none;
      color: #ffffff;
      font-size: 12px;
      font-weight: 700;
      font-family: monospace;
      opacity: 0.18;
      text-shadow: 0 1px 2px rgba(0,0,0,0.75);
      white-space: nowrap;
      top: 10px;
      left: 10px;
    }
  </style>
</head>
<body oncontextmenu="return false;" onselectstart="return false;">
  <div class="container" id="player-container">
    <iframe
      id="bunny-player"
      src="${urlWithResume}"
      allow="fullscreen; picture-in-picture"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    ></iframe>
    <div id="wm">${watermarkText}</div>
  </div>
  <script>
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);
    window.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }, true);

    // Floating drift animation — pure JS, no CSS @keyframes needed
    (function() {
      var wm = document.getElementById('wm');
      if (!wm) return;
      var vw = window.innerWidth  || document.documentElement.clientWidth;
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var wmW = 180; var wmH = 20;
      var x = 10, y = 10;
      var tx = Math.random() * (vw - wmW), ty = Math.random() * (vh - wmH);
      var startTime = null;
      var DURATION = 16000;

      function easeInOut(t) {
        return t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
      }

      function step(ts) {
        if (!startTime) startTime = ts;
        var elapsed = ts - startTime;
        var t = Math.min(elapsed / DURATION, 1);
        var e = easeInOut(t);
        wm.style.left = (x + (tx - x) * e) + 'px';
        wm.style.top  = (y + (ty - y) * e) + 'px';
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          x = tx; y = ty;
          vw = window.innerWidth  || document.documentElement.clientWidth;
          vh = window.innerHeight || document.documentElement.clientHeight;
          tx = 10 + Math.random() * Math.max(10, vw - wmW);
          ty = 10 + Math.random() * Math.max(10, vh - wmH);
          startTime = null;
          requestAnimationFrame(step);
        }
      }
      requestAnimationFrame(step);
    })();

    ${BUNNY_BRIDGE_JS}
  </script>
</body>
</html>`;
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
        <ActivityIndicator size="large" color={COLORS.accentBlack} />
        <Text style={styles.loadingText}>Initializing player…</Text>
      </SafeAreaView>
    );
  }

  if (error || !streamData) {
    return (
      <SafeAreaView style={styles.centered}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.bg} />
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Playback Error</Text>
        <Text style={styles.errorMessage}>{error ?? 'Unknown error'}</Text>
      </SafeAreaView>
    );
  }

  // ── Single Persistent WebView (Never unmounts on rotation!) ─────────────────────
  return (
    <SafeAreaView
      style={isLandscape ? [styles.fullscreenContainer, { paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right }] : styles.container}
      edges={isLandscape ? [] : ['top', 'bottom']}
    >
      <StatusBar hidden={isLandscape} barStyle="dark-content" backgroundColor={COLORS.bg} />

      {/* Video Player Box */}
      <View style={isLandscape ? styles.fullscreenPlayerBox : styles.playerWrapper}>
        <WebView
          source={{ html: buildHtml(streamData.embedUrl, displayName ?? '', studentId ?? ''), baseUrl: 'https://mediadelivery.net' }}
          style={isLandscape ? styles.webviewFullscreen : styles.webview}
          onMessage={handleWebViewMessage}
          onError={() => loadStream()}
          mediaPlaybackRequiresUserAction={true}
          allowsInlineMediaPlayback
          allowsFullscreenVideo={false}
          javaScriptEnabled
          domStorageEnabled
          cacheEnabled={true}
          cacheMode="LOAD_DEFAULT"
          injectedJavaScript={BLOCK_CONTEXT_MENU_JS}
          injectedJavaScriptBeforeContentLoaded={BLOCK_CONTEXT_MENU_JS}
          originWhitelist={['*']}
          androidLayerType="hardware"
          webDebuggingEnabled={false}
        />

        {/* Dedicated Fullscreen Toggle Button — 42x42 Icon Only */}
        <TouchableOpacity
          style={styles.fullscreenBtn}
          onPress={toggleFullscreen}
          activeOpacity={0.8}
        >
          <Text style={styles.fullscreenBtnText}>
            {isLandscape ? '⤓' : '⤢'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Title & Description Below Video — Portrait Only */}
      {!isLandscape && (
        <ScrollView contentContainerStyle={styles.infoScroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.standaloneTitle}>{videoTitle}</Text>

          <View style={styles.metaCard}>
            {videoDescription ? (
              <ExpandableText text={videoDescription} numberOfLines={2} />
            ) : (
              <Text style={styles.metaSub}>No description provided for this lecture.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  },
  fullscreenPlayerBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  },
  webviewFullscreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  playerWrapper: {
    width: '100%',
    height: 220,
    backgroundColor: '#000000',
    position: 'relative',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  fullscreenBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  fullscreenBtnText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    lineHeight: Platform.OS === 'android' ? 24 : 22,
    marginTop: Platform.OS === 'android' ? -2 : 0,
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    color: COLORS.textSecondary,
    marginTop: 12,
    fontSize: 14,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  errorMessage: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },

  // Meta Info Card
  infoScroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  standaloneTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  metaCard: {
    backgroundColor: COLORS.cardBg,
    borderRadius: RADIUS.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.card,
  },
  metaSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
});

export default VideoPlayerScreen;
