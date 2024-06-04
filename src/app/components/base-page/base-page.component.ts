import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { PlayerComponent } from '../player/player.component';

@Component({
  selector: 'app-base-page',
  standalone: true,
  imports: [HeaderComponent, PlayerComponent],
  templateUrl: './base-page.component.html',
  styleUrl: './base-page.component.scss'
})
export class BasePageComponent {

}
