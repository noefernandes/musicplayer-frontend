import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class UploadSongService {

  private apiUrl = 'http://localhost:8080/api/song';

  private http = inject(HttpClient);

  uploadSong(song: Song): Observable<Song> {
    const formData = new FormData();
    formData.append('name', song.name);
    formData.append('artist', song.artist);
    formData.append('album', song.album);
    if(song.song){
      formData.append('song', song.song);
    }

    return this.http.post<Song>(this.apiUrl, formData);
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/${id}`);
  }

  getSongFromUrl(song: Song): Observable<Blob> {
    console.log(song);
    return this.http.get(`${song.songUrl}`, { responseType: 'blob' });
  }
}
