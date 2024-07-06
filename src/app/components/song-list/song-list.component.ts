import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Song } from '../../models/song';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, DropdownMenuComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {
  albumImagePath: string;
  songInfo: string[] = ['Música', 'Artista', 'Álbum', 'Duração'];

  @Input()
  songs: Song[] = [];

  @Input()
  delete!: (song: Song) => void;

  selectedRow: number | null = null;

  selectRow(index: number, $event: Event): void {
    this.selectedRow = index;
    $event.stopPropagation();
  }

  onDelete(song: Song) {
    this.delete(song);
    console.log(song);
    console.log("chama");
  }
  onEdit(arg0: any) {
    throw new Error('Method not implemented.');
  }

  constructor() {
    this.albumImagePath = 'assets/hybrid-theory.jpeg';
  }
}
