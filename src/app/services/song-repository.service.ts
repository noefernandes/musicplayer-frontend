import { Injectable, inject } from '@angular/core';
import { Song } from '../models/song';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlayerService } from './player-service.service';

@Injectable({
  providedIn: 'root'
})
export class SongRepositoryService {

	private apiUrl = 'http://localhost:8080/api/v1/management/song';
	private http = inject(HttpClient);

  	getSongList(): Observable<Song[]> {
		return this.http.get<Song[]>(this.apiUrl);
  	}

  	deleteSong(song: Song): Observable<Song> {
    	return this.http.delete<Song>(`${this.apiUrl}/${song.id}`);
  	}

  	uploadSong(song: Song): Observable<Song> {
		const formData = new FormData();
		formData.append('name', song.name);
		formData.append('artist', song.artist);
		formData.append('album', song.album);
		
		if(song.song){
		formData.append('song', song.song);
		}

		if(!song.id){
		return this.http.post<Song>(this.apiUrl, formData);
		}

		formData.append('id', song.id);

		return this.http.put<Song>(`${this.apiUrl}/${song.id}`, formData);
  	}

  	getSong(id: string): Observable<Song> {
    	return this.http.get<Song>(`${this.apiUrl}/${id}`);
  	}

  	getSongFromUrl(song: Song): Observable<Blob> {
    	return this.http.get(song.songUrl, { 
			responseType: 'blob',
			headers: {
				skipAuth: 'true'
			} 
    	});
  	}
}
