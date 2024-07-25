import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Song } from '../../models/song';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player-service.service';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, DropdownMenuComponent],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {

  @Input()
  songs: Song[] = [];

  @Input()
  delete!: (song: Song) => void;

  @Input()
  newRouteName?: String;

  selectedRow: number | null = null;

  albumImagePath: string;

  private router: Router = inject(Router);

  playerService = inject(PlayerService);

  constructor() {
    this.albumImagePath = 'assets/hybrid-theory.jpeg';
  }

  play(index: number, $event: Event): void {
    this.playerService.play(index);
    this.selectedRow = index;
    $event.stopPropagation();
  }

  onDelete(song: Song) {
    this.delete(song);
  }
  onEdit(song: Song) {
    if(this.newRouteName) {
      this.router.navigate([this.newRouteName, { id: song.id }]);
    }
  }
}
