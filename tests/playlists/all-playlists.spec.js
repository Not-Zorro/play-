var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the favorites endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');
  });

  describe('Test getting all playlists', () => {
    it('It should respond with all playlists in db', async () => {
      await database('playlists').insert({title: 'Workout Jams'}, 'id');
      await database('playlists').insert({title: 'Sad Playlist'}, 'id');

      const res = await request(app)
        .get("/api/v1/playlists");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('It should respond with a 404 if no favs in db', async () => {
      const res = await request(app)
        .get("/api/v1/playlists");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: "No playlists currently" });
    });
  });
})
