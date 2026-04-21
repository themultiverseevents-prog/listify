import { create } from 'zustand';

interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  streak: number;
  currentTrack: string | null;
  error: string | null;

  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setVolume: (volume: number) => void;
  setStreak: (streak: number) => void;
  setCurrentTrack: (track: string | null) => void;
  setError: (error: string | null) => void;
  incrementStreak: () => void;
  reset: () => void;
}

const initialState = {
  isPlaying: false,
  isLoading: false,
  volume: 1.0,
  streak: 3,
  currentTrack: null,
  error: null,
};

export const useAudioStore = create<AudioState>((set) => ({
  ...initialState,

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
  setStreak: (streak) => set({ streak }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setError: (error) => set({ error }),
  incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
  reset: () => set(initialState),
}));
