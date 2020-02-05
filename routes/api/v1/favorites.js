var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const formatFav = require('../../../helpers/favorites')
const musixmatchService = require('../../../services/musixmatch_service')
const insertFavorite = require('../../../helpers/insert_favorite')


router.get('/', (req, res) => {
  database('favorites').select().then(favs => {
    if (favs.length) {
      let formattedFavs = favs.map(fav => formatFav(fav));
      res.status(200).json(formattedFavs);
    } else {
      res.status(404).json({error: "No favorites"});
    }
  }).catch(err => res.status(404).json({error: err}))
});

router.get('/:id', (req, res) => {
  database('favorites').where({id: req.params.id}).first().then(fav => {
    if (fav) {
      res.status(200).json(formatFav(fav));
    } else {
      res.status(404).json({error: "Favorite not found"});
    }
  }).catch(err => res.status(404).json({error: err}))
});

router.post('/', (req, res) => {
  if (req.body.artistName && req.body.title) {
    musixmatchService(req.body.title, req.body.artistName).then(data => {
      insertFavorite(data).then(id => {
        if (id[0]) {
          database('favorites').where({id: id[0]}).first().then(fav => {
            res.status(200).json(formatFav(fav));
          })
        } else {
          res.status(400).json(id)
        }
    }).catch(err => res.status(400).json({error: 'Not Created'}))
  })
  } else {
    res.status(400).json({error: "artistName or title not provided"});
  }
});

router.delete('/:id', (req, res) => {
  database('favorites').del().where({id: req.params.id}).then(fav => {
    if (fav) {
      res.status(204).send();
    } else {
      res.status(404).json({error: "Favorite not found"});
    }
  }).catch(err => res.status(404).json({error: err}))
});

module.exports = router;
