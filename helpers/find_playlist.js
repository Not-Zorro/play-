const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = async (id) => {
  return await database('playlists')
      .where({id: id})
      .first().then(playlist => playlist)
}
