require('dotenv').config();
var request = require("supertest");
var app = require('../app');
const nock = require('nock');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test creating favorites', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');
  });

  it('happy - Should respond with favorite data', async () => {
    const callout = nock('https://api.musixmatch.com/ws/1.1')
    .get(`/matcher.track.get?q_artist=Queen&q_track=We Will Rock You&apikey=${process.env.MUSIXMATCH_KEY}`).reply(200, {
      message: {
        body: {
          track: {
            track_name: "We Will Rock You",
            track_rating: 86,
            artist_name: "Queen",
            primary_genres: {
              music_genre_list: [
                {
                  music_genre: {
                    music_genre_name: "Rock",
                  }
                }
              ]
            }
          }
        }
      }
    })
    const res = await request(app)
        .post("/api/v1/favorites")
        .send({title: "We Will Rock You", artistName: "Queen" });

    expect(res.body.hasOwnProperty('id')).toEqual(true);
    expect(res.body.title).toEqual('We Will Rock You');
    expect(res.body.artistName).toEqual('Queen');
    expect(res.body.genre).toEqual('Rock');
    expect(res.body.rating).toEqual(86);
  })

  it('sad - Should respond with favorite data with unknown genre', async () => {
    const callout = nock('https://api.musixmatch.com/ws/1.1')
    .get(`/matcher.track.get?q_artist=Queen&q_track=We Will Rock You&apikey=${process.env.MUSIXMATCH_KEY}`).reply(200, {
      message: {
        body: {
          track: {
            track_name: "We Will Rock You",
            track_rating: 86,
            artist_name: "Queen",
            primary_genres: {
              music_genre_list: []
            }
          }
        }
      }
    })
    const res = await request(app)
        .post("/api/v1/favorites")
        .send({title: "We Will Rock You", artistName: "Queen" });

    expect(res.body.hasOwnProperty('id')).toEqual(true);
    expect(res.body.title).toEqual('We Will Rock You');
    expect(res.body.artistName).toEqual('Queen');
    expect(res.body.genre).toEqual('Unknown');
    expect(res.body.rating).toEqual(86);
  })

  it('sad - Should respond with error with NaN rating', async () => {
    const callout = nock('https://api.musixmatch.com/ws/1.1')
    .get(`/matcher.track.get?q_artist=Queen&q_track=We Will Rock You&apikey=${process.env.MUSIXMATCH_KEY}`).reply(200, {
      message: {
        body: {
          track: {
            track_name: "We Will Rock You",
            track_rating: 'HI',
            artist_name: "Queen",
            primary_genres: {
              music_genre_list: []
            }
          }
        }
      }
    })
    const res = await request(app)
        .post("/api/v1/favorites")
        .send({title: "We Will Rock You", artistName: "Queen" });

    expect(res.body).toEqual({error: "Musixmatch returned a rating that was not an integer"});
  })

  it('sad - Should respond with error with out of range rating', async () => {
    const callout = nock('https://api.musixmatch.com/ws/1.1')
    .get(`/matcher.track.get?q_artist=Queen&q_track=We Will Rock You&apikey=${process.env.MUSIXMATCH_KEY}`).reply(200, {
      message: {
        body: {
          track: {
            track_name: "We Will Rock You",
            track_rating: 1000,
            artist_name: "Queen",
            primary_genres: {
              music_genre_list: []
            }
          }
        }
      }
    })
    const res = await request(app)
        .post("/api/v1/favorites")
        .send({title: "We Will Rock You", artistName: "Queen" });

    expect(res.body).toEqual({error: "Musixmatch returned a rating that was not in range"});
  })
})
