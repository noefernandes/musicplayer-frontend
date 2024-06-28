import { Routes } from '@angular/router';
import { UploadSongComponent } from './pages/song/upload-song/upload-song.component';
import { SongRepositoryComponent } from './pages/song/song-repository/song-repository.component';

export const routes: Routes = [
    {
        path: 'upload-song',
        component: UploadSongComponent
    },
    {
        path: '',
        component: SongRepositoryComponent
    }
];
