export interface TopTracksI {
  body: Array<{ name: string; artists: string; url: string }>;
}

export interface CurrentTrackI {
  body: {
    isPlaying: boolean;
    trackTitle: string;
    artist: string;
    albumArtUrl: string;
    trackUrl: string;
  };
}
