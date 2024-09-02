import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { Song } from '../../models/song';
import { PlayerService } from '../../services/player-service.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {

	@Input()
  	songs: Song[] = [];

	@Input()
	enableRemoval: boolean = true;

	@Input()
	enableEdit: boolean = true;

	@Input()
	enableDelete: boolean = true;

	@Output()
	onRemovalEvent: EventEmitter<Song> = new EventEmitter<Song>();

	@Output()
	onEditEvent: EventEmitter<Song> = new EventEmitter<Song>();

	@Output()
	onDeleteEvent: EventEmitter<Song> = new EventEmitter<Song>();

  	selectedRow: number | null = null;

  	albumImagePath: string;

  	playerService = inject(PlayerService);

  	private subscription!: Subscription;

  	filterIcon: string;

  	showFilter: boolean;

	filter = {
		name: '',
    	artist: '',
    	album: ''
  	};

	playlistId!: string;

	dropdownIndex: number | null = null;

  	constructor() {
    	this.albumImagePath = 'assets/hybrid-theory.jpeg';
    	this.filterIcon = 'assets/filter-not-filled.svg';
    	this.showFilter = false;
	}

	ngOnChanges(): void {
		this.playerService.setSongList(this.songs);
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

	onEdit($event: Event, song: Song) : void {
		$event.stopPropagation();
		this.onEditEvent.emit(song);
	}

	onDelete($event: Event, song: Song) : void {
		$event.stopPropagation();
		this.onDeleteEvent.emit(song);
		this.playerService.removeSongById(song.id!);
	}

	onRemoval($event: Event, song: Song) : void {
		$event.stopPropagation();
		this.onRemovalEvent.emit(song);
		this.playerService.removeSongById(song.id!);
	}

	toggleDropdown($event: Event, index: number): void {
		$event.stopPropagation();
		this.dropdownIndex = index === this.dropdownIndex ? null : index;
	}

	@HostListener('document:click', ['$event'])
	onClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const clickedInside = target.closest('relative');
		if(!clickedInside) {
			this.dropdownIndex = null;
		}
	}
	
}
