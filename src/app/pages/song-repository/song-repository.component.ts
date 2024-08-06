import { Component, inject } from '@angular/core';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SongRepositoryService } from '../../services/song-repository.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-song-repository',
  standalone: true,
  imports: [SongListComponent, BasePageComponent],
  templateUrl: './song-repository.component.html',
  styleUrl: './song-repository.component.scss'
})
export class SongRepositoryComponent {
}
