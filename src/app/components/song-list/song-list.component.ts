import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { SongListService } from './song-list-service';
import { Song } from './song.interface';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {
  albumImagePath: string;
  songInfo: string[] = ['Música', 'Artista', 'Álbum', 'Duração'];
  songs: Song[] = [];

  keepOrder(): number {
    return 0;
  }

  selectedRow: number | null = null;

  selectRow(index: number): void {
    this.selectedRow = index;
  }

  constructor() {
    this.albumImagePath = 'assets/hybrid-theory.jpeg';
    this.songs = inject(SongListService).getSongList();
  }

  ngOnInit() { }
}
