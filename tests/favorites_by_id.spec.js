var request = require("supertest");
var app = require('../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the favorites endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table favorites cascade');
  });

  describe('Test getting specific favorite by id', () => {
    it('Should respond with a specific fav that is is db', async () => {
      await database('favorites').insert({
        id: 1,
        title: 'We Will Rock You',
        artistName: 'Queen',
        genre: 'Rock',
        rating: 88 });
        await database('favorites').insert({
          title: 'Careless Whisper',
          artistName: 'George Michael',
          rating: 93 }, 'id');

      const res = await request(app)
        .get('/api/v1/favorites/1');

      expect(res.statusCode).toBe(200);
      expect(res.body.title).toEqual('We Will Rock You');
      expect(res.body.artistName).toEqual('Queen');
      expect(res.body.genre).toEqual('Rock');
      expect(res.body.rating).toEqual(88);
    })

    it('Should respond with a 404 if fav not found in db', async () => {
      const res = await request(app)
        .get('/api/v1/favorites/1');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({error: "Favorite not found"});
    })
  })
})
