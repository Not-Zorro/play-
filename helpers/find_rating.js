module.exports = function findRating(data) {
  let trackData = data.message.body.track
  let rating = trackData.track_rating;
  if (isNaN(rating)) {
    return {error: "Musixmatch returned a rating that was not an integer"}
  } else if (rating > 100 || rating < 1) {
    return {error: "Musixmatch returned a rating that was not in range"}
  } else {
    return rating
  }
}
