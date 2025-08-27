import { useState, useEffect, useRef, useCallback } from 'react';
import type { YouTubePlayer } from 'react-youtube';
import { YouTubeAdapter } from '@/modules/MovieDetails';
import { PLAYER_CONSTANTS } from '../constants/player';
import type { PlayerState } from '@/modules/MovieDetails';

export const useVideoPlayer = (
  isOpen: boolean,
): {
  playerAdapter: YouTubeAdapter | null;
  playerState: PlayerState;
  initializePlayer: (player: YouTubePlayer) => void;
  updatePlayingState: (isPlaying: boolean) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  skipForward: () => void;
  skipBackward: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
  clearAllTimers: () => void;
  resetPlayerState: () => void;
} => {
  const [playerAdapter, setPlayerAdapter] = useState<YouTubeAdapter | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: PLAYER_CONSTANTS.DEFAULT_VOLUME,
    isMuted: false,
    isFullscreen: false,
  });

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = useCallback((): void => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const resetPlayerState = useCallback((): void => {
    setPlayerState({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: PLAYER_CONSTANTS.DEFAULT_VOLUME,
      isMuted: false,
      isFullscreen: false,
    });
  }, []);

  // Сброс состояния при закрытии
  useEffect(() => {
    if (!isOpen) {
      if (playerAdapter) {
        try {
          playerAdapter.pause();
        } catch (error) {
          console.warn('Error pausing player:', error);
        }
      }
      resetPlayerState();
      clearAllTimers();
    }
  }, [isOpen, playerAdapter, resetPlayerState, clearAllTimers]);

  // Cleanup при размонтировании
  useEffect(() => {
    return (): void => {
      clearAllTimers();
      if (playerAdapter) {
        try {
          playerAdapter.destroy();
        } catch (error) {
          console.warn('Error destroying player:', error);
        }
      }
    };
  }, [playerAdapter, clearAllTimers]);

  // Обновление времени воспроизведения
  useEffect(() => {
    if (playerAdapter && playerState.isPlaying) {
      progressIntervalRef.current = setInterval(() => {
        try {
          const currentTime = playerAdapter.getCurrentTime();
          setPlayerState((prev) => ({ ...prev, currentTime }));
        } catch (error) {
          console.warn('Error getting current time:', error);
        }
      }, PLAYER_CONSTANTS.PROGRESS_UPDATE_INTERVAL);
    } else {
      clearAllTimers();
    }

    return (): void => clearAllTimers();
  }, [playerAdapter, playerState.isPlaying, clearAllTimers]);

  const initializePlayer = useCallback((player: YouTubePlayer): void => {
    const adapter = new YouTubeAdapter(player);
    setPlayerAdapter(adapter);

    const duration = adapter.getDuration();
    setPlayerState((prev) => ({
      ...prev,
      duration,
      volume: PLAYER_CONSTANTS.DEFAULT_VOLUME,
    }));

    adapter.setVolume(PLAYER_CONSTANTS.DEFAULT_VOLUME);
    adapter.play();
  }, []);

  const updatePlayingState = useCallback((isPlaying: boolean): void => {
    setPlayerState((prev) => ({ ...prev, isPlaying }));
  }, []);

  const togglePlay = useCallback((): void => {
    if (!playerAdapter) return;

    if (playerState.isPlaying) {
      playerAdapter.pause();
    } else {
      playerAdapter.play();
    }
  }, [playerAdapter, playerState.isPlaying]);

  const seekTo = useCallback(
    (time: number): void => {
      if (!playerAdapter) return;

      playerAdapter.seekTo(time);
      setPlayerState((prev) => ({ ...prev, currentTime: time }));
    },
    [playerAdapter],
  );

  const skipForward = useCallback((): void => {
    if (!playerAdapter) return;

    const newTime = Math.min(
      playerState.currentTime + PLAYER_CONSTANTS.SKIP_SECONDS,
      playerState.duration,
    );
    seekTo(newTime);
  }, [playerAdapter, playerState.currentTime, playerState.duration, seekTo]);

  const skipBackward = useCallback((): void => {
    if (!playerAdapter) return;

    const newTime = Math.max(playerState.currentTime - PLAYER_CONSTANTS.SKIP_SECONDS, 0);
    seekTo(newTime);
  }, [playerAdapter, playerState.currentTime, seekTo]);

  const setVolume = useCallback(
    (volume: number): void => {
      if (!playerAdapter) return;

      playerAdapter.setVolume(volume);
      setPlayerState((prev) => ({
        ...prev,
        volume,
        isMuted: volume === 0,
      }));
    },
    [playerAdapter],
  );

  const toggleMute = useCallback((): void => {
    if (!playerAdapter) return;

    if (playerState.isMuted) {
      playerAdapter.unmute();
      const newVolume =
        playerState.volume === 0 ? PLAYER_CONSTANTS.DEFAULT_VOLUME : playerState.volume;
      playerAdapter.setVolume(newVolume);
      setPlayerState((prev) => ({
        ...prev,
        isMuted: false,
        volume: newVolume,
      }));
    } else {
      playerAdapter.mute();
      setPlayerState((prev) => ({ ...prev, isMuted: true }));
    }
  }, [playerAdapter, playerState.isMuted, playerState.volume]);

  const toggleFullscreen = useCallback((): void => {
    setPlayerState((prev) => ({ ...prev, isFullscreen: !prev.isFullscreen }));
  }, []);

  return {
    playerAdapter,
    playerState,
    initializePlayer,
    updatePlayingState,
    togglePlay,
    seekTo,
    skipForward,
    skipBackward,
    setVolume,
    toggleMute,
    toggleFullscreen,
    clearAllTimers,
    resetPlayerState,
  };
};

export const usePlayerControls = (
  isPlaying: boolean = false,
): {
  showControls: boolean;
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  clearControlsTimer: () => void;
} => {
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearControlsTimer = useCallback((): void => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  }, []);

  const handleMouseMove = useCallback(
    (_event: React.MouseEvent<HTMLDivElement>): void => {
      setShowControls(true);
      clearControlsTimer();
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, PLAYER_CONSTANTS.CONTROLS_HIDE_TIMEOUT);
    },
    [clearControlsTimer, isPlaying],
  );

  return {
    showControls,
    isHovering,
    setIsHovering,
    handleMouseMove,
    clearControlsTimer,
  };
};
