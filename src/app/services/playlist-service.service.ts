import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Playlist } from "../models/playlist";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
	
	private http = inject(HttpClient);

    savePlaylist(playlist: Playlist) : Observable<Playlist> {
        const formData = new FormData();
		formData.append('name', playlist.name);
		
		if(playlist.image){
		    formData.append('image', playlist.image);
		}
        
        return this.http.post<Playlist>('http://localhost:8080/api/v1/playlist', formData);
    }

	getPlaylists() : Observable<Playlist[]> {
		return this.http.get<Playlist[]>('http://localhost:8080/api/v1/playlist');
	}

	getPlaylist(id: string) : Observable<Playlist> {
		return this.http.get<Playlist>(`http://localhost:8080/api/v1/playlist/${id}`);
	}

	addSongToPlaylist(playlistId: string, songsIds: string[]) : Observable<Object> {
		const request = {
			id: playlistId,
			songsIds: songsIds
		}
		return this.http.post('http://localhost:8080/api/v1/playlist/add-songs', request);
	}

	removeSongFromPlaylist(playlistId: string, songId: string) {
		return this.http.delete(`http://localhost:8080/api/v1/playlist/${playlistId}/song/${songId}`);
	}

}