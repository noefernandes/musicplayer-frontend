import { Song } from "./song"

export interface Playlist {
    id?: string
    name: string
    songQtd?: number
    totalDuration?: number
    image: File | null
    imageUrl?: string
    songs: Song[]
}