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
  });

  describe('Test deleting specific playlist_favorites by ids', () => {
    it('Should respond with a 204 if deleted', async () => {
      await database('playlists').insert({title: 'Workout Jams', id: 1});
      await database('favorites').insert({
        id: 1,
        title: 'We Will Rock You',
        artistName: 'Queen',
        genre: 'Rock',
        rating: 88 });
      await request(app).post('/api/v1/playlists/1/favorites/1');
      let res = await request(app).delete('/api/v1/playlists/1/favorites/1');

      expect(res.statusCode).toBe(204);
    })

    it('Should respond with a 404 if fav or playlist not found in db', async () => {
      let res = await request(app).delete('/api/v1/playlists/1/favorites/1');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({error: "That Playlist/Favorite relation was not found"});
    })
  })
})
