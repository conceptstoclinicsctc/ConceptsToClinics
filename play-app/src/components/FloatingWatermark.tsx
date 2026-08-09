import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, useWindowDimensions } from 'react-native';

interface Props {
  studentName: string;
  studentId: string;
  boundedWidth?: number;
  boundedHeight?: number;
}

/**
 * Floating watermark overlay for video player component.
 * Drifts slowly (16s cycle) strictly bounded inside the video player box.
 * pointerEvents="none" ensures no touch interference with video controls.
 */
const FloatingWatermark: React.FC<Props> = ({
  studentName,
  studentId,
  boundedWidth,
  boundedHeight,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const areaWidth = boundedWidth || windowWidth;
  const areaHeight = boundedHeight || windowHeight;

  const animX = useRef(new Animated.Value(10)).current;
  const animY = useRef(new Animated.Value(10)).current;

  const getRandomX = () =>
    Math.floor(Math.random() * Math.max(10, areaWidth - 140)) + 10;

  const getRandomY = () =>
    Math.floor(Math.random() * Math.max(10, areaHeight - 35)) + 10;

  useEffect(() => {
    let cancelled = false;

    const animate = () => {
      if (cancelled) return;

      const toX = getRandomX();
      const toY = getRandomY();

      Animated.parallel([
        Animated.timing(animX, {
          toValue: toX,
          duration: 16000, // Slower, subtle 16-second drift
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animY, {
          toValue: toY,
          duration: 16000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished && !cancelled) {
          animate();
        }
      });
    };

    animate();

    return () => {
      cancelled = true;
      animX.stopAnimation();
      animY.stopAnimation();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areaWidth, areaHeight]);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        zIndex: 999,
        transform: [{ translateX: animX }, { translateY: animY }],
      }}
    >
      <Text
        style={{
          opacity: 0.18,
          color: 'white',
          fontSize: 12,
          fontWeight: '700',
          fontFamily: 'monospace',
          textShadowColor: 'rgba(0, 0, 0, 0.75)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}
      >
        {studentName} • {studentId}
      </Text>
    </Animated.View>
  );
};

export default FloatingWatermark;
