const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const findGenre = require('./find_genre');
const findRating = require('./find_rating');

module.exports = async function insertFavorite(data) {
  let trackData = data.message.body.track
  let genre = findGenre(data);
  let rating = findRating(data);
  if (isNaN(rating) == true) {
    return rating
  }
  return await database('favorites').insert({
    title: trackData.track_name,
    artistName: trackData.artist_name,
    genre: genre,
    rating: rating }, 'id')
}
