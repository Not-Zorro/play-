var request = require("supertest");
var app = require('../../app');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test the playlists endpoints', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');
  });

  describe('Test updating specific playlist by id', () => {
    it('Should respond with a 201 if updated', async () => {
      await database('playlists').insert({id: 2, title: 'Running'});

      const res = await request(app)
        .put('/api/v1/playlists/2')
        .send({
          title: "Running Mix",
        })

      expect(res.statusCode).toBe(201);
      expect(res.body.title).toEqual('Running Mix');
    })

    it('Should respond with a 201 if updated', async () => {
      await database('playlists').insert({id: 1, title: 'Running'});
      await database('playlists').insert({id: 2, title: 'Running MIX'});

      const res = await request(app)
        .put('/api/v1/playlists/2')
        .send({
          title: "Running",
          createdAt: '2019-11-26T16:03:43+00:00',
          updatedAt: '2019-11-26T16:03:45+00:00'
        })

      expect(res.body).toEqual({error: 'Playlist not found/Title is not unique'});
    })

    it('Should respond with a 404 if fav not found in db', async () => {
      const res = await request(app)
        .put('/api/v1/playlists/1000');

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({error: "Playlist not found/Title is not unique"});
    })
  })
})
