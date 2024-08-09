import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../components/base-page/base-page.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
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
  private formBuilder = inject(FormBuilder);

  private song!: Song;
  private subscription!: Subscription;

  submitted: boolean = false;

  songForm = new FormGroup({
    name: new FormControl(''),
    artist: new FormControl(''),
    album: new FormControl(''),
    duration: new FormControl(''),
  });

  songId!: string | null;

  ngOnInit(): void {
    this.songId = this.route.snapshot.paramMap.get('id');
    
    this.songForm = this.formBuilder.group({
      name: ['', Validators.required],
      artist: ['', Validators.required],
      album: ['', Validators.required],
      duration: [''],
    });

    if(this.songId != null) {
      this.subscription = this.songRepositoryService.getSong(this.songId).pipe(
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
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.songForm.invalid) {
      return;
    }

    let song: Song = {
      name: this.songForm.value.name || '',
      artist: this.songForm.value.artist || '',
      album: this.songForm.value.album || '',
      duration: this.songForm.value.duration || '',
      song: this.currentFile || null,
      songUrl: ''
    }

    if(this.songId != null) {
      song.id = this.song.id;
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
    this.submitted = false;
  }

  selectFile($event: Event) {
    const target = $event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.currentFile = files[0];
  }
}
