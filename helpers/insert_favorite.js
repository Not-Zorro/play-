const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = async function insertFavorite(data) {
  let trackData = data.message.body.track
  let genre = null;
  let rating = trackData.track_rating;
  if (trackData.primary_genres.music_genre_list[0]) {
    genre = trackData.primary_genres.music_genre_list[0].music_genre.music_genre_name
  } else {
    genre = 'Unknown'
  }
  if (isNaN(rating)) {
    return {error: "Musixmatch returned a rating that was not an integer"}
  } else if (rating > 100 || rating < 1) {
    return {error: "Musixmatch returned a rating that was not in range"}
  }

  return await database('favorites').insert({
    title: trackData.track_name,
    artistName: trackData.artist_name,
    genre: genre,
    rating: rating }, 'id')
}
