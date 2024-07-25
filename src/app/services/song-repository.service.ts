import { Injectable, inject } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerService } from './player-service.service';

@Injectable({
  providedIn: 'root'
})
export class SongRepositoryService {

  private playerService = inject(PlayerService);

  private apiUrl = 'http://localhost:8080/api';
  private http = inject(HttpClient);

  constructor() { }

  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.apiUrl}/songs`);
  }

  deleteSong(song: Song): Observable<Song> {
    return this.http.delete<Song>(`${this.apiUrl}/song/${song.id}`);
  }

  uploadSong(song: Song): Observable<Song> {
    const formData = new FormData();
    formData.append('name', song.name);
    formData.append('artist', song.artist);
    formData.append('album', song.album);
    if(song.song){
      formData.append('song', song.song);
    }

    return this.http.post<Song>(`${this.apiUrl}/song`, formData);
  }

  getSong(id: string): Observable<Song> {
    return this.http.get<Song>(`${this.apiUrl}/song/${id}`);
  }

  getSongFromUrl(song: Song): Observable<Blob> {
    //console.log(song);
    return this.http.get(`${song.songUrl}`, { responseType: 'blob' });
  }
}
