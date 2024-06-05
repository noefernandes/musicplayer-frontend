import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from './components/player/player.component';
import { BasePageComponent } from './components/base-page/base-page.component';
import { SongListComponent } from './components/song-list/song-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule,
    HeaderComponent, PlayerComponent, SongListComponent, BasePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'musicplayer-frontend';

  filterIcon: string;
  showFilter: boolean;

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
    this.filterIcon = this.showFilter ? 'assets/filter-filled.svg' : 'assets/filter-not-filled.svg';
  }

  constructor() {
    this.filterIcon = 'assets/filter-not-filled.svg';
    this.showFilter = false;
  }
}
