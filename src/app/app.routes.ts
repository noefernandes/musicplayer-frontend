import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { PlayerComponent } from './components/player/player.component';

export const routes: Routes = [
    {
        path: 'header',
        component: HeaderComponent
    },
    {
        path: 'player',
        component: PlayerComponent
    }
];
