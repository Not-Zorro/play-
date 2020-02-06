var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);

router.get('/', (req, res) => {
  database('playlists').select().then(playlists => {
    if (playlists.length) {
      res.status(200).json(playlists);
    } else {
      res.status(404).json({error: "No playlists currently"});
    }
  }).catch(err => res.status(404).json({error: err}))
});

router.post('/', (req, res) => {
  if (req.body.title) {
    database('playlists').insert({title: req.body.title}, 'id').then(playlist => {
      database('playlists').where({id: playlist[0]}).first().then(playlist => {
        res.status(200).json(playlist);
      })
    }).catch(error => res.status(400).json({error: 'Title must be unique'}))
  } else {
    res.status(400).json({error: "Title not provided"});
  }
});

router.put('/:id', (req, res) => {
  database('playlists').where({id: req.params.id}).update(req.body).then(playlist => {
    if (playlist) {
      database('playlists').where({id: req.params.id}).first().then(playlist => {
        res.status(201).send(playlist);
      })
    } else {
      res.status(404).json({error: "Playlist not found"});
    }
  }).catch(err => res.status(404).json({error: "Playlist not found/Title is not unique"}))
});

router.delete('/:id', (req, res) => {
  database('playlists').del().where({id: req.params.id}).then(playlist => {
    if (playlist) {
      res.status(204).send();
    } else {
      res.status(404).json({error: "Playlist not found"});
    }
  }).catch(err => res.status(404).json({error: err}))
});

module.exports = router;
