import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useAudioStore } from '../store/audioStore';
import { audioService } from '../services/audioService';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../constants/theme';

const { width } = Dimensions.get('window');

const EMOTIONAL_MESSAGES = [
  'You are safe',
  'Let go of the day',
  'Breathe slowly',
  'Drift into calm',
  'Peace finds you now',
  'Rest your mind',
  'Sleep is near',
  'You are held',
  'Nothing to do',
  'Just be here',
];

export default function HomeScreen() {
  const { isPlaying, isLoading, currentTrack, streak, error } = useAudioStore();
  const [messageIndex, setMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  // Rotate emotional message every 8 seconds with crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start(() => {
        setMessageIndex((prev) => (prev + 1) % EMOTIONAL_MESSAGES.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [fadeAnim]);

  const handleSleepPress = async () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 80,
        useNativeDriver: true,
      }),
    ]).start();

    await audioService.togglePlayPause();
  };

  const handleNowPlayingPress = async () => {
    await audioService.togglePlayPause();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Sleep Waves</Text>
        <View style={styles.streakBadge}>
          <Text style={styles.streakText}>🌙 {streak} Calm Night{streak !== 1 ? 's' : ''}</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Breathing Circle */}
        <View style={styles.animationWrapper}>
          <LottieView
            source={require('../../assets/breathing-circle.json')}
            autoPlay
            loop
            style={styles.lottie}
            resizeMode="contain"
          />
        </View>

        {/* Breathing label */}
        <Text style={styles.breatheLabel}>Breathe</Text>

        {/* Emotional Message */}
        <Animated.View style={[styles.messageContainer, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>{EMOTIONAL_MESSAGES[messageIndex]}</Text>
        </Animated.View>

        {/* Error State */}
        {error != null && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {/* CTA Button */}
        <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.sleepButton,
              isPlaying && styles.sleepButtonActive,
              isLoading && styles.sleepButtonLoading,
            ]}
            onPress={handleSleepPress}
            disabled={isLoading}
            activeOpacity={0.9}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.text.primary} size="small" />
            ) : (
              <Text style={styles.sleepButtonText}>
                {isPlaying ? '⏸  Pause' : '🌙  Help Me Sleep Now'}
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Mini Now-Playing Card */}
      {currentTrack != null && (
        <View style={styles.nowPlayingCard}>
          <View style={styles.nowPlayingLeft}>
            <View style={[styles.nowPlayingDot, isPlaying && styles.nowPlayingDotActive]} />
            <View style={styles.nowPlayingInfo}>
              <Text style={styles.nowPlayingLabel}>NOW PLAYING</Text>
              <Text style={styles.nowPlayingTrack}>{currentTrack}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.nowPlayingControl}
            onPress={handleNowPlayingPress}
            activeOpacity={0.7}
          >
            <Text style={styles.nowPlayingControlText}>{isPlaying ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const LOTTIE_SIZE = width * 0.72;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Platform.OS === 'android' ? Spacing.xl : Spacing.md,
    paddingBottom: Spacing.md,
  },
  appTitle: {
    ...Typography.h2,
    color: Colors.text.primary,
  },
  streakBadge: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  streakText: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  animationWrapper: {
    width: LOTTIE_SIZE,
    height: LOTTIE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.purple,
  },
  lottie: {
    width: LOTTIE_SIZE,
    height: LOTTIE_SIZE,
  },
  breatheLabel: {
    ...Typography.caption,
    color: Colors.text.muted,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginTop: -Spacing.md,
  },
  messageContainer: {
    alignItems: 'center',
    minHeight: 40,
    justifyContent: 'center',
  },
  messageText: {
    ...Typography.h3,
    color: Colors.text.secondary,
    fontWeight: '300',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 80, 80, 0.1)',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  errorText: {
    ...Typography.small,
    color: '#FF6B6B',
    textAlign: 'center',
  },
  sleepButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.xxl,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: width * 0.72,
    ...Shadows.purple,
  },
  sleepButtonActive: {
    backgroundColor: Colors.primaryDark,
  },
  sleepButtonLoading: {
    opacity: 0.7,
  },
  sleepButtonText: {
    ...Typography.body,
    color: Colors.text.primary,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  nowPlayingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    marginHorizontal: Spacing.lg,
    marginBottom: Platform.OS === 'android' ? Spacing.lg : Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  nowPlayingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  nowPlayingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.text.muted,
  },
  nowPlayingDotActive: {
    backgroundColor: Colors.primary,
  },
  nowPlayingInfo: {
    gap: 2,
  },
  nowPlayingLabel: {
    ...Typography.small,
    color: Colors.text.muted,
    letterSpacing: 1.5,
  },
  nowPlayingTrack: {
    ...Typography.caption,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  nowPlayingControl: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nowPlayingControlText: {
    fontSize: 16,
    color: Colors.text.primary,
  },
});
