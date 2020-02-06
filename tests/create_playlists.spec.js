var app = require('../app');
var request = require("supertest");

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('Test creating playlists', () => {
  beforeEach(async () => {
    await database.raw('truncate table playlists cascade');
  });

  it('happy - Should respond with playlist data', async () => {
    const res = await request(app)
        .post("/api/v1/playlists")
        .send({title: "Running Mix"});

    expect(res.body.hasOwnProperty('id')).toEqual(true);
    expect(res.body.hasOwnProperty('createdAt')).toEqual(true);
    expect(res.body.hasOwnProperty('updatedAt')).toEqual(true);
    expect(res.body.title).toEqual('Running Mix');
  })

  it('sad - Should respond with non-unique error message', async () => {
    await database('playlists').insert({title: 'Running Mix'}, 'id')

    const res = await request(app)
    .post("/api/v1/playlists")
    .send({title: "Running Mix"});

    expect(res.body).toEqual({error: 'Title must be unique'});
  })

  it('sad - Should respond with no title error message', async () => {
    const res = await request(app)
    .post("/api/v1/playlists")

    expect(res.body).toEqual({error: 'Title not provided'});
  })
})
