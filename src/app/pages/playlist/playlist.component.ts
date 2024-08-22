import { Component } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SongListComponent } from '../../components/song-list/song-list.component';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [BasePageComponent, SongListComponent],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

}
