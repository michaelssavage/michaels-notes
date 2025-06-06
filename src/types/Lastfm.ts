type Image = {
	"#text": string;
	size: "small" | "medium" | "large" | "extralarge" | "mega" | "";
};

export type LastFmArtistInfo = {
	artist: {
		name: string;
		mbid?: string;
		url: string;
		image: Array<Image>;
		bio: {
			summary: string;
			content: string;
		};
	};
};
