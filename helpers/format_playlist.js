const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const formatFav = require('./favorites')


async function formatPlaylist(playlist) {
  playlist.favorites = await database.raw(`SELECT *, favorites.id FROM favorites INNER JOIN playlist_favorites ON favorites.id = playlist_favorites.favorite_id WHERE playlist_favorites.playlist_id = ${playlist.id}`).then(data => data.rows.map(fav => {
    return formatFav(fav)
  }))
  playlist.songCount = await database.raw(`SELECT COUNT(favorites) AS songCount FROM favorites INNER JOIN playlist_favorites ON favorites.id = playlist_favorites.favorite_id WHERE playlist_favorites.playlist_id = ${playlist.id}`).then(data => parseInt(data.rows[0].songcount))
  playlist.songAvgRating = await database.raw(`SELECT AVG(favorites.rating) AS songAvgRating FROM favorites INNER JOIN playlist_favorites ON favorites.id = playlist_favorites.favorite_id WHERE playlist_favorites.playlist_id = ${playlist.id}`).then(data => parseFloat(data.rows[0].songavgrating))
  return playlist
}

module.exports = formatPlaylist
