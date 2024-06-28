import { Component, inject } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadSongService } from './upload-song.service';
import { Song } from '../../models/song';
import { AlertComponent } from '../../components/alert/alert.component';
import { AlertType } from '../../models/alert-type';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-song',
  standalone: true,
  imports: [RouterOutlet, CommonModule, BasePageComponent, ReactiveFormsModule, AlertComponent],
  templateUrl: './upload-song.component.html',
  styleUrl: './upload-song.component.scss'
})
export class UploadSongComponent {
  currentFile: File | null = null;
  alertType: AlertType | null = null;
  showAlert: boolean = false;

  private uploadSongService = inject(UploadSongService);

  songForm = new FormGroup({
    name: new FormControl('', Validators.required),
    artist: new FormControl(''),
    album: new FormControl(''),
    duration: new FormControl(''),
  });

  onSubmit(): void {
    let song: Song = {
      name: this.songForm.value.name || '',
      artist: this.songForm.value.artist || '',
      album: this.songForm.value.album || '',
      duration: this.songForm.value.duration || '',
      song: this.currentFile || null
    }

    this.uploadSongService.uploadSong(song).subscribe({
      next: (data) => {
        this.songForm.reset();
        this.currentFile = null;
        this.alertType = AlertType.SUCCESS;
      },
      error: (error: HttpErrorResponse) => {
        this.alertType = AlertType.DANGER;
      }
    });

    this.alertType = null;
  }

  selectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.currentFile = files[0];
  }
}
