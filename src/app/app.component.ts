import { Component } from '@angular/core';
import { UploadSongComponent } from './pages/upload-song/upload-song.component';
import { SongRepositoryComponent } from './pages/song-repository/song-repository.component';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'musicplayer-frontend';
}
