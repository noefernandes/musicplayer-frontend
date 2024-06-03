import { Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { PlayerComponent } from './player/player.component';

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
