# Spotify Playlist Formatter

Utility for cataloguing Spotify playlist contents for backup or processing.

Takes playlist CSV exported by [Spotlistr](https://www.spotlistr.com/export/spotify-playlist) and organises the data into a convenient JSON structure, grouping tracks by artist (sorted alphabetically) and album (sorted by release date).


## Usage

- Export desired playlist(s) using [Spotlistr](https://www.spotlistr.com/export/spotify-playlist)
    - **Fields** :
        - Artist(s) Name
        - Track Name
        - Album Name
        - Release Date
- Download as CSV into `./in/<name>.csv`
- Execute: `node ./index.js`
- Find output JSON in `./out`


## Input Example

`./in/playlist.csv`

```
AC/DC , Are You Ready , The Razors Edge , 1990-09-24
AC/DC , Thunderstruck , The Razors Edge , 1990-09-24
AC/DC , Back In Black , Back In Black , 1980-07-25
AC/DC , Shoot to Thrill , Back In Black , 1980-07-25
Metallica , Enter Sandman - Remastered 2021 , Metallica (Remastered 2021) , 2021-09-10
Metallica , Sad But True - Remastered 2021 , Metallica (Remastered 2021) , 2021-09-10
Metallica , Holier Than Thou - Remastered 2021 , Metallica (Remastered 2021) , 2021-09-10
Metallica , Hardwired , Hardwired…To Self-Destruct , 2016-11-18
Metallica , Atlas, Rise! , Hardwired…To Self-Destruct , 2016-11-18
Metallica , Now That We’re Dead , Hardwired…To Self-Destruct , 2016-11-18
```


## Output Example

`./out/playlist.json`

```json
[
    {
        "Artist Count": 2,
        "Track Count": 10
    },
    {
        "artist": "AC/DC",
        "albums": [
            {
                "album": "Back In Black",
                "release": "1980-07-25",
                "tracks": [
                    "Back In Black",
                    "Shoot To Thrill"
                ]
            },
            {
                "album": "The Razors Edge",
                "release": "1990-09-24",
                "tracks": [
                    "Are You Ready",
                    "Thunderstruck"
                ]
            }
        ]
    },
    {
        "artist": "Metallica",
        "albums": [
            {
                "album": "Hardwired...To Self-Destruct",
                "release": "2016-11-18",
                "tracks": [
                    "Hardwired",
                    "Atlas, Rise!",
                    "Now That We're Dead"
                ]
            },
            {
                "album": "Metallica (Remastered 2021)",
                "release": "2021-09-10",
                "tracks": [
                    "Enter Sandman - Remastered 2021",
                    "Sad But True - Remastered 2021",
                    "Holier Than Thou - Remastered 2021"
                ]
            }
        ]
    }
]
```
