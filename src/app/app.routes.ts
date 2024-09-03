import { Routes } from '@angular/router';
import { SongRepositoryComponent } from './pages/song-repository/song-repository.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { authGuard } from './guards/auth.guard';
import { Role } from './models/role';

export const routes: Routes = [
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
        path: 'playlist/:id',
        component: PlaylistComponent
    },
    {
        path: '',
        component: SongRepositoryComponent,
        canActivate: [authGuard],
        data: { 
            expectedRoles: [Role.ADMIN] 
        }
    }
];
