var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const formatFav = require('../../../helpers/favorites')


router.get('/', (request, response) => {
  database('favorites').select().then(favs => {
    if (favs.length) {
      let formattedFavs = favs.map(fav => formatFav(fav));
      response.status(200).json(formattedFavs);
    } else {
      response.status(404).json({error: "No favorites"});
    }
  }).catch(err => response.status(404).json({error: err}))
});

router.get('/:id', (request, response) => {
  database('favorites').where({id: request.params.id}).first().then(fav => {
    if (fav) {
      response.status(200).json(formatFav(fav));
    } else {
      response.status(404).json({error: "Favorite not found"});
    }
  }).catch(err => response.status(404).json({error: err}))
});

module.exports = router;
