import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { PlayerService } from '../../services/player-service.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {
  artistPath: string;
  leftIconPath: string;
  playIconPath: string;
  pauseIconPath: string;
  rightIconPath: string;
  repeatIconPath: string;
  randomIconPath: string;
  volIconPath: string;

  playerService = inject(PlayerService);

  playButtonActive: boolean = false;

  constructor() {
    this.artistPath = 'assets/hybrid-theory.jpeg';
    this.leftIconPath = 'assets/skip-back-icon.svg';
    this.playIconPath = 'assets/playIcon.svg';
    this.pauseIconPath = 'assets/pauseIcon.svg';
    this.rightIconPath = 'assets/skip-forward-icon.svg';
    this.repeatIconPath = 'assets/repeat-icon.svg';
    this.randomIconPath = 'assets/randomIcon.svg';
    this.volIconPath = 'assets/volume-icon.svg';
  }

  play(index?: number): void {
    this.playerService.play(index);
  }

  prev(): void {
    this.playerService.prev();
  }

  next(): void {
    this.playerService.next();
  }

  volumeSlider($event: Event): void {
    this.playerService.volumeSlider($event);
  }

  durationSlider($event: Event): void {
    this.playerService.durationSlider($event);
  }

  isPlaying(): boolean {
    return this.playerService.isPlaying();
  }

  getAudioReadyState(): number {
    return this.playerService.getAudioReadyState();
  }

  getCurrentTime(): number {
    return this.playerService.getCurrentTime();
  }

  getDuration(): number {
    return this.playerService.getDuration();
  }
}
