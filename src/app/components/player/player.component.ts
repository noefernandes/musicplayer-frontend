import { Component } from '@angular/core';

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

  constructor() {
    this.artistPath = 'assets/hybrid-theory.jpeg';
    this.leftIconPath = 'assets/skip-back-icon.svg';
    this.playIconPath = 'assets/play-button-svgrepo-com.svg';
    this.pauseIconPath = 'assets/pauseIcon.svg';
    this.rightIconPath = 'assets/skip-forward-icon.svg';
    this.repeatIconPath = 'assets/repeat-icon.svg';
    this.randomIconPath = 'assets/randomIcon.svg';
    this.volIconPath = 'assets/volume-icon.svg';
  }
}
