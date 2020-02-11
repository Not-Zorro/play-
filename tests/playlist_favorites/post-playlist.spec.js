var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the playlist_favorites endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlist_favorites cascade');
    await database.raw('truncate table playlists cascade');
    await database.raw('truncate table favorites cascade');
    await database('playlists').insert({title: 'Workout Jams', id: 1});
    await database('favorites').insert([{
      id: 1,
      title: 'We Will Rock You',
      artistName: 'Queen',
      genre: 'Rock',
      rating: 88 },
      {
      id: 2,
      title: 'Careless Whisper',
      artistName: 'George Michael',
      genre: 'Classical',
      rating: 93 }]);
  });

  describe('Test creating specific playlist_favorites by ids', () => {
    it('Should respond with a 201 and success message if created', async () => {

      const fav_res = await request(app)
        .post('/api/v1/playlists/1/favorites/1');

      expect(fav_res.statusCode).toBe(201);
      expect(fav_res.body.Success).toEqual("We Will Rock You has been added to Workout Jams!")
    })

    it('Should respond with a 404 if fav or playlist not found in db', async () => {
      let play_res = await request(app)
        .post('/api/v1/playlists/5000/favorites/1');

      expect(play_res.statusCode).toBe(404);
      expect(play_res.body).toEqual({error: "Playlist not found"});

      let fav_res = await request(app)
        .post('/api/v1/playlists/1/favorites/1000');

      expect(fav_res.statusCode).toBe(404);
      expect(fav_res.body).toEqual({error: "Favorite not found"});
    })

    it('Should respond with a 400 if fav not added', async () => {
      await request(app)
        .post('/api/v1/playlists/1/favorites/1');

      const failed_res = await request(app)
        .post('/api/v1/playlists/1/favorites/1');

      expect(failed_res.statusCode).toBe(400);
      expect(failed_res.body).toEqual({error: "Cannot add same favorite multiple times"});
    })
  })
})
