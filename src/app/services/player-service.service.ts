import { Injectable } from "@angular/core";
import moment from "moment";
import { Song } from "../models/song";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  songList: Song[] = [];
  currentSong: Song | null = null;
  trackPointer: number = 0;
  
  audio = new Audio();
  musicLength = '0:00';
  duration = 1;
  currentTime = 0;
  formattedCurrentTime = '0:00';
  initialVolume: number;

  randomMode: boolean;

  constructor() {
    this.randomMode = false;
    this.initialVolume = 3;
    this.audio.volume = this.initialVolume / 16;
    this.initializeAudioEvents();
  }

  setInitialVolume(volume: number): void {
    this.audio.volume = volume / 16;
    this.initialVolume = volume;
  }

  getInitialVolume(): number {
    return this.initialVolume;
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

  removeSongById(index: string): void {
    this.songList = this.songList.filter((song) => song.id !== index);
    if(this.currentSong?.id === index && this.songList.length > 0) {
      this.next();
    }
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
      if (this.audio.ended && this.audio.loop === false) {
        this.next();
      }

      const duration = moment.duration(
        Math.floor(this.audio.currentTime), 'seconds');
      const currentTime = duration.seconds() < 10 ? 
                         `${Math.floor(duration.asMinutes())}:0${duration.seconds()}` : 
                         `${Math.floor(duration.asMinutes())}:${duration.seconds()}`;
      this.currentTime = Math.floor(this.audio.currentTime);         
      this.formattedCurrentTime = currentTime;
    }
  }

  loadFirstSong(autoplay: boolean): void {
    this.currentSong = this.songList[0];
    this.audio.src = this.currentSong.songUrl;
    this.setTrackPointer(0);

    if(autoplay) {
      this.audio.play();
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
    if (this.audio.currentTime > 5) {
      this.audio.currentTime = 0;
      return;
    }
    if (this.trackPointer === 0) {
      return;
    }
    this.trackPointer--;
    this.currentSong = this.songList[this.trackPointer];
    this.audio.src = this.currentSong.songUrl;
    this.audio.play();
  }

  next(): void {
    this.trackPointer = (this.trackPointer === this.songList.length - 1) ? 0 : this.trackPointer + 1;
    if(this.randomMode) {
      this.trackPointer = Math.floor(Math.random() * this.songList.length);
    }
    this.currentSong = this.songList[this.trackPointer];
    this.audio.src = this.currentSong.songUrl;
    this.audio.play();
  }

  toggleRandom(): void {
    this.randomMode = !this.randomMode;
  }

  repeat(): void {
    this.audio.loop = !this.audio.loop;
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

  isReady(): boolean {
    return this.currentSong !== undefined;
  }

  isRepeating(): boolean {
    return this.audio.loop;
  }

  isRandom(): boolean {
    return this.randomMode;
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