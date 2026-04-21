import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import { audioService } from './src/services/audioService';

export default function App() {
  useEffect(() => {
    audioService.initialize();
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#07090F" />
      <HomeScreen />
    </>
  );
}
