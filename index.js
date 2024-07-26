const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

const makeTrackEntry = (trackName, trackId) => ({
		name: trackName,
		id: trackId,
		url: `https://open.spotify.com/track/${trackId}`
})

// make an initial album entry for an artist
const makeAlbumEntry = (albumName, releaseDate, trackName, trackId) => ({
	album: albumName,
	release: releaseDate,
	tracks: [makeTrackEntry(trackName, trackId)]
});

// make an initial artist entry
const makeArtistEntry = (artistName, albumName, releaseDate, trackName, trackId) => ({
	artist: artistName,
	albums: [makeAlbumEntry(albumName, releaseDate, trackName, trackId)]
});

// run a file through csv-parse, handing records off to formatFile() when done
const parseFile = (file) => {
	console.log('Parsing File', file);

	parse(
		fs.readFileSync(file, 'utf8'),
		{
			delimiter: ' , ',
			relaxQuotes: true,
			relaxColumnCount: true
		},
		(err, records) => {
			if (err) {
				throw err;
			}

			// first record will be of length 1 (column titles); discard it
			formatFile(file, records.filter((record) => record.length > 1));
		}
	);
};

// format a set of parsed csv records and write to ./out
const formatFile = (file, records) => {
	console.log('Formatting File', file);

	const output = [];
	let trackCount = 0;

	// first record will be of length 1 (column titles); discard it
	records.forEach((record) => {
		trackCount++;

		// clean up quotes in parsed records
		const [artistName, trackName, albumName, trackId, releaseDate] = [
			record[0].replaceAll('\"', "'"),
			record[1].replaceAll('\\"', "'"),
			record[2].replaceAll('\\"', "'"),
			record[3].replaceAll('\\"', "'"),
			record[4].replaceAll('\\"', "'"),
		];

		const artistIndex = output.findIndex((artist) => artist.artist === artistName);
		if (artistIndex > -1) {
			// artist was already encountered; add to its entry
			const albumIndex = output[artistIndex].albums.findIndex((album) => album.album === albumName);
			if (albumIndex > -1) {
				// album was already encountered; add track to its entry
				output[artistIndex].albums[albumIndex].tracks.push(makeTrackEntry(trackName, trackId));
			}
			else {
				// new album encountered; initialise its entry
				output[artistIndex].albums.push(makeAlbumEntry(albumName, releaseDate, trackName, trackId));
			}
		}
		else {
			// new artist encountered; initialise its entry
			output.push(makeArtistEntry(artistName, albumName, releaseDate, trackName, trackId))
		}
	});

	// sort each artist's albums by release date
	output.forEach((artist) => {
		artist.albums.sort((a, b) => new Date(a.release).getTime() - new Date(b.release).getTime);
	});

	// sort artists alphabetically
	output.sort((a, b) => a.artist.localeCompare(b.artist, undefined, { ignorePunctuation: true }));

	// splice in playlist size info + export date to output[0]
	output.splice(0, 0, { 'Export Date': new Date().toISOString().slice(0, 10), 'Artist Count': output.length, 'Track Count': trackCount });

	// write
	fs.writeFileSync(
		path.resolve(file, '../../', 'out', path.basename(file).replace(/\..+/, '.json')),
		JSON.stringify(output, null, 2)
	);
};

// process all files in ./in, excluding .gitkeep
const files = fs.readdirSync(path.resolve('./in')).filter((file) => !file.startsWith('.')).map((file) => path.resolve('./in', file));
files.forEach(parseFile);