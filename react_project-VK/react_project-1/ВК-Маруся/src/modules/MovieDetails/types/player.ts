export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
}

export interface PlayerControls {
  play: () => void;
  pause: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  mute: () => void;
  unmute: () => void;
}
