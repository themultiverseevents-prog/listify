import { Audio, AVPlaybackSource } from 'expo-av';
import { useAudioStore } from '../store/audioStore';

// Replace with your own audio file:
// Option A (local file): require('../../assets/audio/heavy-rain.mp3')
// Option B (remote URL): { uri: 'https://your-cdn.com/rain.mp3' }
const HEAVY_RAIN_SOURCE = {
  uri: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
};

const TRACK_NAME = 'Heavy Rain';

class AudioService {
  private sound: Audio.Sound | null = null;
  private static instance: AudioService;

  static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  async initialize(): Promise<void> {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('AudioService.initialize error:', error);
    }
  }

  async play(source: AVPlaybackSource = HEAVY_RAIN_SOURCE): Promise<void> {
    const store = useAudioStore.getState();

    try {
      store.setIsLoading(true);
      store.setError(null);

      await this.unload();

      const { sound } = await Audio.Sound.createAsync(source, {
        isLooping: true,
        volume: store.volume,
        shouldPlay: true,
      });

      this.sound = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) {
          if (status.error) {
            useAudioStore.getState().setError(`Playback error: ${status.error}`);
            useAudioStore.getState().setIsPlaying(false);
          }
        }
      });

      store.setIsPlaying(true);
      store.setCurrentTrack(TRACK_NAME);
      store.setIsLoading(false);
    } catch (error) {
      store.setError('Could not load audio. Check your connection or audio file path.');
      store.setIsLoading(false);
      store.setIsPlaying(false);
      console.error('AudioService.play error:', error);
    }
  }

  async pause(): Promise<void> {
    if (!this.sound) return;
    try {
      await this.sound.pauseAsync();
      useAudioStore.getState().setIsPlaying(false);
    } catch (error) {
      console.error('AudioService.pause error:', error);
    }
  }

  async resume(): Promise<void> {
    if (!this.sound) return;
    try {
      await this.sound.playAsync();
      useAudioStore.getState().setIsPlaying(true);
    } catch (error) {
      console.error('AudioService.resume error:', error);
    }
  }

  async stop(): Promise<void> {
    await this.unload();
    const store = useAudioStore.getState();
    store.setIsPlaying(false);
    store.setCurrentTrack(null);
  }

  async setVolume(volume: number): Promise<void> {
    const clamped = Math.max(0, Math.min(1, volume));
    useAudioStore.getState().setVolume(clamped);
    if (!this.sound) return;
    try {
      await this.sound.setVolumeAsync(clamped);
    } catch (error) {
      console.error('AudioService.setVolume error:', error);
    }
  }

  async togglePlayPause(): Promise<void> {
    const { isPlaying, currentTrack } = useAudioStore.getState();

    if (isPlaying) {
      await this.pause();
    } else if (currentTrack && this.sound) {
      await this.resume();
    } else {
      await this.play();
    }
  }

  private async unload(): Promise<void> {
    if (!this.sound) return;
    try {
      await this.sound.unloadAsync();
    } catch {
      // Already unloaded
    } finally {
      this.sound = null;
    }
  }
}

export const audioService = AudioService.getInstance();
