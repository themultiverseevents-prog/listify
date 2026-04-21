import React from 'react';
import LottieView from 'lottie-react-native';

interface Props {
  size: number;
}

export default function BreathingCircle({ size }: Props) {
  return (
    <LottieView
      source={require('../../assets/breathing-circle.json')}
      autoPlay
      loop
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}
