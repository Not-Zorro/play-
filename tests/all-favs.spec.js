var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the favorites endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');
  });

  describe('Test getting all favorites', () => {
    it('It should respond with all favs in db', async () => {
      await database('favorites').insert({
        title: 'We Will Rock You',
        artistName: 'Queen',
        genre: 'Rock',
        rating: 88 }, 'id');
      await database('favorites').insert({
        title: 'Careless Whisper',
        artistName: 'George Michael',
        rating: 93 }, 'id');

      const res = await request(app)
        .get("/api/v1/favorites");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(2);
    });

    it('It should respond with a 404 if no favs in db', async () => {
      const res = await request(app)
        .get("/api/v1/favorites");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: "No favorites" });
    });
  });
})
