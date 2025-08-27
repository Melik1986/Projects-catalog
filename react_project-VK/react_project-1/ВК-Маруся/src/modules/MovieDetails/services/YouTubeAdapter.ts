import type { YouTubePlayer } from 'react-youtube';
import type { PlayerControls } from '@/modules/MovieDetails';

export class YouTubeAdapter implements PlayerControls {
  constructor(private player: YouTubePlayer) {}

  play(): void {
    this.player.playVideo();
  }

  pause(): void {
    this.player.pauseVideo();
  }

  seekTo(time: number): void {
    this.player.seekTo(time, true);
  }

  setVolume(volume: number): void {
    this.player.setVolume(volume);
  }

  mute(): void {
    this.player.mute();
  }

  unmute(): void {
    this.player.unMute();
  }

  getCurrentTime(): number {
    return this.player.getCurrentTime();
  }

  getDuration(): number {
    return this.player.getDuration();
  }

  destroy(): void {
    this.player.destroy();
  }
}
