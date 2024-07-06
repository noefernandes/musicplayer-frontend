import { Injectable, inject } from '@angular/core';
import { Song } from '../../models/song';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongRepositoryService {

  private apiUrl = 'http://localhost:8080/api/songs';
  private http = inject(HttpClient);

  constructor() { }

  getSongList(): Observable<Song[]> {
    return this.http.get<Song[]>(this.apiUrl);
  }

  deleteSong(song: Song): void {
    console.log("Apaga");
    this.http.delete<Song>(`${this.apiUrl}/${song.id}`);
  }
}
