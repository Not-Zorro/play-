var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the playlists endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');
  });

  describe('Test deleting specific playlist by id', () => {
    it('Should respond with a 204 if deleted', async () => {
      await database('playlists').insert({title: 'Workout Jams', id: 1});

      const res = await request(app)
        .delete('/api/v1/playlists/1');

      expect(res.statusCode).toBe(204);
    })

    it('Should respond with a 404 if fav not found in db', async () => {
      const res = await request(app)
        .delete('/api/v1/playlists/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({error: "Playlist not found"});
    })
  })
})
