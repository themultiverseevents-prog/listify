import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, StyleSheet } from 'react-native';
import { Colors } from '../constants/theme';

interface Props {
  size: number;
}

export default function BreathingCircle({ size }: Props) {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityOuter = useRef(new Animated.Value(0.12)).current;

  useEffect(() => {
    const breathe = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityOuter, {
            toValue: 0.4,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 0.7,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacityOuter, {
            toValue: 0.12,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    breathe.start();
    return () => breathe.stop();
  }, [scaleAnim, opacityOuter]);

  const base = size;

  return (
    <View style={{ width: base, height: base, alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer glow */}
      <Animated.View
        style={[
          styles.circle,
          {
            width: base * 0.9,
            height: base * 0.9,
            borderRadius: base * 0.45,
            backgroundColor: Colors.primary,
            opacity: opacityOuter,
            transform: [{ scale: scaleAnim }],
            position: 'absolute',
          },
        ]}
      />
      {/* Ring */}
      <Animated.View
        style={[
          {
            width: base * 0.68,
            height: base * 0.68,
            borderRadius: base * 0.34,
            borderWidth: 2,
            borderColor: Colors.primary,
            opacity: 0.75,
            transform: [{ scale: scaleAnim }],
            position: 'absolute',
          },
        ]}
      />
      {/* Core */}
      <Animated.View
        style={[
          styles.circle,
          {
            width: base * 0.54,
            height: base * 0.54,
            borderRadius: base * 0.27,
            backgroundColor: Colors.primary,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
  },
});
