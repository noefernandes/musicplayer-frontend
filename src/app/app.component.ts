import { Component } from '@angular/core';
import { UploadSongComponent } from './pages/upload-song/upload-song.component';
import { SongRepositoryComponent } from './pages/song-repository/song-repository.component';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, UploadSongComponent, SongRepositoryComponent, SongRepositoryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'musicplayer-frontend';
}
