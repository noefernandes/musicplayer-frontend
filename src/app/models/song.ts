export interface Song {
    id?: string
    name: string
    artist: string
    album: string
    duration: string
    song: File | null
    songUrl: string
    filename?: string
    selected?: boolean
    songImageUrl?: string
}