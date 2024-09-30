export interface ITopTrack {
  name: string;
  artists: string;
  url: string;
  img: string;
}

export interface IPlayTrack {
  isPlaying: boolean;
  trackTitle?: string;
  artist?: string;
  albumArtUrl?: string;
  trackUrl?: string;
  preview?: string;
}

export interface IPlayTrackResponse {
  isPlaying: boolean;
  trackTitle: string;
  artist: string;
  albumArtUrl: string;
  trackUrl: string;
  href: string;
}

interface ISpotifyArtist {
  name: string;
  artist: string;
}

interface ISpotifyImage {
  url: string;
}

interface ISpotifyTrack {
  name: string;
  artists: ISpotifyArtist[];
  album: {
    images: ISpotifyImage[];
  };
  external_urls: {
    spotify: string;
  };
  href: string;
}

export interface ITopTrackResponse {
  items: ISpotifyTrack[];
}

export interface IRecentTrackResponse {
  items: Array<{
    track: ISpotifyTrack;
  }>;
}

export interface IPlayTrackResponse {
  is_playing: boolean;
  item: ISpotifyTrack;
}
