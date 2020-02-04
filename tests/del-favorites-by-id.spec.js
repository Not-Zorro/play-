var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the favorites endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');
  });

  describe('Test deleting specific favorite by id', () => {
    it('Should respond with a 204 if deleted', async () => {
      await database('favorites').insert({
        id: 1,
        title: 'We Will Rock You',
        artistName: 'Queen',
        genre: 'Rock',
        rating: 88 });

      const res = await request(app)
        .delete('/api/v1/favorites/1');

      expect(res.statusCode).toBe(204);
    })

    it('Should respond with a 404 if fav not found in db', async () => {
      const res = await request(app)
        .delete('/api/v1/favorites/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({error: "Favorite not found"});
    })
  })
})
