const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = async (id) => {
  return await database('favorites')
      .where({id: id})
      .first().then(fav => fav)
}
