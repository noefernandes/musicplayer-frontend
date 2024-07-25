import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Song } from '../../models/song';
import { AlertComponent } from '../../components/alert/alert.component';
import { AlertType } from '../../models/alert-type';
import { HttpErrorResponse } from '@angular/common/http';
import { concatMap, Subscription } from 'rxjs';
import { SongRepositoryService } from '../../services/song-repository.service';

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

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  private songRepositoryService = inject(SongRepositoryService);

  private route = inject(ActivatedRoute);

  private song!: Song;

  private subscription!: Subscription;

  songForm = new FormGroup({
    name: new FormControl('', Validators.required),
    artist: new FormControl(''),
    album: new FormControl(''),
    duration: new FormControl(''),
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id != null) {
      this.subscription = this.songRepositoryService.getSong(id).pipe(
        concatMap((data: Song) => {
          this.songForm.patchValue(data);
          this.song = data;
          return this.songRepositoryService.getSongFromUrl(data);
        })).subscribe((data: Blob) => {
          this.setInputFile(data);
      })
    }
  }

  setInputFile(data: Blob | null): void {
    if(data != null) {
      this.currentFile = new File([data], this.song.filename || 'song.mp3', { type: 'audio/mp3' });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(this.currentFile);
      this.fileInput.nativeElement.files = dataTransfer.files;
      return;
    }
    this.currentFile = null;
    this.fileInput.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    let song: Song = {
      name: this.songForm.value.name || '',
      artist: this.songForm.value.artist || '',
      album: this.songForm.value.album || '',
      duration: this.songForm.value.duration || '',
      song: this.currentFile || null,
      songUrl: ''
    }

    this.songRepositoryService.uploadSong(song).subscribe({
      next: (data) => {
        this.songForm.reset();
        this.currentFile = null;
        this.alertType = AlertType.SUCCESS;
      },
      error: (error: HttpErrorResponse) => {
        this.alertType = AlertType.DANGER;
      }
    });

    this.setInputFile(null);
    this.alertType = null;
  }

  selectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.currentFile = files[0];
  }
}
