var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);


router.get('/', (request, response) => {
  database('favorites').select().then(favs => {
    if (favs.length) {
      response.status(200).json(favs);
    } else {
      response.status(404).json({error: "No favorites"});
    }
  }).catch(err => response.status(404).json({error: err}))
});

module.exports = router;
