export const PLAYER_CONSTANTS = {
  DEFAULT_VOLUME: 50,
  CONTROLS_HIDE_TIMEOUT: 3000,
  PROGRESS_UPDATE_INTERVAL: 1000,
  SKIP_SECONDS: 10,
} as const;

export const YOUTUBE_PLAYER_STATES = {
  PLAYING: 1,
  PAUSED: 2,
} as const;

export const ARIA_LABELS = {
  PLAY_BUTTON: 'Воспроизвести видео',
  PAUSE_BUTTON: 'Поставить на паузу',
  MUTE_BUTTON: 'Отключить звук',
  UNMUTE_BUTTON: 'Включить звук',
  FULLSCREEN_BUTTON: 'Полноэкранный режим',
  SKIP_FORWARD: 'Перемотать вперед на 10 секунд',
  SKIP_BACKWARD: 'Перемотать назад на 10 секунд',
  VOLUME_SLIDER: 'Регулятор громкости',
  PROGRESS_BAR: 'Прогресс воспроизведения',
} as const;
