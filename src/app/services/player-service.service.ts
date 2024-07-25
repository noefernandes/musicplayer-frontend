import { Injectable } from "@angular/core";
import moment from "moment";
import { Song } from "../models/song";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  songList: Song[] = [];
  currentSong!: Song;
  trackPointer: number = 0;
  
  audio = new Audio();
  musicLength = '0:00';
  duration = 1;
  currentTime = 0;
  formattedCurrentTime = '0:00';

  constructor() {
    this.initializeAudioEvents();
  }

  ngOnInit(): void {
    
  }

  getSongList(): Song[] {
    return this.songList;
  }

  setSongList(songList: Song[]): void {
    this.songList = songList;
  }

  addSong(song: Song): void {
    this.songList.push(song);
  }

  deleteSong(index: number): void {
    this.songList.splice(index, 1);
  }

  initializeAudioEvents(): void {
    this.audio.ondurationchange = () => {
      const totalSeconds = Math.floor(this.audio.duration),
            duration = moment.duration(totalSeconds, 'seconds');
      const musicLength = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
      this.musicLength = musicLength;
      this.duration = totalSeconds;
    }

    this.audio.ontimeupdate = () => {
      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      const currentTime = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
      this.currentTime = Math.floor(this.audio.currentTime);         
      this.formattedCurrentTime = currentTime;
    }
  }

  play(index?: number): void {
    if (index === undefined) {
      if (this.audio.paused) {
        if (this.audio.readyState === 0) {
          this.trackPointer = 0;
          this.currentSong = this.songList[0];
          this.audio.src = this.currentSong.songUrl;
        }
        this.audio.play();
      } else {
        this.audio.pause();
      }
    } else {
      this.trackPointer = index;
      this.currentSong = this.songList[index];
      this.audio.src = this.currentSong.songUrl;
      this.audio.play();
    } 
  }

  prev(): void {
    this.trackPointer--;
    this.currentSong = this.songList[this.trackPointer];
    this.audio.src = this.currentSong.songUrl;
    this.audio.play();
  }

  next(): void {
    this.trackPointer++;
    this.currentSong = this.songList[this.trackPointer];
    this.audio.src = this.currentSong.songUrl;
    this.audio.play();
  }

  volumeSlider(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.audio.volume = Number(inputElement.value) / 16;
  }

  durationSlider(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.audio.currentTime = Number(inputElement.value);
  }

  isPlaying(): boolean {
    return !this.audio.paused;
  }

  getDuration(): number {
    return this.duration;
  }

  getAudioReadyState(): number {
    return this.audio.readyState;
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  getFormattedCurrentTime(): string {
    return this.formattedCurrentTime;
  }

  getMusicLength(): string {
    return this.musicLength;
  }

  getTrackPointer(): number {
    return this.trackPointer;
  }

  setTrackPointer(index: number): void {
    this.trackPointer = index;
  }
}