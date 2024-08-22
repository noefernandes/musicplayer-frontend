import { Routes } from '@angular/router';
import { UploadSongComponent } from './pages/upload-song/upload-song.component';
import { SongRepositoryComponent } from './pages/song-repository/song-repository.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';

export const routes: Routes = [
    {
        path: 'upload-song',
        component: UploadSongComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'playlist',
        component: PlaylistComponent
    },
    {
        path: '',
        component: SongRepositoryComponent
    }
];
