export interface AccessTokenI {
	access_token: string;
}

export interface NoTracksI { hasTracks: false }

export interface NotPlayingI { isPlaying: false }

interface SongImage {
	url: string;
};

interface SongArtist {
	name: string;
};

interface SongAlbum {
	name: string;
	artists: Array<SongArtist>;
	images: Array<SongImage>;
};

interface ExternalUrl {
	spotify: string;
};

interface SongItem {
	name: string;
	album: SongAlbum;
	external_urls: ExternalUrl;
};

export interface GetNowPlayingResponse {
	is_playing: boolean;
	item: SongItem;
	currently_playing_type: string;
};

export interface GetNowPlayingTransformed {
	isPlaying: boolean;
	trackTitle: string;
	album: string;
	artist: string;
	albumArtUrl: string;
	trackUrl: string;
};

export interface TrackProp {
	album: {
		album_type: string;
		artists: [
			{
				external_urls: {
					spotify: string;
				};
				href: string;
				id: string;
				name: string;
				type: string;
				uri: string;
			},
		];
		available_markets: Array<string>;
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		images: Array<{
			height: number;
			url: string;
			width: number;
		}>;
		name: string;
		release_date: string;
		release_date_precision: string;
		total_tracks: number;
		type: string;
		uri: string;
	};
	artists: [
		{
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			name: string;
			type: string;
			uri: string;
		},
		{
			external_urls: {
				spotify: string;
			};
			href: string;
			id: string;
			name: string;
			type: string;
			uri: string;
		},
	];
	href: string;
	id: string;
	name: string;
	popularity: number;
}

export interface SpotifyTopTracksI {
	items: Array<TrackProp>;
}
