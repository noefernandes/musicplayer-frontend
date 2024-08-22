import { Component, inject, Input } from '@angular/core';
import { PlayerService } from '../../services/player-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
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
  volMaxIconPath: string;

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
    this.volMaxIconPath = 'assets/volume-max.svg';
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

  random(): void {
    this.playerService.toggleRandom();
  }

  repeat(): void {
    this.playerService.repeat();
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

  isRandom(): boolean {
    return this.playerService.isRandom();
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

  getInitialVolume(): number {
    return this.playerService.getInitialVolume();
  }
}
