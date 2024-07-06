import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { PlayerComponent } from '../../components/player/player.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { Song } from '../../models/song';
import { SongRepositoryService } from './song-repository.service';

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
  songList: Song[] = [];

  private songRepositoryService = inject(SongRepositoryService);

  constructor() {
    this.filterIcon = 'assets/filter-not-filled.svg';
    this.showFilter = false;
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
    this.filterIcon = this.showFilter ? 'assets/filter-filled.svg' : 'assets/filter-not-filled.svg';
  }

  ngOnInit(): void {
    this.songRepositoryService.getSongList().subscribe((data: Song[]) => {
      this.songList = data;
    })
  }

  deleteSong = (song: Song): void => {
    console.log("É executado");
    this.songRepositoryService.deleteSong(song);
  }
}
