# Play

## Jump-To

- [Setup](#setup)
- [Running Tests](#running-tests)
- [Running the Application](#running-the-application)
- [Documentation](#documentation)
- [Favoriting Songs](#favoriting-a-song)
- [Viewing all Songs](#viewing-all-favorited-songs)
- [Viewing Specific Song](#viewing-specific-favorited-song)
- [Deleting Specific Song](#deleting-specific-favorited-song)

## Description

Play is an API for favoriting songs based off of the [Musixmatch API](https://developer.musixmatch.com/documentation) providing many different endpoints.

This API is `JSON 1.0` compliant and only accepts `x-www-form-urlencoded JSON bodies` and `query parameters`

[![Build Status](https://travis-ci.org/Not-Zorro/play.svg?branch=master)](https://travis-ci.org/Not-Zorro/play)

### Setup

#### Installing necessary dependencies

`npm install`
`npm install -g knex`

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

`get /favorites`

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

`get /favorites/:id`

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

[Back to Top](#play)
