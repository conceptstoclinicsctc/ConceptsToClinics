import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { COLORS } from '../constants/theme';

interface Props {
  text?: string;
  numberOfLines?: number;
  /** When true, text is fully hidden until user taps "Show More" */
  startCollapsed?: boolean;
  style?: StyleProp<TextStyle>;
}

const ExpandableText: React.FC<Props> = ({ text, numberOfLines = 2, startCollapsed = false, style }) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(startCollapsed);

  if (!text) return null;

  const handleHiddenTextLayout = (e: any) => {
    const linesCount = e.nativeEvent.lines?.length ?? 0;
    if (linesCount > numberOfLines) {
      setShowButton(true);
    }
  };

  // When startCollapsed: hide text entirely until expanded
  const shouldHideText = startCollapsed && !expanded;

  return (
    <View style={styles.container}>
      {/* Visible Text — hidden when startCollapsed and not expanded */}
      {!shouldHideText && (
        <Text
          style={[styles.text, style]}
          numberOfLines={expanded ? undefined : (startCollapsed ? undefined : numberOfLines)}
        >
          {text}
        </Text>
      )}

      {/* Hidden Text in zero-height container to measure exact full un-truncated line count */}
      {!startCollapsed && (
        <View style={styles.hiddenContainer} pointerEvents="none" aria-hidden>
          <Text
            style={[styles.text, style]}
            onTextLayout={handleHiddenTextLayout}
          >
            {text}
          </Text>
        </View>
      )}

      {showButton && (
        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          activeOpacity={0.7}
          style={styles.toggleBtn}
        >
          <Text style={styles.toggleText}>
            {expanded ? 'Show Less ▲' : 'Show More ▼'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
  text: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 19,
  },
  hiddenContainer: {
    height: 0,
    overflow: 'hidden',
    opacity: 0,
  },
  toggleBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.accentLavender,
  },
});

export default ExpandableText;
