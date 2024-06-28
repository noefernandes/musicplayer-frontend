import { Routes } from '@angular/router';
import { UploadSongComponent } from './pages/upload-song/upload-song.component';
import { SongRepositoryComponent } from './pages/song-repository/song-repository.component';

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
