const path = require('path');
const fs = require('fs');
const { parse } = require('csv-parse');

let files = fs.readdirSync(path.resolve('./in')).filter((file) => !file.startsWith('.')).map((file) => path.resolve('./in', file));

files.forEach((file) => {
	console.log('PROCESSING FILE', file);

	const csv = [];

	fs.createReadStream(file)
		.pipe(parse({
			relaxColumnCount: true,
			relax_quotes: true,
			delimiter: ' , '
		}))
		.on('data', (csvrow) => {
			if (csvrow[0] !== 'Arist(s) Name,Track Name,Album Name,Release Date') {
				csv.push(csvrow);
			}
		})
		.on('end', () => {
			const indices = {
				artist: 0,
				track: 1,
				album: 2,
				date: 3
			};

			const artists = [];
			let trackCount = 0;

			csv.forEach((block) => {
				trackCount++;

				const blockData = {
					artist: block[indices.artist].replaceAll('\"', "'"),
					track: block[indices.track].replace('\\"', "'"),
					album: block[indices.album].replace('\\"', "'"),
					date: block[indices.date].replace('\\"', "'"),
				};

				const artistIndex = artists.findIndex((artist) => {
					return artist.artist === blockData.artist;
				});

				if (artistIndex > -1) {
					const artistData = artists[artistIndex];

					// artist already partially processed
					const albumIndex = artistData.albums.findIndex((album) => {
						return album.album === blockData.album;
					});

					if (albumIndex > -1) {
						// album already partially processed
						artistData.albums[albumIndex].tracks.push(blockData.track);
					}
					else {
						// new album
						artistData.albums.push({
							album: blockData.album,
							release: blockData.date,
							tracks: [
								blockData.track
							]
						});
					}
				}
				else {
					// new artist
					artists.push({
						artist: blockData.artist,
						albums: [
							{
								album: blockData.album.replace('\\"', "'"),
								release: blockData.date,
								tracks: [
									blockData.track,
								]
							}
						]
					})
				}
			});

			artists.forEach((artistData) => {
				// sort artist's albums by release date
				artistData.albums.sort((a, b) => new Date(a.release).getTime() - new Date(b.release).getTime());
			});

			// sort artists by alphabet
			artists.sort((a, b) => a.artist.localeCompare(b.artist, undefined, { ignorePunctuation: true }));

			// add playlist size info to top of structure
			artists.splice(0, 0, { 'Artist Count': artists.length, 'Track Count': trackCount });

			// output
			const output = path.resolve(file, '../../', 'out', path.basename(file).replace(/\..+/, '.json'));
			fs.writeFileSync(output, JSON.stringify(artists, null, 2));
		});
});