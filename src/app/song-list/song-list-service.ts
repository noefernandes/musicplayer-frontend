import { Injectable } from '@angular/core';
import { Song } from './song.interface';

@Injectable({
  providedIn: 'root'
})
export class SongListService {
  songs: Song[] = [
    {
      name: 'Papercut',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:05'
    }, {
      name: 'One Step Closer',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '2:35'
    },
    {
      name: 'With You',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:23'
    },
    {
      name: 'Crawling',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:29'
    },
    {
      name: 'Runaway',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:03'
    },
    {
      name: 'In the End',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:36'
    },
    {
      name: 'A Place for My Head',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:04'
    },
    {
      name: 'Forgotten',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:14'
    },
    {
      name: 'A Place for My Head',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:04'
    },
    {
      name: 'Forgotten',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:14'
    },
    {
      name: 'A Place for My Head',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:04'
    },
    {
      name: 'Forgotten',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:14'
    },
    {
      name: 'A Place for My Head',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:04'
    },
    {
      name: 'Forgotten',
      artist: 'Linkin Park',
      album: 'Hybrid Theory',
      duration: '3:14'
    }
  ];

  constructor() { }

  getSongList(): Song[] {
    return this.songs;
  }
}
