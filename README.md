# Spotify Playlist Formatter

Utility for cataloguing Spotify playlist contents for backup or processing.

Takes playlist CSV exported by [Spotlistr](https://www.spotlistr.com/export/spotify-playlist) and organises the data into a convenient JSON structure, grouping tracks by artist (sorted alphabetically) and album (sorted by release date).


## Usage

- Export desired playlist(s) using [Spotlistr](https://www.spotlistr.com/export/spotify-playlist)
    - **Fields** :
        - Artist(s) Name
        - Track Name
        - Album Name
        - SpotifyID
        - Release Date
    - **Separator** : ','
- Download as CSV into `./in/<name>.csv`
- Execute: `node ./index.js`
- Find output JSON in `./out`


## Input Example

`./in/playlist.csv`

```
AC/DC , Are You Ready , The Razors Edge , 7A1odihHBrI8n9k0Fefh2j , 1990-09-24
AC/DC , Thunderstruck , The Razors Edge , 57bgtoPSgt236HzfBOd8kj , 1990-09-24
AC/DC , Back In Black , Back In Black , 08mG3Y1vljYA6bvDt4Wqkj , 1980-07-25
AC/DC , Shoot to Thrill , Back In Black , 0C80GCp0mMuBzLf3EAXqxv , 1980-07-25
Metallica , Enter Sandman - Remastered 2021 , Metallica (Remastered 2021) , 2T5q7qhJVN4m2hMSIAsOlC , 2021-09-10
Metallica , Sad But True - Remastered 2021 , Metallica (Remastered 2021) , 6WJFcaTxTP1Z95rLE6lk7s , 2021-09-10
Metallica , Holier Than Thou - Remastered 2021 , Metallica (Remastered 2021) , 6c5Ft6sEfLjVxL2wkgxBtv , 2021-09-10
Metallica , Hardwired , Hardwired…To Self-Destruct , 5VnRYDDrqturQPvKg4puwu , 2016-11-18
Metallica , Now That We’re Dead , Hardwired…To Self-Destruct , 2NBvvx52QAjipBnXvAekfs , 2016-11-18
```


## Output Example

`./out/playlist.json`

```json
[
    {
        "Export Date": "2022-01-30",
        "Artist Count": 2,
        "Track Count": 9
    },
    {
        "artist": "AC/DC",
        "albums": [
            {
                "album": "Back In Black",
                "release": "1980-07-25",
                "tracks": [
                    {
                        "name": "Back in Black",
                        "id": "08mG3Y1vljYA6bvDt4Wqkj",
                        "url": "https://open.spotify.com/track/08mG3Y1vljYA6bvDt4Wqkj"
                    },
                    {
                        "name": "Shoot to Thrill",
                        "id": "0C80GCp0mMuBzLf3EAXqxv",
                        "url": "https://open.spotify.com/track/0C80GCp0mMuBzLf3EAXqxv"
                    }
                ]
            },
            {
                "album": "The Razors Edge",
                "release": "1990-09-24",
                "tracks": [
                    {
                        "name": "Are You Ready",
                        "id": "7A1odihHBrI8n9k0Fefh2j",
                        "url": "https://open.spotify.com/track/7A1odihHBrI8n9k0Fefh2j"
                    },
                    {
                        "name": "Thunderstruck",
                        "id": "57bgtoPSgt236HzfBOd8kj",
                        "url": "https://open.spotify.com/track/57bgtoPSgt236HzfBOd8kj"
                    }
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
                     {
                        "name": "Hardwired",
                        "id": "5VnRYDDrqturQPvKg4puwu",
                        "url": "https://open.spotify.com/track/5VnRYDDrqturQPvKg4puwu"
                    },
                    {
                        "name": "Now That We're Dead",
                        "id": "2NBvvx52QAjipBnXvAekfs",
                        "url": "https://open.spotify.com/track/2NBvvx52QAjipBnXvAekfs"
                    },
                ]
            },
            {
                "album": "Metallica (Remastered 2021)",
                "release": "2021-09-10",
                "tracks": [
                    {
                        "name": "Enter Sandman - Remastered 2021",
                        "id": "2T5q7qhJVN4m2hMSIAsOlC",
                        "url": "https://open.spotify.com/track/2T5q7qhJVN4m2hMSIAsOlC"
                    },
                    {
                        "name": "Sad But True - Remastered 2021",
                        "id": "6WJFcaTxTP1Z95rLE6lk7s",
                        "url": "https://open.spotify.com/track/6WJFcaTxTP1Z95rLE6lk7s"
                    },
                    {  
                        "name": "Holier Than Thou - Remastered 2021",
                        "id": "6c5Ft6sEfLjVxL2wkgxBtv",
                        "url": "https://open.spotify.com/track/6c5Ft6sEfLjVxL2wkgxBtv"
                    }
                ]
            }
        ]
    }
]
```
