import { Component, inject } from '@angular/core';
import { BasePageComponent } from '../../../components/base-page/base-page.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { UploadSongService } from './upload-song.service';
import { Song } from '../../../models/song';

@Component({
  selector: 'app-upload-song',
  standalone: true,
  imports: [RouterOutlet, CommonModule, BasePageComponent, ReactiveFormsModule],
  templateUrl: './upload-song.component.html',
  styleUrl: './upload-song.component.scss'
})
export class UploadSongComponent {

  currentFile!: File;

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
      song: this.currentFile
    }

    this.uploadSongService.uploadSong(song).subscribe();
  }

  selectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.currentFile = files[0];
  }
}
