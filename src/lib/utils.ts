export const sortByDate = <T extends { date: string }>(a: T, b: T): number => {
  return new Date(b.date).valueOf() - new Date(a.date).valueOf();
};

export const sortById = <T extends { id: number }>(a: T, b: T): number => {
  return a.id - b.id;
};

export const joinTags = (tags: Array<string>) => {
  return tags.map((tag) => `#${tag}`).join(" ");
};

export const exampleRekordboxText = `#	My Tag	Key	Artist	Track Title	Rating	Color	BPM	Date Added	Location
1	6B	Bb	Iamalex 	Daydreamer	**   		75.00	2021-10-02	E:/Tunes/Party/synthpop/Iamalex - Daydreamer.mp3
2	2A	Ebm	Nightmares on Wax  	Wonder	**   		114.00	2021-10-02	E:/Tunes/Electronic/Deep/Nightmares on Wax - Wonder.mp3
3	2A	Ebm	Felipe Gordon  	Highly Smooth Tone (Edit)	**   		120.00	2021-10-02	E:/Tunes/Electronic/Deep/Felipe Gordon - Highly Smooth Tone (Edit).mp3
4	3A	Bbm	Bamily 	Party Woman (Crazy P Remix)	**   		116.00	2021-10-02	E:/Tunes/Electronic/Deep/Bamily - Party Woman (Crazy P Remix).mp3
5	4A	Fm	Moods	Music Saved My LIfe	**   		104.00	2021-10-02	E:/Tunes/Electronic/Deep/Moods - Music Saved My LIfe.mp3
6	5A	Cm	Sampology	Running Around	**   		121.00	2021-10-02	E:/Tunes/Electronic/Deep/Sampology - Running Around.mp3
7	7A	Dm	Hiatt DB	6 O'Clock Rock	***  		111.00	2021-10-02	E:/Tunes/Electronic/Deep/Hiatt DB - 6 O'Clock Rock.mp3
8	9A	Em	Althea Forrest 	Hey Mister	***  		106.71	2021-10-02	E:/Tunes/Party/synthpop/Althea Forrest - Hey Mister.mp3
9	9B	G	Razzy Bailey	I Still Hate Hate (Santiga Original Mix)	**   		111.41	2021-10-02	E:/Tunes/Electronic/Deep/Razzy Bailey - I Still Hate Hate (Santiga Original Mix).mp3
10	8B	C	Sandra De Sá	Pela Cidade	**** 		114.46	2021-10-02	E:/Tunes/Party/cheese/Sandra De Sá - Pela Cidade.mp3
11	12A	Dbm	Daniel Dimbas	La Musique (Palms Trax Edit)	***  		112.99	2021-09-08	E:/Tunes/Electronic/Groovy/Daniel Dimbas - La Musique (Palms Trax Edit).flac
12	6A	Gm	Mr Twin Sister	Polvo	**** 		120.00	2021-10-02	E:/Tunes/Electronic/Dance/Mr Twin Sister - Polvo.mp3
13	1A	Abm	Shee	The Player	***  		121.00	2021-10-02	E:/Tunes/Electronic/Groovy/Shee - The Player.mp3
14	4A	Fm	Never Dull	Paradise Garage	***  		122.00	2021-10-02	E:/Tunes/Electronic/Groovy/Never Dull - Paradise Garage.mp3
15	4A	Fm	Mennie	H.A.P.P.Y.	***  		117.65	2021-09-08	E:/Tunes/Electronic/Groovy/Mennie - H.A.P.P.Y.flac
16	8A	Am	Crowd Control & Slug Father	Every Minute (Disco Vibe - Classic Edit - Fem Vocal)	**** 		123.00	2021-09-08	E:/Tunes/Electronic/Groovy/Crowd Control & Slug Father - Every Minute.mp3
17	9A	Em	Model Man	Love Surrounds	***  		123.00	2021-10-02	E:/Tunes/Party/synthpop/Model Man - Love Surrounds.mp3
18	12A	Dbm	Kryptogram	Woman Like You	**** 		120.00	2021-10-02	E:/Tunes/Electronic/Groovy/Kryptogram - Woman Like You.mp3
19	12A	Dbm	Terrence Parker 	Twisted Disco 77	***  		125.00	2021-10-02	E:/Tunes/Electronic/Groovy/Terrence Parker - Twisted Disco 77.mp3
20	11A	F#m	Fouk	Night Shift (Original Mix)	     		120.00	2021-09-08	E:/Tunes/Electronic/Groovy/Fouk - Night Shift (Original Mix).mp3
21	11B	A	Helado Negro	Outside the Outside	**   		120.00	2021-10-02	E:/Tunes/Electronic/Deep/Helado Negro - Outside the Outside.mp3`;
