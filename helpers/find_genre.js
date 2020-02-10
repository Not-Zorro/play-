module.exports = function findGenre(data) {
  let trackData = data.message.body.track
  let rating = trackData.track_rating;
  if (trackData.primary_genres.music_genre_list[0]) {
    return trackData.primary_genres.music_genre_list[0].music_genre.music_genre_name
  } else {
    return 'Unknown'
  }
}
