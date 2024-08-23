import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input } from '@angular/core';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { Song } from '../../models/song';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player-service.service';
import { SongRepositoryService } from '../../services/song-repository.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PlaylistService } from '../../services/playlist-service.service';
import { Playlist } from '../../models/playlist';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, DropdownMenuComponent, RouterLink, ClickOutsideDirective, FormsModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {

  	songs: Song[] = [];

  	@Input()
  	newRouteName?: String;

  	@Input()
  	adminMode: boolean = false;

  	selectedRow: number | null = null;

  	albumImagePath: string;

  	private router: Router = inject(Router);

  	playerService = inject(PlayerService);

  	private songRepositoryService = inject(SongRepositoryService);
	private playlistService = inject(PlaylistService);
	private route = inject(ActivatedRoute);

  	private subscription!: Subscription;

  	filterIcon: string;

  	filteredSongs!: Song[];

  	showFilter: boolean;

	filter = {
		name: '',
    	artist: '',
    	album: ''
  	};

	playlistId!: string;

  	constructor() {
    	this.albumImagePath = 'assets/hybrid-theory.jpeg';
    	this.filterIcon = 'assets/filter-not-filled.svg';
    	this.showFilter = false;
  	}

  	ngOnInit(): void {
		if (this.adminMode) {
			this.subscription = this.songRepositoryService.getSongList().subscribe((data: Song[]) => {
				this.songs = data;
				this.filteredSongs = this.songs;
				this.playerService.setSongList(this.songs);
			});

			return;
		}

		this.playlistId = this.route.snapshot.paramMap.get('id')!;

		if (!this.playlistId) {
			return;
		}

		this.subscription = this.playlistService.getPlaylist(this.playlistId).subscribe((data: Playlist) => {
			this.songs = data.songs;
			this.filteredSongs = this.songs;
			this.playerService.setSongList(this.songs);
		});
  	}

  	deleteSong = (song: Song): void => {
    	this.subscription = this.songRepositoryService.deleteSong(song).subscribe(() => {
			const index = this.songs.findIndex(s => s.id === song.id);
			if (index !== -1) {
				this.songs.splice(index, 1);
			}
    	})
  	}

	removeFromPlaylist = (song: Song): void => {
		this.playlistService.removeSongFromPlaylist(this.playlistId, song.id!).subscribe(() => {
			const index = this.songs.findIndex(s => s.id === song.id);
			if (index !== -1) {
				this.songs.splice(index, 1);
			}

			console.log(this.songs);
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	toggleFilter(): void {
		this.showFilter = !this.showFilter;
		this.filterIcon = this.showFilter ? 'assets/filter-filled.svg' : 'assets/filter-not-filled.svg';
	}

	play(index: number, $event: Event): void {
		this.playerService.play(index);
		this.selectedRow = index;
		$event.stopPropagation();
	}

	onEdit(song: Song) {
		if(this.newRouteName) {
			this.router.navigate([this.newRouteName, { id: song.id }]);
		}
	}

	applyFilters(): void {
		this.filteredSongs = this.songs.filter(song =>
		(this.filter.name ? song.name.toLowerCase().includes(this.filter.name.toLowerCase()) : true) &&
		(this.filter.artist ? song.artist.toLowerCase().includes(this.filter.artist.toLowerCase()) : true) &&
		(this.filter.album ? song.album.toLowerCase().includes(this.filter.album.toLowerCase()) : true)     
		);
	}
}
