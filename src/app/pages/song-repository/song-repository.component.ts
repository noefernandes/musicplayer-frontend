import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { PlayerComponent } from '../../components/player/player.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { Song } from '../../models/song';
import { SongRepositoryService } from '../../services/song-repository.service';
import { PlayerService } from '../../services/player-service.service';
import { Subscription } from 'rxjs';

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

  private playerService = inject(PlayerService);

  private subscription!: Subscription;

  constructor() {
    this.filterIcon = 'assets/filter-not-filled.svg';
    this.showFilter = false;
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
    this.filterIcon = this.showFilter ? 'assets/filter-filled.svg' : 'assets/filter-not-filled.svg';
  }

  ngOnInit(): void {
    this.subscription = this.songRepositoryService.getSongList().subscribe((data: Song[]) => {
      this.songList = data;
      this.playerService.setSongList(this.songList);
    })
  }

  deleteSong = (song: Song): void => {
    this.subscription = this.songRepositoryService.deleteSong(song).subscribe(() => {
      this.songList = this.songList.filter(s => s.id != song.id);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
