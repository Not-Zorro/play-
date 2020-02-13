# Play

[![Build Status](https://travis-ci.org/Not-Zorro/play.svg?branch=master)](https://travis-ci.org/Not-Zorro/play)

## Jump-To

> [Setup](#setup)
>
> [Running Tests](#running-tests)
>
> [Running the Application](#running-the-application)
>
> [Documentation](#documentation)
>
>> [Favorites](#favorites)
>>> [Favoriting Songs](#favoriting-a-song)
>>>
>>> [Viewing all Songs](#viewing-all-favorited-songs)
>>>
>>> [Viewing Specific Song](#viewing-specific-favorited-song)
>>>
>>> [Deleting Specific Song](#deleting-specific-favorited-song)
>>
>> [Playlists](#playlists)
>>>[Creating Playlists](#create-a-playlist)
>>>
>>>[Viewing all Playlists](#viewing-all-playlists)
>>>
>>>[Updating Playlists](#updating-a-playlist)
>>>
>>>[Deleting Playlists](#delete-a-playlist)
>>
>> [Favorites in Playlists](#favorites-in-playlists)
>>>[Adding a Favorite to a Playlist](#add-to-playlist)
>>>
>>>[Viewing Favorites in Playlists](#viewing-favorites-in-a-playlist)
>>>
>>>[Removing a Favorite to a Playlist](#remove-from-playlist)

## Description

Play is an API for favoriting songs based off of the [Musixmatch API](https://developer.musixmatch.com/documentation) providing many different endpoints.

This API is `JSON 1.0` compliant and only accepts `x-www-form-urlencoded JSON bodies` and `query parameters`


### Setup

#### Installing necessary dependencies

```
npm install
npm install -g knex
```

#### Set up databases

```
Development db Setup:
psql -c 'create database play_dev;' -U postgres

Test db Setup:
psql -c 'create database play_test;' -U postgres
```

#### Migrations

```
Development Migrations / Seeds:
knex migrate:latest
knex seed:run

Testing Migrations
knex migrate:latest --env test
```

## Running Tests

`npm test`

## Running the Application

`npm start`

## Documentation

### All endpoints go off of:

```
Development:
http://localhost:3000/api/v1/

Production:
https://play-play-dc.herokuapp.com/api/v1/
```

## Favorites

### Favoriting a Song

`POST /favorites`

**Required Request Body**

```
Ex: { title: "We Will Rock You", artistName: "Queen" }
```

**Example Response**

```
Status: 201

{
  "id": 1,
  "title": "We Will Rock You",
  "artistName": "Queen"
  "genre": "Rock",
  "rating": 88
}
```

### Viewing all favorited songs

`GET /favorites`

**Example Response**

```
Status: 200

[
  {
    "id": 1,
    "title": "We Will Rock You",
    "artistName": "Queen"
    "genre": "Rock",
    "rating": 88
  },
  {
    "id": 2,
    "title": "Careless Whisper",
    "artistName": "George Michael"
    "genre": "Pop",
    "rating": 93
  },
]
```

### Viewing specific favorited song

`GET /favorites/:id`

**Example Response**

```
Status: 200

{
  "id": 1,
  "title": "We Will Rock You",
  "artistName": "Queen"
  "genre": "Rock",
  "rating": 88
}
```

### Deleting specific favorited song

`DELETE /favorites/:id`

**Example Response**

`Status 204`

## Playlists

### Create a Playlist

`POST /playlists`

**Required Request Body**

```
Ex: { title: "Cleaning House" }
```

**Example Response**

```
Status: 201

{
  "id": 1,
  "title": "Cleaning House",
  "createdAt": 2019-11-26T16:03:43+00:00,
  "updatedAt": 2019-11-26T16:03:43+00:00
}
```

### Viewing all Playlists

`GET /playlists`

**Example Response**

```
Status: 200

[
  {
    "id": 1,
    "title": "Cleaning House",
    "createdAt": 2019-11-26T16:03:43+00:00,
    "updatedAt": 2019-11-26T16:03:43+00:00
  },
  {
    "id": 2,
    "title": "Running Mix",
    "createdAt": 2019-11-26T16:03:43+00:00,
    "updatedAt": 2019-11-26T16:03:43+00:00
  },
]
```

### Updating a Playlist

`PUT /playlists/:id`

**Required Request Body**

```
Available Params: title

Ex:
{
  title: "My Jams"
}
```

**Example Response**

```
Status: 201

{
  "id": 2,
  "title": "My Jams",
  "createdAt": 2019-11-26T16:03:43+00:00,
  "updatedAt": 2019-11-26T16:03:43+00:00
}
```

### Delete a Playlist

`DELETE /playlists/:id`

**Example Response**

`Status 204`

## Favorites in Playlists

### Add to Playlist

`POST /playlists/:playlistId/favorites/:favoriteId`

**Example Response**

```
Status: 201

{
  "Success": "{Song Title} has been added to {Playlist Title}!"
}
```

### Viewing Favorites in a Playlist

`GET /playlists/:playlistId/favorites`

**Example Response**

```
Status: 200

{
  "id": 1,
  "title": "Cleaning House",
  "createdAt": "2019-11-26T16:03:43+00:00",
  "updatedAt": "2019-11-26T16:03:43+00:00",
  "favorites" : [
                  {
                    "id": 1,
                    "title": "We Will Rock You",
                    "artistName": "Queen"
                    "genre": "Rock",
                    "rating": 25
                  },
                  {
                    "id": 4,
                    "title": "Back In Black",
                    "artistName": "AC/DC"
                    "genre": "Rock",
                    "rating": 30
                  }
               ],
  "songCount": 2,
  "songAvgRating": 27.5
}
```

### Remove from Playlist

`DELETE /playlists/:playlistId/favorites/:favoriteId`

**Example Response**

`Status 204`

[Back to Top](#play)
