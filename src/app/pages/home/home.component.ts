import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BasePageComponent } from "../../components/base-page/base-page.component";
import { Router, RouterLink } from '@angular/router';
import { ModalComponent } from "../../components/modal/modal.component";
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaylistService } from '../../services/playlist-service.service';
import { Playlist } from '../../models/playlist';
import { AlertType } from '../../models/alert-type';
import { AlertComponent } from '../../components/alert/alert.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [BasePageComponent, RouterLink, ModalComponent, CommonModule, ReactiveFormsModule, 
		AlertComponent, NgxSkeletonLoaderModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
  
	playlistImageUrl: string = 'assets/playlist-default-image.jpg';
	showModal: boolean = false;

	@ViewChild('fileInput') fileInput!: ElementRef;
	currentFile: File | null = null;

	playlistForm = new FormGroup({
		name: new FormControl('')
	});

	submitted: boolean = false;

	private playlistService = inject(PlaylistService);
	private formBuilder = inject(FormBuilder);
	private router = inject(Router);

	playlists!: Playlist[];
	
  	alertType: AlertType | null = null;
  	showAlert: boolean = false;

	ngOnInit(): void {
		this.playlistForm = this.formBuilder.group({
			name: ['', Validators.required]
		});

		this.convertToFile('assets/playlist-default-image.jpg', 'playlist-default-image.jpg').then((file) => {
			this.currentFile = file;
		})

		this.playlistService.getPlaylists().subscribe((playlists) => {
			this.playlists = playlists;
		});
	}

	async convertToFile(url: string, fileName: string): Promise<File> {
		const response = await fetch(url);
		const blob = await response.blob();
		return new File([blob], fileName, { type: blob.type });
	}

	toggleModal() {
		this.showModal = !this.showModal;
	}

	triggerFileInput(): void {
		this.fileInput.nativeElement.click();
	}

	onFileSelected($event: Event) {
		const target = $event.target as HTMLInputElement;
		const files = target.files as FileList;
		this.currentFile = files[0];
	}

	submit($event: Event) {
		$event.preventDefault();
		this.submitted = true;

		if(this.playlistForm.invalid) {
			return;
		}

		let playlist: Playlist = {
			name: this.playlistForm.value.name ?? '',
			image: this.currentFile,
			songs: []
		}

		this.playlistService.savePlaylist(playlist).subscribe({
			next: () => {
				this.playlistForm.reset();
        		this.currentFile = null;
        		this.alertType = AlertType.SUCCESS;
			},
			error: () => {
				this.alertType = AlertType.DANGER;
			}
		})

    	this.submitted = false;
		this.alertType = null;
		this.showModal = false;
	}

	navigateToPlaylist(playlist: Playlist) {
		this.router.navigate(['playlist', {id: playlist.id}]);
	}
}
