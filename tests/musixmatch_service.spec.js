require('dotenv').config();
var request = require("supertest");
var app = require('../app');
var musixmatchService = require('../services/musixmatch_service');
const nock = require('nock');

describe('Test getting musixmatch api data', () => {
  it('Should respond with music data', async () => {
    const callout = nock('https://api.musixmatch.com/ws/1.1')
    .get(`/matcher.track.get?q_artist=Queen&q_track=We Will Rock You&apikey=${process.env.MUSIXMATCH_KEY}`).reply(200, {
      message: {
        header: {
          status_code: 200,
          execute_time: 0.1868691444397,
          confidence: 1000,
          mode: "search",
          cached: 1
        },
        body: {
          track: {
            track_id: 30109723,
            track_name: "We Will Rock You",
            track_name_translation_list: [
              {
                track_name_translation: {
                  language: "JA",
                  translation: "ウィ・ウィル・ロック・ユー"
                }
              }
            ],
            track_rating: 86,
            commontrack_id: 14979531,
            instrumental: 0,
            explicit: 1,
            has_lyrics: 1,
            has_subtitles: 1,
            has_richsync: 1,
            num_favourite: 842,
            album_id: 13754534,
            album_name: "News of the World",
            artist_id: 118,
            artist_name: "Queen",
            track_share_url: "https://www.musixmatch.com/lyrics/Queen/A-Human-Body?utm_source=application&utm_campaign=api&utm_medium=",
            track_edit_url: "https://www.musixmatch.com/lyrics/Queen/A-Human-Body/edit?utm_source=application&utm_campaign=api&utm_medium=",
            restricted: 0,
            updated_time: "2019-11-15T10:45:56Z",
            primary_genres: {
              music_genre_list: [
                {
                  music_genre: {
                    music_genre_id: 21,
                    music_genre_parent_id: 34,
                    music_genre_name: "Rock",
                    music_genre_name_extended: "Rock",
                    music_genre_vanity: "Rock"
                  }
                }
              ]
            }
          }
        }
      }
    })
    data = await musixmatchService('We Will Rock You', 'Queen').then(data => data)
    expect(data.message.body.track.track_name).toEqual('We Will Rock You')
    expect(data.message.body.track.artist_name).toEqual('Queen')
    expect(data.message.body.track.track_rating).toEqual(86)
    expect(data.message.body.track.primary_genres.music_genre_list[0].music_genre.music_genre_name).toEqual('Rock')
  })
})
