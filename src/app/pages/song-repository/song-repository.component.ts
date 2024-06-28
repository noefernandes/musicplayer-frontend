import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { PlayerComponent } from '../../components/player/player.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { BasePageComponent } from '../../components/base-page/base-page.component';

@Component({
  selector: 'app-song-repository',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive,
    HeaderComponent, PlayerComponent, SongListComponent, BasePageComponent],
  templateUrl: './song-repository.component.html',
  styleUrl: './song-repository.component.scss'
})
export class SongRepositoryComponent {
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
