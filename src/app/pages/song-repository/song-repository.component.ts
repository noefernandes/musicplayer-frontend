import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SongListComponent } from '../../components/song-list/song-list.component';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { SongRepositoryService } from '../../services/song-repository.service';
import { Subscription } from 'rxjs';
import { Song } from '../../models/song';
import { PlayerService } from '../../services/player-service.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ModalComponent } from '../../components/modal/modal.component';
import { AlertComponent } from '../../components/alert/alert.component';
import { AlertType } from '../../models/alert-type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-song-repository',
	standalone: true,
	imports: [SongListComponent, BasePageComponent, ReactiveFormsModule, CommonModule, FormsModule, ModalComponent, AlertComponent],
	templateUrl: './song-repository.component.html',
	styleUrl: './song-repository.component.scss'
})
export class SongRepositoryComponent {
	subscription: Subscription = new Subscription();
	songs: Song[] = [];
	filteredSongs: Song[] = [];
	private songRepositoryService = inject(SongRepositoryService);
	playerService = inject(PlayerService);

	filter = {
		name: '',
    	artist: '',
    	album: ''
  	};
	showFilter: boolean = false;
	filterIcon!: string;

	
	showModal: boolean = false;
	showEditModal: boolean = false;
	currentFile: File | null = null;
  	alertType: AlertType | null = null;
  	showAlert: boolean = false;
	loading: boolean = false;

	@ViewChild('fileInput')
	fileInput!: ElementRef;

	@ViewChild('fileInputOnUpdate')
	fileInputOnUpdate!: ElementRef;

	private formBuilder = inject(FormBuilder);
  	private song!: Song;
	submitted: boolean = false;
	route = inject(ActivatedRoute);

	songForm = new FormGroup({
		name: new FormControl(''),
		artist: new FormControl(''),
		album: new FormControl(''),
		duration: new FormControl(''),
	});

  	songId!: string | null;

	songOnUpdate: Song | undefined;

	songDuration!: number;

	constructor() {
    	this.filterIcon = 'assets/filter-not-filled.svg';
    	this.showFilter = false;
	}

	ngOnInit(): void {
		this.subscription = this.songRepositoryService.getSongList().subscribe((data: Song[]) => {
			this.songs = data;
			this.filteredSongs = [...this.songs];	
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	applyFilters(): void {
		this.filteredSongs = this.songs.filter(song =>
		(this.filter.name ? song.name.toLowerCase().includes(this.filter.name.toLowerCase()) : true) &&
		(this.filter.artist ? song.artist.toLowerCase().includes(this.filter.artist.toLowerCase()) : true) &&
		(this.filter.album ? song.album.toLowerCase().includes(this.filter.album.toLowerCase()) : true)     
		);
	}

	toggleFilter(): void {
		this.showFilter = !this.showFilter;
		this.filterIcon = this.showFilter ? 'assets/filter-filled.svg' : 'assets/filter-not-filled.svg';
	}

	toggleModal(): void {
		this.showModal = !this.showModal;
    
		this.songForm = this.formBuilder.group({
			name: ['', Validators.required],
			artist: ['', Validators.required],
			album: ['', Validators.required],
			duration: [''],
		});
	}

	openEditModal(song: Song): void {
		this.showEditModal = !this.showEditModal;
		this.songOnUpdate = song;
		this.songForm = this.formBuilder.group({
			name: [song.name, Validators.required],
			artist: [song.artist, Validators.required],
			album: [song.album, Validators.required],
			duration: [song.duration],
		});
	}

	hideEditModal(): void {
		this.showEditModal = false;
		this.songOnUpdate = undefined;
		this.songForm.reset();
		this.currentFile = null;
		this.fileInputOnUpdate.nativeElement.value = '';
	}

	setInputFile(data: Blob): DataTransfer {
		this.currentFile = new File([data], this.song.filename || 'song.mp3', { type: 'audio/mp3' });
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(this.currentFile);
		return dataTransfer;
  	}

	setInputFileOnUpdate(data: Blob): void {
		const dataTransfer = this.setInputFile(data);
		this.fileInputOnUpdate.nativeElement.files = dataTransfer.files;
	}

	setInputFileOnSave(data: Blob): void {
		const dataTransfer = this.setInputFile(data);
		this.fileInput.nativeElement.files = dataTransfer.files;
	}

	onSubmit(): void {
		this.submitted = true;
		this.loading = true;

		if(this.songForm.invalid) {
			this.loading = false;
			return;
		}

		let song: Song = {
			name: this.songForm.value.name || '',
			artist: this.songForm.value.artist || '',
			album: this.songForm.value.album || '',
			duration: this.songForm.value.duration || '0:00',
			song: this.currentFile || null,
			songUrl: ''
		}

		if(this.songOnUpdate != null) {
			song.id = this.song.id;
		}

		const repository = this.songRepositoryService;

		const songObservable =  this.songOnUpdate
			? repository.updateSong(song)
			: repository.saveSong(song);

		this.subscription = songObservable.subscribe({
			next: (data) => {
				this.addOrReplaceSongOnList(data);
				this.songForm.reset();
				this.currentFile = null;
				this.alertType = AlertType.SUCCESS;
				this.loading = false;
			},
			error: (error: HttpErrorResponse) => {
				this.alertType = AlertType.DANGER;
				this.loading = false;
			}
		});

		this.currentFile = null;
		this.fileInput.nativeElement.value = '';
		this.fileInputOnUpdate.nativeElement.value = '';
		this.alertType = null;
		this.submitted = false;
	}

	selectFile($event: Event) {
		const target = $event.target as HTMLInputElement;
		const files = target.files as FileList;
		this.currentFile = files[0];

		const value = this.getAudioDuration(this.currentFile).then(duration => {
			const formatDuration = this.formatDuration(duration);
			this.songForm.patchValue({ duration: formatDuration });
		});
	}

	formatDuration(duration: number): string {
		const minutes = Math.floor(duration / 60);
		const seconds = Math.floor(duration % 60);
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
	}

	getAudioDuration(file: File): Promise<number> {
		return new Promise((resolve, reject) => {
			const audio = new Audio();
			audio.src = URL.createObjectURL(file);
			audio.addEventListener('loadedmetadata', () => {
				resolve(audio.duration);
			});
		});
	}

	onDelete(song: Song): void {
		this.subscription = this.songRepositoryService.deleteSong(song).subscribe(() => {
			const index = this.songs.findIndex(s => s.id === song.id);
			if (index !== -1) {
				this.songs.splice(index, 1);
				this.filteredSongs = [...this.songs];
			}
    	})
	}

	onEdit(song: Song): void {		
		this.openEditModal(song);
		this.songForm.patchValue(song);
		this.song = song;
		this.subscription = this.songRepositoryService.getSongFromUrl(song).subscribe((data: Blob) => {
			this.setInputFileOnUpdate(data);
		});
	}

	addOrReplaceSongOnList(song: Song): void {
		const index = this.songs.findIndex(s => s.id === song.id);
		if (index !== -1) {
			this.songs[index] = song;
			this.filteredSongs = [...this.songs];
		} else {
			this.songs.push(song);
			this.filteredSongs = [...this.songs];
		}
	}
}
