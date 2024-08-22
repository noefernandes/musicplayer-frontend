import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PlayerComponent } from '../player/player.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [HeaderComponent, PlayerComponent, NgIf],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss'
})
export class BasePageComponent {
  @Input() showPlayer: boolean = false;

  togglePlayer() {
    this.showPlayer = !this.showPlayer;
  }
}
