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

}