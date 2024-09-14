import { Component, inject} from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { ModalComponent } from "../../components/modal/modal.component";
import { PlaylistService } from '../../services/playlist-service.service';
import { SongRepositoryService } from '../../services/song-repository.service';
import { Song } from '../../models/song';
import { Subscription } from 'rxjs';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from '../../models/playlist';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PlayerService } from '../../services/player-service.service';

@Component({
	selector: 'app-playlist',
	standalone: true,
	imports: [BasePageComponent, SongListComponent, ModalComponent, NgFor, NgIf, NgClass, FormsModule, NgxSkeletonLoaderModule],
	templateUrl: './playlist.component.html',
	styleUrl: './playlist.component.scss'
})
export class PlaylistComponent {

	showModal: boolean = false;
	private playlistService = inject(PlaylistService);
	private songRepositoryService = inject(SongRepositoryService);
	subscription!: Subscription;
	route = inject(ActivatedRoute);
	playerService = inject(PlayerService);
	loadingPlaylist: boolean = false;
	loadingSongList: boolean = false;
	loadingAddToPlaylist: boolean = false;

	songList: Song[] = [];
	playlist: Playlist = {
		id: '',
		name: '',
		songs: [],
		image: null
	};

	ngOnInit() {
		this.loadingPlaylist = true;
		const playlistId = this.route.snapshot.paramMap.get('id')!;
		this.subscription = this.playlistService.getPlaylist(playlistId).subscribe((data: Playlist) => {
			this.playlist = data;
			this.loadingPlaylist = false;
		})
	}

	toggleModal() {
		this.loadingSongList = true;
		this.fillSongList();

		this.showModal = !this.showModal;
	}

	toggleSelection(song: Song) {
		song.selected = !song.selected;
	}

	fillSongList() {
		this.subscription = this.songRepositoryService.getSongList().subscribe((data: Song[]) => {
			this.songList = data.filter(song => !this.playlist.songs.find(s => s.id === song.id));
			this.loadingSongList = false;
		})
	}

	addSongsToPlaylist() {
		this.loadingAddToPlaylist = true;
		const songsIds : string[] = this.songList.filter(song => song.selected).map(song => song.id!)
		if (songsIds) {
			this.subscription = this.playlistService.addSongToPlaylist(this.playlist.id!, songsIds).subscribe({
				next: () => {
					this.playlist.songs = this.playlist.songs.concat(this.songList.filter(song => song.selected));
				},
				complete: () => {
					this.toggleModal();
					this.songList = this.songList.filter(song => !song.selected);
					this.loadingAddToPlaylist = false;
				}
			})
		}
	}

	onRemoval(song: Song) : void {
		this.subscription = this.playlistService.removeSongFromPlaylist(this.playlist.id!, song.id!).subscribe({
			next: () => {
				const index = this.playlist.songs.findIndex(s => s.id === song.id);
				if (index !== -1) {
					this.playlist.songs.splice(index, 1);
				}
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}
